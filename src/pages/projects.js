import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import NavigationBar from "../components/NavigationBar"
import Hero from "../components/HomePage/Hero"
import TabNavigation from "../components/TabNavigation"
import ProjectsList from "../components/HomePage/ProjectsList"
import { graphql } from "gatsby"

const Projects = ({ data }) => {
  const pjs = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <SEO
        title="Haxzie's Projects"
        description="All the opensource tools and projects I have built and worked on"
      />
      <NavigationBar />
      <Hero />
      <TabNavigation />
      <ProjectsList projects={pjs} />
    </Layout>
  )
}

export default Projects

export const projectsQuery = graphql`
  query projectsQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { type: { eq: "project" } }
        fileAbsolutePath: { regex: "/content/projects/.*[.]md$/" }
      }
    ) {
      nodes {
        id
        frontmatter {
          title
          description
          date(formatString: "DD/MM/YYYY")
          tags
          github
          url
        }
      }
    }
  }
`
