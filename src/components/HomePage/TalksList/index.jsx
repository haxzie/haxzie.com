import React from "react"
import styles from "./styles.module.scss"
import Container from "../../Container"
import TalkCard from "../../TalkCard"

export default function TalksList({ talks }) {
  return (
    <div className={styles.talksList}>
      <Container>
        <div className="flex-col">
          <h2 className={styles.listTitle}>Recent Talks</h2>
          <div className={styles.listing}>
            {talks.map(item => (
              <TalkCard data={item} key={item.id} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
