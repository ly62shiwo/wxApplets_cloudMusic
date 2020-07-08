//index.js
//获取应用实例
const app = getApp();
const API = require("../../API/api");

Page({
  data: {
    topListDetail: {},
  },

  onLoad(options) {
    console.log(options);
    
  },

  playListDetail:function(e) {
    console.log(e,'eeeeeeee');
    
  }
});
