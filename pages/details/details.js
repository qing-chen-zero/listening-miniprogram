const baseUrl = "http://47.113.148.129:30303"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedWords: [],
    ischeck: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let time = new Date("2023-04-10 19:00:00");
    let times = new Date()
    this.setData({
      ischeck: times<time?true:false
    })

    let that = this

    wx.request({
      url: baseUrl + "/get_recording_details",
      method: "POST",
      data : {
        recording_id:options.id
      },
      success(res) {
        console.log(res);
        that.setData({
          selectedWords: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    try {
      const user = wx.getStorageSync('userinfo')
      console.log("irr",user);
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
  },

})