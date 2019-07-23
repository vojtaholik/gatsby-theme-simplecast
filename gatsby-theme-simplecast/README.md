# Gatsby Theme Simplecast

## Usage

1. You'll need a Gatsby site — `gatsby new gatsby-site`
2. Install theme — `yarn add @vojtaholik/gatsby-theme-simplecast`
3. Require theme in `gatsby-config.js`:  
```js
//gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-theme-ui`,
    {
      resolve: 'gatsby-theme-simplecast',
      options: {
        //podcastId: PODCAST_ID, // will use mockup data if no podcastId provided
        simplecastApiSecret: SIMPLECAST_API_SECRET, 
        markdownPath: 'content/episodes',
      },
    },
  ],
}
```
- Grab [your Simplecast API token here](https://dashboard.simplecast.com/account/private-apps).
- Podcast ID can be found in your Simplecast account under embeds settings.



options: 

| Options    |  Default      |   |
|------------|:-------------:|------:|
| staticData |  false         | if set to true, takes data from `data/episodes.json`. if false, fetches data from simplecast api - you need to provide `SIMPLECAST_API_SECRET` and `PODCAST_ID` in `.env` fiels (`.env.development` and `.env.production`)  |
| markdownPath   | `gatsby-theme-simplecast/content/episodes`| path to markdown files |


## Using markdown to provide details about episodes

`content/episodes/1/index.md`:
```js
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

Episode description
```

## Creating `index.js`
todo: write about index code that gets latest episode


## Customizing theme styles

To customize styles, shadow a theme object by creating `src/gatsby-plugin-theme-ui/index.js` with following code:
```js
export default {
    colors: {
        primary: 'rebeccapurple'
    }
    // your styles
}
```

