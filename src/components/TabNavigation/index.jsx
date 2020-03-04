import React from 'react'
import styles from './styles.module.scss'
import Container from '../Container';
import { Link } from 'gatsby';

export default function TabNavigation() {
    return (
        <div className={styles.tabWrapper}>
            <Container>
                <ul className={styles.tabList}>
                    <li className={styles.tab}><Link to="/" activeClassName={styles.active}>Blogs</Link></li>
                    <li className={styles.tab}><Link to="/talks" activeClassName={styles.active}>Talks</Link></li>
                    <li className={styles.tab}><Link to="/projects" activeClassName={styles.active}>Projects</Link></li>
                </ul>
            </Container>
        </div>
    )
}
