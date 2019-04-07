// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //properties中的数据是可以被外部访问的 和 数据接收的
    //properties中的数据不可以在自己observer方法中修改自己的数据
    index:{
      type:Number,
      observer:function(newVal,oldVal,changedPath){
        let val = newVal < 10 ?'0'+newVal:newVal
        this.setData({
          _index:val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',],
    year:0,
    month:'',
    _index:''
  },

  attached:function(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    
    this.setData({
      year:year,
      month:this.data.months[month]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
