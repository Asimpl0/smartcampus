//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    active: 0,
    search: '',
    courses: [""],
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    searchCourses:[]
  },
  onSearch(){
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
    var URL = app.globalData.url + "course?funct=1&search=" + this.data.search ;
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.setData({
          searchCourses:res.data
        })
      }

    })
  },
  onCancel() {
    this.setData({
      search: ''
    })
    this.onSearch()
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail
    });
  },
  onLoad: function () {
    this.showCourse();
    this.onSearch()
  },
  showCourse: function () {
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
    var URL = app.globalData.url + "course?funct=0";
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        var result = res.data
        console.log(result)
        this.setData({
          courses: res.data
        })
        console.log(this.data.courses)
      }

    })
  },
  onShow:function () {
    var arr =  app.globalData.index
    arr.forEach(function(element) {
      if(element.id == 0)
      element.times ++
    });
    console.log(arr)
    app.globalData.index = arr
    wx.setStorageSync('index', app.globalData.index)
  },
  showCardView: function () {

  }
})