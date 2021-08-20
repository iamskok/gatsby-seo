const path = require("path")
const siteMetadata = require("./site-metadata")
const slashify = require("./src/helpers/slashify")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const {
  NODE_ENV,
  SITE_URL,
  URL: NETLIFY_SITE_URL = SITE_URL,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === `production`
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    ...siteMetadata,
    siteUrl,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(`./src/images`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: path.resolve(`./articles`),
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: true,
        defaultQuality: 100,
      },
    },
    `gatsby-plugin-mdx`,
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `{
          allMdx {
            nodes {
              frontmatter {
                published
                modified
              }
              fields {
                slug
              }
            }
          }
        }`,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allMdx: { nodes: mdxNodes } }) => {
          const { pages } = siteMetadata
          const blogPathName = pages.blog.pathName

          const allPages = Object.values(pages).reduce((acc, { pathName }) => {
            if (pathName) {
              acc.push({ path: slashify(pathName) })
            }
            return acc
          }, [])

          const allArticles = mdxNodes.map(
            ({ frontmatter: { published, modified }, fields: { slug } }) => ({
              path: slashify(blogPathName, slug),
              lastmod: modified ? modified : published,
            })
          )

          return [...allPages, ...allArticles]
        },
        serialize: ({ path: url, lastmod }) => ({
          url,
          lastmod,
        }),
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: `*` }],
          },
          "branch-deploy": {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
  ],
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
  },
}
