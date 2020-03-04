import React from 'react'
import Footer from '../Footer';
import styles from './styles.module.scss';

export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            {children}
            <Footer/>
        </div>
    )
}
