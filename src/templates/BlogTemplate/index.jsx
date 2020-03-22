import React from "react"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import styles from "./styles.module.scss"
import Comments from "../../components/Comments"
import Container from "../../components/Container"
import Layout from "../../components/Layout"
import NavigationBar from "../../components/NavigationBar"

function getReadingTime(wordCount) {
  return Math.ceil(wordCount/200);
}
class BlogTemplate extends React.Component {
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
    const contents = data.markdownRemark.html
    const wordCount = data.markdownRemark.wordCount
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
        <div className={styles.blogTemplatePage}>
          <NavigationBar enableBackButton={true} title="blogs" />
          <div className={styles.header}>
            <Container>
              <div className={styles.hero}>
                <div className={styles.textColumn}>
                  <p className={styles.heading}>{metaData.title}</p>
                </div>
              </div>
            </Container>
          </div>
          <div className={styles.blogArea}>
            <div className={styles.metaArea}>
              <label>{metaData.date}</label>
              <label>{getReadingTime(wordCount.words)} mins read</label>
            </div>
            <div
              className={styles.blogContents}
              dangerouslySetInnerHTML={{ __html: contents }}
            ></div>
            <Comments />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogTemplate

export const query = graphql`
  query BlogDataQuery($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      wordCount {
        words
      }
      frontmatter {
        slug
        title
        date(formatString: "DD / MM / YYYY")
        description
        cover_image {
          publicURL
        }
      }
    }
  }
`
