/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"
import { useThemeUI } from "theme-ui"

const Link = ({ children, to }) => {
  const {
    theme: {
      styles: { a: linkStyles },
    },
  } = useThemeUI()

  return (
    <GatsbyLink to={to} sx={{ ...linkStyles, fontSize: 3 }}>
      {children}
    </GatsbyLink>
  )
}

export default Link
