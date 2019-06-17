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
  start: 0,
  size:30,
  timer:0,
  breastfeed:{list:[]},
  canload:true,
  currm:null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.start = 0;
    this.canload = true;
    this.breastfeed = wx.getStorageSync('breastfeed') || { list: [] };
    this.transfer();
  },

  transfer:function(){
    if (this.breastfeed.list && this.breastfeed.list.length) {
      var temp = [];
      // for (var i = this.breastfeed.list.length-1;i>=0;i--) {
      for (var i = this.breastfeed.list.length - 1 - this.start * this.size; i >= this.breastfeed.list.length - 1 - this.start - this.size*(this.start+1);i--){
        if(i<0){
          this.canload = false;
          break;
        }
        if(this.currm!=this.breastfeed.list[i].date.split(' ')[0]){
          this.currm = this.breastfeed.list[i].date.split(' ')[0];
          temp.push({ day: this.currm});
        }
        temp.push({
          min: Math.floor(this.breastfeed.list[i].times / 60),
          times: this.breastfeed.list[i].times,
          per: Math.ceil(this.breastfeed.list[i].times/18),
          date: this.breastfeed.list[i].date.split(' ')[1]
        });
      }
      this.setData({
        list: this.data.list.concat(temp)
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
    if (this.canload){
      this.start++;
      this.transfer();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})