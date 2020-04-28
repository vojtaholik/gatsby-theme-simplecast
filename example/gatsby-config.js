module.exports = {
  siteMetadata: {
    title: `沙發男孩/Sofa Boys`,
    description: `嘿！在我們的沙發上找個位子吧，泡杯咖啡，聽聽故事。兩位曾經以沙發為家的男孩，分享年少輕狂的創業經驗，或是毫不起眼的人生煩惱。坐穩囉，我們即將帶你來一趟專屬的沙發衝浪！`,
    author: `@sofa-boys`,
  },
  plugins: [
    {
      resolve: '@sofa-boys/gatsby-theme-podcast',
      options: {
        rssUrl: 'https://anchor.fm/s/1e73d5fc/podcast/rss',
      },
    },
  ],
};
