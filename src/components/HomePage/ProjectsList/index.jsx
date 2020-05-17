import React from "react"
import styles from "./styles.module.scss"
import Container from "../../Container"
import ProjectsCard from "../../ProjectCard"

export default function ProjectsList({ projects }) {
    console.log({ projects })
  return (
    <div className={styles.projectsList}>
      <Container>
        <div className="flex-col">
          <h2 className={styles.listTitle}>Projects</h2>
          <div className={styles.listing}>
            {projects.map(item => (
              <ProjectsCard {...item.frontmatter}/>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
