import {
  Api
} from '../../api/api.js';
var api = new Api(); //实例化 首页 对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreement: true,
    money: 0,
    id: 0,
    type: '',
    userInfo:''
  },
  agreementSuccess(e){
    console.log(e.currentTarget.dataset.shu)
    if(e.currentTarget.dataset.shu == 1){
      this.setData({
        agreement:true
      })
    }else{
      this.setData({
        agreement:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (p) {
    console.log(p)
    this.setData({
      money: p.money,
      id: p.id,
      type: p.type
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
    this.setData({
      userInfo:wx.getStorageSync('userInfo')
    })
  },

  pay() {
    if (this.data.type == 1) {
      api.orderpay({
        id: this.data.id,
        user_id: wx.getStorageSync('userInfo').id
      }, res => {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res) {
            wx.showToast({
              title: '支付成功',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 2
              });
            }, 1000)
          },
          fail: function (res) {
            // fail
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          },
        })
      })
    } else {
      api.orderpay2({
        id: this.data.id,
        user_id: wx.getStorageSync('userInfo').id
      }, res => {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res) {
            wx.showToast({
              title: '支付成功',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 2
              });
            }, 1000)
          },
          fail: function (res) {
            // fail
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          },
        })
      })
    }

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