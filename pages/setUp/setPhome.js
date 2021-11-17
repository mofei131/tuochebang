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
    clean_phone: false,
    phone: '',
    ycode:'',
    code: '获取验证码',
    sendTime: '获取验证码'
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

  //修改手机号
  xiugai(){
    api.resetMobile({
      user_id:wx.getStorageSync('userInfo').id,
      newmobile:this.data.phone,
      code:this.data.ycode
    },res=>{
      if(res.code == 200){
        wx.showToast({
          title: '修改成功',
          duration:1000
        })
        setTimeout(function() {
          wx.switchTab({
            url:'../index/index'
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

  },

  getcode(e){
    this.setData({
      ycode: e.detail.value
    })
  },
  getPhone(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        clean_phone: true
      })
    } else {
      this.setData({
        clean_phone: false
      })
    }
    this.setData({
      phone: e.detail.value
    })
  },

  cleanPhone() {
    this.setData({
      phone: ''
    })
  },

  getCode() {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return
    }
    if (this.data.phone !== "" && myreg.test(this.data.phone) == false) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return
    }
    if(this.data.code > 0){
      return
    }
    this.setData({
      code: 60
    })
    api.getVerifyCode({
      mobile:this.data.phone
    },res=>{
    var inter = setInterval(function () {
      this.setData({
        sendTime: this.data.code + 's后重发',
        code: this.data.code - 1
      });
      if (this.data.code < 0) {
        clearInterval(inter)
        this.setData({
          sendTime: '获取验证码',
        })
      }
    }.bind(this), 1000);
    })
  }
})