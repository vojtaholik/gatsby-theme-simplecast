/** @jsx jsx */
import PropTypes from "prop-types"
import Navigation from "./navigation"
import "./layout.css"
import { jsx, Layout as Wrapper, Container } from "theme-ui"

function Layout({ children }) {
  return (
    <Wrapper>
      <Container
        sx={{
          p: 0,
          display: "flex",
          flexDirection: ["column", "row"],
          flexGrow: "1",
        }}
      >
        <Navigation eventTypes="click" />
        <main sx={{ width: "100%", ml: [0, 0, 0, 5] }}>{children}</main>
      </Container>
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
