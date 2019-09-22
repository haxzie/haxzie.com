import React from 'react';
import styles from './styles.module.scss';

function BlogCard() {
    return (
        <div className={styles.blogCard}>
            <h1>Lorem Ipsum dolor sit amet consepticus elit misentipus</h1>
            <p className={styles.excerpt}>Lorem ipsum dolor sit amet, ne tibique petentium sapientem vim, no his causae deserunt. Vitae apeirian eu sed. Te quodsi noluisse expetendis vix. Maiestatis liberavisse ei est, velit epicurei incorrupte nec an.</p>
            <div>
                <label className={styles.dateLabel}>25/09/2019 • 5 mins read</label>
            </div>
        </div>
    )
}

export default BlogCard
