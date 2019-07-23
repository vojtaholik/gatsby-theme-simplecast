/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Episode from "../templates/episode"

function Index({ data: { allEpisode, allMarkdownRemark } }) {
  const MarkdownForLatestEpisode = allMarkdownRemark.edges.filter(
    Markdown => Markdown.node.frontmatter.id === allEpisode.nodes[0].id
  )
  return (
    <Episode
      data={{
        episode: allEpisode.nodes[0],
        markdownRemark: MarkdownForLatestEpisode[0].node,
      }}
    />
  )
}
export default Index

export const indexQuery = graphql`
  query {
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
          html
          frontmatter {
            id
            title
            slug
            resources
            guestSummary
            guestName
            guestPhoto {
              childImageSharp {
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image {
              childImageSharp {
                original {
                  src
                }
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
