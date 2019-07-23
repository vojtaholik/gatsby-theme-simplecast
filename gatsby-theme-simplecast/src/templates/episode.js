/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { EpisodeConsumer } from "../components/context"
import { FaExternalLinkAlt as ExternalLinkIcon } from "react-icons/fa"
import Link from "../components/link"
import Markdown from "react-markdown"
import itunesIcon from "../images/apple.svg"
import spotifyImage from "../images/spotify.png"
import Header from "../components/episodeHeader"
import Aside from "../components/aside"

function EpisodeTemplate({ data: { episode, markdownRemark } }) {
  const image = markdownRemark && markdownRemark.frontmatter.image
  const markdown = markdownRemark && markdownRemark

  return (
    <EpisodeConsumer>
      {context => (
        <>
          <div
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
            }}
          >
            <div sx={{ maxWidth: ["100%", 710], width: "100%" }}>
              <Header context={context} episode={episode} image={image} />
              <article>
                <p>{episode.description && episode.description}</p>
                {markdown && (
                  <div dangerouslySetInnerHTML={{ __html: markdown.html }} />
                )}
              </article>
            </div>
            <Aside markdown={markdown} />
          </div>
        </>
      )}
    </EpisodeConsumer>
  )
}

export default EpisodeTemplate

export const episodeQuery = graphql`
  query($id: String!) {
    episode(id: { eq: $id }) {
      id
      title
      description
      number
      enclosure_url
      fields {
        slug
      }
    }
    markdownRemark(frontmatter: { id: { eq: $id } }) {
      html
      frontmatter {
        id
        title
        resources
        slug
        guestName
        guestSummary
        guestPhoto {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`
