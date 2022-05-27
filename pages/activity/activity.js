// pages/activity/activity.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchvalue: '', //搜索内容
    tabactive: 0, //当前选中标签的索引
    activities: [], //活动列表
    showEngage: false, //是否展示参与弹窗
    steps: [{
        text: '步骤一',
        desc: '确认信息',
      },
      {
        text: '步骤二',
        desc: '完成参与',
      },
      {
        text: '步骤三',
        desc: '活动推荐',
      }
    ],
    stepactive: 0, //当前步骤
    activityselected: '', //当前选中的活动
    uid:'',
    showRecommend:true,
    engagedactivities:[],//已参与活动
    showrate:false, //是否展示评分弹窗
    rateeid:'',//待评价的活动id
    ratevalue:0, //评分
    UserRecommendList:[],//基于用户的推荐列表
    ThemeRecommendList:[],//基于主题的推荐列表
  },
  getRecommendbasedUser(){
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
    var URL = app.globalData.url + "activity" + "?funct=5";
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        this.setData({
          UserRecommendList:res.data
        })
        console.log(res.data)
      }
    })
  },
  getRecommendbasedTheme(){
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
    var URL = app.globalData.url + "activity" + "?funct=6&aid=" + this.data.activityselected.aid;
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        this.setData({
          ThemeRecommendList:res.data
        })
        console.log(res.data)
      }
    })
  },
  submitRate(){
    this.setData({
      showrate:false
    })
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
    var URL = app.globalData.url + "activity" + "?funct=4&eid=" + this.data.rateeid + "&rate=" + this.data.ratevalue*2;
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
      }
    })
    this.getEngagedActivities()
  },
  showRate(event){
    wx.navigateTo({
      url: '/pages/put/put?id=1&funct=1&blockid=1&itemid=' + event.currentTarget.dataset.eid,
    })
    // this.setData({
    //   showrate: true,
    //   rateeid:event.currentTarget.dataset.eid
    // }
    // )
  },
  getEngagedActivities(){
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
    var URL = app.globalData.url + "activity" + "?funct=3";
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        this.setData({
          engagedactivities: res.data
        })
        console.log(this.data.engagedactivities)
      }
    })
  },
  submitEngage(){
    this.setData({
      stepactive: this.data.stepactive + 1
    })
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
    var URL = app.globalData.url + "activity" + "?funct=2&aid=" + this.data.activityselected.aid;
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        //console.log(res.data)
        this.getEngagedActivities()
        wx.showToast({
          title: '完成参与',
          icon: 'success'
        })
      }
    })
  },
  onSearch() {
    console.log(this.data.searchvalue)
    this.getSearchActivity()
  },
  onTabChange(event) {
    this.setData({
      tabactive: event.detail
    })
    if(event.detail == 1)
    this.getEngagedActivities()
    console.log(this.data.tabactive)
  },
  getSearchActivity() {
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
    var URL = app.globalData.url + "activity" + "?funct=1&search=" + this.data.searchvalue;
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.setData({
          activities: res.data,
          showRecommend:false
        })
      }
    })
  },
  nextstep() {
    this.setData({
      stepactive: this.data.stepactive + 1
    })
  },
  showPopup(event) {
    this.setData({
      showEngage: true,
      activityselected: event.currentTarget.dataset.activity
    })
    this.getRecommendbasedTheme()
  },
  onClosePopup(){
    this.setData({
      showEngage:false,
      stepactive:0,
      activityselected:'',
    })
  },
  getAllActivity() {
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
    var URL = app.globalData.url + "activity" + "?funct=0";
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.setData({
          activities: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllActivity()
    this.getRecommendbasedUser()
    this.setData({
      uid:wx.getStorageSync('uid')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var arr =  app.globalData.index
    arr.forEach(function(element) {
      if(element.id == 3)
      element.times ++
    });
    console.log(arr)
    app.globalData.index = arr
    wx.setStorageSync('index', app.globalData.index)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})