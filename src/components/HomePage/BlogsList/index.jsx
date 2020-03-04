import React from "react"
import styles from "./styles.module.scss"
import Container from "../../Container"
import BlogCard from "../../BlogCard"

export default function BlogsList({ blogs }) {
  return (
    <div className={styles.blogsList}>
      <Container>
        <div className="flex-col">
          <h2 className={styles.listTitle}>Recent Blogs</h2>
          <div className={styles.listing}>
            {blogs.map(item => (
              <BlogCard data={item} key={item.id} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
