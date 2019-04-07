// components/classic/music/index.js
import {
  classicBeh
} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  // behaviors 重复使用组件中的数据，方法，生命周期函数
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached: function(event) {
    this._recoverStatus()
    this._monitorSwitch()
  },
  detached: function() {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event) {
      //图片切换
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    //判断当前是否有音乐
    _recoverStatus: function() {
      //如果没有playing状态变为false
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        //结束此函数
        return
      }
      //如果播放地址与porperties属性中的src相同playing状态变为true
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })

    }
  }
})