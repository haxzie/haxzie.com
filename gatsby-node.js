const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const BlogTemplate = path.resolve("src/templates/BlogTemplate/index.jsx")
  const TalkTemplate = path.resolve("src/templates/TalkTemplate/index.jsx")

  return graphql(
    `
      {
        allMarkdownRemark {
          nodes {
            id
            frontmatter {
              type
              slug
              published
            }
          }
        }
      }
    `
  ).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }
    res.data.allMarkdownRemark.nodes.forEach(item => {
      if (item.frontmatter.published) {
        // pick only blogs which has published set to true
        switch (item.frontmatter.type) {
          case "blog":
            createPage({
              path: item.frontmatter.slug,
              component: BlogTemplate,
              context: {
                id: item.id,
              },
            })
            break
          case "talk":
            createPage({
              path: item.frontmatter.slug,
              component: TalkTemplate,
              context: {
                id: item.id,
              },
            })
            break
          case "project":
            console.log({ item })
            break
        }
      }
    })
  })
}
