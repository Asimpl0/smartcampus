var util = require('../../utils/time.js');
var app = getApp();
var lineChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    enteryear: 2018,
    year: 2018,
    semester: 0 ,//0表示总学年 1表示第一学期 2表示第二学期,
    scores:[""]
  },
  /**
   * 生命周期函数--监听页面加载   
   */
  onLoad: function (options) {
    this.showGrade();
  },
  onChangeYear: function (event) {
    this.setData({
      year: this.data.enteryear + event.detail.name
    })
    console.log(this.data.year)
    this.showGrade()
  },
  onChangeSemester: function (event) {
    this.setData({
      semester: event.detail.name
    })
    console.log(this.data.semester)
    this.showGrade()
  },
  //展示成绩
  showGrade: function () {
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
    var URL = app.globalData.url + "grade" +
    "?year=" + this.data.year + "&semester=" + this.data.semester;
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success:(res)=>{
        var result = res.data
        console.log(result)
        this.setData({
          scores: res.data
        })
        console.log(this.data.scores)
      }
      
    })
    this.onShow();
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.showGrade();
    wx.stopPullDownRefresh();
    wx.showToast({
      title: "更新完成",
      icon: "succeed",
      duration: 1000
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})