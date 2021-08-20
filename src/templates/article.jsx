/** @jsx jsx */
import { jsx, Themed, Flex, Box } from "theme-ui"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"
import useSiteMetadata from "../hooks/useSiteMetadata"
import Layout from "../components/Layout"

/* eslint-enable react/jsx-pascal-case */
const Article = ({
  data: {
    mdx: {
      body,
      frontmatter: {
        title,
        description,
        image: {
          childImageSharp: { gatsbyImageData: coverImage, ...seoImages },
        },
        imageAlt,
        published,
        modified,
      },
    },
  },
  pageContext: { slug },
}) => {
  const {
    pages: {
      article: { id, type },
    },
  } = useSiteMetadata()

  return (
    <Layout
      pageId={id}
      type={type}
      slug={slug}
      title={title}
      description={description}
      images={{ ...seoImages }}
      imageAlt={imageAlt}
      published={published}
      modified={modified}
    >
      <GatsbyImage image={coverImage} alt={imageAlt} loading="eager" />
      <Themed.h1>{title}</Themed.h1>
      <Flex
        sx={{
          justifyContent: `space-between`,
          width: `100%`,
        }}
      >
        <Themed.p
          as={Box}
          sx={{
            fontSize: 1,
          }}
        >
          Published on {published}
        </Themed.p>
        {modified && (
          <Themed.p
            as={Box}
            sx={{
              fontSize: 1,
            }}
          >
            Updated on {modified}
          </Themed.p>
        )}
      </Flex>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
}
/* eslint-disable react/jsx-pascal-case */

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        ...FrontmatterFields
        image {
          childImageSharp {
            ...ImageUrlFields
          }
        }
      }
    }
  }
`

export default Article
