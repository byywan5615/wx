//相同的propertites 或者data 生命周期函数，方法，可以用Behavior方法封装
let classicBeh = Behavior({
  properties: {
    img: String,
    content: String,
    hidden:Boolean
  },
})

export {classicBeh}