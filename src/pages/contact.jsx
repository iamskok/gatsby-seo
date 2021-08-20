/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import { graphql } from "gatsby"
import useSiteMetadata from "../hooks/useSiteMetadata"
import Layout from "../components/Layout"

const Contact = ({
  data: {
    file: { childImageSharp: seoImages },
  },
}) => {
  const {
    pages: {
      contact: {
        id,
        pathName,
        title,
        description,
        imageAlt,
        breadcrumb,
        type
      },
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
      <Themed.p>
        Call <Themed.a href="tel:+17777777777">(777) 777-7777</Themed.a> or
        shoot an email at{` `}
        <Themed.a href="mailto:jane@doe.com">jane@doe.com</Themed.a>.
      </Themed.p>
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

export default Contact
