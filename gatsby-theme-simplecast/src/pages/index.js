/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import Episode from "../templates/episode"

export default function Index({ data: { allEpisode, allMarkdownRemark } }) {
  const MarkdownForLatestEpisode = allMarkdownRemark.edges.filter(
    Markdown => Markdown.node.frontmatter.id === allEpisode.nodes[0].id
  )

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
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              id
              title
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
  `)
  return (
    <Episode
      data={{
        episode: data.allEpisode.nodes[0],
        markdownRemark:
          MarkdownForLatestEpisode[0] && MarkdownForLatestEpisode[0].node,
      }}
    />
  )
}
