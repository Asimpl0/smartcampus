// pages/put/put.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: '', //发帖内容
    type: 0, //发帖类型
    showchoice: true, //显示评分cell
    showpopup: false, //显示评分选项弹窗
    mainActiveIndex: 0, //左侧选中项的索引
    activeId: null, //右侧选中项的 id，支持传入数组
    items: [],
    itemselect: '', //选中要评分的选项的名称
    idselect: 0, //选中要评分的选项的id
    blockselect: '', //选中的版块
    blockid: 0, //选中的版块的id
    ratevalue: '', //评分值
    nochoice: true, //是否显示项目选择
    showblocks: false, //交流贴选择版块
    actions: [{
        name: '交流版块',
        className: 0
      },
      {
        name: '图书版块',
        className: 1
      },
      {
        name: '活动版块',
        className: 2
      },
      {
        name: '选修课版块',
        className: 3
      },
      {
        name: '食堂版块',
        className: 4
      },
    ],
    blockname: '全部版块'
  },
  getChoice() {
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
    var URL = app.globalData.url + "post";
    //console.log(this.data.post)
    wx.request({
      url: URL,
      method: "GET",
      header: header,
      success: (res) => {
        this.setData({
          items: res.data
        })
        console.log(res.data)
      }
    })
  },
  onClickNav({
    detail = {}
  }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
    console.log(detail.index)
  },

  onClickItem({
    detail = {}
  }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;
    this.setData({
      activeId,
      itemselect: detail.text,
      idselect: activeId,
      blockselect: this.data.items[this.data.mainActiveIndex].text,
      blockid: this.data.mainActiveIndex
    });
    this.onClose()
    console.log(this.data.activeId)
  },
  showPopup() {
    this.setData({
      showpopup: true
    });
  },
  showBlocks() {
    this.setData({
      showblocks: true
    })
  },
  onCloseBlock() {
    this.setData({
      showblocks: false,
      showchoice: false
    })
  },
  onSelectBlock(event) {
    this.setData({
      blockname: event.detail.name,
      blockid: event.detail.className,
    })
  },
  onClose() {
    this.setData({
      showpopup: false,
      showchoice: false
    });
  },
  showChoice() {
    this.setData({
      showchoice: true
    })
  },
  //发布帖子
  onPost() {
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
    var URL = app.globalData.url + "post";
    console.log(this.data.blockid)
    wx.request({
      url: URL,
      method: "POST",
      header: header,
      data: {
        'type': this.data.type,
        'post': this.data.post,
        'rate': this.data.ratevalue * 2,
        'blockid': parseInt(this.data.blockid) + 1,
        'itemid': this.data.idselect
      },
      success: (res) => {
        console.log(res.data)
        wx.switchTab({
          url: '/pages/forum/forum',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //console.log(options)
    this.getChoice()
    this.setData({
      type: options.id,
    })
    console.log(options.blockid)
    if (options.funct == 1) {
      this.setData({
        nochoice: false,
        blockid: options.blockid,
        idselect: options.itemid
      })
    }
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