import { graphql } from "gatsby"

export const FrontmatterFields = graphql`
  fragment FrontmatterFields on MdxFrontmatter {
    title
    description
    published(formatString: "MM/DD/YY")
    modified(formatString: "MM/DD/YY")
    image {
      childImageSharp {
        gatsbyImageData(
          width: 800
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    imageAlt
  }
`
