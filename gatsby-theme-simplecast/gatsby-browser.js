import React from "react"
import Layout from "./src/components/layout"
import Player from "./src/components/player"
import { EpisodeProvider, EpisodeConsumer } from "./src/components/context"
import { ThemeProvider, Styled } from "theme-ui"
import theme from "./src/gatsby-plugin-theme-ui/index"
import { SkipNavLink } from "@reach/skip-nav"

export const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider theme={theme}>
      <EpisodeProvider>
        <Styled.root>
          <SkipNavLink />
          <Layout {...props}>
            <EpisodeConsumer>
              {context => <Player episode={context.state} />}
            </EpisodeConsumer>
            {element}
          </Layout>
        </Styled.root>
      </EpisodeProvider>
    </ThemeProvider>
  )
}
