// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
  },
// 登录
login(e){
  var form = e.detail.value
  console.log(form)
  if (form.uid == "" | form.pwd == "") {
    wx.showToast({
      icon: 'error',
      title: '请输入完整',
    })
    return
  }

  //开始验证登录是否正确
  var header;
  header = {
    'content-type': 'application/x-www-form-urlencoded',
  };
  //从本地读取之前获得的cookie
  var cookie = wx.getStorageSync('cookieKey'); //取出Cookie
  //若存在cookie，加入请求
  if (cookie) {
    header.Cookie = cookie;
  }
  //console.log(cookie)
  var URL = app.globalData.url +
    "login" + "?uid=" + form.uid + "&passwd=" + form.pwd;
  //console.log("login")
  wx.request({
    url: URL,
    method: "GET",
    header: header,
    success(res) {
      //如果服务器传回了cookie，保存到本地
      if (res.header['Set-Cookie']) {
        wx.setStorageSync('cookieKey', res.header['Set-Cookie']); //保存Cookie到Storage
      }
      console.log(res.header['Set-Cookie'])
      console.log(res.data)
      var result = res.data.trim()
      if (result == 'success') {
        wx.setStorageSync('is_bind', true)
        wx.showToast({
          icon: 'success',
          title: '认证成功',
          duration: 3000
        })
        wx.navigateBack({
          url:"/pages/my/my"
        })
      } else {
        wx.showToast({
          icon: 'error',
          title: '认证失败',
          duration: 3000
        })
      }
    }
  })

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

  }
})