/** @jsx jsx */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { jsx, Flex } from "theme-ui"
import { EpisodeConsumer } from "./context"
import { FaPlay as PlayIcon } from "react-icons/fa"
import { MdMenu as MenuIcon, MdClose as CloseMenuIcon } from "react-icons/md"
import onClickOutside from "react-onclickoutside"
import config from "../lib/config"
import Link from "./link"
import Bars from "./bars"

function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  Navigation.handleClickOutside = () => setIsOpen(false)
  const twoDigits = n => (n.toString().length < 2 ? `0${n}` : n)

  const Logo = () => (
    <>
      <Link to="/">
        <h1 sx={{ fontSize: 6, color: "primary", mb: 0 }}>
          {data.site.siteMetadata.title
            ? data.site.siteMetadata.title
            : "Podcast Name"}
        </h1>
      </Link>
      {config.podcastSeason && (
        <h5
          sx={{
            textTransform: "uppercase",
            mt: 2,
            mb: 0,
            fontWeight: 400,
            fontSize: 0,
            opacity: 0.6,
          }}
        >
          season {twoDigits(config.podcastSeason)}
        </h5>
      )}
    </>
  )

  const data = useStaticQuery(graphql`
    query navQuery {
      site {
        siteMetadata {
          title
        }
      }
      allEpisode {
        totalCount
        nodes {
          id
          title
          description
          number
          enclosure_url
          fields {
            slug
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              id
              summary
            }
          }
        }
      }
    }
  `)
  return (
    <EpisodeConsumer>
      {context => (
        <>
          <Flex
            sx={{
              variant: "header.logo.container",
            }}
          >
            <Flex
              sx={{
                variant: "header.logo",
              }}
            >
              <Logo />
            </Flex>
            <button
              sx={{
                position: "relative",
                zIndex: 998,
                display: "flex",
                p: 3,
                backgroundColor: "background",
                color: "text",
                borderColor: "backgroundLighten20",
                fontSize: 5,
              }}
              onClick={toggleMenu}
              aria-controls="menu"
              aria-haspopup="true"
              aria-expanded={isOpen ? "true" : "false"}
            >
              {isOpen ? <CloseMenuIcon /> : <MenuIcon />}
            </button>
          </Flex>
          <nav
            className="episodes_list"
            sx={{
              variant: "navigation.episodes",
              transform: [`translateX(${isOpen ? "0" : "-100%"})`, "none"],
              transition: "300ms cubic-bezier(1, 0, 0, 1)",
            }}
          >
            <div sx={{ ml: 6, pb: 4 }}>
              <Logo />
            </div>
            <ul id="menu" role="menu" sx={{ pb: 14 }}>
              {data.allEpisode.nodes.map(episode => (
                <li role="none" key={episode.id}>
                  {episode.id === context.state.id && <Bars />}
                  <Link
                    role="menuitem"
                    activeClassName="active"
                    to={episode.fields.slug}
                  >
                    <h4>{episode.title}</h4>
                    {data.allMarkdownRemark.edges.map(({ node: markdown }) => {
                      if (markdown.frontmatter.id === episode.id)
                        return (
                          markdown.frontmatter.summary && (
                            <p key={markdown.id} className="summary">
                              {markdown.frontmatter.summary}
                            </p>
                          )
                        )
                      else return null
                    })}
                  </Link>
                  {episode.id !== context.state.id && (
                    <button
                      tabIndex="-1"
                      onClick={() => context.setCurrentPlaying(episode)}
                    >
                      <PlayIcon aria-hidden="true" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </EpisodeConsumer>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => Navigation.handleClickOutside,
}

export default onClickOutside(Navigation, clickOutsideConfig)
