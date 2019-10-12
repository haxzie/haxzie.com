import React, { useEffect } from 'react'
import SEO from '../../components/seo';
import { graphql } from 'gatsby';
import styles from './styles.module.scss';
import GitHubLogo from "../../images/github-logo.svg";
import DribbbleLogo from "../../images/dribbble.svg";
import IconButton from "../../components/IconButton";
import Comments from '../../components/Comments';
import Layout from '../../components/layout';

function BlogTemplate({ data }) {
    const metaData = data.markdownRemark.frontmatter;
    const contents = data.markdownRemark.html;

    // useEffect(() => {
    //     return () => {
    //         window.scrollTo(0, 0);
    //     }
    // }, []);

    return (
        <Layout>
            <SEO title={metaData.title} description={metaData.description} 
                    meta={[
                            { 'og:site_name': 'haxzie.com'},
                            { 'og:locale': 'en_US'},
                            { 'article:published_time': metaData.date }, 
                            { "article:modified_time": metaData.date },
                            { "last-modified": metaData.date},
                            { 'og:image': metaData.cover_image.publicURL},
                            { 'og:title': metaData.title },
                            { 'og:description': metaData.description },
                            { 'og:type': 'article'},
                            { 'twitter:card': 'summary'},
                            { 'twitter:title': metaData.title },
                            { 'twitter:description': metaData.description}
                        ]} />
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
                <div className={styles.blogArea}>
                    <div className={styles.metaArea}>
                        <label>{metaData.date}</label>
                        <label>5 mins read</label>
                    </div>
                    <div className={styles.blogContents} dangerouslySetInnerHTML={{ __html: contents }}></div>
                    <Comments />
                </div>
            </div>
        </Layout>
    )
}

export default BlogTemplate;

export const query = graphql`
    query BlogDataQuery($path: String!) {
        markdownRemark(frontmatter: { slug: { eq: $path } }) {
            html
            frontmatter {
                slug
                title
                date (formatString: "DD / MM / YYYY")
                description
                cover_image {
                    publicURL
                }
            }
        }
    }
`;
