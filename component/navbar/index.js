const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight, //导航栏高度
    menuRight: app.globalData.menuRight, // 胶囊距右方间隔（方坚持左、右间隔共同）
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})