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
    get_user: true,
    get_phone: false
  },

  getUserProfile(e) {
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          api.login({
            pid: '',
            code: code
          }, res => {
            wx.getUserProfile({
              desc: '展示用户信息',
              success: (res) => {
                console.log(res)
                api.setUserinfo({
                  nickname: res.userInfo.nickName,
                  realname: '',
                  avater: res.userInfo.avatarUrl,
                  country: res.userInfo.country,
                  gender: res.userInfo.gender,
                  province: res.userInfo.province,
                  city: res.userInfo.city,
                  user_id: ''
                }, res => {
                  this.setData({
                    get_user: false,
                    get_phone: true
                  })
                })
              }
            })
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    })
  },

  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
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
  onShow: function () {},

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