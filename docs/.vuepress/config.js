module.exports = {
  title: 'Fawen',
  description: 'TS 学习笔记系列',
  // theme: 'vuetify',
  themeConfig: {
    smoothScroll: true,
    nav: [
      {
        text: 'Blog',
        link: 'https://blog.gongfangwen.com'
      }
    ],
    sidebar: {
      '/guide/': ['', 'start', 'interface', 'function', 'literal']
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'icon', href: './favicon.ico', type: "image/x-icon" }],
    ['meta', { name: 'theme-color', content: '#0074c1' }],
  ],
  smoothScroll: true,

  plugins: ['@vuepress/back-to-top', '@vuepress/active-header-links', '@vuepress/last-updated', '@vuepress/medium-zoom', '@vuepress/nprogress']
}