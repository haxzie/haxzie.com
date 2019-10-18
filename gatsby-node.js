const path = require('path');

exports.createPages = ({ actions, graphql }) => {


    const { createPage } = actions;
    const BlogTemplate = path.resolve('src/templates/BlogTemplate/index.jsx');

    return graphql(
        `{
            allMarkdownRemark {
                nodes {
                    id
                    frontmatter {
                        slug
                        published
                    }
                }
                
            }
            
        }`
    ).then(res => {
        if (res.errors) {
            return Promise.reject(res.errors);
        }
        res.data.allMarkdownRemark.nodes.forEach(item => {
            // pick only blogs which has published set to true
            if (item.frontmatter.published) {
                console.log(JSON.stringify(item, null, 2))
                let slug = item.frontmatter.slug;
                createPage({
                    path: slug,
                    component: BlogTemplate,
                    context: {
                        id: item.id
                    }
                });
            }
        })
    })
}