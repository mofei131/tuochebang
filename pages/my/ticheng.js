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
    jifen: 0,
    list: [],
    page:1,
    limit:10,
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
    api.moneyLog({
      page:this.data.page,
      limit:this.data.limit,
      user_id:wx.getStorageSync('userInfo').id,
      type:2
    },res => {
      this.setData({
        list:res.data,
        jifen:res.data.total
      })
      console.log(res)
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
      page:this.data.page,
      limit:this.data.limit,
      type:2,
      user_id:wx.getStorageSync('userInfo').id
    },res =>{
      if(res.data.length == 0){
        wx.showToast({
          title: '没有了',
          icon:'none'
        })
      }else{
        this.setData({
          list:this.data.dataList.concat(res.data)
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