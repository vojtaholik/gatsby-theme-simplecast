import React, { Component } from "react"
import { graphql, useStaticQuery } from "gatsby"

const EpisodeContext = React.createContext()

export function EpisodeProvider(props) {
  const data = useStaticQuery(graphql`
    {
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
    }
  `)

  const [currentPlaying, setCurrentPlaying] = React.useState(
    data.allEpisode.nodes[0]
  )

  return (
    <EpisodeContext.Provider
      value={{
        state: currentPlaying,
        setCurrentPlaying,
      }}
      {...props}
    />
  )
}

export class EpisodeConsumer extends Component {
  render() {
    return (
      <EpisodeContext.Consumer>{this.props.children}</EpisodeContext.Consumer>
    )
  }
}
