// pages/signIn/fapiao.js
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
    imgx:true,
    imgx2:true,
    comp:'',
    shuicode:'',
    address:'',
    mobile:'',
    bank:'',
    bankcode:'',
    emile:'',
    shiti:'',
    name:'',
    id:'',
    money:'',
    content:'订单结算费'
  },
  //查询提交信息
  chaxun(){
    api.invoiceInfo({
      order_id:this.data.id,
      user_id:wx.getStorageSync('userInfo').id,
    },res=>{
      console.log(res.data.invoice_head)
      this.setData({
        imgx:res.data.invoice_head == 1?'true':'false',
        comp:res.data.invoice_head == 1?res.data.unit_name:'',
        shuicode:res.data.invoice_code,
        name:res.data.invoice_head == 1?'':res.data.unit_name,
        address:res.data.reg_address,
        mobile:res.data.reg_mobile,
        bank:res.data.bank_account,
        bankcode:res.data.bank_card,
        imgx2:res.data.invoice_type == 1?'true':'false',
        emile:res.data.email,
        shiti:res.data.receive_address,
        content:res.data.content,
        money:res.data.money
      })
    })
  },
  //提交
  tijiao(){
    if(this.data.imgx){
      if(!this.data.comp){
        wx.showToast({
          title: '请填写单位名称',
          icon:'none',
          duration:1000
        })
        return
      }
      if(!this.data.shuicode){
        wx.showToast({
          title: '请填写税号',
          icon:'none',
          duration:1000
        })
        return
      }
    }else{
      if(!this.data.name){
        wx.showToast({
          title: '请填写个人姓名',
          icon:'none',
          duration:1000
        })
        return
      }
    }
    if(this.data.imgx2){
      if(!this.data.emile){
        wx.showToast({
          title: '请填写邮箱',
          icon:'none',
          duration:1000
        })
        return
      }
    }else{
      if(!this.data.shiti){
        wx.showToast({
          title: '请填地址',
          icon:'none',
          duration:1000
        })
        return
      }
    }
    let that = this
    api.applyInvoice({
      order_id:this.data.id,
      user_id:wx.getStorageSync('userInfo').id,
      invoice_head:this.data.imgx?'1':'2',
      unit_name:this.data.imgx?this.data.comp:this.data.name,
      invoice_code:this.data.shuicode,
      reg_address:this.data.address,
      reg_mobile:this.data.mobile,
      bank_account:this.data.bank,
      bank_card:this.data.bankcode,
      money:this.data.money,
      invoice_type:this.data.imgx2?'1':'2',
      email:this.data.emile,
      receive_address:this.data.shiti,
      content:this.data.content
    },res=>{
      console.log(res)
      if(res.code == 200){
        wx.showToast({
          title: '提交成功',
          duration:1000
        })
        setTimeout(function(){
          that.chaxun()
        },1000)
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:1000
        })
      }
    })
  },
  //个人名称
  setname(e){
    this.setData({
      name:e.detail.value
    })
  },
  // 实体地址
  setshiti(e){
    this.setData({
      shiti:e.detail.value
    })
  },
  //电子发票
  setemile(e){
    this.setData({
      emile:e.detail.value
    })
  },
  //注册银行卡号
  setbankcode(e){
    this.setData({
      bankcode:e.detail.value
    })
  },
  //注册银行
  setbank(e){
    this.setData({
      bank:e.detail.value
    })
  },
  //注册电话
  setmobile(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  //注册地址
  setaddress(e){
    this.setData({
      address:e.detail.value
    })
  },
  //税号
  setshuicode(e){
    this.setData({
      shuicode: e.detail.value
    })
  },
  //输入单位名称
  setcomp(e){
    this.setData({
      comp: e.detail.value
    })
  },
  //切换电子/实体
  imagex2(e){
    if(e.currentTarget.dataset.shu == 1){
      this.setData({
        imgx2:true
      })
    }else{
      this.setData({
        imgx2:false
      })
    }
  },
  // 切换单位个人
  imagex(e){
    if(e.currentTarget.dataset.shu == 1){
      this.setData({
        imgx:true
      })
    }else{
      this.setData({
        imgx:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (p) {
    this.setData({
      money:p.money,
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
    this.chaxun()
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