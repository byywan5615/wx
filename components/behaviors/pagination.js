const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult:false,
    loading:false
  },

  methods: {
    setMoreData(dataArray) {
      const temArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: temArray
      })
    },

    getCurrentStart() {
      return this.data.dataArray.length
    },

    setTotal(total) {
      this.data.total = total
      if(total == 0){
        this.setData({
          noneResult: true
        })
      }
    },

    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    initialize(){
      this.setData({
        dataArray:[],
        noneResult: false,
        loading:false
      })
      this.data.total = null
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    },

    isLocked() {
      return this.data.loading ? true : false
    },
  }
})

export {paginationBev}