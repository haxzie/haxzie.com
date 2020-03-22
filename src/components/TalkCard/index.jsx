import React from "react"
import styles from "./styles.module.scss"
import Img from "gatsby-image"
import { Link } from "gatsby"

export default function TalkCard({ data }) {
  const metaData = data.frontmatter;
  return (
    <div className={styles.talkCard}>
      <Link to={metaData.slug} >
        <h1>{metaData.title}</h1>
      </Link>
      <div className={styles.detailsArea}>
        <Img
          className={styles.eventImage}
          fluid={metaData.event_image.childImageSharp.fluid}
        />
        <div className={styles.texts}>
          <a href={metaData.event_link} target="_blank" rel="noopener noreferrer">
            <p className={styles.placeName}>{metaData.event}</p>
          </a>
          <span>
            {metaData.place} &nbsp;|&nbsp; {metaData.date}
          </span>
        </div>
      </div>
    </div>
  )
}
