import {
  BookModel
} from '../../models/book.js'

import {
  random
} from '../../util/common.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching:false,
    more:''
  },

  /**
   * 生命周期函数--监听页面加
   */
  onLoad: function (optins) {
    bookModel.getHotList()
      .then(res => {
        this.setData({
          books:res
        })
      })
    // id
  },

  onSearching(event){
    this.setData({
      searching:true
    })
  },

  onCancel(event){
    this.setData({
      searching:false
    }) 
  },

  onReachBottom(){
    this.setData({
      more:random(16)
    })
  }

  

})