import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { signIn, signOut, useSession } from 'next-auth/client';
import { FiX } from 'react-icons/fi';


export function SingInButton() {
    const [session] = useSession();
    console.log(session);


    return session ? (
        <button type="button"
            className={styles.singInButton}
            onClick={() => signOut()}
        >
            <FaGithub color="#04d361" />
            {
                session.user.name
            }
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button type="button"
            className={styles.singInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417" />
            Sing in with GitHub
        </button>
    );
}