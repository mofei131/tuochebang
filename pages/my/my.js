import {
  Api
} from '../../api/api.js';
var api = new Api(); //实例化 首页 对象
const app = getApp()
var amapFile = require('../../libs/amap-wx.130.js');
var markersData = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight, //导航栏高度
    // touxiang: '/image/my_touxiang.png',
    touxiang: wx.getStorageSync('userInfo').avater,
    // name: '怎么肥四',
    name: wx.getStorageSync('userInfo').nickname,
    yue: wx.getStorageSync('userInfo').wallet,
    list: [{
      id: 0,
      icon: '/image/my_yaoqing.png',
      name: '邀请好友',
      url: ''
    }, {
      icon: '/image/my_fenxiao.png',
      name: '我的分销',
      url: '/pages/my/fenxiao'
    }, {
      icon: '/image/my_ticheng.png',
      name: '我的提成',
      url: '/pages/my/ticheng'
    }, {
      icon: '/image/my_gonglue.png',
      name: '赚钱攻略',
      url: '/pages/my/zhuanqian'
    }],
    list2: [{
      icon: '/image/my_dingdan.png',
      name: '授信余额',
      url: '/pages/my/ftion/mingxi'
    },{
      icon: '/image/my_dingdan.png',
      name: '我的订单',
      url: '/pages/order/order'
    }, {
      icon: '/image/my_guanlian.png',
      name: '关联订单',
      url: '/pages/order/relationOrder'
    }, {
      icon: '/image/my_shiyong.png',
      name: '使用说明',
      url: '/pages/instructions/instructions'
    }, {
      icon: '/image/my_kefu.png',
      name: '联系客服',
      url: '/kefu'
    },{
      icon: '/image/my_shezhi.png',
      name: '设置',
      url: '/pages/setUp/setUp'
    }],
    kefu_phone: '',
    shouquan: false,
    fxma: '',
    cun: false,
    scene: '',
    yao:'',
    shouxin:'',
    userInfo:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (p) {
    this.setData({
      scene: p.scene
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
      touxiang: wx.getStorageSync('userInfo').avater,
      name: wx.getStorageSync('userInfo').nickname,
      yue: wx.getStorageSync('userInfo').wallet,
      userInfo:wx.getStorageSync('userInfo')
    })
    let that = this
    if (!wx.getStorageSync('userInfo').avater || !wx.getStorageSync('userInfo').nickname || !wx.getStorageSync('userInfo')) {
      this.setData({
        shouquan: true
      })
    } else {
      this.setData({
        shouquan: false
      })
    }

    api.setting({
      key: 'kefu'
    }, res => {
      this.setData({
        kefu_phone: res.data.data
      })
    })
    if (wx.getStorageSync('userInfo') || wx.getStorageSync('userInfo').id) {
      api.shareCode({
        user_id: wx.getStorageSync('userInfo').id
      }, res => {
        that.setData({
          fxma: res.data.url
        })
      })
    }
    api.setting({
      key: 'open_haibao'
    }, res => {
      console.log(res.data.data)
      this.setData({
        yao: res.data.data == 1 ? true : false
      })
    })
    //获取用户信息
    api.getUserinfo({
      user_id: wx.getStorageSync('userInfo').id
    }, res => {
      wx.setStorageSync('userInfo', res.data)
    })
  },
  ancl() {
    this.setData({
      cun: false
    })
  },
  //授权
  getUserInfo() {
    var that = this
    wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别",
      success(res) {
        wx.login({
          success(res) {
            api.login({
              pid: wx.getStorageSync('scene') ? wx.getStorageSync('scene') : 0,
              code: res.code
            }, res => {
              wx.setStorageSync('userInfo', res.data)
              wx.removeStorageSync('scene')
            })
          }
        })
        api.setUserinfo({
          user_id: wx.getStorageSync('userInfo').id,
          nickname: res.userInfo.nickName,
          avater: res.userInfo.avatarUrl,
          country: res.userInfo.country,
          gender: res.userInfo.gender,
          province: res.userInfo.province,
          city: res.userInfo.city,
        }, res => {
          console.log(res)
          if(res.data.user_id == null){
            wx.showToast({
              title: '暂时无法使用请联系平台管理员',
              icon: 'none'
            })
            return
          }
          wx.setStorageSync('userInfo', res.data)
          wx.showToast({
            title: '授权成功',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index',
            })
          }, 1000)
        })
      }
    })
  },
  //微信小程序保存到相册
  handleSetting(e) {
    let that = this
    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      that.openSettingBtnHidden = false;
    } else {
      that.openSettingBtnHidden = true;
    }
  },
  saveEwm: function (e) {
    let that = this
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              //这里是用户同意授权后的回调
              that.saveImgToLocal();
            },
            fail() { //这里是用户拒绝授权后的回调
              that.openSettingBtnHidden = false
            }
          })
        } else { //用户已经授权过了
          that.saveImgToLocal();
        }
      }
    })
  },
  saveImgToLocal() {
    console.log("保存1")
    let that = this
    let cun = this.data.cun
    wx.showModal({
      title: '提示',
      content: '确定保存到相册吗',
      success: function (res) {
        if (res.confirm) {
          wx.downloadFile({
            url: that.data.fxma, //图片地址
            success: (res) => {
              if (res.statusCode === 200) {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function () {
                    that.setData({
                      cun: !cun
                    })
                    wx.showToast({
                      title: "保存成功",
                    });
                  },
                  fail: function () {
                    wx.showToast({
                      title: "保存失败",
                      icon: "none"
                    });
                  }
                });
              }
            }
          })
        } else if (res.cancel) {

        }
      }
    });

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

  // 跳转提现
  toTixian() {
    wx.navigateTo({
      url: '/pages/my/ftion/tixian',
    })
  },

  //  跳转 余额明细
  toMingxi() {
    wx.navigateTo({
      url: '/pages/my/ftion/mingxi',
    })
  },

  // 功能列表跳转
  goPage(e) {
    let cun = this.data.cun
    if (e.currentTarget.dataset.url == '/pages/my/ftion/mingxi') {
      wx.navigateTo({
        url: e.currentTarget.dataset.url+'?type=3',
      })
      return
    }
    if (e.currentTarget.dataset.id == 0) {
      // console.log(this.data.yao)
      if(this.data.yao){
        this.setData({
          cun: !cun
        })
      }else{
        wx.showToast({
          title: '未拥有邀请下级权限！',
          icon:'none'
        })
      }
      return
    }
    if (e.currentTarget.dataset.url == '/pages/order/order') {
      wx.switchTab({
        url: e.currentTarget.dataset.url,
      })
      return
    }
    if (e.currentTarget.dataset.url == '/kefu') {
      wx.makePhoneCall({
        phoneNumber: this.data.kefu_phone,
      })
      return
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
})