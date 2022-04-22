// pages/login/login.js
var app = getApp();
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
  },
  onClickIcon(){
    Toast('用户名为学号');
  },
  
// 登录
login(e){

  if (this.data.username == "" | this.data.password == "") {
    Toast('请输入完整');
    return
  }
  wx.setStorageSync('uid', this.data.username)
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
    "login" + "?uid=" + this.data.username + "&passwd=" + this.data.password;
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
        app.globalData.hasLogin = true
        wx.setStorageSync('hasLogin', true)
        Toast('登录成功');
        wx.navigateBack({
          url:"/pages/my/my"
        })
      } else {
        Toast('登录失败');
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