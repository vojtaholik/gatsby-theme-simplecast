/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { EpisodeConsumer } from "../components/context"
import Header from "../components/header"
import Aside from "../components/aside"
import { SkipNavContent } from "@reach/skip-nav"

function EpisodeTemplate({ data: { episode, markdownRemark } }) {
  const image = markdownRemark && markdownRemark.frontmatter.image
  const markdown = markdownRemark && markdownRemark

  return (
    <EpisodeConsumer>
      {context => (
        <div>
          <div
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
            }}
          >
            <SkipNavContent sx={{ width: "100%" }}>
              <div sx={{ maxWidth: ["100%", 710] }}>
                <Header context={context} episode={episode} image={image} />
                <article>
                  <p>{episode.description && episode.description}</p>
                  {markdown && (
                    <div dangerouslySetInnerHTML={{ __html: markdown.html }} />
                  )}
                </article>
              </div>
            </SkipNavContent>
            <Aside markdown={markdown} />
          </div>
        </div>
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
