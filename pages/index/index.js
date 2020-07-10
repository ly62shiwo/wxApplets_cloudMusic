//index.js
//获取应用实例
const app = getApp();
const API = require("../../API/api");

Page({
  data: {
    topListDetail: {},
    navBarHeight: 0,
    statusBarHeight: 0,
    header: {
      title: "云音乐",
      isHome: false,
      isBack: false,
    },
  },

  onLoad() {
    wx.showLoading({
      title: "加载中",
    });
    this.getTopLists();
  },

  getTopLists: function () {
    // 榜单内容摘要
    API.getTopListDetail().then((res) => {
      if (res.code === 200) {
        let element = res.list.splice(0, 4);
        // 添加排名数字
        element.map((item, index) => {
          item.tracks.map((item,index) => {
            item.num = index + 1
          })
        });
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
