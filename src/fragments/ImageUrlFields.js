import { graphql } from "gatsby"

export const ImageUrlFields = graphql`
  fragment ImageUrlFields on ImageSharp {
    twitter: gatsbyImageData(
      layout: FIXED
      width: 1600
      height: 800
      formats: [JPG]
    )
    openGraph: gatsbyImageData(
      layout: FIXED
      width: 1600
      height: 838
      formats: [JPG]
    )
    schemaOrg1x1: gatsbyImageData(
      layout: FIXED
      width: 1600
      height: 1600
      formats: [JPG]
    )
    schemaOrg4x3: gatsbyImageData(
      layout: FIXED
      width: 1600
      height: 1200
      formats: [JPG]
    )
    schemaOrg16x9: gatsbyImageData(
      layout: FIXED
      width: 1600
      height: 900
      formats: [JPG]
    )
  }
`
