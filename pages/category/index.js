// pages/category/index.js
import {
  request
} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], //左侧菜单数组数据
    rightContent: [], //右侧商品数组数据
    currentIndex: 0, //选中的左侧菜单下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取存储在本地的数据
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      // 不存在Cates,获取数据
      this.getcataList(this.data.currentIndex);
    } else {
      // 有存储的旧数据，并判断旧数据是否过期 5min
      if (Date.now() - Cates.time > 300000) {
        // 有旧数据，但时间已过期，重新请求数据
        this.getcataList(this.data.currentIndex);
      } else {
        // 可以使用旧数据
        console.log("可以使用旧数据")
        let cataLists = [];
        cataLists = Cates.data;
        // 左侧菜单数据
        let leftMenuList = cataLists.map(v => v.cat_name)
        // 右侧商品数据
        let rightContent = cataLists[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },
  // 获取分类数据
  getcataList(index) {
    let cataLists = [];
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then((res) => {
      cataLists = res.data.message
      // 把数据存储到本地存储
      wx.setStorageSync("cates", {
        time: Date.now(),
        data: cataLists
      });

      // 左侧菜单数据
      let leftMenuList = cataLists.map(v => v.cat_name)
      // 右侧商品数据
      let rightContent = cataLists[index].children;
      this.setData({
        leftMenuList,
        rightContent
      })

    })
  },
  // 点击左侧菜单请求右侧商品数据
  bindTapMenu(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index
    })
    this.getcataList(this.data.currentIndex);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})