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
    searchHistoryIndex: 1,
    songName: "",
    searchHistoryList: [],

  },

  getSearchHistoryList() {
    let that = this;
    let list = wx.getStorageSync("searchHistory");
    console.log(list);
    that.setData({
      searchHistoryList: list,
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
      searchHistoryIndex: 1
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
          searchHistory.map((item, index) => {
            console.log(item, e ,"item");
            e == item ? searchHistory.splice(index,1) : ''
          });
          searchHistory.unshift(e);
          wx.setStorageSync("searchHistory", searchHistory);
          console.log(res, that.data.songName, searchHistory);
          // 添加排名数字, 歌手处理
          res.result.songs.map((item, index) => {
            let name = [];
            item.artists.map((items, indexs) => {
              name.push(items.name);
            });
            if (item.artists.length > 1) {
              let aa = name.join("/");
              item.artists = aa;
            } else {
              item.artists = name;
            }
          });
          that.setData({
            searchList: res.result.songs,
            showIndex: 0,
            songName: e,
            searchHistoryIndex: 0
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
    });
  },
  searchHistorySong: function (e) {
    let that = this;
    console.log(e, "eee");
    let name;
    if (typeof e.currentTarget.dataset.item == "object") {
      name = e.currentTarget.dataset.item.searchWord;
      let searchHistory = wx.getStorageSync("searchHistory") || [];
      searchHistory.map((item, index) => {
        console.log(item, name ,"item");
        name == item ? searchHistory.splice(index,1) : ''
      });
      searchHistory.unshift(name);
      wx.setStorageSync("searchHistory", searchHistory);
    } else {
      name = e.currentTarget.dataset.item;
    }
    that.getSearchList(name);
  },
});
