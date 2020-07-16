//index.js
//获取应用实例
const app = getApp();
const API = require("../../API/api");

Page({
  data: {
    topListDetail: {}, // 详情歌曲
    avatarUrl: "",
    nickname: "",
    backgroundUrl: "",
    navigation: {
      description: "", // 更新时间
      coverImgUrl: "", // 图片url
      name: "", // 榜名
      playCount: "", // 播放数
    },
    header: {
      title: "歌单",
      isHome: true,
      isBack: true,
      backgroundUrl: "",
    },
  },

  onLoad(options) {
    let that = this;
    console.log(options);
    let id = options.id;
    console.log(id, "eeeeeeee");
    API.getPlayListDetail(id).then((res) => {
      if (res.code === 200) {
        console.log(res, "res");
        let { avatarUrl, nickname, backgroundUrl } = res.playlist.creator;
        // 添加排名数字
        res.playlist.tracks.map((item, index) => {
          item.num = index + 1;
        });
        console.log(backgroundUrl, "backgroundUrl");

        that.setData({
          navigation: res.playlist,
          topListDetail: res.playlist.tracks,
          avatarUrl,
          nickname,
          backgroundUrl,
        });
      }
    });
  },
  //转发
  onShareAppMessage: function (options) {
    console.log(options);
    let that = this;
    // let users = wx.getStorageSync('user');
    if (options.from === "menu") {
      //右上角转发
      return {
        title: that.data.navigation.name,
        path: "/pages/playListDetail/playListDetail",
        success: function (res) {},
      };
    } else {
      // 按钮转发
      return {
        title: that.data.navigation.name,
        path: "/pages/playListDetail/playListDetail",
        success: function (res) {},
      };
    }
  },
});
