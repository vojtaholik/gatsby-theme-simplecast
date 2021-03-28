/** @jsx jsx */
import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import { jsx, Container } from 'theme-ui';

import { ContextConsumer } from '../Context';
import './layout.css';
import Navigation from './navigation';
import Player from './player';

const Layout = props => {
  const data = useStaticQuery(graphql`
    {
      allEpisode {
        nodes {
          id
          title
          num
          enclosureUrl
        }
      }
    }
  `);

  return (
    <Container
      sx={{
        p: 0,
        display: 'flex',
        flexDirection: ['column', 'row'],
        flexGrow: '1',
        maxWidth: '1200px',
      }}
    >
      <Navigation />
      <main sx={{ width: '100%', ml: [0, 0, 0, 5] }}>{props.children}</main>
      <ContextConsumer>
        {context => (
          <Player
            episode={
              data.allEpisode.nodes.filter(n => n.id === context.currEpId)[0]
            }
            isPlaying={context.isPlaying}
            setIsPlaying={context.setIsPlaying}
          />
        )}
      </ContextConsumer>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
