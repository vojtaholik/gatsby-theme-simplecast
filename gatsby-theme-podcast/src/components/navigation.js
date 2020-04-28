/** @jsx jsx */
import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { jsx, Flex } from 'theme-ui';
import { FaPlay, FaPause } from 'react-icons/fa';
import { MdMenu as MenuIcon, MdClose as CloseMenuIcon } from 'react-icons/md';

import { ContextConsumer } from '../Context';
import Link from './link';
import Bars from './bars';

function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allEpisode {
        nodes {
          id
          title
          num
        }
      }
    }
  `);

  const Logo = () => (
    <Link to="/">
      <h1 sx={{ fontSize: 6, color: 'primary', mb: 0 }}>
        {data.site.siteMetadata.title}
      </h1>
    </Link>
  );

  return (
    <ContextConsumer>
      {context => (
        <>
          <Flex
            sx={{
              variant: 'nav.logo.container',
            }}
          >
            <Flex
              sx={{
                variant: 'nav.logo',
              }}
            >
              <Logo />
            </Flex>
            <button
              sx={{
                position: 'relative',
                zIndex: 998,
                display: 'flex',
                p: 3,
                backgroundColor: 'background',
                color: 'text',
                borderColor: 'backgroundLighten20',
                fontSize: 5,
              }}
              onClick={toggleMenu}
              aria-controls="menu"
              aria-haspopup="true"
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              {isOpen ? <CloseMenuIcon /> : <MenuIcon />}
            </button>
          </Flex>
          <nav
            className="episodes_list"
            sx={{
              transform: [`translateX(${isOpen ? '0' : '-100%'})`, 'none'],
              transition: '300ms cubic-bezier(1, 0, 0, 1)',
            }}
          >
            <div sx={{ ml: 6, pb: 4 }}>
              <Logo />
            </div>
            <ul id="menu" role="menu" sx={{ pb: 14 }}>
              {data.allEpisode.nodes.map(episode => (
                <li role="none" key={episode.id}>
                  {episode.id === context.currEpId && <Bars />}
                  <Link
                    role="menuitem"
                    activeClassName="active"
                    to={`/episodes/${episode.num}`}
                  >
                    <h4>{episode.title}</h4>
                    {/* <div */}
                    {/*   dangerouslySetInnerHTML={{ */}
                    {/*     __html: episode.descriptionHtml, */}
                    {/*   }} */}
                    {/* /> */}
                  </Link>
                  <button
                    tabIndex="-1"
                    onClick={() => {
                      context.setCurrEpId(episode.id);
                      context.setIsPlaying(!context.isPlaying);
                    }}
                  >
                    {episode.id === context.currEpId && context.isPlaying ? (
                      <FaPause />
                    ) : (
                      <FaPlay />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </ContextConsumer>
  );
}

export default Navigation;
