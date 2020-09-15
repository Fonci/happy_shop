import {
  request
} from "../../request/index.js";

//Page Object
Page({
  data: {
    swiperList: [], //轮播图数据
    cataList: [], //分类数组数据
    floorList: [], //楼层导航
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getCataList();
    this.getFloorList();

  },
  // 获取轮播图数组数据
  getSwiperList() {
    //防止多次请求接口，通过request封装接口，防止出现回调地狱
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    }).then(res => {
      this.setData({
        swiperList: res.data.message
      })
    })
  },
  // 获取分类数组数据
  getCataList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    }).then(res => {

      this.setData({
        cataList: res.data.message
      })
    })
  },
  // 获取楼层导航数据
  getFloorList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'
    }).then(res => {
      console.log(res)
      this.setData({
        floorList: res.data.message
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});