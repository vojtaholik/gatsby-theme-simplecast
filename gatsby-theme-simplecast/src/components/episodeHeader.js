/** @jsx jsx */
import React from "react"
import { jsx, Header as ThemedHeader, Box } from "theme-ui"
import Img from "gatsby-image"
import { FaPlay as PlayIcon } from "react-icons/fa"

function Header({ context, episode, image }) {
  // a11y: auto focus play button
  const playbtn = React.useRef(null)
  React.useEffect(() => {
    playbtn.current.focus()
  }, [])

  return (
    <ThemedHeader
      sx={{
        backgroundImage: image
          ? "none"
          : "linear-gradient(224deg, #B298FF 0%, #7A5EFF 100%)",
      }}
    >
      {image && <Img fluid={image.childImageSharp.fluid} />}
      <Box className="content">
        <button
          onClick={() => context.setCurrentPlaying(episode)}
          ref={playbtn}
        >
          <PlayIcon />
        </button>
        <div>
          <h1>{episode.title}</h1>
          <h5>EP{episode.number}</h5>
        </div>
      </Box>
    </ThemedHeader>
  )
}

export default Header
