// pages/forum/forum.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    userInfo: '', //用户信息
    iconColor: "gray",
    showpopup: true, //是否展示发帖弹窗
    showBlocks: false,
    actions: [
      {
        name: '全部版块',
        className: 0
      },
      {
        name: '交流版块',
        className: 1
      },
      {
        name: '图书版块',
        className: 2
      },
      {
        name: '活动版块',
        className: 3
      },
      {
        name: '选修课版块',
        className: 4
      },
      {
        name: '食堂版块',
        className: 5
      },
    ],
    blockname: '全部版块',
    block: 0,
    sorts: [
      '按时间排序',
      '按热度排序'
    ],
    sort: 0, //选择的排序方式
    posts: [], //所有帖子
    tagscolor: [
      '#1989fa',
      '#07c160',
      '#ee0a24',
      '#ff976a',
      '#7232dd'
    ], //标签颜色
    tagstitle:[
      '交流版块',
      '图书版块',
      '活动版块',
      '选修课版块',
      '食堂版块',
    ]
  },
  //请求帖子
  getPost() {
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
    var URL = app.globalData.url + "forum?block=" + this.data.block + "&sort=" + this.data.sort;
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.setData({
          posts: res.data
        })
      }
    })
  },
  //改变排序
  changeSort() {
    this.setData({
      sort: (this.data.sort + 1) % 2
    })
    this.getPost()
  },
  //显示板块选择弹窗
  changeBlock() {
    this.setData({
      showBlocks: true
    })
  },
  onCloseBlock() {
    this.setData({
      showBlocks: false
    })
  },
  onSelectBlock(event) {
    this.setData({
      blockname: event.detail.name,
      block: event.detail.className
    })
    this.getPost()
    console.log(event.detail);
  },
  showDetail() {
    wx.navigateTo({
      url: '/pages/post/post',
    })
  },

  //展示发帖弹窗
  showPopup() {
    this.setData({
      showpopup: true
    })
  },
  //关闭发帖弹窗
  onPopupClose() {
    this.setData({
      showpopup: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getPost()
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