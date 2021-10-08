import { signin, useSession } from 'next-auth/client';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession()

    function handleSubscribe() {
        if (!session) {
            signin('github')
            return;
        }
        
    }


    return (
        <button type="button" className={styles.SubscribeButton} onClick={handleSubscribe}>

            Subscribe Now
        </button>
    )
}