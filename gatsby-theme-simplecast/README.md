# Gatsby Theme Simplecast

## Usage

1. You'll need a Gatsby site — `gatsby new gatsby-site`
2. Install theme — `yarn add @vojtaholik/gatsby-theme-simplecast`
3. Require theme in `gatsby-config.js`:  
```js
//gatsby-config.js

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
- Grab [your Simplecast API token here](https://dashboard.simplecast.com/account/private-apps).
- Podcast ID can be found in your Simplecast account under embeds settings.


## Create `index.js` page
- copy paste from [this demo](https://github.com/vojtaholik/gatsby-theme-simplecast/blob/master/demo/src/pages/index.js)



## Using markdown to provide episode details
- `frontmatter.id` has to match episode id to show up. 

```js
// content/episodes/1/index.md

---
// required
id: '123' // has to match episode id
// not required
title: 'Podcast episode 1'
slug: 'podcast-episode-1'
summary: 'Summary. Lorem ipsum dolor sit amet.'
number: 1
resources: ['[Link](/)','[Link](/)','[Link](/)']
guestName: 'Guest Name'
guestSummary: 'Guest bio - [Twitter](/)'
guestPhoto: 'guest-name.png'
image: './banner.png'
---

Markdown description...
```



## Customizing styles

To customize styles, shadow a theme object by creating `src/gatsby-plugin-theme-ui/index.js` with following code:
```js
export default {
    colors: {
        primary: 'rebeccapurple'
    }
    // your styles
}
```

