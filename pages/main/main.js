const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    times:0,
    min:0,
    list: []
  },
  timer:0,
  breastfeed:{list:[]},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.breastfeed = wx.getStorageSync('breastfeed') || { list: [] };
    this.transfer();
  },

  transfer:function(){
    if (this.breastfeed.list && this.breastfeed.list.length) {
      var temp = [];
      var currm ;
      console.log(this.breastfeed);
      for (var i = this.breastfeed.list.length-1;i>=0;i--) {
        if (this.breastfeed.list.length - i>10)break;
        if(currm!=this.breastfeed.list[i].date.split(' ')[0]){
          currm = this.breastfeed.list[i].date.split(' ')[0];
          temp.push({day:currm});
        }
        temp.push({
          min: Math.floor(this.breastfeed.list[i].times / 60),
          times: this.breastfeed.list[i].times,
          per: Math.ceil(this.breastfeed.list[i].times/18),
          date: this.breastfeed.list[i].date.split(' ')[1]
        });
      }
      this.setData({
        list: temp
      });
    }
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