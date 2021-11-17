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
    cardImg: [{
      title: '照片1',
      image: 'http://hlstore.yimetal.cn/img/tixian_bg.png'
    }, {
      title: '照片1',
      image: 'http://hlstore.yimetal.cn/img/tixian_bg.png'
    }, {
      title: '照片1',
      image: 'http://hlstore.yimetal.cn/img/tixian_bg.png'
    }, {
      title: '照片1',
      image: 'http://hlstore.yimetal.cn/img/tixian_bg.png'
    }, {
      title: '照片1',
      image: 'http://hlstore.yimetal.cn/img/tixian_bg.png'
    }, {
      title: '照片1',
      image: 'http://hlstore.yimetal.cn/img/tixian_bg.png'
    }, {
      title: '照片1',
      image: 'http://hlstore.yimetal.cn/img/tixian_bg.png'
    }, {
      title: '照片1',
      image: 'http://hlstore.yimetal.cn/img/tixian_bg.png'
    }],
    remarks: '',
    id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (p) {
    console.log(p.id)
    this.setData({
      id:p.id
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
    this.yandet()
  },

  yandet(){
    let that = this
    api.yanche({
      order_id:this.data.id
    },res=>{
      // console.log(res)
      this.setData({
        cardImg:res.data
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  huoquFanbo(e) {
    let yc = e.detail.value
    this.setData({
      remarks: yc
    })
  },

  tongguoCard() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要通过验车',
      success: function (res) {
          if (res.confirm) {
            api.yancheYes({
              order_id:that.data.id
            },res=>{
              if(res.code == 200){
                wx.showToast({
                  title: '验车已通过',
                  duration:1000
                })
                setTimeout(function() {
                  wx.navigateTo({
                    url: 'relationOrder',
                  })
                  },1000)
          } else if (res.cancel) {
              console.log('用户点击取消');
          }
          });
          }
        }
  });
  },

  bohuiCard() {
    let that = this
    if (this.data.remarks == '') {
      wx.showToast({
        title: '请输入驳回原因',
        icon: 'none'
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '确定要驳回验车',
      success: function (res) {
          if (res.confirm) {
            api.yancheNo({
              order_id:that.data.id,
              reason:that.data.remarks
            },res=>{
              if(res.code == 200){
                wx.showToast({
                  title: '驳回成功',
                  duration:1000
                })
                setTimeout(function() {
                  wx.navigateTo({
                    url: 'relationOrder',
                  })
                  },1000)
              }else if(res.code == -1){
                wx.showToast({
                  title: res.message,
                  icon:'none'
                })
              }
            })
          } else if (res.cancel) {
              console.log('用户点击取消');
          }
      }
  });
  }
})