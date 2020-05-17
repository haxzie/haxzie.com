import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import NavigationBar from "../components/NavigationBar"
import Hero from "../components/HomePage/Hero"
import TabNavigation from "../components/TabNavigation"
import TalksList from "../components/HomePage/TalksList"
import { graphql } from "gatsby"

const Talks = ({ data }) => {
  const talks = data.allMarkdownRemark.nodes
  return (
    <Layout>
      <SEO title="Haxzie's Talks" description="All the talks and workshops I have presented"/>
      <NavigationBar />
      <Hero />
      <TabNavigation />
      <TalksList talks={talks}/>
    </Layout>
  )
}

export default Talks

export const talksQuery = graphql`
query talksQuery {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { frontmatter: { published: { eq: true }}, fileAbsolutePath: {regex: "/talks/.*[.]md$/"} }
  ) {
    totalCount
      nodes {
        id
        frontmatter {
          slug
          title
          description 
          date(formatString: "DD/MM/YYYY")
          tags
          event
          place
          event_link
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
  }
`
