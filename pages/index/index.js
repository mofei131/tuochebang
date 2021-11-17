import {
  Api
} from '../../api/api.js';
var api = new Api(); //实例化 首页 对象
const app = getApp()
var amapFile = require('../../libs/amap-wx.130.js');
var markersData = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight, //导航栏高度

    // latitude: app.globalData.latitude,
    // longitude: app.globalData.longitude,
    latitude: '',
    longitude: '',
    markers: [{
      iconPath: "../../image/add_qi.png",
      id: 0,
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      lat_lon: app.globalData.lat_lon,
      width: 23,
      height: 33
    }, {
      iconPath: "../../image/add_qidian.png",
      id: 1,
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      lat_lon: app.globalData.lat_lon,
      width: 24,
      height: 34
    }],
    polyline: '',

    textData: {},

    // 板车信息
    cardList: [],
    cardList_index: 0,

    // 订单用户信息
    fuser_name: '',
    fuser_phone: '',
    xuser_name: '',
    xuser_phone: '',

    start_card: '',
    end_card: '',
    shou: false,
    shunum: 0,

    denglu: false,
    scene: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (p) {
    if (p.scene) {
      wx.setStorageSync('scene', p.scene)
      this.setData({
        scene: p.scene
      })
    }
    if (p.scene && wx.getStorageSync('userInfo')) {
      api.bindPid({
        pid: p.scene,
        user_id: wx.getStorageSync('userInfo').id
      }, res => {
        console.log(res)
        wx.removeStorageSync('scene')
      })
    }

    this.map()
    if (!wx.getStorageSync('userInfo') || !wx.getStorageSync('userInfo').avater || !wx.getStorageSync('userInfo').nickname) {
      this.setData({
        denglu: true
      })
    } else {
      this.setData({
        denglu: false
      })
    }
    //获取用户信息
    api.getUserinfo({
      user_id: wx.getStorageSync('userInfo').id
    }, res => {
      wx.setStorageSync('userInfo', res.data)
    })

  },

  map() {
    let that = this
    var myAmapFun = new amapFile.AMapWX({
      key: 'bd45905078a821a4b50ad67dbc470875'
    });
    myAmapFun.getDrivingRoute({
      origin: wx.getStorageSync('start_card').location,
      destination: wx.getStorageSync('end_card').location,
      success: function (data) {
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
        that.setData({
          polyline: [{
            points: wx.getStorageSync('points'),
            color: "#0091ff",
            width: 6
          }]
        });
      },
      fail: function (info) {}
    })
  },

  // 获取车辆轮播下标记
  onSlideChangeEnd:function(e){
    this.setData({
      cardList_index: e.detail.current
    })
  },

  // 选择装车 -起
  start_card() {
    wx.navigateTo({
      url: '/pages/order/address?type=0',
    })
  },

  // 选择卸车 -终
  end_card() {
    wx.navigateTo({
      url: '/pages/order/address?type=1',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  noGetUser2() {
    wx.switchTab({
      url: '/pages/my/my?id=' + this.data.scene,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!wx.getStorageSync('userInfo') || !wx.getStorageSync('userInfo').avater || !wx.getStorageSync('userInfo').nickname) {
      this.setData({
        denglu: true,
        shou: false
      })
    } else {
      this.setData({
        denglu: false,
      })
      if (!wx.getStorageSync('userInfo').mobile) {
        this.setData({
          shou: true
        })
      }
    }

    
    this.map()
    let that = this
    // 获取用户地理位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log('经纬度')
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        // wx.setStorageSync('lat_lon', res)
      }
    })
    var markers = this.data.markers
    // console.log(wx.getStorageSync('start_card'))
    if (wx.getStorageSync('start_card')) {
      var s_coordinate = wx.getStorageSync('start_card')
      var s_coordinate2 = s_coordinate.location.split(",")
      markers[0].latitude = s_coordinate2[1]
      markers[0].longitude = s_coordinate2[0]
      markers[0].lat_lon = s_coordinate.location
      this.setData({
        start_card: s_coordinate,
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
        end_card: e_coordinate,
        markers: markers
      })
    }

    this.getTuocheCard()
    api.noReadNum({
      user_id: wx.getStorageSync('userInfo').id
    }, res => {
      console.log(res)
      this.setData({
        shunum: res.data.noread
      })
    })
  },

  // 获取拖车类型
  getTuocheCard() {
    api.getTrailerType({}, res => {
      // console.log(res)
      this.setData({
        cardList: res.data
      })
    })
  },
  //用户手机号授权
  getPhoneNumber(e) {
    console.log(e)
    let that = this
    wx.login({
      provider: 'weixin',
      success(res) {
        console.log(res)
        api.setMobile({
          user_id: wx.getStorageSync('userInfo').id,
          code: res.code,
          iv: e.detail.iv,
          encrypteddata: e.detail.encryptedData
        }, res => {
          if (res.code == 200) {
            wx.showToast({
              title: '授权成功',
              duration: 1000
            })
            api.getUserinfo({
              user_id: wx.getStorageSync('userInfo').id
            }, res => {
              wx.setStorageSync('userInfo', res.data)
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
          that.setData({
            shou: false
          })
        })
      }
    })
  },
  qux() {
    this.setData({
      shou: false
    })
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

  },
  // 查看消息
  toNewsPage() {
    wx.navigateTo({
      url: '/pages/index/notice',
    })
  },

  // 切换运输车辆信息
  backCard() {
    if (this.data.cardList_index == 0) {
      return
    }
    this.setData({
      cardList_index: this.data.cardList_index - 1
    })
  },

  nextCard() {
    if ((this.data.cardList_index + 1) == this.data.cardList.length) {
      return
    }
    this.setData({
      cardList_index: this.data.cardList_index + 1
    })
  },

  // 获取用户订单信息
  getFuser(e) {
    this.setData({
      fuser_name: e.detail.value
    })
  },

  getFphone(e) {
    this.setData({
      fuser_phone: e.detail.value
    })
  },

  getXuser(e) {
    this.setData({
      xuser_name: e.detail.value
    })
  },

  getXphone(e) {
    this.setData({
      xuser_phone: e.detail.value
    })
  },

  // 订单信息
  createOrder() {
    // if (!wx.getStorageSync('userinfo')) {
    //   wx.reLaunch({
    //     url: '/pages/signIn/signIn',
    //   })
    //   return
    // }
    if (this.data.fuser_name == '') {
      wx.showToast({
        title: '请输入发车人姓名',
        icon: "none"
      })
      return
    }
    if (this.data.fuser_phone == '' || this.data.fuser_phone.length != 11) {
      wx.showToast({
        title: '请输入发车人联系方式',
        icon: "none"
      })
      return
    }
    if (this.data.xuser_name == '') {
      wx.showToast({
        title: '请输入收货人姓名',
        icon: "none"
      })
      return
    }
    if (this.data.xuser_name == '' || this.data.xuser_phone.length != 11) {
      wx.showToast({
        title: '请输入收货人联系方式',
        icon: "none"
      })
      return
    }

    if (!wx.getStorageSync('start_card')) {
      wx.showToast({
        title: '请选择装车地点',
        icon: "none"
      })
      return
    }

    if (!wx.getStorageSync('end_card')) {
      wx.showToast({
        title: '请选择卸车地点',
        icon: "none"
      })
      return
    }

    // 判断装车 手机号
    // api.mobileIsIn({
    //   mobile: this.data.fuser_phone
    // }, res => {
    //   if (res.data == '') {
    //     wx.showToast({
    //       title: '该手机号不存在！',
    //       icon: 'none'
    //     })
    //   } else {
    // 判断卸车 手机号
    // api.mobileIsIn({
    //   mobile: this.data.xuser_phone
    // }, ress => {
    //   if (ress.data == '') {
    //     wx.showToast({
    //       title: '该手机号不存在！',
    //       icon: 'none'
    //     })
    //   } else {
    var order_info = []
    order_info[0] = this.data.fuser_name
    order_info[1] = this.data.fuser_phone
    order_info[2] = this.data.fuser_phone
    order_info[3] = this.data.xuser_name
    order_info[4] = this.data.xuser_phone
    order_info[5] = this.data.xuser_phone
    wx.setStorageSync('trailerType', this.data.cardList[this.data.cardList_index])
    wx.setStorageSync('order_info', order_info)
    wx.navigateTo({
      url: '/pages/order/index',
    })
    //     }
    //   })
    // }
    // })
  },
})