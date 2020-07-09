//index.js
//获取应用实例
const app = getApp();
const API = require("../../API/api");

Page({
  data: {
    topListDetail: {},
    navBarHeight: 0,
    statusBarHeight: 0,
    header:{
      title: '云音乐',
      isHome: false,
      isBack: false
    }
  },

  onLoad() {
    wx.showLoading({
      title: "加载中",
    });
    this.getTopLists();
    this.setData({
      navBarHeight: app.globalData.navBarHeight,
      statusBarHeight: app.globalData.statusBarHeight
    })
  },

  getTopLists: function () {
    // 榜单内容摘要
    API.getTopListDetail().then((res) => {
      if (res.code === 200) {
        // console.log(res.list.tracks);
        let element = res.list.splice(0, 4);
        console.log(element);
        for (let index = 0; index < element.length; index++) {
          console.log(index);
          let tracks = element[index].tracks.map((item, indexs) => {
            // element.tracks[indexs].num = index + 1;
            console.log(item, tracks);
          });
        }
        this.setData({
          topListDetail: element,
        });
      }
    });
    wx.hideLoading();
  },
  websitePlayListDetail: function (e) {
    console.log(e);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/playListDetail/playListDetail?id=" + id,
    });
  },
});
