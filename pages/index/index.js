// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more: true
  },
  showMore(e){
    this.setData({
      more:!this.data.more
    })
   //console.log(this.data.more)
  },
  toCall(e){
    wx.navigateTo({
      url: '/pages/call/call',
    })
  },
  toMainten(e){
    wx.navigateTo({
      url: '/pages/mainten/mainten',
    })
  },
  toCourse(e){
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  toGrade(e){
    wx.navigateTo({
      url: '/pages/grade/grade',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('user', app.globalData.user_data)
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

  }
})