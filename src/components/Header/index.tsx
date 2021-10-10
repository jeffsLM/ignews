import Link from 'next/link';

import styles from './styles.module.scss';
import {SingInButton} from '../SingInButton';

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                <Link href="/">
                    <a className={styles.active} href="#">Home</a>
                </Link>
                <Link  href="/posts">
                    <a >Posts</a>
                </Link>
                </nav>
                <SingInButton/>
            </div>
        </header>
    );
}