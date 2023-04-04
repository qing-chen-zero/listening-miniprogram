let baseUrl = "http://localhost:30303"
Page({


  /**
   * Page initial data
   */
  data: {
    user: {
      headImg: "defalut.jpeg",
      username: "",
      password: "",
      repassword: ""
    },
    isRegister: false
  },

  methods: {

  },

  navigateToRegister() {
    this.setData({
      isRegister: true
    })
  },

  async registerUser() {
    let that = this;
    if (that.data.isRegister) {
      console.log(that.data.user);
      if (that.data.user.password !== that.data.user.repassword) {
        await wx.showToast({
          title: '两次密码不一致！',
          icon: 'error',
          duration: 2000
        })
        console.log(123);
        return false;
      }
      console.log(321);
    }
    wx.request({
      url: baseUrl + '/register',
      method: "POST",
      data: {
        username: that.data.user.username,
        password: that.data.user.password
      },
      success(res) {
        console.log(res);
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '/pages/user/user?user=' + that.data.user,
        })
      }
    })
  },
  changeUsername(e) {
    let type = e.target.id;
    let value = e.detail.value
    switch (type) {
      case "username":
        this.data.user.username = value;
        break;
      case "password":
        this.data.user.password = value;
        break;
      case "repassword":
        this.data.user.repassword = value;
        break;
    }
  },
  loginUser() {
    let that = this;
    wx.request({
      url: baseUrl + '/login',
      method: "POST",
      data: {
        username: that.data.user.username,
        password: that.data.user.password
      },
      success(res) {
        if (res.data.status === "true") {
          wx.showToast({
            title: '登陆成功！',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.setStorageSync('userinfo', res.data.user)
            wx.switchTab({
              url: '/pages/user/user',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: '登陆失败！请检查用户名或密码！',
            icon: 'error',
            duration: 2000
          })
        }
      },
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },
  globalData: {
    userinfo: null
  },
})