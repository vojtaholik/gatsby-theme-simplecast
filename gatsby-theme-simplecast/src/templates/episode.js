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

function EpisodeTemplate({ data: { episode, markdownRemark } }) {
  const image = markdownRemark && markdownRemark.frontmatter.image
  const markdown = markdownRemark && markdownRemark

  return (
    <EpisodeConsumer>
      {context => (
        <>
          <div sx={{ display: "flex" }}>
            <div sx={{ maxWidth: 710, width: "100%" }}>
              <Header context={context} episode={episode} image={image} />
              <article
                sx={{
                  p: 8,
                  pb: 14,
                  borderLeft: "2px solid",
                  borderRight: "2px solid",
                  borderColor: "background-lighten-10",
                }}
              >
                <p>{episode.description && episode.description}</p>
                {markdown && (
                  <div dangerouslySetInnerHTML={{ __html: markdown.html }} />
                )}
              </article>
            </div>
            <aside
              sx={{
                p: 8,
                width: "100%",
                maxWidth: 250,
                fontSize: "15px",
                h5: { mt: 4, mb: 3, fontSize: 3 },
                "h5:not(:first-of-type)": { mb: 10, mt: 0 },
              }}
            >
              <div
                sx={{
                  mb: 9,
                  a: { color: "text", textDecoration: "none" },
                }}
              >
                <Link
                  sx={{
                    mb: 5,
                    display: "flex",
                    alignItems: "center",
                    img: { m: 0, mr: 3 },
                  }}
                  to="/"
                >
                  <img src={spotifyImage} width="90" />
                </Link>
                <Link
                  sx={{
                    mb: 5,
                    display: "flex",
                    alignItems: "center",
                    img: { m: 0, mr: 2 },
                  }}
                  to="/"
                >
                  <img src={itunesIcon} />
                  Apple Podcasts
                </Link>
              </div>
              {/* TODO: Separate into a component/s */}
              {markdown && (
                <>
                  {markdown.frontmatter.guestName && (
                    <div
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h5>Guest</h5>
                      {markdown.frontmatter.guestPhoto && (
                        <Img
                          sx={{
                            borderRadius: 1,
                            width: "100%",
                            maxWidth: 100,
                          }}
                          fluid={
                            markdown.frontmatter.guestPhoto.childImageSharp
                              .fluid
                          }
                        />
                      )}
                      <h4 sx={{ mt: 3, mb: 1 }}>
                        {markdown.frontmatter.guestName}
                      </h4>
                      <Markdown>{markdown.frontmatter.guestSummary}</Markdown>
                    </div>
                  )}
                </>
              )}
              {markdown && markdown.frontmatter.resources && (
                <>
                  <h5>Resources</h5>
                  <ul>
                    {markdownRemark.frontmatter.resources.map((resource, i) => (
                      <li
                        key={i}
                        sx={{
                          display: "flex",
                          a: { color: "text" },
                          svg: {
                            mt: 1,
                            mr: 1,
                            width: "100%",
                            maxWidth: 3,
                            color: "text",
                            opacity: 0.5,
                          },
                        }}
                      >
                        <ExternalLinkIcon />
                        <Markdown>{resource}</Markdown>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </aside>
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
