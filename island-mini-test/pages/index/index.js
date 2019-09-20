// pages/index/index.js
import {Base64} from 'js-base64'  //导入base64包
var _this=this;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this=this
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

  },
  onGetToken(){
    wx.login({
      success: (res)=>{
        if(res.code){
          wx.request({
            url: 'http://localhost:3000/v1/token/login',
            data: {
              account:res.code,
              type:100
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: (res)=>{
              console.log(res.data)
              const code=res.statusCode.toString()
              if(code.startsWith('2')){
                wx.setStorageSync('token', res.data.token)
              }
            },
          })
        }
      }
    })
  },
  onVerifyToken(){
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      data: {
        token:wx.getStorageSync('token'),
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res)=>{
        console.log(res.data)
      },
    })
  },
  onGetLatest(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/latest',
      method: 'GET', 
      header:{
        Authorization:_this._encode()
      },
      success: (res)=>{
        console.log(res.data)
      },
    })
  },
  onGetLatestPrevioust(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/5/previous',
      method: 'GET', 
      header:{
        Authorization:_this._encode()
      },
      success: (res)=>{
        console.log(res.data)
      },
    })
  },
  onGetLatestNext(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/8/next',
      method: 'GET', 
      header:{
        Authorization:_this._encode()
      },
      success: (res)=>{
        console.log(res.data)
      },
    })
  },
  onGetLatestDetail(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/4/200',
      method: 'GET', 
      header:{
        Authorization:_this._encode()
      },
      success: (res)=>{
        console.log(res.data)
      },
    })
  },
  onGetLatestFavor(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/100/1/favor',
      method: 'GET', 
      header:{
        Authorization:_this._encode()
      },
      success: (res)=>{
        console.log(res.data)
      },
    })
  },
  _encode(){
    //basic auth 传输令牌需要加密
    //account:password 模式加密
    //token:
    const token = wx.getStorageSync('token')
    const base64=Base64.encode(token+':')
    return 'Basic '+base64
  },
  onlike(){
    console.log("onlike触发")
    wx.request({
      url: 'http://localhost:3000/v1/like/add',
      method: 'POSt', 
      header:{
        Authorization:_this._encode()
      },
      data:{
        art_id:1,
        type:100
      },
      success: (res)=>{
        console.log(res.data)
      },
    })
  },
  onLikeCancel(){
    console.log("onLikeCancel触发")
    wx.request({
      url: 'http://localhost:3000/v1/like/cancel',
      method: 'POSt', 
      header:{
        Authorization:_this._encode()
      },
      data:{
        art_id:1,
        type:100
      },
      success: (res)=>{
        console.log(res.data)
      },
    })
  }
})