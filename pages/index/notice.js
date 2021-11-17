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
    noticeList: [],
    page:1,
    limit:30
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
    api.messagelist({
      user_id:wx.getStorageSync('userInfo').id,
      page:this.data.page,
      limit:this.data.limit,
    },res=>{
      console.log(res.data)
      this.setData({
        noticeList:res.data
      })
    })
  },

  audio(e){
    console.log(wx.getStorageSync('userInfo').id)
    api.messageread({
      id:e.currentTarget.dataset.id,
      user_id:wx.getStorageSync('userInfo').id
    },res=>{
      console.log(res)
      if(e.currentTarget.dataset.type == 1){
        wx.navigateTo({
          url:'../order/relationOrder'
        })
      }else if(e.currentTarget.dataset.type == 2){
        wx.navigateTo({
          url:'noticedet?id='+e.currentTarget.dataset.id
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