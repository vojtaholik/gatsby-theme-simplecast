/** @jsx jsx */
import { jsx, useThemeUI, Header as ThemedHeader, Box } from "theme-ui"
import Img from "gatsby-image"
import { FaPlay as PlayIcon } from "react-icons/fa"
import VisuallyHidden from "@reach/visually-hidden"

function Header({ context, episode, image }) {
  const themeContext = useThemeUI()
  const { theme } = themeContext
  return (
    <ThemedHeader
      sx={{
        backgroundImage: image
          ? "none"
          : `linear-gradient(224deg, ${theme.colors.primaryLighten50} 0%, ${theme.colors.primaryDarken} 100%)`,
      }}
    >
      {image && <Img alt={episode.title} fluid={image.childImageSharp.fluid} />}
      <Box className="content">
        <button onClick={() => context.setCurrentPlaying(episode)}>
          <VisuallyHidden>Play</VisuallyHidden>
          <PlayIcon aria-hidden="true" />
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
