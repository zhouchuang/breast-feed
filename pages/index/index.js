//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js')

Page({
  data: {
    type:'primary',
    count: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    disabled: false,
    plain: false,
    loading: false,
    times: 0,
    min: 0,
    status: '开始'
  },
  timer: 0,
  breastfeed: { list: [] },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickHander:function(){
    if (this.data.type =='primary'){
      this.start();
    }else {
      this.end();
    }
  },
  start: function(){
    this.setData({
      status:'结束',
      type:'warn'
    });
    var num = 0;
    this.timer = setInterval(() => {
      this.setData({
        times: ++num,
        min: Math.floor(num / 60)
      });
    }, 1000);
    this.breastfeed = wx.getStorageSync('breastfeed') || { list: [] };
    var date = { date: util.formatTime(new Date()), times: new Date() };
    var dateday = util.formatDate(new Date());
    this.breastfeed.list.push(date);
    var day = this.breastfeed.day || {};
    day[dateday] = (day[dateday]||0)+1;
    this.breastfeed.day = day;
  },
  end: function () {
    clearInterval(this.timer);
    var startTime = this.breastfeed.list[this.breastfeed.list.length - 1]['times'];
    this.breastfeed.list[this.breastfeed.list.length - 1]['times'] = Math.ceil((new Date().getTime()-startTime.getTime())/1000);
    this.setData({
      list: this.breastfeed.list,
      times: 0,
      min: 0,
      status: '开始',
      type: 'primary'
    });
    wx.setStorage({
      key: 'breastfeed',
      data: this.breastfeed,
    });
    this.history();
  },
  history:function(){
    wx.navigateTo({
      url: '../main/main'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // var breastfeed = wx.getStorageSync('breastfeed')||{count:0};
    // this.setData({
    //   count:breastfeed.count
    // });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
