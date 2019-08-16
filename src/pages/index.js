import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import IconButton from "../components/IconButton";
import GitHubLogo from "../images/github-logo.svg";


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="background home">
      <div className="container">
        <div className="top-bar">
          <IconButton>menu</IconButton>
          <a href="https://github.com/m4q"  target="_blank">
            <img className="logo-button" src={GitHubLogo}/>
          </a>
        </div>
        <div className="home-contents">
          <div className="text-column">
            <p className="heading"><span className="fc">H</span>ELLO!</p>
            <p className="sub-heading"><span>I'm</span> Ha<span className="fc">x</span>zie</p>
          </div>
          <div className="home-illustration">
            <div className="bar left"/>
            <div className="bar right"/>
            <div className="content-wrapper">
              <p><span className="fc-primary">UX</span> Engineer</p>
              <p><span className="fc-primary">Frontend</span> Dev</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
