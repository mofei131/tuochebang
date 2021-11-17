// app.js
App({
  onLaunch() {
    wx.setStorageSync('user_id', 1)

    // 获取体系信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间隔（胶囊距上间隔-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuHeight = menuButtonInfo.height;

    // 获取用户地理位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        wx.setStorageSync('lat_lon', res)
      }
    })
    this.globalData.latitude = wx.getStorageSync('lat_lon').latitude;
    this.globalData.longitude = wx.getStorageSync('lat_lon').longitude;
    this.globalData.lat_lon = wx.getStorageSync('lat_lon').longitude + ',' + wx.getStorageSync('lat_lon').latitude


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  globalData: {
    userInfo: null,

    navBarHeight: 0, // 导航栏高度
    menuBotton: 0, // 胶囊距底部间隔（坚持底部间隔共同）
    menuRight: 0, // 胶囊距右方间隔（方坚持左、右间隔共同）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度确保共同）

    latitude: 0,
    longitude: 0,
    lat_lon: 0
  },
})