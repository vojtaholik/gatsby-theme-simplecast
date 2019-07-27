# Gatsby Theme Simplecast

Gatsby theme that sources data from Simplecast API which can be combined with Markdown files to associate more information to each episode. Inspired by [syntax.fm](http://syntax.fm).

[→ Preview Theme](https://gatsby-theme-simplecast.netlify.com)

## Installation
To use this theme in your Gatsby sites, follow these instructions:

1. Install the theme
   ```  
   yarn add @vojtaholik/gatsby-theme-simplecast
   ```
2. Add the theme to your `gatsby-config.js`:
  ```
  module.exports = {
  plugins: [
    {
      resolve: '@vojtaholik/gatsby-theme-simplecast',
      options: {
        podcastId: PODCAST_ID, // theme uses mockup data if no podcastId provided
        simplecastApiSecret: SIMPLECAST_API_SECRET, 
        markdownPath: 'content/episodes',
      },
    },
  ],
}
  ```
Plugin options
   - `simplecastApiSecret`: Grab [your Simplecast API token here](https://dashboard.simplecast.com/account/private-apps).
   - `podcastId`: Podcast ID can be found in your Simplecast account under embeds settings.
   - `markdownPath`: Path to your markdown files. For markdown file to show up, it's `frontmatter.id` must match `episode.id`.
   - `episodeSlug`: default "show". (`/show/05/episode-title`)

3. Create index page in `src/pages/index.js` 
   - You can use [this example](https://github.com/vojtaholik/gatsby-theme-simplecast/blob/master/demo/src/pages/index.js) which displays latest episode by default.

4. Start your site
   ```
   gatsby develop
   ```
