import React, { useState } from "react";

import Layout from "../components/layout";
import NavigationScreen from "../components/navigation-screen";
import SEO from "../components/seo";
import IconButton from "../components/IconButton";
import GitHubLogo from "../images/github-logo.svg";
import DribbbleLogo from "../images/dribbble.svg";
import BlogCard from "../components/BlogCard";


const IndexPage = () => {
  const [isNavigationVisible, setNavigationVisibility] = useState(false);

  return (
    <Layout>
      <SEO title="Haxzie | Musthaq Ahamad" />
      <div className={`background home ${isNavigationVisible ? 'overflow-hidden' : ''}`}>
        <NavigationScreen isVisible={isNavigationVisible} closeNavigation={() => setNavigationVisibility(false)} />
        <div className="bg-dark">
          <div className="container">
            <div className="top-bar">
              {
                !isNavigationVisible ? <IconButton onClick={() => setNavigationVisibility(true)}>menu</IconButton> : <></>
              }
              <div className="flex-expand"></div>
              <a href="https://github.com/haxzie" target="_blank" rel="noopener noreferrer">
                <img className="logo-button" src={GitHubLogo} alt="github link" />
              </a>
              <a href="https://dribbble.com/haxzie" target="_blank" rel="noopener noreferrer">
                <img className="logo-button" src={DribbbleLogo} alt="dribbble link" />
              </a>
            </div>
            <div className="home-contents">
              <div className="text-column">
                <p className="heading">Hello there! I'm <span>Haxzie.</span><br /> Designer, Developer and Blogger.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="listing-area">
          <div className="container">
            <h1 className="page-title">Recent Blogs</h1>
            <div className="blogs-listing">
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
