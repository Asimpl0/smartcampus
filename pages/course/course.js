//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    courses:[""],
    colorArrays: [ "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"]
  },
  onLoad: function () {
this.showCourse();
    
  },
  showCourse:function() {
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
    var URL = app.globalData.url + "course";
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success:(res)=>{
        var result = res.data
        console.log(result)
        this.setData({
          courses: res.data
        })
        console.log(this.data.courses)
      }
      
    })
  },
  showCardView:function(){
    
  }
})
