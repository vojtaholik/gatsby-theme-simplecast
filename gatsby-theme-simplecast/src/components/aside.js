/** @jsx jsx */
import { jsx } from "theme-ui"
import Img from "gatsby-image"
import { FaExternalLinkAlt as ExternalLinkIcon } from "react-icons/fa"
import config from "../lib/config"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import Link from "./link"
import Markdown from "react-markdown"
import itunesIcon from "../images/apple.svg"
import spotifyImage from "../images/spotify.png"
import googleImage from "../images/google.svg"

const PodcastProvider = styled(Link)(
  css({
    mb: 5,
    display: "flex",
    alignItems: "center",
    img: { m: 0, mr: 3 },
  })
)

function Aside({ markdown }) {
  return (
    <aside className="sidebar">
      <div
        sx={{
          mb: 2,
          pr: [10, 0],
          a: { color: "text", textDecoration: "none" },
        }}
      >
        {config.spotifyUrl && (
          <PodcastProvider to={config.spotifyUrl}>
            <img src={spotifyImage} alt="Spotify logo" width="90" />
          </PodcastProvider>
        )}
        {config.applePodcastsUrl && (
          <PodcastProvider to={config.applePodcastsUrl}>
            <img src={itunesIcon} alt="Apple Podcasts" />
          </PodcastProvider>
        )}
        {config.googlePodcastsUrl && (
          <PodcastProvider to={config.googlePodcastsUrl}>
            <img src={googleImage} alt="Google Podcasts" />
          </PodcastProvider>
        )}
      </div>
      {markdown && (
        <div>
          {markdown.frontmatter.guestName && (
            <div
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h5 className="guest">Guest</h5>
              {markdown.frontmatter.guestPhoto && (
                <Img
                  sx={{
                    borderRadius: 0,
                    width: "100%",
                    maxWidth: 100,
                  }}
                  fluid={markdown.frontmatter.guestPhoto.childImageSharp.fluid}
                  alt={markdown.frontmatter.guestName}
                />
              )}
              <h4 sx={{ mt: 3, mb: 1 }}>{markdown.frontmatter.guestName}</h4>
              <Markdown>{markdown.frontmatter.guestSummary}</Markdown>
            </div>
          )}
        </div>
      )}
      {markdown && markdown.frontmatter.resources && (
        <div>
          <h5>Resources</h5>
          <ul>
            {markdown.frontmatter.resources.map((resource, i) => (
              <li key={i}>
                <ExternalLinkIcon />
                <Markdown>{resource}</Markdown>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}

export default Aside
