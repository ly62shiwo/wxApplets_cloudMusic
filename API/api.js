const API_BASE_URL = "http://localhost:4000";

const request = (url, data) => {
  let _url = API_BASE_URL + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success(request) {
        resolve(request.data);
      },
      fail(error) {
        reject(error);
      },
    });
  });
};

module.exports = {
  //获取所有榜单
  getTopLists: (data) => {
    return request("/toplist", data);
  },
  // 榜单内容摘要
  getTopListDetail: (data) => {
    return request("/toplist/detail", data);
  },
  // 歌单详情
  getPlayListDetail: (data) => {
      return request(`/playlist/detail?id= + ${data}`)
  }
};
