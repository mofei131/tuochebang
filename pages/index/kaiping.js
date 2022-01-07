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
    heightNum:'',
    tanlist:'',
    loading_left:'',
		loading_right:'',
  },
  topage(){
    wx.switchTab({
      url: './index'
  });
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
    api.popup({
      type:2
    },res=>{
      this.setData({
        tanlist:res.data.kaiping,
        loading_left : '-webkit-animation: loading_left '+res.data.kaiping_time+'s linear',
				loading_right : '-webkit-animation: loading_right '+res.data.kaiping_time+'s linear'
      })
      setTimeout(function(){
    	wx.switchTab({
    	    url: './index'
    	});
    },res.data.kaiping_time+'000')
    })
    let imgheight = ''
    wx.getSystemInfo({
      success: function (res) {
        imgheight = 'height:'+res.windowHeight+'px'
      }
    })
    this.setData({
      heightNum:imgheight
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