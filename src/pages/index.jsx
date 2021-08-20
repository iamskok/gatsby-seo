/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import { graphql } from "gatsby"
import useSiteMetadata from "../hooks/useSiteMetadata"
import Layout from "../components/Layout"

const Home = ({
  data: {
    file: { childImageSharp: seoImages },
  },
}) => {
  const {
    pages: {
      home: {
        id,
        title,
        description,
        imageAlt,
        breadcrumb,
        type,
      },
    },
  } = useSiteMetadata()
  return (
    <Layout
      pageId={id}
      title={title}
      description={description}
      images={{ ...seoImages }}
      imageAlt={imageAlt}
      breadcrumb={breadcrumb}
      type={type}
    >
      <Themed.h1>Hi! My name is Jane.</Themed.h1>
      <Themed.h2>I love Gatsby, SEO, and dogs.</Themed.h2>
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
  }
`

export default Home
