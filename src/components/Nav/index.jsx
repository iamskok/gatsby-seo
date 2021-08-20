/** @jsx jsx */
import { jsx } from "theme-ui"
import Link from "../Link"
import useSiteMetadata from "../../hooks/useSiteMetadata"
import slashify from "../../helpers/slashify"

const Nav = () => {
  const {
    pages: {
      home: { pathName: homePathName },
      blog: { pathName: blogPathName },
      contact: { pathName: contactPathName },
      about: { pathName: aboutPathName },
    },
  } = useSiteMetadata()

  return (
    <ul
      sx={{
        listStyle: `none`,
        display: `flex`,
        justifyContent: `space-between`,
        padding: 0,
        marginBottom: 4,
      }}
    >
      <li>
        <Link to={slashify(homePathName)}>Home</Link>
      </li>
      <li>
        <Link to={slashify(blogPathName)}>Blog</Link>
      </li>
      <li>
        <Link to={slashify(contactPathName)}>Contact</Link>
      </li>
      <li>
        <Link to={slashify(aboutPathName)}>About</Link>
      </li>
    </ul>
  )
}

export default Nav
