const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { pages } = require("./site-metadata")
const slashify = require("./src/helpers/slashify")

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode }).replace(/\//g, ``)

    createNodeField({
      name: `slug`,
      value,
      node,
    })
  }
}

exports.createPages = ({ actions: { createPage }, graphql }) =>
  graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) Promise.reject(errors)

    data.allMdx.edges.forEach(
      ({
        node: {
          id,
          fields: { slug },
        },
      }) => {
        createPage({
          path: slashify(pages.blog.pathName, slug),
          component: path.resolve(`src/templates/article.jsx`),
          context: { id, slug },
        })
      }
    )
  })

exports.onCreatePage = ({ page, actions: { createPage, deletePage } }) => {
  const pagesMetadata = Object.values(pages)
    .map(({ pathName, image }) => [slashify(pathName), image])
    .filter(([pathName, image]) => pathName && image)

  pagesMetadata.forEach(([pathName, image]) => {
    if (page.path === pathName) {
      deletePage(page)
      createPage({
        ...page,
        context: {
          image: path.join(process.cwd(), image),
        },
      })
    }
  })
}
