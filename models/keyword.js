import {HTTP} from "../util/http-p.js"
class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory(){
    const words = wx.getStorageSync(this.key)  
    if(!words){
      return []
    }else{
      return words
    }
     
  }


  addToHistory(keyword){
    let words = this.getHistory()
    const has = words.includes(keyword)
    if(!has){
      const length = words.length
      if(length>=this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}
export {KeywordModel}