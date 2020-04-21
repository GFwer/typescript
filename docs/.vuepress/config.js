module.exports = {
  title: 'Fawen',
  description: 'TS 学习笔记系列',
  // theme: 'vuetify',
  locales: {
    '/': {
      lang: 'zh-cn'
    }
  },
  themeConfig: {
    smoothScroll: true,
    nav: [
      {
        text: 'Blog',
        link: 'https://blog.gongfangwen.com'
      }
    ],
    // sidebar: {
    //   '/types/': ['', 'start', 'interface', 'function', 'generics', 'enums']
    // }
    sidebar: [{
      title: '开始',
      collapsable: false,
      children: ['/types/']
    }, {
      title: '类型系统',
      collapsable: false,
      children: ['/types/start', '/types/interface', '/types/function', '/types/generics', '/types/enums', '/types/unions and intersection types']
    }, {
      title: '进阶类型',
      collapsable: false,
      children: ['/advanced/', '/advanced/declaration merging', '/advanced/decorators']
    }]
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'icon', href: './favicon.ico', type: "image/x-icon" }],
    ['meta', { name: 'theme-color', content: '#0074c1' }],
  ],
  smoothScroll: true,

  plugins: ['@vuepress/back-to-top', '@vuepress/active-header-links', '@vuepress/last-updated', '@vuepress/medium-zoom', '@vuepress/nprogress', [
    '@vuepress/google-analytics',
    {
      'ga': 'UA-76012728-3'
    }
  ]]
}