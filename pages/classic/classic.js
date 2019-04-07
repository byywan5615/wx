// pages/classic.js
import {
  ClassicModel
} from '../../models/classic.js'

import{LikeModel} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:null,
    latest:true,
    first:false,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //在页面加载钩子函数中通过classicModel实例中的封装的getLatest方法获取数据
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      //将获取的数据存入data中
      this.setData({
        classicData:res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  //接收从组件中传递过来的behavior数据
  onLike:function(event){
    let behavior = event.detail.behavior
    // console.log(behavior)
    //通过likeModel实例中封装的like方法将behavior传递给服务器
    likeModel.like(behavior,this.data.classicData.id,this.data.classicData.type)
    
  },
  //左按钮调用封装的方法
  onNext:function(event){
    this._updateClassic('next')
  },
  //右按钮调用封装的方法
  onPrevious:function(event){
    this._updateClassic('previous')
  },

  //封装通过出传入next 或 previous 获取 数据
  _updateClassic:function(nextOrPrevious){
    let index = this.data.classicData.index
    classicModel.getClassic(index,nextOrPrevious,(res)=>{
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  //封装的私有方法 获取喜欢的数据
  _getLikeStatus:function(artID,category){
    likeModel.getClassicLikeStatus(artID,category,(res)=>{
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})