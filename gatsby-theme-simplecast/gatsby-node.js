require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const axios = require("axios")
const crypto = require("crypto")
const path = require("path")
const slugify = require("@sindresorhus/slugify")

exports.sourceNodes = async (
  { actions: { createNode, createNodeField }, plugins },
  options
) => {
  axios.defaults.headers.common.Authorization = `Bearer ${options.simplecastApiSecret}`
  axios.defaults.headers.common.Accept = "application/json"

  const mockupEpisodes = require("./data/mockupEpisodes.json")

  const { data } = options.podcastId
    ? await axios(
        `https://api.simplecast.com/podcasts/${options.podcastId}/episodes`
      )
    : mockupEpisodes

  const packagePodcast = p => {
    const nodeContent = JSON.stringify(p)
    const nodeContentDigest = crypto
      .createHash("md5")
      .update(nodeContent)
      .digest("hex")
    const node = {
      ...p,
      content: nodeContent,
      internal: {
        type: "Episode",
        contentDigest: nodeContentDigest,
      },
    }

    createNode(node)
  }

  // fallback to mockup data if no podcast id provided

  options.podcastId
    ? data.collection.map(packagePodcast)
    : mockupEpisodes.collection.map(packagePodcast)
}

exports.createPages = async ({ actions, graphql }, options) => {
  const { data } = await graphql(`
    {
      site {
        siteMetadata {
          title
        }
      }
      allEpisode {
        edges {
          node {
            id
            title
            number
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            id
            html
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  data.allEpisode.edges.forEach(({ node }, options) => {
    actions.createPage({
      path: `${options.episodeSlug ? options.episodeSlug : "show"}/${
        node.number
      }/${slugify(node.title)}`,
      component: require.resolve(`./src/templates/episode.js`),
      context: {
        slug: slugify(node.title),
        id: node.id,
        title: node.title,
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }, options) => {
  const { createNodeField } = actions
  const showsSlug = options.episodeSlug ? options.episodeSlug : "show"
  createNodeField({
    name: "slug",
    node,
    value: "/" + showsSlug + "/" + node.number + "/" + slugify(`${node.title}`),
  })
}
