/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import Img from "gatsby-image"
import { FaExternalLinkAlt as ExternalLinkIcon } from "react-icons/fa"
import Link from "./link"
import Markdown from "react-markdown"
import itunesIcon from "../images/apple.svg"
import spotifyImage from "../images/spotify.png"

function Aside({ markdown }) {
  return (
    <aside
      sx={{
        display: "flex",
        flexDirection: ["row", "column"],
        p: [5, 8],
        pb: [13, 8],
        width: "100%",
        maxWidth: ["100%", 250],
        fontSize: "15px",
        h5: { mt: 4, mb: 3, fontSize: 3 },
        "h5:not(:first-of-type)": { mb: 10, mt: 0 },
      }}
    >
      <div
        sx={{
          mb: 9,
          pr: [10, 0],
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
                  fluid={markdown.frontmatter.guestPhoto.childImageSharp.fluid}
                />
              )}
              <h4 sx={{ mt: 3, mb: 1 }}>{markdown.frontmatter.guestName}</h4>
              <Markdown>{markdown.frontmatter.guestSummary}</Markdown>
            </div>
          )}
        </>
      )}
      {markdown && markdown.frontmatter.resources && (
        <>
          <h5>Resources</h5>
          <ul>
            {markdown.frontmatter.resources.map((resource, i) => (
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
  )
}

export default Aside
