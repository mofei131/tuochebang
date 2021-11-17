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
    name:'',
    nickname:''
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

  },
  //获取修改信息
  name(e){
    this.setData({
      name:e.detail.value
    })
  },
  nickname(e){
    this.setData({
      nickname:e.detail.value
    })
  },
  baocun(){
    api.setUserinfo({
      user_id:wx.getStorageSync('userInfo').id,
      realname:this.data.name,
      nickname:this.data.nickname
    }, res => {
      console.log(res)
      if(res.code == 200){
        api.getUserinfo({
          user_id:wx.getStorageSync('userInfo').id
        },res => {
          wx.setStorageSync('userInfo', res.data)
        })
        wx.showToast({
          title: '修改成功',
          duration:1000
        })
        setTimeout(function() {
          wx.switchTab({
            url: '../my/my',
          })
          },1000)
      }else if(res.code == -1){
        wx.showToast({
          title: res.message,
          icon:'none'
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})