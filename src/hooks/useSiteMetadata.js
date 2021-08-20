import { useStaticQuery, graphql } from "gatsby"

const useSiteMetadata = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            siteName
            firstName
            lastName
            logo {
              pathName
              width
              height
            }
            language
            socialMedia {
              twitter
              github
            }
            address {
              addressCountry
              addressLocality
              addressRegion
            }
            speakableSelector
            pages {
              home {
                id
                pathName
                title
                description
                imageAlt
                breadcrumb
                type
              }
              blog {
                id
                pathName
                title
                description
                imageAlt
                breadcrumb
                type
              }
              contact {
                id
                pathName
                title
                description
                imageAlt
                breadcrumb
                type
              }
              about {
                id
                pathName
                title
                description
                imageAlt
                breadcrumb
                type
              }
              article {
                id
                type
              }
            }
          }
        }
      }
    `
  )

  return siteMetadata
}

export default useSiteMetadata
