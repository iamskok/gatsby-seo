/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import SEO from "../SEO"
import Nav from "../Nav"

const Layout = ({
  children,
  pageId,
  pathName,
  slug,
  title,
  description,
  images,
  imageAlt,
  breadcrumb,
  published,
  modified,
  type,
}) => {
  return (
    <Fragment>
      {pageId && (
        /* eslint-disable-next-line react/jsx-pascal-case */
        <SEO
          pageId={pageId}
          pathName={pathName}
          slug={slug}
          title={title}
          description={description}
          images={images}
          imageAlt={imageAlt}
          breadcrumb={breadcrumb}
          published={published}
          modified={modified}
          type={type}
        />
      )}
      <div
        sx={{
          display: `flex`,
          flexDirection: `column`,
          paddingX: 4,
          maxWidth: 800,
          minHeight: `100vh`,
          margin: `0 auto`,
        }}
      >
        <Nav />
        <main
          data-speakable="true"
          sx={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
            alignItems: `center`,
            flex: 1,
          }}
        >
          {children}
        </main>
      </div>
    </Fragment>
  )
}

export default Layout
