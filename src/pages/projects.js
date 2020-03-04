import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import NavigationBar from "../components/NavigationBar"
import Hero from "../components/HomePage/Hero"
import TabNavigation from "../components/TabNavigation";
import ProjectsList from "../components/HomePage/ProjectsList";

const Projects = () => {

  return (
    <Layout>
      <SEO title="Haxzie | Musthaq Ahamad" />
      <NavigationBar />
      <Hero />  
      <TabNavigation/>
      <ProjectsList/>
    </Layout>
  )
}

export default Projects;