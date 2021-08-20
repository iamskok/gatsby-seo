/** @jsx jsx */
import { jsx, Themed, Box, Flex } from "theme-ui"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import useSiteMetadata from "../hooks/useSiteMetadata"
import Layout from "../components/Layout"
import Link from "../components/Link"
import slashify from "../helpers/slashify"

const Blog = ({
  data: {
    allMdx,
    file: { childImageSharp: seoImages },
  },
}) => {
  const {
    pages: {
      blog: { id, pathName, title, description, imageAlt, breadcrumb, type },
    },
  } = useSiteMetadata()

  return (
    <Layout
      pageId={id}
      pathName={pathName}
      title={title}
      description={description}
      images={{ ...seoImages }}
      imageAlt={imageAlt}
      breadcrumb={breadcrumb}
      type={type}
    >
      <Themed.h1>{title}</Themed.h1>
      <ul
        sx={{
          listStyle: `none`,
          padding: 0,
          width: `100%`,
        }}
      >
        {allMdx.edges.map(
          ({
            node: {
              id: key,
              fields: { slug },
              frontmatter: {
                title,
                description,
                published,
                image: {
                  childImageSharp: { gatsbyImageData: coverImage },
                },
                imageAlt,
              },
            },
          }) => (
            <Flex
              key={key}
              as="li"
              sx={{
                flexDirection: `column`,
                alignItems: `center`,
                borderColor: `muted`,
                borderStyle: `solid`,
                borderWidth: `2px`,
                borderRadius: 4,
                padding: 4,
                marginBottom: 4,
              }}
            >
              <GatsbyImage
                image={coverImage}
                alt={imageAlt}
                sx={{ borderRadius: 4 }}
              />
              <Themed.p
                as={Box}
                sx={{
                  fontSize: 1,
                }}
              >
                Published on {published}
              </Themed.p>
              <Link to={slashify(pathName, slug)}>
                <Themed.h2>{title}</Themed.h2>
              </Link>
              <Themed.p sx={{ fontSize: 3 }}>{description}</Themed.p>
            </Flex>
          )
        )}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query ($image: String) {
    file(absolutePath: { eq: $image }) {
      childImageSharp {
        ...ImageUrlFields
      }
    }
    allMdx(sort: { order: DESC, fields: [frontmatter___published] }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            ...FrontmatterFields
          }
        }
      }
    }
  }
`

export default Blog
