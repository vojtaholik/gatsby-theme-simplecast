module.exports = ({ markdownPath = `${__dirname}/content/episodes` }) => ({
  siteMetadata: {
    title: `Podcast Name`,
    description: `Podcast description.`,
    author: `@vojtaholik`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: markdownPath,
        name: `episodes`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-theme-simplecast`,
        short_name: `simplecast`,
        start_url: `/`,
        background_color: `#A085FF`,
        theme_color: `#A085FF`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
})
