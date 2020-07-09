//index.js
//获取应用实例
const app = getApp();
const API = require("../../API/api");

Page({
  data: {
    topListDetail: {}, // 详情歌曲
    avatarUrl: "",
    nickname: "",
    backgroundUrl:'',
    navigation: {
      description: "", // 更新时间
      coverImgUrl: "", // 图片url
      name: "", // 榜名
      playCount: "", // 播放数
    },
    header:{
      title: '',
      isHome: true,
      isBack: true
    }
  },

  onLoad(options) {
    let that = this;
    console.log(options);
    let id = options.id;
    console.log(id, "eeeeeeee");
    API.getPlayListDetail('%20+%2019723756').then((res) => {
      if (res.code === 200) {
        console.log(res, "res");
        let { avatarUrl, nickname, backgroundUrl } = res.playlist.creator;
        that.setData({
          navigation: res.playlist,
          topListDetail: res.playlist.tracks,
          avatarUrl,
          nickname,
          backgroundUrl
        });
      }
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ccc',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    
  },
});
