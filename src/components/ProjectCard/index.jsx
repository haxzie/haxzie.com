import React from "react"
import styles from "./styles.module.scss"

export default function ProjectCard({ title, description, url, github, tags }) {
  return (
    <div className={styles.projectCard}>
      <a href={url} target="_blank" rel="noopener">
        <h3 className={styles.title}>{title}</h3>
      </a>
      <div className={styles.chits}>
        {tags.map(item => (
          <span key={item} className={styles.chit}>
            {item}
          </span>
        ))}
      </div>
      <p className={styles.description}>{description}</p>
      {
        github? <a className={styles.githubLink} href={github}>GitHub</a>: null
      }
    </div>
  )
}
