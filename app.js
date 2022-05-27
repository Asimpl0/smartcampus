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
        //url: "http://39.105.188.70:8080/api/",
        url: "http://127.0.0.1:8080/api/",
        notifications: [''],
        hasUserInfo: wx.getStorageSync('hasUserInfo'),
        hasLogin: wx.getStorageSync('hasLogin'),
        uid: wx.getStorageSync('uid'),
        index: [],
        forumid: 2, //从我的跳转到forum的参数
        publicKey : `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6G41LM+Z8Y4VWALkNRqQRJXGi
        24TW0QQh9uP/emYsO6onT89Qg9GH3S/exyZv7Ig5ZglwRhGbiK/0eO1Gfc7SBoZ7
        0n356CrcDFExNbcjra37I0x+N2Anur1ky++sUXku5amPLQgyTbcAAAyI1RLfi2F3
        xzn+0KoLtPZbVsXW4QIDAQAB
        -----END PUBLIC KEY-----               
`
      }
      
         if(!wx.getStorageSync('index'))
        {
            this.globalData.index=[
              {
                id:0, //课表查询
                times:0
              },
              {
                id:1, //成绩查询
                times:0
              },
              {
                id:2, //图书借阅
                times:0
              },
              {
                id:3, //活动参与
                times:0
              },
              {
                id:4, //电话查询
                times:0
              },
              {
                id:5, //维修申报
                times:0
              },
              {
                id:6, //校园社区
                times:0
              }
            ]

        }
        else
        this.globalData.index = wx.getStorageSync('index')
        
      
      
    console.log(this.globalData.hasUserInfo)
  }

})