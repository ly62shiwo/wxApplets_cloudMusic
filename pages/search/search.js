//index.js
//获取应用实例
const app = getApp();
const API = require("../../API/api");
const { getSearch } = require("../../API/api");

let timer;
Page({
  data: {
    header: {
      title: "搜索",
      isHome: true,
      isBack: true,
    },
    hotSearchDetail: "",
    searchList: "",
    showIndex: "",
    songName: "",
    searchHistoryList: []
  },
  searchSongName: function (e) {
    let that = this;
    console.log(e.detail.value);
    clearTimeout(timer);
    timer = setTimeout(() => {
      that.getSearchList(e.detail.value);
    }, 500);
  },

  clearSoneName: function () {
    let that = this;
    console.log(11112345);
    that.setData({
      songName: "",
    });
    API.searchHotDetail().then((res) => {
      if (res.code === 200) {
        res.data.map((item, index) => {
          item.num = index + 1;
        });
        that.setData({
          hotSearchDetail: res.data,
          showIndex: 1,
        });
      }
    });
  },
  getSearchList: function (e) {
    let that = this;
    if (e == "") {
      API.searchHotDetail().then((res) => {
        if (res.code === 200) {
          res.data.map((item, index) => {
            item.num = index + 1;
          });
          that.setData({
            hotSearchDetail: res.data,
            showIndex: 1,
          });
        }
      });
    } else {
      API.getSearch(e).then((res) => {
        if (res.code === 200) {
          let searchHistory = wx.getStorageSync('searchHistory') || []
          searchHistory.unshift(e)
          wx.setStorageSync('searchHistory', searchHistory)
          console.log(res, that.data.songName, searchHistory);

          that.setData({
            searchList: res.result.songs,
            showIndex: 0,
            songName: e,
          });
        }
      });
    }
  },
});
