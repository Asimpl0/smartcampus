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
    showpopup: false, //是否展示发帖弹窗
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
    ],
    liked:true, //是否显示可点赞
    collected:true, //是否显示可收藏
    pid:0, //点击的帖子id
    search:'', //搜索的内容
    forumid:2, //请求我的帖子收藏还是所有
    ranksorts:["高分推荐", "热度推荐"],
    ranksort:0,  //排行方式
    ranks:[], //排行榜榜单
    ranktitle: ["选修课排行榜","食堂排行榜"], 
    showitem:false, //是否展示具体物品
    item:'', //具体物品
    activeall:[], //折叠栏默认项
    alltitles:["全部选修课","全部食堂"],
    activerank:[],
    allitems:[], //所有食堂或者选修课
  },
  onChangeAll(event) {
    this.setData({
      activeall: event.detail,
    });
    this.getAll()
  },
  onChangeRank(event) {
    this.setData({
      activerank: event.detail,
    });
  },
  //获得所有食堂或选修课
  getAll(){
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
    var URL = app.globalData.url + "forum?funct=5&block=" + this.data.block;
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.setData({
          allitems:res.data
        })
      }
    })
  },
  showItem(event){
    this.setData({
      search:event.currentTarget.dataset.item,
      item:event.currentTarget.dataset.item,
      showitem:true,
      block:0
    })
    this.getPost()
  },
  getRank(){
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
    var URL = app.globalData.url + "forum?funct=3&block=" + this.data.block + "&sort=" + this.data.ranksort;
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.setData({
          ranks:res.data
        })
      }
    })
  },
  changeRank(){
    this.setData({
      ranksort: (this.data.ranksort + 1) % 2
    })
    this.getRank()
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
  //请求帖子
  getPost(e) {
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
    var URL = app.globalData.url + "forum?funct=0&block=" + this.data.block + 
    "&sort=" + this.data.sort+"&add="+ this.data.forumid + "&search=" + this.data.search;
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        console.log(res.data)
        this.setData({
          posts: res.data,
          // search:''
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
      showBlocks: true,
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
      block: event.detail.className,
      showitem: false,
      search:''
    })
    if(event.detail.className==4||event.detail.className==5)
      this.getRank()
    this.getPost()
    console.log(event.detail);
  },
  showDetail(event) {
    wx.navigateTo({
      url: '/pages/post/post?pid=' + event.currentTarget.dataset.pid,
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
    this.setData({
      forumid:app.globalData.forumid
    })
    if(app.globalData.hasUserInfo){
      this.getPost()
    }
    this.setData({
      showpopup: false,
      search:''
    })
    var arr =  app.globalData.index
    arr.forEach(function(element) {
      if(element.id == 6)
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