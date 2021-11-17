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
    name: '',
    price: '',
    price_baoliu:0,
    carry:0,
    set:[]
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
    let that = this
    api.withdrawSet({
    },res => { 
      this.setData({
        price_baoliu:res.data.limit_money,
        set:res.data.set,
        name:wx.getStorageSync('userInfo').nickname,
        price:wx.getStorageSync('userInfo').wallet
      })
    })
  },

  carry(e){
    this.setData({
      carry: e.detail.value
    })
  },
  tik(){
    let that = this
    api.withdraw({
      money:this.data.carry,
      user_id:wx.getStorageSync('userInfo').id,
      type:1
    },res =>{
      if(res.code == 200){
        wx.showToast({
          title: '提现成功',
        })
        //获取用户信息
        api.getUserinfo({
          user_id:wx.getStorageSync('userInfo').id
        }, res => {
          wx.setStorageSync('userInfo', res.data)
          that.setData({
            price:wx.getStorageSync('userInfo').wallet
          })
        })
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