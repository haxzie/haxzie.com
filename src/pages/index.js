import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import NavigationBar from "../components/NavigationBar"
import Hero from "../components/HomePage/Hero"
import BlogsList from "../components/HomePage/BlogsList";
import TabNavigation from "../components/TabNavigation";

const IndexPage = ({ data }) => {
  const blogs = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <SEO title="Haxzie | Musthaq Ahamad" />
      <NavigationBar />
      <Hero />  
      <TabNavigation/>
      <BlogsList blogs={blogs} />
    </Layout>
  )
}

export default IndexPage

export const blogsQuery = graphql`
  query blogsQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
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
          cover_image {
            publicURL
            childImageSharp {
              fluid(maxWidth: 1000) {
                srcSet
                tracedSVG
              }
            }
          }
        }
      }
    }
  }
`
