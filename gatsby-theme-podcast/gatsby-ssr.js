import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { ThemeProvider, Styled } from 'theme-ui';

import { ContextProvider } from './src/Context';
import theme from './src/gatsby-plugin-theme-ui';
import Layout from './src/components/layout';

export const wrapPageElement = ({ element }) => (
  <Styled.root>
    <Layout>{element}</Layout>
  </Styled.root>
);

export const wrapRootElement = ({ element }, options) => (
  <StaticQuery
    query={graphql`
      {
        allEpisode {
          nodes {
            id
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <ContextProvider
          spotifyUrl={options.spotifyUrl}
          applePodcastsUrl={options.applePodcastsUrl}
          googlePodcastsUrl={options.googlePodcastsUrl}
          disqusShortName={options.disqusShortName}
          defaultEpId={data.allEpisode.nodes[0].id}
        >
          {element}
        </ContextProvider>
      </ThemeProvider>
    )}
  />
);
