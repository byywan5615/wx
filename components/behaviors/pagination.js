const paginationBev = behavior({
  data:{
    dataArray: [],
    total:0
  },
  methods:{
    setMoreData(dataArray) {
      const temArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray:temArray
      })
    },

    getCurrentStart(){
      return this.data.dataArray.length
    },
    setTotal(total){
      this.data.total = total
    },

    hasMore(){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }else{
        return true
      }
    }
  }
})

export {paginationBev}