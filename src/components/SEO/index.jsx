import React from "react"
import DefaultMeta from "./DefaultMeta"
import OpenGraph from "./OpenGraph"
import Twitter from "./Twitter"
import SchemaOrg from "./SchemaOrg"
import useSiteMetadata from "../../hooks/useSiteMetadata"
import getActivePages from "./getActivePages"
import getImageUrls from "./getImageUrls"
import getCurrentUrl from "./getCurrentUrl"

const SEO = ({
  pathName,
  slug,
  title,
  description,
  images,
  imageAlt,
  pageId,
  type,
  breadcrumb,
  published,
  modified,
}) => {
  const {
    siteUrl,
    siteName,
    firstName,
    lastName,
    language,
    socialMedia,
    logo,
    address,
    speakableSelector,
    pages,
  } = useSiteMetadata()

  const imageUrls = getImageUrls({ images, siteUrl })
  const activePages = getActivePages({ pages, pageId })
  const url = getCurrentUrl({ siteUrl, pathName, slug, pages, activePages })

  const defaultMeta = {
    title,
    description,
    language,
    url,
  }

  const twitter = {
    title,
    description,
    imageUrls,
    imageAlt,
    socialMedia,
  }

  const openGraph = {
    siteName,
    firstName,
    lastName,
    title,
    description,
    imageUrls,
    imageAlt,
    modified,
    published,
    language,
    activePages,
    url,
  }

  const schemaOrg = {
    siteUrl,
    siteName,
    firstName,
    lastName,
    logo,
    language,
    socialMedia,
    address,
    speakableSelector,
    pathName,
    title,
    description,
    imageUrls,
    breadcrumb,
    type,
    modified,
    published,
    slug,
    pages,
    activePages,
    url,
  }

  return (
    <>
      <DefaultMeta {...defaultMeta} />
      <Twitter {...twitter} />
      <OpenGraph {...openGraph} />
      <SchemaOrg {...schemaOrg} />
    </>
  )
}

export default SEO
