// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more: false,
    notifications:[],
    isnull:false,
    hasLogin:false
  },
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  clearNotify(){
    app.globalData.notifications = []
    wx.setStorageSync('notifications', [])
    
    this.onShow()
  },
  showMore(e){
    this.setData({
      more:!this.data.more
    })
   //console.log(this.data.more)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.notifications = wx.getStorageSync('notifications')
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
      notifications:app.globalData.notifications,
      hasLogin : app.globalData.hasLogin
    })
    if(this.data.notifications.length == 0){
        this.setData({
          isnull:true
        })
    }

    console.log(this.data.notifications)
    wx.setStorageSync('notifications', app.globalData.notifications)
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