import React from "react"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styles from "./styles.module.scss"
import Comments from "../../components/Comments"
import Container from "../../components/Container"
import Layout from "../../components/Layout"
import NavigationBar from "../../components/NavigationBar"
import YouTube from "react-youtube"

class TalkTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollPercentage: 0,
    }
  }

  handleScroll = () => {
    const gatsbyApp = document.getElementById("___gatsby")
    const winScroll = gatsbyApp.scrollTop
    const height = gatsbyApp.scrollHeight - gatsbyApp.clientHeight
    const scrolled = (winScroll / height) * 100
    this.setState({
      scrollPercentage: scrolled,
    })
  }

  componentDidMount() {
    document.getElementById("___gatsby").scrollTo(0, 0)
    document
      .getElementById("___gatsby")
      .addEventListener("scroll", this.handleScroll)
  }

  render() {
    const { data } = this.props
    const metaData = data.markdownRemark.frontmatter
    const opts = {
      height: "600",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    }
    return (
      <Layout>
        <SEO
          title={metaData.title}
          description={metaData.description}
          meta={[
            { "og:site_name": "haxzie.com" },
            { "og:locale": "en_US" },
            { "article:published_time": metaData.date },
            { "article:modified_time": metaData.date },
            { "last-modified": metaData.date },
            { "og:image": metaData.cover_image.publicURL },
            { "og:title": metaData.title },
            { "og:description": metaData.description },
            { "og:type": "article" },
            { "twitter:card": "summary" },
            { "twitter:title": metaData.title },
            { "twitter:description": metaData.description },
          ]}
        />
        <div className={styles.talkTemplatePage}>
          <NavigationBar enableBackButton={true} title="talks" to="/talks" />
          <div className={styles.header}>
            <Container>
              <div className={styles.hero}>
                <div className={styles.textColumn}>
                  <p className={styles.heading}>{metaData.title}</p>
                </div>
              </div>
            </Container>
          </div>
          <div className={styles.videoContainer}>
            <YouTube
              className={styles.videoPlayer}
              videoId={metaData.video_id}
              opts={opts}
            />
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.detailsArea}>
              <Img
                className={styles.eventImage}
                fluid={metaData.event_image.childImageSharp.fluid}
              />
              <div className={styles.texts}>
                <a
                  href={metaData.event_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className={styles.placeName}>{metaData.event}</p>
                </a>
                <span>{metaData.place}</span>
              </div>
            </div>
            <p className={styles.description}>{metaData.description}</p>
            <p className={styles.date}>Presented on {metaData.date}</p>
          </div>
          <Comments />
        </div>
      </Layout>
    )
  }
}

export default TalkTemplate

export const query = graphql`
  query talkDetailsQuery($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      frontmatter {
        slug
        title
        event
        event_link
        place
        video_id
        description
        date(formatString: "DD / MM / YYYY")
        cover_image {
          publicURL
        }
        event_image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 200, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
