// pages/my/paihang.js
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
    page:1,
    limit:20,
    pailist:[],
    me:'',
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
    api.rank({
      user_id:wx.getStorageSync('userInfo').id,
      page:this.data.page,
      limit:this.data.limit
    },res=>{
      this.setData({
        pailist:res.data.list,
        me:res.data.user
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
    api.rank({
      user_id:wx.getStorageSync('userInfo').id,
      page:this.data.page,
      limit:this.data.limit
    },res=>{
      if(res.data.list.length != 0){
        this.setData({
          pailist:this.data.pailist.concat(res.data.list),
        })
      }else{
        wx.showToast({
          title: '没有了',
          icon:'none'
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