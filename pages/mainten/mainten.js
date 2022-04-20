// pages/mainten/mainten.js
var app = getApp();
var util = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    tele: '',
    detail: '',
    show: false,
    area: "请选择区域地点",
    areas: [],
    columns: [],
    room: '',
    active: true,

    option1: [{
        text: '全部状态',
        value: 2
      },
      {
        text: '未处理',
        value: 0
      },
      {
        text: '已处理',
        value: 1
      },
    ],
    option2: [],
    value1: 2,
    value2: 0,
    status: 2,
    bdate: '全部时间',
    items: [],
    info:0
  },
  onSwitch1Change({
    detail
  }) {
    this.setData({
      status: detail
    })
    this.getDetail()
  },

  onSwitch2Change({
    detail
  }) {
    this.setData({
      bdate: this.data.option2[detail].text
    })
    console.log(this.data.bdate)
    this.getDetail()
  },
  getDetail() {
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
    var URL = app.globalData.url + "mainten" + "?funct=1" + "&status=" + this.data.status 
     + "&year=" + this.data.bdate;
     console.log(URL)
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        this.setData({
          items:res.data,
          info:res.data.length
        })
      }
    })
  },
  submit() {
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
    var URL = app.globalData.url + "mainten" + "?tele=" + this.data.tele + "&place=" + this.data.area + this.data.room + "&detail=" + this.data.detail;
    wx.request({
      url: URL,
      method: "POST",
      header: header,
      success: (res) => {
        wx.showToast({
          icon: 'success',
          title: '提交成功',
          duration: 1000
        })
        this.setData({
          active: false,
          tele: '',
          name: '',
          detail: '',
          area: '',
          room: ''
        })
        var notify = {
          text: "维修上报成功",
          time: util.formatTime(new Date())
        }
        app.globalData.notifications.push(notify)
        console.log(app.globalData.notifications)
        this.getDetail()
      }
    })
  },
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(this.data.areas)
    picker.setColumnValues(1, this.data.areas[value[0]]);
  },
  onChangeT(event) {
    // event.detail 的值为当前选中项的索引
    console.log(event.detail)
    this.setData({
      active: event.detail==0
    });
    this.getDetail()
  },
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(`当前值：${value[0]}, 当前索引：${index}`);
    this.setData({
      show: false,
      area: value[0] + value[1]
    })
  },
  onCancel() {
    this.setData({
      show: false
    })
  },
  showpicker(e) {
    this.setData({
      show: true
    })
    //console.log(this.data.show)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //获得时间
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Year = date.getFullYear();
    this.setData({
      option2: [{
          text: '全部时间',
          value: 0
        },
        {
          text: Year,
          value: 1
        },
        {
          text: Year - 1,
          value: 2
        },
        {
          text: Year - 2,
          value: 3
        },
        {
          text: Year - 3,
          value: 4
        },
      ],
    })
    var areas = {
      东校区: []
    };
    var header;
    header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var cookie = wx.getStorageSync('cookieKey'); //取出Cookie
    //若存在cookie，加入请求
    if (cookie) {
      header.Cookie = cookie;
    }
    var URL = app.globalData.url + "mainten?funct=0";
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        areas = res.data
        console.log(res.data)
        var columns = [{
            values: Object.keys(areas),
            className: 'column1',
          },
          {
            values: areas['南校区'],
            className: 'column2',
            defaultIndex: 0,
          },
        ]
        console.log(columns)
        this.setData({
          columns: columns,
          areas: areas
        })
      }
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