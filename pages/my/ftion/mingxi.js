import {
  Api
} from '../../../api/api.js';
var api = new Api(); //实例化 首页 对象
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    page: 1,
    limit: 15,
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (p) {
    if (p.type == 3) {
      this.setData({
        type: p.type
      })
    } else {
      this.setData({
        type: 1
      })
    }
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
    api.moneyLog({
      page: this.data.page,
      limit: this.data.limit,
      type: this.data.type == 3 ? '' : '1',
      user_id: wx.getStorageSync('userInfo').id
    }, res => {
      console.log(res.data)
      this.setData({
        dataList: res.data
      })
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
    this.data.page += 1
    api.moneyLog({
      page: this.data.page,
      limit: this.data.limit,
      type: this.data.type == 3 ? '' : '1',
      user_id: wx.getStorageSync('userInfo').id
    }, res => {
      if (res.data.length == 0) {
        wx.showToast({
          title: '没有了',
          icon: 'none'
        })
      } else {
        this.setData({
          dataList: this.data.dataList.concat(res.data)
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})