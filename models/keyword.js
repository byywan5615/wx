import {HTTP} from "../util/http-p.js"
class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory(){
    const words = wx.getStorageSync(this.key)  
    if(!words){
      return []
    }
      return words

     
  }


  addToHistory(keyword){
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      // 数组末尾 删除 ， keyword 数组第一位
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}
export {KeywordModel}