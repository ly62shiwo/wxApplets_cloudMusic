const app = getApp();
Component({
  properties: {
    header: {
      type: Object,
      value: {
        title: '',
        isIndex: false,
        isSho: false
      },
    },
  },
  data: {
    navBarHeight: 0,
    statusBarHeight: 0,
  },
  methods: {
    // _goBack: function() {
    //     wx.navigateBack({
    //         delta: 1
    //     });
    // },
    // _goHome: function() {
    //     wx.switchTab({
    //         url: "/pages/index/index"
    //     });
    //     }
  },

  attached() {
    var that = this;
    that.setData({
      navBarHeight: app.globalData.navBarHeight,
      statusBarHeight: app.globalData.statusBarHeight,
    });
  },
});
