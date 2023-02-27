// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    textBook:[1,2,3,4,5]
  },
  onLoad() {
    
  },
  loadWords: function(e) {
    wx.navigateTo({
      url: '/pages/words/words?bookId='+e.target.id,
    })
  }
})
