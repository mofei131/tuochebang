import {
  Api
} from '../../api/api.js';
var api = new Api(); //实例化 首页 对象
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stacList: [{
        title: '进行中',
        type: 0
      },
      {
        title: '已完成',
        type: 1
      }
    ],
    userInfo: {},
    orderList: [],
    page: 1,
    limit: 10,
    liang: 0,
    status: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      page:1,
      userInfo: wx.getStorageSync('userInfo')
    })
    this.getList()
    this.chaxun()
  },

  getList() {
    var orderList = this.data.page == 1 ? [] : this.data.orderList
    api.orderList({
      relation_status: this.data.status,
      page: this.data.page,
      limit: this.data.limit,
      user_id: wx.getStorageSync('userInfo').id,
      relation: 1
    }, res => {
      this.setData({
        orderList: orderList.concat(res.data)
      })
    })
  },

  //支付
  payOrder(e) {
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../index/pay?money=' + e.currentTarget.dataset.item.need_pay + '&id=' + e.currentTarget.dataset.item.id + '&type=' + 1,
    })
  },
  //订单切换
  wanc(e) {
    this.setData({
      liang: e.currentTarget.dataset.id,
      page: 1
    })
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        status: 2
      })
      this.chaxun()
    } else if (e.currentTarget.dataset.id == 0) {
      this.setData({
        status: 1
      })
      this.chaxun()
    }
  },
  //查询订单
  chaxun() {
    let that = this
    api.orderList({
      relation_status: this.data.status,
      page: this.data.page,
      limit: this.data.limit,
      user_id: wx.getStorageSync('userInfo').id,
      relation: 1
    }, res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          orderList: res.data
        })
      } else if (res.code == -1) {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },
  //去详情
  todet(e) {
    wx.navigateTo({
      url: 'orderdet?id=' + e.currentTarget.dataset.id,
    })
  },
  //联系司机
  lianxi(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile,
    })
    this.setData({
      page: 1
    })
  },

  // 完成订单
  wancheng(e) {
    let that = this
    api.orderfinish({
      id: e.currentTarget.dataset.id,
      user_id: wx.getStorageSync('userInfo').id
    }, res => {
      if (res.code == 200) {
        if(res.data.timeStamp){
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: res.data.signType,
            paySign: res.data.paySign,
            success: function (res) {
              wx.showToast({
                title: '支付成功',
                duration: 1000
              })
              that.setData({
                page: 1
              })
              that.chaxun()
            },
            fail: function (res) {
              // fail
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            },
          })
        }else{
          wx.showToast({
            title: '订单完成',
            duration: 1000
          })
          that.setData({
            page: 1
          })
          that.chaxun()
        } 
      } else if (res.code == -1) {

        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
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
    this.setData({
      page: this.data.page+1
    })
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 查看验车
  lookYanche(e) {
    wx.navigateTo({
      url: '/pages/order/checkCar?id=' + e.currentTarget.dataset.id,
    })
  }
})