import {
  HTTP
} from '../util/http.js'
//ClassicModel 子类继承HTTP
class ClassicModel extends HTTP {
  //从服务器获取数据
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatesIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  //封装点击获取下一个数据
  getNext(index, sCallback) {
    this.getClassic(index, 'next', sCallback)
  }
   //封装点击获取上一个数据
  getPrevious(index, sCallback) {
    this.getClassic(index, 'previous', sCallback)
  }

  //判断获取
  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    //从storage中同步获取数据
    let classic = wx.getStorageSync(key)
    //classic如果为空则从新从服务器获取数据
    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          //将获取到的数据存到storage中
          wx.setStorageSync(this._getKey(res.index),res)
          //回调函数返回数据
          sCallback(res)
        }
      })
      //否则直接返回数据
    } else {
      sCallback(classic)
    }

  }
  //判断示范是最新 传入index
  isFirst(index) {
    return index == 1 ? true : false
  }
  //判断是否是最后
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  getMyFavor(success){
    const params = {
      url:'classic/favor',
      success:success
    }
    this.request(params)
  }


  //将属性名为latest 值为index的最后的数据存入storage中
  _setLatesIndex(index) {
    wx.setStorageSync('latest', index)
  }
  //从storage中读取latest
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  //自定义属性值
  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}
export {
  ClassicModel
}