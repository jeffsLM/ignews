import styles from './styles.module.scss';
import {SingInButton} from '../SingInButton';

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <a className={styles.active} href="#">Home</a>
                    <a href="#">Posts</a>
                </nav>
                <SingInButton/>
            </div>
        </header>
    );
}