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
    searchHistoryList: [],
    showSearchHistory: ''
  },

  getSearchHistoryList() {
    let that = this;
    let list = wx.getStorageSync("searchHistory");
    console.log(list);
    that.setData({
      searchHistoryList: list,
      showSearchHistory: 0
    });
  },
  onLoad() {
    let that = this;
    that.getSearchHistoryList();
  },

  searchSongName: function (e) {
    let that = this;
    console.log(e.detail.value);
    clearTimeout(timer);
    timer = setTimeout(() => {
      that.getSearchList(e.detail.value);
    }, 1000);
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
        that.getSearchHistoryList();
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
      // 热搜
      API.searchHotDetail().then((res) => {
        if (res.code === 200) {
          res.data.map((item, index) => {
            item.num = index + 1;
          });
          that.getSearchHistoryList();
          that.setData({
            hotSearchDetail: res.data,
            showIndex: 1,
          });
        }
      });
    } else {
      API.getSearch(e).then((res) => {
        if (res.code === 200) {
          let searchHistory = wx.getStorageSync("searchHistory") || [];
          searchHistory.unshift(e);
          wx.setStorageSync("searchHistory", searchHistory);
          console.log(res, that.data.songName, searchHistory);
          that.setData({
            searchList: res.result.songs,
            showIndex: 0,
            songName: e,
            showSearchHistory: 1
          });
        }
      });
    }
  },
  delHistory: function () {
    let that = this;
    wx.clearStorage("searchHistory");
    that.setData({
      searchHistoryList: [],
      showSearchHistory: 1
    });
  },
  searchHistorySong: function (e) {
    let that = this;
    console.log(e, "eee");
    let name;
    if (typeof e.currentTarget.dataset.item == "object") {
      name = e.currentTarget.dataset.item.searchWord;
      let searchHistory = wx.getStorageSync("searchHistory") || [];
      searchHistory.unshift(name);
      wx.setStorageSync("searchHistory", searchHistory);
    } else {
      name = e.currentTarget.dataset.item;
    }
    API.getSearch(name).then((res) => {
      if (res.code === 200) {
        that.setData({
          searchList: res.result.songs,
          showIndex: 0,
          songName: name,
          showSearchHistory: 1
        });
      }
    });
  },
});
