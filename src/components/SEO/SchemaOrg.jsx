import React from "react"
import { Helmet } from "react-helmet"
import slashify from "../../helpers/slashify"

const SchemaOrg = ({
  siteUrl,
  siteName,
  firstName,
  lastName,
  logo: { pathName: logoPathName, width: logoWidth, height: logoHeight },
  language,
  socialMedia: { twitter, github },
  address,
  speakableSelector,
  pathName,
  title,
  description,
  imageUrls: {
    schemaOrg1x1ImageUrl,
    schemaOrg4x3ImageUrl,
    schemaOrg16x9ImageUrl,
  },
  breadcrumb,
  type,
  modified,
  published,
  slug,
  pages: {
    home: { breadcrumb: homeBreadcrumb },
    blog: { breadcrumb: blogBreadcrumb, pathName: blogPathName },
  },
  activePages: { isHome, isBlog, isAbout, isContact, isArticle },
  url,
}) => {
  const schemaId = id => `${siteUrl}/#${id}`

  const fullName = `${firstName} ${lastName}`
  const pageUrl = slashify(siteUrl, pathName)
  const blogPageUrl = slashify(siteUrl, blogPathName)
  const articlePageUrl = slashify(siteUrl, blogPathName, slug)

  const schemaOrgAddress = {
    "@type": `PostalAddress`,
    "@id": schemaId(`address`),
    ...address,
  }

  const schemaOrgPerson = {
    "@type": `Person`,
    "@id": schemaId(`person`),
    url: siteUrl,
    name: fullName,
    sameAs: [twitter, github],
    address: {
      "@id": schemaId(`address`),
    },
  }

  const schemaOrgOrganization = {
    "@id": schemaId(`organization`),
    "@type": `Organization`,
    url: siteUrl,
    name: siteName,
    logo: {
      "@type": `ImageObject`,
      url: slashify(siteUrl, logoPathName),
      height: logoHeight,
      width: logoWidth,
    },
    address: {
      "@id": schemaId(`address`),
    },
  }

  const schemaOrgPage = Object.assign(
    {
      "@type": type,
      author: { "@id": schemaId(`person`) },
      publisher: { "@id": schemaId(`organization`) },
      description,
      headline: title,
      inLanguage: language,
      name: title,
      url,
      mainEntityOfPage: url,
      image: [
        schemaOrg1x1ImageUrl,
        schemaOrg4x3ImageUrl,
        schemaOrg16x9ImageUrl,
      ],
    },
    isArticle &&
      published && {
        datePublished: published,
      },
    isArticle && modified
      ? { dateModified: modified }
      : published
      ? { dateModified: published }
      : null,
    !isBlog &&
      speakableSelector && {
        speakable: {
          "@type": `SpeakableSpecification`,
          cssSelector: speakableSelector,
        },
      }
  )

  const breadcrumbList = [
    {
      id: siteUrl,
      name: homeBreadcrumb,
    },
  ]

  if (isBlog || isContact || isAbout) {
    breadcrumbList.push({
      id: pageUrl,
      name: breadcrumb,
    })
  } else if (isArticle) {
    breadcrumbList.push(
      {
        id: blogPageUrl,
        name: blogBreadcrumb,
      },
      {
        id: articlePageUrl,
        name: title,
      }
    )
  }

  const schemaOrgBreadcrumbs = {
    "@type": `BreadcrumbList`,
    "@id": schemaId(`breadcrumbs`),
    name: `Breadcrumbs`,
    itemListElement: breadcrumbList.map(({ id, name }, index) => ({
      "@type": `ListItem`,
      position: index + 1,
      name,
      item: {
        "@type": `WebPage`,
        "@id": id,
      },
    })),
  }

  const schemaOrg = {
    "@context": "http://schema.org",
    "@graph": [
      schemaOrgAddress,
      schemaOrgPerson,
      schemaOrgOrganization,
      schemaOrgPage,
    ],
  }

  if (!isHome) {
    schemaOrg["@graph"].push(schemaOrgBreadcrumbs)
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
    </Helmet>
  )
}

export default SchemaOrg
