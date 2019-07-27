import React from "react"
import Layout from "./src/components/layout"
import Player from "./src/components/player"
import { EpisodeProvider, EpisodeConsumer } from "./src/components/context"
import { ThemeProvider, Styled } from "theme-ui"
import theme from "./src/gatsby-plugin-theme-ui/index"
import { SkipNavLink } from "@reach/skip-nav"

export const wrapPageElement = ({ element, props }, options) => {
  const episodeSlug = options.episodeSlug ? options.episodeSlug : "show"
  return (
    <ThemeProvider theme={theme}>
      <EpisodeProvider>
        <Styled.root>
          <SkipNavLink />
          <Layout {...props}>
            {props.location.pathname.includes(episodeSlug) ||
            props.location.pathname === "/" ? (
              <EpisodeConsumer>
                {context => <Player episode={context.state} />}
              </EpisodeConsumer>
            ) : null}
            {element}
          </Layout>
        </Styled.root>
      </EpisodeProvider>
    </ThemeProvider>
  )
}
