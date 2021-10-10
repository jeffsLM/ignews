import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";

async function buffer(readble: Readable) {
  const chuncks = [];

  for await (const chunck of readble) {
    chuncks.push(typeof chunck === "string" ? Buffer.from(chunck) : chunck);
  }

  return Buffer.concat(chuncks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export const relevantEvents = new Set(["checkout.session.completed"]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const secret = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      res.status(400).send(`Webhook error:${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      console.log("evento recebido", event);
      try {
        switch (type) {
          case "checkout.session.completed":
            break;

          default:
            throw new Error("Unhanded event");
            break;
        }
      } catch (e) {
          //sentry , bugsnag
        return res.json({ error: "Webhook handler failed." });
      }
    }

    res.status(200).json({ recived: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not Allowed");
  }
};
