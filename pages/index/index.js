// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more: false,
    notifications: [],
    isnull: false,
    hasLogin: false,
    functions: [{
        text: "课表查询",
        icon: "/images/course.png",
        type:"navigateTo",
        url: "/pages/course/course",
      },
      {
        icon: "/images/grade.png",
        text: "成绩查询",
        type:"navigateTo",
        url: "/pages/grade/grade"
      },
      {
        icon: "/images/book.png",
        text: "图书借阅",
        type:"navigateTo",
        url: "/pages/book/book"
      },
      {
        icon: "/images/activity.png",
        text: "活动参与",
        type:"navigateTo",
        url: "/pages/activity/activity"
      },
      {
        icon: "/images/search.png",
        text: "电话查询",
        type:"navigateTo",
        url: "/pages/call/call"
      },
      {
        icon: "/images/mainten.png",
        text: "维修申报",
        type:"navigateTo",
        url: "/pages/mainten/mainten"
      },
      {
        icon: "/images/forum_i.png",
        text: "校园社区",
        type:"switchTab",
        url: "/pages/forum/forum"
      }
    ],
    index: []
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  clearNotify() {
    app.globalData.notifications = []
    wx.setStorageSync('notifications', [])

    this.onShow()
  },
  showMore(e) {
    this.setData({
      more: !this.data.more
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
      notifications: app.globalData.notifications,
      hasLogin: app.globalData.hasLogin,
    })
    if (this.data.notifications.length == 0) {
      this.setData({
        isnull: true
      })
    }

    console.log(this.data.notifications)
    wx.setStorageSync('notifications', app.globalData.notifications)
    //计算功能显示顺序
    var arr = app.globalData.index
    function compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    }
    arr.sort(compare('times'))
    console.log(arr)
    this.setData({
      index:arr
    })
    console.log(this.data.index)
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