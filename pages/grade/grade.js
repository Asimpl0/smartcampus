var util = require('../../utils/time.js');
var app = getApp();
var lineChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stuId: "",
    password: "",
    jsonContent: '',
    PicURL: "",
    PicArr: [""],
    hasUserInfo: false,
    isLoading: true,
    showGraphic: true,
    painting: {},
    shareImage: '',
    isLoading: true,
    enteryear:2018,
    year:2018,
    semester:0 //0表示总学年 1表示第一学期 2表示第二学期
  },
  /**
   * 生命周期函数--监听页面加载   
   */
  onLoad: function (options) {
    //获取成绩信息
    this.GetScoreData();
  },
  onChangeYear: function(event){
    this.setData({
      year:this.data.enteryear+event.detail.name
    })
    console.log(this.data.year)
    this.showGrade()
  },
  onChangeSemester: function(event){
    this.setData({
      semester:event.detail.name
    })
    console.log(this.data.semester)
    this.showGrade()
  },
  //展示成绩
  showGrade:function(){
    this.onShow();
  },
  /**
   * 查询成绩
   */
  GetScoreData: function () {
    //用户记录都存储在缓存中，加快了打开成绩和教务网的速度，减少按量付费服务器的计费
    let user = wx.getStorageSync('user');
    let score_data = user.score_data

    if (!score_data) {
      let user = wx.getStorageSync('user');
      this.setData({
        isLoading: false,
        jsonContent: user.scores
      })
    } else {
      this.setData({
        jsonContent: score_data,
        isLoading: false
      })
      wx.showToast({
        title: "更新完成",
        icon: "succeed",
        duration: 2000
      })
      return
    }



  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.onLoad();
    wx.stopPullDownRefresh();
    wx.showToast({
      title: "更新完成",
      icon: "succeed",
      duration: 2000
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


  touchHandler: function (e) {
    // console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  }
})