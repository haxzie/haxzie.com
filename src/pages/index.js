import React, { useState } from "react";

import Layout from "../components/layout";
import NavigationScreen from "../components/navigation-screen";
import SEO from "../components/seo";
import IconButton from "../components/IconButton";
import GitHubLogo from "../images/github-logo.svg";
import DribbbleLogo from "../images/dribbble.svg";


const IndexPage = () => {
  const [isNavigationVisible, setNavigationVisibility] = useState(false);

  return (
    <Layout>
      <SEO title="Haxzie | Musthaq Ahamad" />
      <div className={`background home ${isNavigationVisible? 'overflow-hidden': ''}`}>
        <NavigationScreen isVisible={isNavigationVisible} closeNavigation={() => setNavigationVisibility(false)} />
        <div className="container">
          <div className="top-bar">
            <IconButton onClick={()=> setNavigationVisibility(true)}>menu</IconButton>
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
              <p className="heading"><span className="fc">H</span>ELLO!</p>
              <p className="sub-heading"><span>I'm</span> Ha<span className="fc">x</span>zie</p>
            </div>
            <div className="home-illustration">
              <div className="bar left" />
              <div className="bar right" />
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
}

export default IndexPage
