import React from "react"
import { Helmet } from "react-helmet"

const DefaultMeta = ({ title, description, language, url }) => (
  <Helmet>
    <html lang={language} />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
  </Helmet>
)

export default DefaultMeta
