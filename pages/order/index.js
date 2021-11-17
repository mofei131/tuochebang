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
    // 位置信息 地图信息 地图标点设置
    // latitude: app.globalData.latitude,
    // longitude: app.globalData.longitude,
    // latitude:wx.getStorageSync('lat_lon').latitude,
    // longitude: wx.getStorageSync('lat_lon').longitude,
    latitude: '',
    longitude: '',
    markers: [{
      iconPath: "../../image/add_qi.png",
      id: 0,
      // latitude: app.globalData.latitude,
      // longitude: app.globalData.longitude,
      // lat_lon: app.globalData.lat_lon,
      latitude: wx.getStorageSync('lat_lon').latitude,
      longitude: wx.getStorageSync('lat_lon').longitude,
      lat_lon: wx.getStorageSync('lat_lon').longitude + ',' + wx.getStorageSync('lat_lon').latitude,
      width: 23,
      height: 33
    }, {
      iconPath: "../../image/add_qidian.png",
      id: 1,
      // latitude: app.globalData.latitude,
      // longitude: app.globalData.longitude,
      // lat_lon: app.globalData.lat_lon,
      latitude: wx.getStorageSync('lat_lon').latitude,
      longitude: wx.getStorageSync('lat_lon').longitude,
      lat_lon: wx.getStorageSync('lat_lon').longitude + ',' + wx.getStorageSync('lat_lon').latitude,
      width: 24,
      height: 34
    }],
    distance: '', // 预估里程
    order_h_card: '', // 预估时间
    order_price: '', // 里程费
    dingjin_rate: '', // 定金比例
    order_dingjin: 0, // 定金
    order_baoxian_price: 0, // 保险费
    order_xiaofei: 0, // 小费
    ordre_beizhu: '', // 订单备注
    order_pay_money: 0, // 需要支付的金额
    polyline: [], // 路线绘制

    start_card: '', // 起始位置信息
    end_card: '', // 终点位置信息
    order_luxian_info: '', // 路程全程信息

    ordre_top: 40, // 查看地图top

    o_data: '', // 订单日期
    o_time_start: '', // 订单时间 开始
    o_time_end: '', // 订单时间 结束

    // 板车类型
    cardList: [],
    cardList_: [],
    cardList_index: 0,
    // 支付方式
    payType: ['全款', '定金支付', '到付'],
    payType_index: 0,
    // 保险
    insuranceList: [],
    // 特殊要求类型
    otherList: [],
    otherList_: [],
    otherList_index: '',
    // 托运车型
    cardType: '',

    // 起点 省市区
    order_start_provinceid: '',
    order_start_cityid: '',
    order_start_areaid: '',
    // 终点 省市区
    order_end_provinceid: '',
    order_end_cityid: '',
    order_end_areaid: '',
    teshu: '',
    orderid: 0,
    show: true,
    ddid: 0,
    touchStartX: 0, // 触屏起始点x  
    touchStartY: 0, // 触屏起始点y 
    timeShow:true,
    leiixngShow:true,
    payShow:true,
    dianShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.map()
  },

  map() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: 'bd45905078a821a4b50ad67dbc470875'
    });
    myAmapFun.getDrivingRoute({
      origin: this.data.start_card.location,
      destination: this.data.end_card.location,
      success: function (data) {
        console.log('高德经纬')
        console.log(data)
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
      },
      fail: function (info) {}
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
    console.log(wx.getSystemInfoSync())
    console.log(wx.getMenuButtonBoundingClientRect())
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
    var markers = this.data.markers
    if (wx.getStorageSync('start_card')) {
      var s_coordinate = wx.getStorageSync('start_card')
      var s_coordinate2 = s_coordinate.location.split(",")
      markers[0].latitude = s_coordinate2[1]
      markers[0].longitude = s_coordinate2[0]
      markers[0].lat_lon = s_coordinate.location
      that.setData({
        start_card: s_coordinate,
        markers: markers
      })
      if (wx.getStorageSync('end_card')) {
        var e_coordinate = wx.getStorageSync('end_card')
        var e_coordinate2 = e_coordinate.location.split(",")
        markers[1].latitude = e_coordinate2[1]
        markers[1].longitude = e_coordinate2[0]
        markers[1].lat_lon = e_coordinate.location
        that.setData({
          end_card: e_coordinate,
          markers: markers
        })
        if (wx.getStorageSync('order_luxian_info')) {
          that.setData({
            order_luxian_info: wx.getStorageSync('order_luxian_info'),
            distance: wx.getStorageSync('order_luxian_info').paths[0].distance / 1000
          })
          that.map()
          that.huoquSsq()
          that.getData()
          that.huoquBanche()
          that.huoquBaoxian()
          that.huoquType()
          that.huoquTeshuyaoqiu()
          that.allMoney()
        }
      }
    }

    if (wx.getStorageSync('trailerType')) {
      this.setData({
        order_h_card: ((wx.getStorageSync('order_luxian_info').paths[0].distance / 1000) / wx.getStorageSync('trailerType').speed).toFixed(2),
        // order_price: ((wx.getStorageSync('order_luxian_info').paths[0].distance / 1000) * wx.getStorageSync('trailerType').price).toFixed(2)
      })
    }
  },

  daianShow(){
    this.setData({
      dianShow:!this.data.dianShow
    })
  },

  touchStart(e) {
    this.setData({
      touchStartX: e.touches[0].clientX,
      touchStartY: e.touches[0].clientY
    })
    // this.touchStartX = e.touches[0].clientX;  
    // this.touchStartY = e.touches[0].clientY;  
  },

  /**  
   * 触摸结束  
   **/
  touchEnd(e) {
    let deltaX = e.changedTouches[0].clientX - this.data.touchStartX;
    let deltaY = e.changedTouches[0].clientY - this.data.touchStartY;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX >= 0) {
        console.log("左滑")
      } else {
        console.log("右滑")
      }
    } else if (Math.abs(deltaY) > 50 && Math.abs(deltaX) < Math.abs(deltaY)) {
      if (deltaY < 0) {
        console.log("上滑")
        // this.shou = true
        this.setData({
          show: true
        })
      } else {
        console.log("下滑")
        this.setData({
          show: false
        })
      }
    } else {
      console.log("可能是误触！")
    }
  },

  //特殊要求数组
  // select(e) {
  //   let that = this;
  //   let crli = this.data.cardList2
  //   if (crli.indexOf(e.currentTarget.dataset.id) == -1) {
  //     crli.push(e.currentTarget.dataset.id); //选中添加到数组里
  //   } else {
  //     crli.splice(crli.indexOf(e.currentTarget.dataset.id), 1); //取消
  //       }
  //       this.setData({
  //         cardList2:crli
  //       })
  //     },
  checkboxChange(e) {
    console.log(e.detail.value.toString())
    this.setData({
      teshu: e.detail.value.toString()
    })
  },
  huoquSsq() {
    api.getArea({}, res => {
      var diqu = res.data
      // 获取 起点省市区
      var start_region = wx.getStorageSync('start_card')
      var start_region_shi = wx.getStorageSync('order_luxian_info').paths[0].steps[0].cities[0].name
      var start_region_qu = wx.getStorageSync('order_luxian_info').paths[0].steps[0].cities[0].districts[0].name
      if (start_region.district.indexOf('省') != (-1)) {
        var sheng = start_region.district.substring(0, (start_region.district.indexOf('省') + 1))
        for (var i in diqu) {
          if (diqu[i].province == sheng) {
            for (var j in diqu[i].citys) {
              if (diqu[i].citys[j].city == start_region_shi) {
                for (var k in diqu[i].citys[j].areas) {
                  if (diqu[i].citys[j].areas[k].area == start_region_qu) {
                    this.setData({
                      order_start_provinceid: diqu[i].provinceid,
                      order_start_cityid: diqu[i].citys[j].cityid,
                      order_start_areaid: diqu[i].citys[j].areas[k].areaid,
                    })
                  }
                }
              }
            }
          }
        }
      } else if (start_region.district.indexOf('市') != (-1)) {
        var shi = start_region.district.substring(0, (start_region.district.indexOf('市') + 1))
        for (var i in diqu) {
          if (diqu[i].province == shi) {
            for (var j in diqu[i].citys) {
                for (var k in diqu[i].citys[j].areas) {
                  if (diqu[i].citys[j].areas[k].area == start_region_qu) {
                    this.setData({
                      order_start_provinceid: diqu[i].provinceid,
                      order_start_cityid: diqu[i].citys[j].cityid,
                      order_start_areaid: diqu[i].citys[j].areas[k].areaid,
                    })
                  }
                }
              // }
            }
          }
        }
      } else {
        wx.showToast({
          title: '超出拖车范围！',
          icon: 'none'
        })
      }

      // 获取 终点省市区
      var end_region = wx.getStorageSync('end_card')
      var end_index = wx.getStorageSync('order_luxian_info').paths[0].steps.length - 1
      var end_region_shi = wx.getStorageSync('order_luxian_info').paths[0].steps[end_index].cities[0].name
      var end_region_qu = wx.getStorageSync('order_luxian_info').paths[0].steps[end_index].cities[0].districts[0].name
      if (end_region.district.indexOf('省') != (-1)) {
        var sheng = end_region.district.substring(0, (end_region.district.indexOf('省') + 1))
        for (var i in diqu) {
          if (diqu[i].province == sheng) {
            for (var j in diqu[i].citys) {
              if (diqu[i].citys[j].city == end_region_shi) {
                for (var k in diqu[i].citys[j].areas) {
                  if (diqu[i].citys[j].areas[k].area == end_region_qu) {
                    this.setData({
                      order_end_provinceid: diqu[i].provinceid,
                      order_end_cityid: diqu[i].citys[j].cityid,
                      order_end_areaid: diqu[i].citys[j].areas[k].areaid,
                    })
                  }
                }
              }
            }
          }
        }
      } else if (end_region.district.indexOf('市') != (-1)) {
        var shi = end_region.district.substring(0, (end_region.district.indexOf('市') + 1))
        for (var i in diqu) {
          if (diqu[i].province == shi) {
            for (var j in diqu[i].citys) {
                for (var k in diqu[i].citys[j].areas) {
                  if (diqu[i].citys[j].areas[k].area == end_region_qu) {
                    this.setData({
                      order_end_provinceid: diqu[i].provinceid,
                      order_end_cityid: diqu[i].citys[j].cityid,
                      order_end_areaid: diqu[i].citys[j].areas[k].areaid,
                    })
                  }
                }
            }
          }
        }
      } else {
        wx.showToast({
          title: '超出拖车范围！',
          icon: 'none'
        })
      }
    })
  },

  // 获取板车类型
  huoquBanche() {
    console.log('获取类型')
    var cardList = this.data.cardList
    api.getTrailerType({}, res => {
      for (var i in res.data) {
        cardList.push(res.data[i].name)
      }
      for (var i in res.data) {
        if (res.data[i].id == wx.getStorageSync('trailerType').id) {
          this.setData({
            cardList_index: i
          })
          api.computeFee({
            trailer_type: res.data[i].id,
            distance: wx.getStorageSync('order_luxian_info').paths[0].distance / 1000,
            hour: '',
            provinceid: ''
          }, res => {
            console.log(res.data)
            this.setData({
              order_price: res.data.money,
              order_xiaofei: 0,
              order_baoxian_price: 0,
              order_dingjin:res.data.dingjin
            })
            this.allMoney()
          })
        }
      }
      this.setData({
        cardList: cardList,
        cardList_: res.data
      })
    })
  },

  // 选择 板车类型
  bindPickerChange(e) {
    console.log(this.data.cardList_,e.detail.value)
    console.log(this.data.cardList_[e.detail.value])
    api.computeFee({
      trailer_type: this.data.cardList_[e.detail.value].id,
      distance: wx.getStorageSync('order_luxian_info').paths[0].distance / 1000,
      hour: '',
      provinceid: ''
    }, res => {
      this.setData({
        cardList_index: e.detail.value,
        order_price: res.data.money
      })
      this.setData({
        order_h_card: ((wx.getStorageSync('order_luxian_info').paths[0].distance / 1000) / this.data.cardList_[e.detail.value].speed).toFixed(2),
        // order_dingjin: ((wx.getStorageSync('order_luxian_info').paths[0].distance / 1000) * this.data.cardList_[e.detail.value].price).toFixed(2) * (this.data.dingjin_rate / 100).toFixed(2),
        leiixngShow:false
      })
      this.allMoney()
    })
    console.log(this.data.order_price)
    // order_price: ((wx.getStorageSync('order_luxian_info').paths[0].distance / 1000) * this.data.cardList_[e.detail.value].price).toFixed(2),
    api.computeFee({
      trailer_type: this.data.cardList_[e.detail.value].id,
      distance: wx.getStorageSync('order_luxian_info').paths[0].distance / 1000,
      hour: '',
      provinceid: ''
    }, res => {
      console.log(res.data)
      this.setData({
        order_dingjin:res.data.dingjin
      })
    })
  },

  // 选择 支付
  bindPayChange(e) {
    // if (e.detail.value == 1) {
    //   this.setData({
    //     order_dingjin: (this.data.order_price * (this.data.dingjin_rate / 100)).toFixed(2),
    //   })
    // }
    this.setData({
      payType_index: e.detail.value,
      payShow:false
    })
    this.allMoney()
  },

  // 获取平台保险
  huoquBaoxian() {
    api.baoxian({}, res => {
      var data = res.data
      for (var i in data) {
        data[i]['check'] = false
      }
      this.setData({
        insuranceList: data
      })
    })
  },

  // 获取配置 -定金比例
  huoquType() {
    api.setting({
      key: 'dingjin_rate'
    }, res => {
      this.setData({
        dingjin_rate: res.data.data,
        // order_dingjin: ((wx.getStorageSync('order_luxian_info').paths[0].distance / 1000) * this.data.cardList_[this.data.cardList_index].price).toFixed(2) * (res.data.data / 100).toFixed(2)
      })
    })
  },

  // 获取特殊要求
  huoquTeshuyaoqiu() {
    api.getRequirement({}, res => {
      var data = res.data
      var otherList = []
      for (var i in data) {
        otherList.push(data[i].name)
        data[i]['check'] = false
      }
      this.setData({
        otherList: otherList,
        otherList_: data
      })
    })
  },

  getData() {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    this.setData({
      o_data: year + "-" + month + "-" + day,
      o_time_start: hour + ":" + minute,
      o_time_end: hour + ":" + minute
    })
  },

  // 获取订单 日期
  bindDateChange(e) {
    this.setData({
      o_data: e.detail.value,
      timeShow:false
    })
  },

  // 获取订单 时间 开始
  bindTimeChange_s(e) {
    this.setData({
      o_time_start: e.detail.value
    })
  },

  // 获取订单 时间 结束
  bindTimeChange_e(e) {
    this.setData({
      o_time_end: e.detail.value
    })
  },

  // 获取拖车车型
  getCardType(e) {
    this.setData({
      cardType: e.detail.value
    })
    this.allMoney()
  },

  // 订单展示地图 
  stretchIcon_order() {
    if (this.data.ordre_top == 178) {
      this.setData({
        ordre_top: 850
      })
    } else {
      this.setData({
        ordre_top: 178
      })
    }
  },

  // 选择保险
  choice_baoxian(e) {
    var insuranceList = this.data.insuranceList
    var order_baoxian_price = 0
    insuranceList[e.currentTarget.dataset.index].check = !insuranceList[e.currentTarget.dataset.index].check
    for (var i in insuranceList) {
      if (insuranceList[i].check == true) {
        order_baoxian_price = order_baoxian_price + Number(insuranceList[i].price)
      }
    }
    this.setData({
      insuranceList: insuranceList,
      order_baoxian_price: order_baoxian_price
    })
    this.allMoney()
  },

  // 获取 小费
  huoquXiaofei(e) {
    if (Number(e.detail.value) > 0) {
      this.setData({
        order_xiaofei: e.detail.value
      })
    } else {
      this.setData({
        order_xiaofei: ''
      })
    }
    this.allMoney()
  },

  // 特殊要求
  bindTeshuChange(e) {
    var otherList_ = this.data.otherList_
    otherList_[e.detail.value].check = !otherList_[e.detail.value].check
    this.setData({
      otherList_: otherList_
    })
  },

  // 获取备注
  huoquBeizhu(e) {
    this.setData({
      ordre_beizhu: e.detail.value
    })
  },

  // 计算订单总费用
  allMoney() {
    if (this.data.payType_index == 0) {
      this.setData({
        order_pay_money: (Number(this.data.order_price) + Number(this.data.order_baoxian_price) + Number(this.data.order_xiaofei)).toFixed(2)
      })
      return
    } else if (this.data.payType_index == 1) {
      this.setData({
        order_pay_money: (Number(this.data.order_dingjin) + Number(this.data.order_baoxian_price) + Number(this.data.order_xiaofei)).toFixed(2)
      })
      return
    } else if (this.data.payType_index == 2) {
      this.setData({
        order_pay_money: (Number(this.data.order_baoxian_price) + Number(this.data.order_xiaofei)).toFixed(2)
      })
      return
    } else {
      var money = Number(this.data.order_price) + Number(this.data.order_baoxian_price) + Number(this.data.order_xiaofei)
      this.setData({
        order_all_money: money
      })
      return
    }
  },

  // 选择装车 -起
  start_card() {
    wx.navigateTo({
      url: '/pages/order/address?type=0',
    })
  },

  // 选择卸车 -终
  end_card() {
    wx.navigateTo({
      url: '/pages/order/address?type=1',
    })
  },

  placeOrder() {
    if(!this.data.order_start_provinceid || !this.data.order_start_cityid || !this.data.order_start_areaid){
      wx.showModal({
      title: '提示',
      content: '未发发车地区，请联系管理员',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url:'/pages/my/my'
          })
        }
      }
      })
    }
    else if(!this.data.order_end_provinceid || !this.data.order_end_cityid || !this.data.order_end_areaid){
      wx.showModal({
      title: '提示',
      content: '未发收车地区，请联系管理员',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url:'/pages/my/my'
          })
        }
      }
      })
    } else{
    if(!this.data.dianShow){
      wx.showToast({
        title: '请勾选用户协议及隐私政策',
        icon:'none'
      })
      return
    }
    if(this.data.timeShow){
      wx.showToast({
        title: '请选择装车时间',
        icon:'none'
      })
      return
    }
    if(this.data.leiixngShow){
      wx.showToast({
        title: '请选择板车类型',
        icon:'none'
      })
      return
    }
    let that = this
    // 起点信息
    var start_card = wx.getStorageSync('start_card')
    var start_card_location = wx.getStorageSync('start_card').location.split(",")
    // 终点信息
    var end_card = wx.getStorageSync('end_card')
    var end_card_location = wx.getStorageSync('end_card').location.split(",")
    // 下单用户信息
    var order_info = wx.getStorageSync('order_info')
    // 保险id
    var baoxian_id = []
    for (var i in this.data.insuranceList) {
      if (this.data.insuranceList[i].check == true) {
        baoxian_id.push(this.data.insuranceList[i].id)
      }
    }

    // 特殊要求
    var teshu_id = []
    for (var i in this.data.otherList_) {
      if (this.data.otherList_[i].check == true) {
        teshu_id.push(this.data.otherList_[i].id)
      }
    }

    if (this.data.cardType == '') {
      wx.showToast({
        title: '请输入托运车型',
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: "支付中",
      icon: "loading",
      duration: 10000,
    })
    api.create({
      user_id: wx.getStorageSync('userInfo').id, // 下单人ID
      send_uid: 0, // 发货人ID
      send_mobile: order_info[1], // 发货人手机号
      // send_realname: order_info[2].realname, // 姓名
      send_realname: order_info[0],
      receive_uid: 0, // 收货人ID
      receive_realname: order_info[3], // 收货人姓名
      // receive_mobile: order_info[5].realname, // 收货人手机号
      receive_mobile: order_info[4],
      trailer_type: this.data.cardList_[this.data.cardList_index].id, // 板车类型ID
      money: this.data.order_price, // 里程费 含定金
      dingjin: this.data.order_dingjin, // 定金
      start_lat: start_card_location[1], // 起始纬度
      start_lon: start_card_location[0], // 起始经度
      start_addr: start_card.district + start_card.address, //起始地址
      start_name: start_card.name, // 起点小区
      start_city: this.data.order_start_cityid, // 起始城市
      start_pro: this.data.order_start_provinceid, // 省
      start_dis: this.data.order_start_areaid, // 区
      end_lat: end_card_location[1], // 结束纬度
      end_lon: end_card_location[0], // 结束经度
      end_addr: end_card.district + end_card.address, //结束地址
      end_name: end_card.name, // 结束小区
      end_city: this.data.order_end_cityid, // 结束城市
      end_pro: this.data.order_end_provinceid, // 省
      end_dis: this.data.order_end_areaid, // 区
      licheng: this.data.distance, // 总里程
      hour: this.data.order_h_card, // 总耗时
      zc_start_time: this.data.o_data + ' ' + this.data.o_time_start, // 装车时间
      zc_end_time: this.data.o_data + ' ' + this.data.o_time_end, // 装车时间
      chexing: this.data.cardType, // 车型
      pay_type: Number(this.data.payType_index) + 1, //支付类型 1全款 2定金+保险 3到付保险+小费
      baoxian_fee: this.data.order_baoxian_price ? this.data.order_baoxian_price : 0, // 保险费
      baoxian: baoxian_id.toString(), // 选的保险ID
      xiaofee: this.data.order_xiaofei, // 小费
      mark: this.data.ordre_beizhu, // 备注
      result: JSON.stringify(wx.getStorageSync('points')), // 规划路线result
      requirement_ids: this.data.teshu, // 特殊要求ID 1,2
      pay_money: this.data.order_pay_money, // 下单需支付
    }, res => {
      console.log(res)
      this.setData({
        orderid: res.data.id
      })
      if (res.code == 200) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res) {
            wx.hideLoading();
            wx.showToast({
              title: '支付成功',
              duration: 1000
            })
            setTimeout(function () {
              wx.switchTab({
                url: 'order',
              })
            }, 1000)
          },
          fail: function (res) {
            // fail
            console.log(that.data.order_pay_money)
            if (that.data.order_pay_money == 0) {
              wx.hideLoading();
              wx.switchTab({
                url: '/pages/order/order',
              })
              wx.showToast({
                title: '下单成功',
                icon: 'none'
              })
            } else {
              wx.hideLoading();
              wx.switchTab({
                url: '/pages/order/order',
              })
              wx.showToast({
                title: '取消订单',
                icon: 'none'
              })
            }
          },
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  }
  },
  //去支付
  placeOrder2(e) {
    api.orderPay2({
      id: this.data.orderid,
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
            wx.switchTab({
              url: 'order',
            })
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