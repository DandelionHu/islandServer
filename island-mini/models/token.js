// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头
import {
  config
}
from '../config.js'

class Token {
  constructor() {
    this.verifyUrl = config.api_base_url + 'token/verify';
    this.tokenUrl = config.api_base_url + 'token/login';
  }

  verify() {
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer();
    } else {
      this._veirfyFromServer(token);
    }
  }

  _veirfyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function(res) {
        console.log(res)
        var valid = res.data.isValid;
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }

  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function(res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            account: res.code,
            type:100
          },
          success: function(res) {
            wx.setStorageSync('token', res.data.token);
            console.log(res)
            callBack && callBack(res.data.token);
          }
        })
      }
    })
  }
}

export {
  Token
};