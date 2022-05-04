// pages/book/book.js
var app = getApp();
var util = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:'',
    active:true,
    info:0,
    option1: [
      { text: '全部状态', value: 0 },
      { text: '可借阅', value: 1 },
      { text: '不可借阅', value: 2 },
    ],
    option2: [
      { text: '全部类型', value: 0 }      
    ],
    value1: 0,
    value2: 0,
    status: 0, //0表示全部状态，同option
    type:"全部类型",
    books:[],
    showSubmit:false,
    showRate:false,
    steps: [
      {
        text: '步骤一',
        desc: '确认信息',
      },
      {
        text: '步骤二',
        desc: '选择时间',
      },
      {
        text: '步骤三',
        desc: '完成借阅',
      },
      {
        text: '步骤四',
        desc: '相似推荐',
      }
    ],
    bookselect:'',//选择的图书信息
    stepsactive:0, //进度条展示的步骤
    columns: [1, 2, 3, 4, 5,6,7],
    dayselect:0,//选择的时间
    defaultindex:0,//时间选择默认项
    showselect:true,//是否展示时间选择
    backday:'',//最晚还书时间
    uid:app.globalData.uid,
    borrowed:[],//借书列表
    borrowedlength:0,//借书数量
    ratevalue:0.0,//评分
    rateboid:'',//评分单号
    UserRecommendList:[],//基于用户的推荐列表
    ShowUserRecommend:true,//是否展示基于用户的推荐
    ItemRecommendList:[]
  },
  //用于展示评分弹窗
  submitRate(){
    this.setData({
      showRate:false
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success'
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
    console.log(this.data.bookselect)
    var URL = app.globalData.url + "book" +
    "?funct=3&boid=" + this.data.rateboid + "&rate=" + (this.data.ratevalue)*2
    console.log(this.data.boid)
    console.log(this.data.ratevalue)
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success:(res)=>{
        console.log(res.data)
      }
    })
    //更新评分
    this.showBorrowed()
    this.setData({
      ratevalue:0
    })
  },
  showRate(event){
    console.log(event.currentTarget.dataset.book.boid)
    wx.navigateTo({
      url: '/pages/put/put?id=1&funct=1&blockid=0&itemid=' + event.currentTarget.dataset.book.boid,
    })

    // this.setData({
    //   showRate:true,
    //   rateboid:event.currentTarget.dataset.book.boid
    // })
  },
  submitBorrow(){
    wx.showToast({
      title: '借书完成',
      icon: 'success'
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
    console.log(this.data.bookselect)
    var URL = app.globalData.url + "book" +
    "?funct=1&bid=" + this.data.bookselect.bid + "&days=" + this.data.dayselect;
    console.log(this.data.bookselect.bid)
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success:(res)=>{
        console.log(res.data)
      }
    })
    this.setData({
      bookselect:'',
      stepsactive:this.data.stepsactive+1,
      showselect:true
    })
    this.showBorrowed()
  },
  finishBorrow(){
    this.setData({
      showSubmit:false,
      stepsactive:0,
      active:false,
    })
    this.showBorrowed()
  },
  showBorrowed(){
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
    var URL = app.globalData.url + "book" + "?funct=2"
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success:(res)=>{
        console.log(res.data)
        this.setData({
          borrowed:res.data,
          borrowedlength:res.data.length
        })
      }
    })
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      dayselect:value,
      showselect:false
    })
    //console.log(value)
  },

  onCancel() {
    this.setData({
      defaultindex:0
    })
  },
  onReselect(){
    this.setData({
      defaultindex:0,
      showselect:true
    })
  },
  next(){
    this.setData({
      stepsactive:this.data.stepsactive+1
    })
  },
  last(){
    var date = new Date()
    var month = date.getMonth() + 1
    var day = date.getDate()
    this.setData({
      stepsactive:this.data.stepsactive+1,
      backday: month + "月" + (day + this.data.dayselect) + "日" 
    })
    
  },
  back(){
    this.setData({
      stepsactive:this.data.stepsactive - 1
    })
  },
  showPopup(event) {
    console.log(event.currentTarget.dataset.book)
    this.setData({ 
    showSubmit: true ,
    stepsactive:0,
    bookselect:event.currentTarget.dataset.book
    });
    this.ItemRecommend()
  },

  onClose() {
    this.setData({
    showSubmit: false,
    showRate:false
    
    });
  },
  onChangeStatus(event){
    this.setData({
      status:event.detail
    })
    console.log(this.data.status)
    this.onSearch()
  },
  onChangeType(event){
    this.setData({
      type:this.data.option2[event.detail].text
    })
    console.log(this.data.type)
    this.onSearch()
  },
  onSearch(){
    this.setData({
      option2:[{ text: '全部类型', value: 0 }   ],
      ShowUserRecommend: false
    })
    console.log(this.data.book)
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
    var URL = app.globalData.url + "book" +
    "?funct=0&book=" + this.data.book + "&status=" + this.data.status + "&type=" + this.data.type;
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success:(res)=>{
        console.log(res.data)
        res.data.bookTypes.forEach((element,index) => {
          this.data.option2.push({
            text:element.btype,
            value:index +1
          })
          this.setData({
            option2:this.data.option2,
            books: res.data.bookInfos
          })
        });
        this.onShow()
      }
    })
    
  },
 //底部导航栏处理函数
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    console.log(event.detail)
    if(event.detail == 1)
      this.showBorrowed()
    this.setData({
      active: event.detail==0
    });
  },
  //基于用户的协同过滤推荐
  UserRecommend(){
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
    var URL = app.globalData.url + "book" + "?funct=4";
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success:(res)=>{
        //console.log(res.data)
        this.setData({
          UserRecommendList:res.data
        })
      }
    })
  },
  //基于用户的协同过滤推荐
  ItemRecommend(){
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
    var URL = app.globalData.url + "book" + "?funct=5&bid=" + this.data.bookselect.bid;
    //console.log("login")
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success:(res)=>{
        console.log(res.data)
        this.setData({
          ItemRecommendList:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.UserRecommend()
    this.setData({
      uid:wx.getStorageSync('uid')
    })
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