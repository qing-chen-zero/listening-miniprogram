// pages/recording/recording.js
const baseUrl = "https://photo.qingchena.top:30303/"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    recordings: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let that = this
    try {
      const user = wx.getStorageSync('userinfo')
      if (user) {
        if (user.headImg === null) user.headImg = "defalut.jpeg"
        this.setData({
          user: user
        })
      } else {
        this.setData({
          user: null
        })
      }
    } catch (error) {
      console.log(1, error);
    }
    if (this.data.user == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }

    wx.request({
      url: baseUrl + "/get_recording",
      method: "POST",
      data: {
        user_id: that.data.user.id
      },
      success(res) {
        console.log(res);
        that.setData({
          recordings:res.data.recordings
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})