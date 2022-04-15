// pages/call/call.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    numbers:new Map(),
    keys:[""]
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    this.search(this.data.value)
  },
  onClick() {
    this.search(this.data.value)
  },
  search(e) {
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var URL = app.globalData.url + "number" +
    "?dname=" + e;
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success:(res)=>{
        this.setData({
          numbers: res.data
        })
        console.log(this.data.numbers)
      }

    })
    
  },
  toCopy(e){
    console.log(e.currentTarget.dataset.num)
    wx.setClipboardData({
      data:e.currentTarget.dataset.num,//要复制的数据
      success (res) {
        console.log(res)
      }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.search('all');
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