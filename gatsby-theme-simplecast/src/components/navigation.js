/** @jsx jsx */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { jsx, Flex } from "theme-ui"
import { EpisodeConsumer } from "./context"
import { FaPlay as PlayIcon } from "react-icons/fa"
import { MdMenu as MenuIcon, MdClose as CloseMenuIcon } from "react-icons/md"
import Link from "./link"
import Bars from "./bars"
import onClickOutside from "react-onclickoutside"

function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  Navigation.handleClickOutside = () => setIsOpen(false)

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
              p: 3,
              display: ["flex", "none"],
              visibility: ["visible", "hidden"],
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Flex
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                a: { textDecoration: "none" },
              }}
            >
              <Link to="/">
                <h1
                  className="logo"
                  sx={{ fontSize: 6, color: "primary", mb: 0 }}
                >
                  {data.site.siteMetadata.title
                    ? data.site.siteMetadata.title
                    : "Podcast Name"}
                </h1>
              </Link>
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
                season 01
              </h5>
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
            sx={{
              transform: [`translateX(${isOpen ? "0" : "-100%"})`, "none"],
              transition: "300ms cubic-bezier(1, 0, 0, 1)",
            }}
          >
            <div sx={{ ml: 6, pb: 4 }}>
              <Link to="/">
                <h1
                  className="logo"
                  sx={{ fontSize: 6, color: "primary", mb: 0 }}
                >
                  {data.site.siteMetadata.title
                    ? data.site.siteMetadata.title
                    : "Podcast Name"}
                </h1>
              </Link>
              <h5
                sx={{
                  textTransform: "uppercase",
                  mt: 2,
                  fontWeight: 400,
                  fontSize: 0,
                  opacity: 0.6,
                }}
              >
                season 01
              </h5>
            </div>
            <ul id="menu" role="menu" sx={{ pb: 14 }}>
              {data.allEpisode.nodes.map(episode => (
                <li role="none" key={episode.id}>
                  {episode.id === context.state.id && <Bars />}
                  <Link
                    role="menuitem"
                    activeClassName="active"
                    //to={`/show/${episode.number}/${episode.fields.slug}`}
                    to={episode.fields.slug}
                  >
                    <h4>{episode.title}</h4>
                    {data.allMarkdownRemark.edges.map(({ node: markdown }) => {
                      if (markdown.frontmatter.id === episode.id)
                        return (
                          <p key={markdown.id} className="summary">
                            {markdown.frontmatter.summary}
                          </p>
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
