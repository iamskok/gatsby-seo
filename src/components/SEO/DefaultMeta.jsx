import React from "react"
import { Helmet } from "react-helmet"

const DefaultMeta = ({ title, description, language, url }) => {
  const lang = language.replace(`_`, `-`)

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}

export default DefaultMeta
