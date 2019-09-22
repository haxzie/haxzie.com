import React from 'react'
import SEO from '../../components/seo';
import { graphql } from 'gatsby';
import styles from './styles.module.scss';
import GitHubLogo from "../../images/github-logo.svg";
import DribbbleLogo from "../../images/dribbble.svg";
import IconButton from "../../components/IconButton";


function BlogTemplate({ data }) {
    const metaData = data.markdownRemark.frontmatter;

    return (
        <>
            <SEO title={metaData.title} description={metaData.description} />
            <div className={styles.blogTemplatePage}>
                <div className={styles.header}>
                    <div className="container">
                        <div className="top-bar">
                            <IconButton onClick={() => window.history.back()}>arrow_back</IconButton>
                            <h3>Blogs</h3>
                            <div className="flex-expand"></div>
                            <a href="https://github.com/haxzie" target="_blank" rel="noopener noreferrer">
                                <img className="logo-button" src={GitHubLogo} alt="github link" />
                            </a>
                            <a href="https://dribbble.com/haxzie" target="_blank" rel="noopener noreferrer">
                                <img className="logo-button" src={DribbbleLogo} alt="dribbble link" />
                            </a>
                        </div>
                        <div className={styles.hero}>
                            <div className={styles.textColumn}>
                                <p className={styles.heading}>{metaData.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogTemplate;

export const query = graphql`
    query BlogDataQuery($path: String!) {
        markdownRemark(frontmatter: { slug: { eq: $path } }) {
            frontmatter {
                slug
                title
                date
                description
            }
        }
    }
`;
