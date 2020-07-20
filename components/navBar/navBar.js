const app = getApp();
Component({
  properties: {
    header: {
      type: Object,
      value: {
        title: "",
        isHome: false,
        isBack: false,
        backgroundUrl: "",
      },
    },
  },
  data: {
    navBarHeight: 0,
    statusBarHeight: 0,
  },
  methods: {
    _goBack: function () {
      wx.navigateBack({
        delta: 1,
      });
    },
    _goHome: function () {
      wx.navigateBack({
        url: "/pages/index/index",
      });
    },
  },

  attached() {
    var that = this;
    that.setData({
      navBarHeight: app.globalData.navBarHeight,
      statusBarHeight: app.globalData.statusBarHeight,
    });
  },
});
