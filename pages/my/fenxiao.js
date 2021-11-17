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
    user:{
      touxiang: wx.getStorageSync('userInfo').avater,
      name: wx.getStorageSync('userInfo').nickname,
      num: '198',
      // vip_name: '黄金会员'
    },
    count:0,
    touxiang: '/image/my_touxiang.png',
    list: [],
    page:1,
    limit:10
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
    api.myChildren({
      user_id:wx.getStorageSync('userInfo').id,
      page:this.data.page,
      limit:this.data.limit
    },res => {
      console.log(res)
      this.setData({
        list:res.data.list,
        count:res.data.count
      })
    })
  },
  topai(){
    wx.navigateTo({
      url: 'paihang',
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

  }
})