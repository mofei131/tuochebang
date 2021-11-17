import {
  Api
} from '../../api/api.js';
var api = new Api(); //实例化 首页 对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (p) {
    api.messageread({
      id:p.id,
      user_id:wx.getStorageSync('userInfo').id
    },res=>{
      console.log(res)
      this.setData({
        nodes:res.data.message
      })
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