// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'

import {
  paginationBev
} from '../behaviors/pagination.js'


const kewordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    hotWords: Array,
    more: {
      type: String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    // hotWords:[]
    searching: false,
    q: '',
    loading: false,
    loadingCenter:false,
    showLike:false
  },
  attached() {
    this.setData({
      historyWords: kewordModel.getHistory()
    })
    // kewordModel.getHot().then(res=>{
    //   this.setData({
    //     hotWords:res.hot
    //   })
    // })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()
          },()=>{
            this.unLocked()
          })
      }
    },

    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      if(q == undefined){
        this.setData({
          noneResult:true,
          loadingCenter:false
        })
        return
      }
      this.setData({
          q: q
      })
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          kewordModel.addToHistory(q)
          this.hideLoadingCenter()
        })
    },
    onDelete(event) {
      this._closeResult()
      this.initialize()
    },


 
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult(){
      this.setData({
        searching: false,
        q:''

      })
    },
   
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    }
  }
})