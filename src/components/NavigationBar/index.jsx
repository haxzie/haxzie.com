import React from "react"
import styles from "./styles.module.scss"
import GitHubLogo from "../../images/github-logo.svg"
import DribbbleLogo from "../../images/dribbble.svg"
import DevLogo from "../../images/devto.svg"
import Container from "../Container"
import IconButton from "../IconButton";
import { Link } from 'gatsby';


export default function NavigationBar({
  enableBackButton = false,
  title = "haxzie",
  to = "/"
}) {
  const links = [
    {
      title: "Dev.to",
      url: "https://dev.to/haxzie",
      icon: DevLogo,
    },
    {
      title: "Github",
      url: "https://github.com/haxzie",
      icon: GitHubLogo,
    },
    {
      title: "Dribbble",
      url: "https://dribbble.com/haxzie",
      icon: DribbbleLogo,
    },
  ]

  return (
    <div className={styles.navigationWrapper}>
      <Container>
        <div className={styles.navigationBar}>
          {enableBackButton ? (
            <Link to={to}>
              <IconButton onClick={() => {}}>arrow_back</IconButton>
            </Link>
          ) : (
            <></>
          )}
          <h3>{title}</h3>
          <div className="flex-expand"></div>
          {links.map(link => {
            return (
              <a
                href={link.url}
                key={link.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={styles.logoButton}
                  src={link.icon}
                  alt={link.title}
                />
              </a>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
