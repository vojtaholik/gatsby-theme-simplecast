import React from "react"
import Layout from "./src/components/layout"
import Player from "./src/components/player"
import { EpisodeProvider, EpisodeConsumer } from "./src/components/context"
import { ThemeProvider, Styled } from "theme-ui"
import theme from "./src/gatsby-plugin-theme-ui/index"

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <ThemeProvider theme={theme}>
      <EpisodeProvider>
        <Styled.root>
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
