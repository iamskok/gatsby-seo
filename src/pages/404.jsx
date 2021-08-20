/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import Layout from "../components/Layout"

/* eslint-disable react/jsx-pascal-case */
const PageNotFound = () => (
  <Layout>
    <Themed.h1>
      4
      <span role="img" aria-label="dog emoji">
        🐶
      </span>
      4
    </Themed.h1>
    <Themed.h2>Woof!</Themed.h2>
  </Layout>
)
/* eslint-enable react/jsx-pascal-case */

export default PageNotFound
