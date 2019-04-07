import {HTTP} from '../util/http.js'

class LikeModel extends HTTP{
  //喜欢组件喜欢或者不喜欢通过POST方式向服务器发送数据不需要回调函数
  like(behavior,artID,category){
    let url = behavior === 'like'?'like':'like/cancel'
    this.request({
      url:url,
      method:'POST',
      data:{
        art_id:artID,
        type:category
      }
    })
  }

  //获取喜欢数据传入三个参数
  getClassicLikeStatus(artID,category,sCallback){
    this.request({
      url:'classic/'+ category + '/' + artID + '/favor',
      success:sCallback
    })
  }
}

export {LikeModel}