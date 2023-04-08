import json1 from "../../util/1"
import json2 from "../../util/2"
import json3 from "../../util/3"
import json4 from "../../util/4"
import json5 from "../../util/5"
// pages/words/words.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jsons:[],
    bookId: 0,
    words: [],
    selectedWords: [],
    selectGrade:
      [
        ["七年级上册","七年级下册", "八年级上册","八年级下册","九年级全一册"],
        ["一单元","二单元","三单元","四单元","五单元","六单元",
        "七单元","八单元","九单元","十单元","十一单元","十二单元"]
      ],
    selectIndex:[0,0],
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
    this.data.jsons.push(json1,json2,json3,json4,json5)
    this.setData({
      words: this.data.jsons,
      selectedWords: this.data.jsons[this.data.bookId-1].filter(word=>word.unit==1),
      selectIndex:[this.data.bookId-1,0]
    })
    let time = new Date("2023-04-10 19:00:00");
    let times = new Date()
    this.setData({
      ischeck: times<time?true:false
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
  bindMultiPickerChange:function(e) {
    this.data.grade = e.detail.value[0] + 1 
    this.data.unit = e.detail.value[1] + 1
    console.log(this.data.grade, this.data.unit);
    this.setData({
      selectedWords : this.data.words[this.data.grade-1].filter(
        (word) => {
          return word.unit==this.data.unit
        }
      )
    })
  },
  playAudio : function(e) {
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement:true
    })
    innerAudioContext.src = e.currentTarget.dataset.src
    innerAudioContext.play()
  }
})