import slashify from "../../helpers/slashify"

const getCurrentUrl = ({
  siteUrl,
  pathName,
  slug,
  pages: {
    blog: { pathName: blogPathName },
  },
  activePages: { isHome, isArticle },
}) =>
  isHome
    ? siteUrl
    : isArticle
    ? slashify(siteUrl, blogPathName, slug)
    : slashify(siteUrl, pathName)

export default getCurrentUrl
