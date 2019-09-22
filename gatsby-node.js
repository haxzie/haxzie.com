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
                        tags
                    }
                }
                
            }
            
        }`
    ).then(res => {
        if (res.errors) {
            return Promise.reject(res.errors);
        }
        res.data.allMarkdownRemark.nodes.forEach(item => {
            // create an underscored slug as => username_map_style
            let slug = item.frontmatter.slug;
            createPage({
                path: slug,
                component: BlogTemplate,
                context: 'hello'
            });
        })
    })
}