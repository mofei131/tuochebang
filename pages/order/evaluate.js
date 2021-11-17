Page({

  /**
   * 页面的初始数据
   */
  data: {
    starNumber: 0,
    pric: [
      'http://hlstore.yimetal.cn/img/ticheng_bg.png'
    ],
    id: '12408372859'
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

  // 评价 -星
  evaluateStar(e) {
    this.setData({
      starNumber: e.currentTarget.dataset.num
    })
  },

  uplodeImg() {
    var that = this;
    wx.chooseImage({
      count: 4,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
      }
    })
  },

  // 删除 -图片
  delImg(e) {
    var that = this
    var pric = that.data.pric
    var index = e.currentTarget.dataset.index
    pric.splice(index, 1)
    that.setData({
      pric: pric
    })
  }
})