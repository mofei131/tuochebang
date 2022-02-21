import {
  Api
} from '../../api/api.js';
var api = new Api(); //实例化 首页 对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,//总体评价
    zishu:0,
    imgpth:[],
    id:0,
    cont:'',
    idno:''
  },
  img_bind: function(event) {
    var id = event.currentTarget.dataset.item + 1;
    console.log(id)
    this.setData({
      total: id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (p) {
    this.setData({
      id:p.id,
      idno:p.idno
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

  },
  tijiao(){
    let that = this
    let an = []
    wx.showLoading({
      title: '正在提交',
  });
    for(let i in this.data.imgpth){
      wx.uploadFile({
        filePath: this.data.imgpth[i],
        url: 'https://trailer.boyaokj.cn/api/file/upload',
        name: 'file',
        success(res){
          an.push(JSON.parse(res.data).data.url)
          // console.log(an)
          setTimeout(function(){
            if(an.length == that.data.imgpth.length){
              let se =[{
                id:that.data.id,
                score:that.data.total,
                words:that.data.cont,
                images:an.toString().replace(/,/g,'|')
              }]
              console.log(se)
              api.orderjudge({
                id:that.data.id,
                score:that.data.total,
                words:that.data.cont,
                images:an.toString().replace(/,/g,'|')
              },res=>{
                wx.hideToast();
                if(res.code == 200){
                  wx.showToast({
                    title: '评价成功',
                    duration:1000
                  })
                  wx.hideLoading();
                  setTimeout(function(){
                    wx.navigateBack({
                      delta: 1
                  });
                  },1000)
                }else if(res.code == -1){
                  wx.showToast({
                    title: res.message,
                    icon:'none'
                  })
                }
              })
            }else{
              wx.showToast({
                title: '提交失败',
                icon:'none'
              })
            }
          },1500)
        } 
      })
    }
  },
  close(e){
    this.data.imgpth.splice(e.currentTarget.dataset.index,1)
    this.setData({
      imgpth:this.data.imgpth
    })
    
  },
  upload(){
    let that = this
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册
      success(res){
        that.setData({
          imgpth:res.tempFilePaths
        })
      }
    })
  },
  zishu(e){
    this.setData({
      zishu:e.detail.cursor,
      cont:e.detail.value
    })
    // console.log(e.detail.cursor)
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