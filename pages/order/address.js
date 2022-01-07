var amapFile = require('../../libs/amap-wx.130.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    // latitude: app.globalData.latitude,
    // longitude: app.globalData.longitude,
    latitude:wx.getStorageSync('lat_lon').latitude,
    longitude: wx.getStorageSync('lat_lon').longitude,
    markers: [{
      iconPath: "../../image/add_qi.png",
      id: 0,
      // latitude: app.globalData.latitude,
      // longitude: app.globalData.longitude,
      latitude:wx.getStorageSync('lat_lon').latitude,
      longitude: wx.getStorageSync('lat_lon').longitude,
      // lat_lon: app.globalData.lat_lon,
      lat_lon:wx.getStorageSync('lat_lon').longitude + ',' + wx.getStorageSync('lat_lon').latitude,
      width: 23,
      height: 33
    }, {
      iconPath: "../../image/add_qidian.png",
      id: 1,
      // latitude: app.globalData.latitude,
      // longitude: app.globalData.longitude,
      latitude:wx.getStorageSync('lat_lon').latitude,
      longitude: wx.getStorageSync('lat_lon').longitude,
      lat_lon:wx.getStorageSync('lat_lon').longitude + ',' + wx.getStorageSync('lat_lon').latitude,
      // lat_lon: app.globalData.lat_lon,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: [],

    tips: {},
    tips_info: {},
    tips_index: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    this.map()
  },

  map() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: 'f9ecff0235b1c6a0415bb2cd7123a86f'
    });
    myAmapFun.getDrivingRoute({
      origin: this.data.markers[0].lat_lon,
      destination: this.data.markers[1].lat_lon,
      success: function (data) {
        wx.setStorageSync('order_luxian_info', data)
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        wx.setStorageSync('points', points)
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
      },
      fail: function (info) {}
    })
  },

  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    // var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({
      key: 'f9ecff0235b1c6a0415bb2cd7123a86f'
    });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '',
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },
  bindSearch: function (e) {
    console.log(e)
    var lat_lon = e.currentTarget.dataset.keywords.location.split(",")
    var markers = this.data.markers
    if (this.data.type == 0) {
      markers[0].latitude = lat_lon[1]
      markers[0].longitude = lat_lon[0]
      markers[0].lat_lon = e.currentTarget.dataset.keywords.location
    } else if (this.data.type == 1) {
      markers[1].latitude = lat_lon[1]
      markers[1].longitude = lat_lon[0]
      markers[1].lat_lon = e.currentTarget.dataset.keywords.location
    }
    this.setData({
      tips_info: e.currentTarget.dataset.keywords,
      tips_index: e.currentTarget.dataset.index,
      markers: markers
    })
    this.map()
  },

  sub_address() {
    if (this.data.type == 0) {
      wx.setStorageSync('start_card', this.data.tips_info)
    } else if (this.data.type == 1) {
      wx.setStorageSync('end_card', this.data.tips_info)
    }
    wx.navigateBack({
      delta: -1,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      }
    })
    var markers = this.data.markers
    if (wx.getStorageSync('start_card')) {
      var s_coordinate = wx.getStorageSync('start_card')
      var s_coordinate2 = s_coordinate.location.split(",")
      markers[0].latitude = s_coordinate2[1]
      markers[0].longitude = s_coordinate2[0]
      markers[0].lat_lon = s_coordinate.location
      this.setData({
        markers: markers
      })
    }
    if (wx.getStorageSync('end_card')) {
      var e_coordinate = wx.getStorageSync('end_card')
      var e_coordinate2 = e_coordinate.location.split(",")
      markers[1].latitude = e_coordinate2[1]
      markers[1].longitude = e_coordinate2[0]
      markers[1].lat_lon = e_coordinate.location
      this.setData({
        markers: markers
      })
    }
    this.map()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})