import {
  HTTP
}
from '../util/http-p.js'

class ClassicModel extends HTTP {
  getLatest() {
    const latest = this.request({
      url: 'classic/latest'
    })
    latest.then(res => {
      this._setLatestIndex(res.index)
      const key = this._getKey(res.index)
      wx.setStorageSync(key, res)
    })
    return latest
  }

  getClassic(index, nextOrPrevious) {
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key
    let key = nextOrPrevious == 'next' ?
      this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      classic = this.request({
        url: `classic/${index}/${nextOrPrevious}`
      })
      classic.then(res => {
        wx.setStorageSync(this._getKey(res.index), res)
      })
    }
    return Promise.resolve(classic)
  }


  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }


  getMyFavor(success) {
    return this.request({
      url: 'classic/favor'
    })
  }

  getById(cid, type, success) {
    return this.request({
      url: `classic/${type}/${cid}`
    })
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    const index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    const key = 'classic-' + index
    return key
  }
}


export {
  ClassicModel
}