# Gatsby Theme Podcast

## Usage

1. Install the theme

   ```
   npm install --save @sofa-boys/gatsby-theme-podcast
   ```

1. Add the theme to your `gatsby-config.js`:

   ```
   module.exports = {
     plugins: [
       {
         resolve: '@vojtaholik/gatsby-theme-simplecast',
         options: {
           rssUrl: PODCAST_RSS_URL,
         },
       },
     ],
   }
   ```

1. Start your site

   ```
   gatsby develop
   ```

1. Customize

   See [Shadowing in Gatsby Themes](https://www.gatsbyjs.org/docs/themes/shadowing/) for details.
