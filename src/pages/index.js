import React, { useState } from "react";
import { graphql } from 'gatsby';

import Layout from "../components/layout";
import SEO from "../components/seo";
import IconButton from "../components/IconButton";
import GitHubLogo from "../images/github-logo.svg";
import DribbbleLogo from "../images/dribbble.svg";
import DevLogo from "../images/devto.svg";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";


const IndexPage = ({ data }) => {
  const [isNavigationVisible, setNavigationVisibility] = useState(false);
  const blogs = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <SEO title="Haxzie | Musthaq Ahamad" />
      <div className={`background home ${isNavigationVisible ? 'overflow-hidden' : ''}`}>
        <div className="bg-dark">
          <div className="container">
            <div className="top-bar">
              <h3>Haxzie</h3>
              <div className="flex-expand"></div>
              <a href="https://dev.to/haxzie" target="_blank" rel="noopener noreferrer">
                <img className="logo-button" src={DevLogo} alt="dev link" />
              </a>
              <a href="https://github.com/haxzie" target="_blank" rel="noopener noreferrer">
                <img className="logo-button" src={GitHubLogo} alt="github link" />
              </a>
              <a href="https://dribbble.com/haxzie" target="_blank" rel="noopener noreferrer">
                <img className="logo-button" src={DribbbleLogo} alt="dribbble link" />
              </a>
            </div>
            <div className="home-contents">
              <div className="text-column">
                <p className="heading">Hello, there! I'm <span>Musthaq Ahamad.</span><br /> UX Engineer and Visual Designer.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="listing-area">
          <div className="container">
            <h1 className="page-title">Recent Blogs</h1>
            <div className="blogs-listing">
              {
                blogs.map(item => <BlogCard data={item} key={item.id}/>)
              }
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </Layout>
  )
}

export default IndexPage

export const blogsQuery = graphql`
query blogsQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: { published: { eq: true}}}) {
    totalCount
    nodes {
      id
      frontmatter {
        slug
        title
        description
        date(formatString: "DD/MM/YYYY")
        tags
        cover_image  {
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
