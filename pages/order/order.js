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
    navBarHeight: app.globalData.navBarHeight, //导航栏高度

    orderList: [{
        title: '全部',
        type: 0
      },
      {
        title: '待接单',
        type: 1
      },
      {
        title: '进行中',
        type: 2
      },
      {
        title: '已取消',
        type: 3
      },
      {
        title: '已完成',
        type: 4
      }
    ],
    state_index: 0,
    page: 1,
    limit: 10,
    list: [],
    shunum:0
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
    api.noReadNum({
      user_id:wx.getStorageSync('userInfo').id
    },res=>{
      this.setData({
        shunum:res.data.noread
      })
    })
    this.setData({
      page:1
    })
    this.huoquOrder()
  },
  // 查看消息
  toNewsPage() {
    wx.navigateTo({
      url: '/pages/index/notice',
    })
  },

  //去详情
  todet(e){
    wx.navigateTo({
      url: 'orderdet?id='+e.currentTarget.dataset.id,
    })
    console.log(e.currentTarget.dataset.id)
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
    api.orderList({
      status: this.data.orderList[this.data.state_index].type,
      user_id: wx.getStorageSync('userInfo').id,
      page: this.data.page,
      limit: this.data.limit,
      relation: 0
    }, res => {
      if(res.data.length == 0){
        wx.showToast({
          title: '没有了',
          icon:'none'
        })
      }else{
        this.setData({
          list:this.data.list.concat(res.data)
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取订单
  huoquOrder() {
    api.orderList({
      status: this.data.orderList[this.data.state_index].type,
      user_id: wx.getStorageSync('userInfo').id,
      page: this.data.page,
      limit: this.data.limit,
      relation: 0
    }, res => {
      console.log("订单列表")
      console.log(res)
      this.setData({
        list: res.data
      })
    })
  },

  // 切换状态
  switchState(e) {
    this.setData({
      state_index: e.currentTarget.dataset.index,
      page:1
    })
    this.huoquOrder()
  },
 //支付
  payOrder(e){
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../index/pay?money='+e.currentTarget.dataset.item.pay_money+'&id='+e.currentTarget.dataset.item.id,
    })
  },
  // 联系司机
  // contactDriver(e) {
  //   wx.makePhoneCall({
  //     phoneNumber: e.currentTarget.dataset.phone,
  //     success: function () {},
  //     fail: function () {}
  //   })
  // },

  //联系司机
  lianxi(e){
    // console.log(e.currentTarget.dataset.mobile)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile, 
   })
  },

  // 跳转评价
  toEvaluate(e) {
    wx.navigateTo({
      url: 'pingjia?id='+e.currentTarget.dataset.id,
    })
  },

  // 取消订单
  cancelOrder(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否取消该订单',
      success(res) {
        if (res.confirm) {
          api.cancel({
            id: e.currentTarget.dataset.id
          }, res => {
            var list = that.data.list
            list.splice(e.currentTarget.dataset.index, 1)
            that.setData({
              list: list
            })
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  // 完成订单
  // wancheng(e){
  //   let that = this
  //   api.orderfinish({
  //     id:e.currentTarget.dataset.id,
  //     user_id:wx.getStorageSync('userInfo').id
  //   },res=>{
  //     if(res.code == 200){
  //       wx.showToast({
  //         title: '订单完成',
  //         duration:1000
  //       })
  //       this.setData({
  //         page:1
  //       })
  //       that.huoquOrder()
  //     }else if(res.code == -1){
  //       wx.showToast({
  //         title: res.message,
  //         icon:'none'
  //       })
  //     }
  //   })
  // }

  // 完成订单
  wancheng(e) {
    let that = this
    api.orderfinish({
      id: e.currentTarget.dataset.id,
      user_id: wx.getStorageSync('userInfo').id
    }, res => {
      if (res.code == 200) {
        if(res.data.timeStamp){
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
              that.setData({
                page: 1
              })
              that.huoquOrder()
            },
            fail: function (res) {
              // fail
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            },
          })
        }else{
          wx.showToast({
            title: '订单完成',
            duration: 1000
          })
          that.setData({
            page: 1
          })
          that.huoquOrder()
        } 
      } else if (res.code == -1) {

        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },
})