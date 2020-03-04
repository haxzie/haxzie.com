import React from "react"
import styles from "./styles.module.scss"
import Container from "../../Container"

export default function Hero() {
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.contents}>
          <h1 className={styles.heroText}>
            Hello, there! I'm <span>Musthaq Ahamad.</span>
            <br /> UX Engineer and Visual Designer.
          </h1>
        </div>
      </Container>
    </div>
  )
}
