import json1 from "../../util/1"
import json2 from "../../util/2"
import json3 from "../../util/3"
import json4 from "../../util/4"
import json5 from "../../util/5"
const query = wx.createSelectorQuery()
const pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
const baseUrl = "http://47.113.148.129:30303/"
// pages/words/words.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jsons: [],
    bookId: 0,
    words: [],
    selectedWords: [],
    selectGrade: [
      ["七年级上册", "七年级下册", "八年级上册", "八年级下册", "九年级全一册"],
      ["一单元", "二单元", "三单元", "四单元", "五单元", "六单元",
        "七单元", "八单元", "九单元", "十单元", "十一单元", "十二单元"
      ]
    ],
    selectIndex: [0, 0],
    grade: 1,
    unit: 1,
    wordNum: [{
        num: 10,
        color: "#ffca28"
      },
      {
        num: 15,
        color: "#ffca28"
      },
      {
        num: 20,
        color: "#ffca28"
      },
      {
        num: 30,
        color: "#ffca28"
      }
    ],
    randomWords: [],
    currentWord: [],
    answer: [], // 记录用户答案
    index: 0,
    maxIndex: 0,
    inputFocus: [],
    focus: true,
    focusIndex: 0,
    wrongTimes: 3,
    isCorrect: false,
    isShowAnswer: false,
    answerWord: "",
    infoMessage: "",
    user: null,
    showNextWord: false, // 展示下一个单词按钮
    canSubmit:false,
    ischeck: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    that.data.bookId = 1;
    this.data.jsons.push(json1, json2, json3, json4, json5)
    this.setData({
      words: this.data.jsons,
      selectedWords: this.data.jsons[this.data.bookId - 1].filter(word => word.unit == 1),
      selectIndex: [this.data.bookId - 1, 0]
    })
    let time = new Date("2023-04-10 19:00:00");
    let times = new Date()
    this.setData({
      ischeck: times<time?true:false
    })

  },

  // 切换单词时
  unitChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let data = {
      selectGrade: this.data.selectGrade,
      selectIndex: this.data.selectIndex
    }
    data.selectIndex[e.detail.column] = e.detail.value
    switch (e.detail.value) {
      case 0:
        data.selectGrade[1] = ["一单元", "二单元", "三单元", "四单元", "五单元", "六单元",
          "七单元", "八单元", "九单元", "十单元", "十一单元", "十二单元"
        ];
        break;
      case 1:
        data.selectGrade[1] = ["一单元", "二单元", "三单元", "四单元", "五单元", "六单元",
          "七单元", "八单元", "九单元", "十单元", "十一单元", "十二单元"
        ];
        break;
      case 2:
        data.selectGrade[1] = ["一单元", "二单元", "三单元", "四单元", "五单元", "六单元",
          "七单元", "八单元", "九单元", "十单元"
        ];
        break;
      case 3:
        data.selectGrade[1] = ["一单元", "二单元", "三单元", "四单元", "五单元", "六单元",
          "七单元", "八单元", "九单元", "十单元"
        ];
        break;
      case 4:
        data.selectGrade[1] = ["一单元", "二单元", "三单元", "四单元", "五单元", "六单元",
          "七单元", "八单元", "九单元", "十单元", "十一单元", "十二单元", "十三单元", "十四单元"
        ];
        break;
    }
    this.setData(data)
  },
  // 当选择器picker改变时，进行单元的设置
  bindMultiPickerChange: function (e) {
    this.data.grade = e.detail.value[0] + 1
    this.data.unit = e.detail.value[1] + 1
    console.log(this.data.grade, this.data.unit);
    this.setData({
      selectedWords: this.data.words[this.data.grade - 1].filter(
        (word) => {
          return word.unit == this.data.unit
        }
      )
    })
  },
  // 选择单词数量时，调用方法请求新的单词数据
  async changeWordNum(e) {

    this.data.wordNum = e.target.dataset.num
    let that = this;
    // 生成单词数据
    await wx.request({
      url: baseUrl + '/random_words',
      method: "GET",
      data: {
        grade: that.data.grade,
        unit: that.data.unit,
        num: that.data.wordNum,
        user_id: that.data.user.id
      },
      success(res) {
        that.setData({
          randomWords: res.data,
          currentWord: res.data[that.data.index].word.replace(pattern, "").split(""),
          isShowAnswer: false,
        }, () => {
          that.setData({
            maxIndex: that.data.randomWords.length,
            answer: new Array(that.data.currentWord.length)
          })
          that.data.inputFocus[0] = true
        })
      },
    });
  },
  // 进行光标移动
  ValidatePassKey(e) {
    let index = e.target.id
    let value = e.detail.value
    this.data.answer[index] = value
    if (value !== "") {
      this.setData({
        focusIndex: Number(index) + 1,
      })
    }
  },
  // 点击播放音频
  playAudio: function (e) {
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: true
    })
    innerAudioContext.src = e.currentTarget.dataset.src
    innerAudioContext.play()
  },

  // 提交单词数据
  async sumbitWord(e) {
    // 将this指针赋值给that
    let that = this
    // 写入的单词
    let inputAnswer = this.data.answer.toString().toLowerCase().replaceAll(",", "")
    // 正确答案
    let currentAnswer = this.data.currentWord.toString().toLowerCase().replaceAll(",", "")
    // 如果剩余可错误次数大于0 且 答案不正确 可错误次数-1
    if (inputAnswer !== currentAnswer && this.data.wrongTimes > 0) {
      this.setData({
        wrongTimes: this.data.wrongTimes - 1
      })
      wx.showToast({
        title: '答错了哦！',
        icon: 'error',
        duration: 2000
      })
    }
    if (inputAnswer !== currentAnswer && this.data.wrongTimes == 0) {
      // 如果可错误次数=0 即不能作答，记录错误单词数据

      wx.showToast({
        title: '您不能再作答了',
        icon: 'error',
        duration: 2000
      })
      this.setData({
        showNextWord: true,
        canSubmit:true
      })
      // 查看答案
      this.showAnswer()
      console.log(that.data.randomWords[that.data.index]);
      // TODO 提交错误单词接口
      wx.request({
        url: baseUrl + '/wrong_word',
        method:"POST",
        data: {
          user_id : that.data.user.id,
          word_id : that.data.randomWords[that.data.index].id
        },
        success(res) {
          console.log(res);
        }
      })
    }
    if (inputAnswer === currentAnswer) {
      // 如果 答案正确，进行下一个单词，
      wx.showToast({
        title: '正确！',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        // 当前单词清空
        currentWord: [],
        canSubmit: false
      })
      // 
      let currentIndex = this.data.index;
      this.setData({
        index: currentIndex + 1,
        currentWord: this.data.randomWords[currentIndex + 1].word.replace(pattern, "").split(""),
        answer: new Array(this.data.randomWords[currentIndex + 1].word.replace(pattern, "").split("").length),
        focusIndex: 0,
        wrongTimes: 3,
        showAnswer: false,
        showNextWord: false,
      })
    }
    if (this.data.index == this.data.maxIndex - 1) {
      this.setData({
        infoMessage: "您已经完成了全部单词的听写"
      })
    }
  },
  showAnswer() {
    this.setData({
      isShowAnswer: true,
      answerWord: this.data.currentWord.toString().replaceAll(",", "")
    })
  },
  onShow() {
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
  },
  navigateLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  nextWord() {
    let currentIndex = this.data.index + 1;
    this.setData({
      index: currentIndex,
      currentWord: this.data.randomWords[currentIndex].word.replace(pattern, "").split(""),
      isShowAnswer: false,
      showNextWord: false,
      wrongTimes: 3,
      canSubmit: false
    })
  },
  // prevWord() {

  // }
})