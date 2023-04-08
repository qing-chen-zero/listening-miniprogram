
Page({

  data: {
    user: {},
    hasUserInfo: false,
    canIUseGetUserProfile: true,
    userOptions:[
      {option:"我的错题集",url:"/pages/incorrects/incorrects"},
      {option:"我的单词记录",url:"/pages/recording/recording"},
    ],
  },
  /**
   * Component methods
   */
  methods: {
    
  },
  navigateLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  onLoad(options) {

  },
  onShow() {
    try {
      const user = wx.getStorageSync('userinfo')
      console.log(user);
      if (user) {
        if (user.headImg === null) user.headImg = "defalut.jpeg"
        this.setData({
          user: user
        })
      }
    }catch(error) {
      console.log(error);
    }
  },
  toLogout() {
    this.setData({
      user:null
    })
    try {
      wx.clearStorage()
    }catch(e) {
      console.log(e);
    }
  }
})