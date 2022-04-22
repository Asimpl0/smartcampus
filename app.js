// app.js
App({

  onLaunch() {

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      }),
      this.globalData = {
        // url: "http://39.105.188.70:8080/api/",
        url: "http://127.0.0.1:8080/api/",
        notifications: [''],
        hasUserInfo: wx.getStorageSync('hasUserInfo'),
        hasLogin: wx.getStorageSync('hasLogin'),
        uid:wx.getStorageSync('uid')
      }
    console.log(this.globalData.hasUserInfo)
  }

})