//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js')

Page({
  data: {
    src:'',
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
  randomImg:function(){
    return "http://47.98.158.112:8091/upload/iJob/images/baby/" + Math.ceil(Math.random() * 5) + ".jpg";
  },
  start: function(){
    this.setData({
      status:'结束',
      type:'warn',
      // src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560610916937&di=4450b682645663a7898cc17efb758ddd&imgtype=0&src=http%3A%2F%2Fwww.jiayouernv.net%2FuFile%2F18420%2Fimage%2F20161026102950191.jpg'
      src: this.randomImg()
    });
    // var num = 0;
    // this.timer = setInterval(() => {
    //   this.setData({
    //     times: ++num,
    //     min: Math.floor(num / 60)
    //   });
    // }, 1000);
    var date = { date: util.formatTime(new Date()), times: new Date() };
    var dateday = util.formatDate(new Date());
    this.breastfeed.list.push(date);
    var day = this.breastfeed.day || {};
    day[dateday] = (day[dateday]||0)+1;
    this.breastfeed.day = day;
  },
  end: function () {
    // clearInterval(this.timer);
    var startTime = this.breastfeed.list[this.breastfeed.list.length - 1]['times'];
    if (new Date().getTime() - startTime.getTime()>=60000){
      this.breastfeed.list[this.breastfeed.list.length - 1]['times'] = Math.ceil((new Date().getTime() - startTime.getTime()) / 1000);
      this.setData({
        list: this.breastfeed.list,
        times: 0,
        min: 0,
        status: '开始',
        type: 'primary',
        count: Object.keys(this.breastfeed.day).length,
        src: this.randomImg()
      });
      wx.setStorage({
        key: 'breastfeed',
        data: this.breastfeed,
      });
      // this.history();
    }else{
      this.setData({
        status: '开始',
        type: 'primary',
        count: Object.keys(this.breastfeed.day).length,
        src: this.randomImg()
      });
    }
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
        hasUserInfo: true,
        src: this.randomImg()
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          src: this.randomImg()
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            src: res.userInfo.avatarUrl
          })
        }
      })
    }
    this.breastfeed = wx.getStorageSync('breastfeed') || { list: [],day:{} };
    this.setData({
      count: Object.keys(this.breastfeed.day).length||0
    });
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
