
Page({

  data: {
    user: {},
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: true,
    userOptions:[
      {option:"我的错题集",url:""},
      {option:"我的错题集",url:""},
      {option:"我的单词记录",url:""},
    ],
    test:0,
  },
  testFunc() {
    this.setData({
      test:this.data.test+1,
    })
    console.log(this.data.test);
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
        wx.removeStorage({
          key: 'userinfo',
          success: (result) => {},
          fail: () => {},
          complete: () => {}
        })
      }
    }catch(error) {
      console.log(error);
    }
  }
})