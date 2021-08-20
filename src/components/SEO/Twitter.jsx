import React from "react"
import { Helmet } from "react-helmet"

const Twitter = ({
  title,
  description,
  imageUrls: { twitterImageUrl: image },
  imageAlt,
  socialMedia: { twitter: creator },
}) => (
  <Helmet>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:image:alt" content={imageAlt} />
    <meta
      name="twitter:creator"
      content={new URL(creator).pathname.replace(`/`, `@`)}
    />
  </Helmet>
)

export default Twitter
