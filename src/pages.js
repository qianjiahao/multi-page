const custom = [
]

const all = [
  // {
  //   origin: 'src/components',
  //   path: '',
  //   name: 'index', // 框架页面
  //   useHtml: true // 使用自定义的html模板页面
  // },
  {
    origin: 'src/components',
    path: '',
    name: 'home' // home页
  },
  {
    origin: 'src/components',
    path: '',
    name: 'demo0', // demo0页
  },
  {
    origin: 'src/components',
    path: '',
    name: 'demo1' // demo1页
  }
]

if (custom.length > 0) {
  exports.pages = custom
} else {
  exports.pages = all
}
