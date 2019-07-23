/** @jsx jsx */
import { useStaticQuery, graphql } from "gatsby"
import { jsx } from "theme-ui"
import Link from "./link"
import { EpisodeConsumer } from "./context"
import Bars from "./bars"
import { FaPlay as PlayIcon } from "react-icons/fa"

function List() {
  const data = useStaticQuery(graphql`
    query listQuery {
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
        <nav>
          <div sx={{ ml: 6, pb: 4 }}>
            <Link to="/">
              <h1 sx={{ fontSize: 6, color: "primary", mb: 0 }}>
                Podcast Name
              </h1>
            </Link>
            <h5>season 01</h5>
          </div>
          <ul role="menu" sx={{ pb: 14 }}>
            {data.allEpisode.nodes.map(episode => (
              <li role="none" key={episode.id}>
                {episode.id === context.state.id && <Bars />}
                <Link
                  role="menuitem"
                  activeClassName="active"
                  to={`/show/${episode.number}/${episode.fields.slug}`}
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
                    <PlayIcon />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </EpisodeConsumer>
  )
}

export default List
