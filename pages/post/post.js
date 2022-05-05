// pages/post/post.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid:0, //帖子编号
    item:'', //帖子内容
    liked:true, //是否显示可点赞
    collected:true, //是否显示可收藏
    showtab:true, //显示评论底栏
    showcomment:false, //显示评价输入框
    comment:'',//评价内容
    comments:[], //当前帖子的评价
  },
  //发布评论
  onComment(){
    this.onClose()
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    //从本地读取之前获得的cookie
    var cookie = wx.getStorageSync('cookieKey'); //取出Cookie
    //若存在cookie，加入请求
    if (cookie) {
      header.Cookie = cookie;
    }
    //console.log(cookie)
    var URL = app.globalData.url + "posting";
    wx.request({
      url: URL,
      method: "POST",
      header: header,
      data:{
        'pid':this.data.pid,
        'comment':this.data.comment
      },
      success: (res) => {
        console.log(res.data)
      }
    })
    this.getComment()
  },
  //关闭评论弹窗，显示底栏
  onClose(){
    this.setData({
      showtab:true,
      showcomment:false
    })
  },
  //关闭底栏，显示评论弹窗
  showComment(){
    this.setData({
      showtab:false,
      showcomment:true
    })
  },
  getComment(){
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    //从本地读取之前获得的cookie
    var cookie = wx.getStorageSync('cookieKey'); //取出Cookie
    //若存在cookie，加入请求
    if (cookie) {
      header.Cookie = cookie;
    }
    //console.log(cookie)
    var URL = app.globalData.url + "posting?funct=1&pid=" + this.data.pid;
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.setData({
          comments:res.data
        })
      }
    })
  },
  getPost(){
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    //从本地读取之前获得的cookie
    var cookie = wx.getStorageSync('cookieKey'); //取出Cookie
    //若存在cookie，加入请求
    if (cookie) {
      header.Cookie = cookie;
    }
    //console.log(cookie)
    var URL = app.globalData.url + "posting?funct=0&pid=" + this.data.pid;
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.setData({
          item:res.data
        })
      }
    })
  },
  uncollectPost(event){
    this.setData({
      collected:true,
      pid: event.currentTarget.dataset.pid
    })
    this.doCollect(-1)
    this.onShow()
  },
  collectPost(event){
    this.setData({
      collected:false,
      pid: event.currentTarget.dataset.pid
    })
    this.doCollect(1)
    this.onShow()
  },
  doCollect(e){
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    //从本地读取之前获得的cookie
    var cookie = wx.getStorageSync('cookieKey'); //取出Cookie
    //若存在cookie，加入请求
    if (cookie) {
      header.Cookie = cookie;
    }
    //console.log(cookie)
    var URL = app.globalData.url + "forum?funct=2&pid=" + this.data.pid + "&do=" + e;
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.onShow()
      }
    })
  },
  unlikePost(event){
    this.setData({
      liked:true,
      pid: event.currentTarget.dataset.pid
    })
    this.doLike(-1)
  },
  likePost(event){
    this.setData({
      liked:false,
      pid: event.currentTarget.dataset.pid
    })
    this.doLike(1)
  },
  doLike(e){
    //给当前帖子的点赞数加减一
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    //从本地读取之前获得的cookie
    var cookie = wx.getStorageSync('cookieKey'); //取出Cookie
    //若存在cookie，加入请求
    if (cookie) {
      header.Cookie = cookie;
    }
    //console.log(cookie)
    var URL = app.globalData.url + "forum?funct=1&pid=" + this.data.pid + "&do=" + e;
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.onShow()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      pid:options.pid
    })
    this.getPost()
    this.getComment()
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
    this.getPost()
    this.getComment()
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