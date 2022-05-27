// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    actions: [
      { name: '获取用户信息', color: '#07c160', openType: 'getUserInfo' },
    ],
    hasUserInfo: false,
    userInfo:'',
    hasLogin:false,
    likes:0, //点赞数
  },
  toPost(){
    app.globalData.forumid = 0
    wx.switchTab({
      url: '/pages/forum/forum',
    })
  },
  toCollect(){
    app.globalData.forumid = 1
    wx.switchTab({
      url: '/pages/forum/forum',
    })
  },
  getLikes(){
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    //从本地读取之前获得的cookie
    var cookie = wx.getStorageSync('cookieKey'); //取出Cookie
    //若存在cookie，加入请求
    if (cookie) {
      header.Cookie = cookie;
    }
    //console.log(cookie)
    var URL = app.globalData.url + "forum?funct=4";
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        this.setData({
          likes: res.data
        })
      }
    })
  },
  clearLogin(){
    this.setData({
      hasLogin:false
    })
    app.globalData.hasLogin=false
    wx.clearStorageSync()
  },
  getInfo(){
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  onGetUserInfo(e) {
    this.setData({
      hasUserInfo:true,
      userInfo: e.detail.userInfo
    })
    app.globalData.hasUserInfo = true
    wx.setStorageSync('hasUserInfo', this.data.hasUserInfo)
    wx.setStorageSync('userInfo', e.detail.userInfo)
    console.log(e.detail);
    //将用户头像和昵称保存到服务器
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    //从本地读取之前获得的cookie
    var cookie = wx.getStorageSync('cookieKey'); //取出Cookie
    //若存在cookie，加入请求
    if (cookie) {
      header.Cookie = cookie;
    }
    //console.log(cookie)
    var URL = app.globalData.url + "login";
    wx.request({
      url: URL,
      method: "POST",
      header: header,
      data:{
        'nickName':this.data.userInfo.nickName,
        'avatarUrl':this.data.userInfo.avatarUrl
      },
      success:(res)=>{
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.hasUserInfo)
      this.getLikes()
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo,
      userInfo: wx.getStorageSync('userInfo'),
      
    })
    console.log(app.globalData.hasUserInfo)
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
      hasLogin:app.globalData.hasLogin
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