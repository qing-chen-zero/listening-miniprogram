
// pages/incorrects/incorrects.js
const baseUrl = "https://photo.qingchena.top/words"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    wrong_words: [],
    bookId: 0,
    grade:0,
    unit:0,
    ischeck: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    that.data.bookId = options.bookId;
    if (that.data.bookId == "undefined") {
      that.data.bookId = 1;
    }
    let time = new Date("2023-04-12 19:00:00");
    let times = new Date()
    this.setData({
      ischeck: times<time?true:false
    })
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
    let that = this
    wx.request({
      url: baseUrl + "/get_wrong_words",
      method: "POST",
      data : {
        user_id: that.data.user.id
      },
      success(res) {
        console.log(res);
        that.setData({
          wrong_words: res.data.wrong_words
        })
      }
    })
  },

  unitChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let data = {
      selectGrade : this.data.selectGrade,
      selectIndex : this.data.selectIndex
    }
    data.selectIndex[e.detail.column] = e.detail.value
    switch (e.detail.value) {
      case 0:
        data.selectGrade[1] = ["一单元","二单元","三单元","四单元","五单元","六单元",
        "七单元","八单元","九单元","十单元","十一单元","十二单元"];
        break;
      case 1:
        data.selectGrade[1] = ["一单元","二单元","三单元","四单元","五单元","六单元",
        "七单元","八单元","九单元","十单元","十一单元","十二单元"];
        break;
      case 2:
        data.selectGrade[1] = ["一单元","二单元","三单元","四单元","五单元","六单元",
        "七单元","八单元","九单元","十单元"];
        break;
      case 3:
        data.selectGrade[1] = ["一单元","二单元","三单元","四单元","五单元","六单元",
        "七单元","八单元","九单元","十单元"];
        break;
      case 4:
        data.selectGrade[1] = ["一单元","二单元","三单元","四单元","五单元","六单元",
        "七单元","八单元","九单元","十单元","十一单元","十二单元","十三单元","十四单元"];
        break;
    }
    this.setData(data)
  },
  playAudio : function(e) {
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement:true
    })
    innerAudioContext.src = e.currentTarget.dataset.src
    innerAudioContext.play()
  }
})