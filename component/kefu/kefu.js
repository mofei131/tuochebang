import {
  Api
} from '../../api/api.js';
var api = new Api(); //实例化 首页 对象
const app = getApp()

var startPoint
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    //按钮位置参数
    buttonTop: 455,
    buttonLeft: 322,
    windowHeight: '',
    windowWidth: '',
    //角标显示数字
    corner_data: 0,
    kefu:''
  },

  onLoad: function () {
    //定义角标数字
    this.setData({
      corner_data: 3
    })
    // 获取控件适配参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          buttonTop: res.windowHeight * 0.70, //这里定义按钮的初始位置
          buttonLeft: res.windowWidth * 0.70, //这里定义按钮的初始位置
        })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //可拖动悬浮按钮点击事件
    btn_Suspension_click: function () {
      //这里是点击之后将要执行的操作
      // wx.showToast({
      //   title: '点击成功',
      //   icon: 'success',
      //   duration: 1000
      // })
      api.setting({
        key:'kefu'
      },res=>{
        wx.makePhoneCall({
          phoneNumber: res.data.data, 
       })
      })
      
    },
    //以下是按钮拖动事件
    buttonStart: function (e) {
      startPoint = e.touches[0] //获取拖动开始点
    },
    buttonMove: function (e) {
      var endPoint = e.touches[e.touches.length - 1] //获取拖动结束点
      //计算在X轴上拖动的距离和在Y轴上拖动的距离
      var translateX = endPoint.clientX - startPoint.clientX
      var translateY = endPoint.clientY - startPoint.clientY
      startPoint = endPoint //重置开始位置
      var buttonTop = this.data.buttonTop + translateY
      var buttonLeft = this.data.buttonLeft + translateX
      //判断是移动否超出屏幕
      if (buttonLeft + 50 >= this.data.windowWidth) {
        // buttonLeft = this.data.windowWidth - 50;
      }
      if (buttonLeft <= 0) {
        buttonLeft = 0;
      }
      if (buttonTop <= 0) {
        buttonTop = 0
      }
      if (buttonTop + 50 >= this.data.windowHeight) {
        // buttonTop = this.data.windowHeight - 50;
      }
      this.setData({
        buttonTop: buttonTop,
        buttonLeft: buttonLeft
      })
    },
    buttonEnd: function (e) {}
  }
})