/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import { graphql } from "gatsby"
import useSiteMetadata from "../hooks/useSiteMetadata"
import Layout from "../components/Layout"

const About = ({
  data: {
    file: { childImageSharp: seoImages },
  },
}) => {
  const {
    pages: {
      about: {
        id,
        pathName,
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
        Liquorice ice cream pastry. Fruitcake cookie jujubes chocolate bar icing
        sesame snaps carrot cake icing. Fruitcake jelly beans candy toffee
        pastry apple pie. Cotton candy bear claw soufflé sesame snaps chocolate
        cake. Bear claw sweet roll cheesecake jelly-o tiramisu cupcake toffee
        tootsie roll. Cotton candy lemon drops tart muffin soufflé brownie
        dragée.
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

export default About
