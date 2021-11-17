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
    list:[],
    show1: false,
    show2: true,
    show3: false,
    hand:0
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
    api.zhuanqiangonglue({
    },res =>{
      console.log(res)
      this.setData({
        list:res.data
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  show1(e) {
    this.setData({
      show1: !this.data.show1,
      hand:e.currentTarget.dataset.index
    })
  },

  show2() {
    this.setData({
      show2: !this.data.show2
    })
  },

  show3() {
    this.setData({
      show3: !this.data.show3
    })
  },
})