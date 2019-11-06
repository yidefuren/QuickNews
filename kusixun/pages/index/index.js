//index.js
//获取应用实例
const app = getApp()
import { NewsModel } from '../../models/news.js'
let News = new NewsModel()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    news: [],
    page: 1,
    pageSize: 5
  },
  onLoad: function () {
 
    this.getKxList()

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getKxList: function() {
    News.getNewsList(this.data.page, this.data.pageSize, (data) => {
      console.log(data)
      let new_data = data.concat(this.data.news)
      this.setData({
        news: new_data
      })
    }, (err) =>{
      console.log(err)
    }, (err) => {
      console.log(err)
    })
  },
  onReachBottom: function() {
    console.log('上拉加载')
    this.setData({
      page: this.data.page + 1
    })
    this.getKxList()
  },
  onPullDownRefresh: function () {
    News.getNewsList(1, this.data.pageSize, (data) => {
      this.setData({
        news: data
      })
    }, (err) => {
      console.log(err)
    }, (err) => {
      console.log(err)
    })
    wx.stopPullDownRefresh()
  }
})
