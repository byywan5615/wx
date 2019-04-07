// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first:Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:'images/triangle.dis@left.png',
    leftSrc:'images/triangle@left.png',
    disRightSrc:'images/triangle.dis@right.png',
    rightSrc:'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //自定义事件通过triggerEvent方法传递给父级
    //父级通过在标签内添加 bind:事件名 的方式接收
    onLeft(event){
      if(!this.properties.latest){
        this.triggerEvent('left', {}, {})
      }
      
    },

     //自定义事件通过triggerEvent方法传递给父级 
     //父级通过在标签内添加 bind:事件名 的方式接收
    onRight(event){
      if(!this.properties.first){
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
