// countdown.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_title:"哎呦 没有正数日",
    index_day:'0',
    index_info:'00-0-0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#32b4fa',
    })

    
    //this.OnGetConfig();
    
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

    // 没有用户id 去获取用户id
    var str_openid = wx.getStorageSync("openid");
    if (str_openid.length < 1) {
      wx.switchTab({
        url: '../index/index',
      })

      return;
    }
    
    var str_zsr_refresh = wx.getStorageSync("zsr_refresh");
    if (str_zsr_refresh == '1') {
      var that = this;
      that.setData(
        {
          index_title: "哎呦 没有正数日",
          index_day: '0',
          index_info: '00-0-0'
        }
      )

      wx.setStorageSync('zsr_refresh', '0');
    }

    this.OnGetCoundown();
    this.OnGetCoundownIndex();
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
    
    return {
      title: '纪念日&正数日&纪念日',
      desc: '纪念日&正数日&纪念日&',
      path: '/pages/countdown/countdown'
    }

  },

  OnGetCoundown: function () {

    // 把this赋值给that
    var that = this;
    var str_username = wx.getStorageSync("username");
    var stropenid = wx.getStorageSync("openid");
    // 发送http请求
    wx.request({
      url: 'https://www.wenxingsen.com/json.php',
      data: {
        from: 'weixin',
        type: 'get_countdown_plus',
        countdown_type: 'zsr',
        username: str_username,
        openid: stropenid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 开始-数据返回回来

        console.log(res.data)

        that.setData({ listData: res.data.message });

        // 结束-数据返回回来
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })


  },// end of onGetLeave

  OnGetCoundownIndex: function () {

    // 把this赋值给that
    var that = this;
    var str_username = wx.getStorageSync("username");
    var stropenid = wx.getStorageSync("openid");

    // 发送http请求
    wx.request({
      url: 'https://www.wenxingsen.com/json.php',
      data: {
        from: 'weixin',
        type: 'get_countdown_index_plus',
        countdown_type:'zsr',
        username: str_username,
        openid: stropenid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 开始-数据返回回来

       // console.log(res.data)

        that.data.index_title = res.data.message.item0.title;

        that.setData(
          {
            index_title: res.data.message.item0.tip,
            index_day:res.data.message.item0.day,
            index_info:res.data.message.item0.info
          }
        )
        // 结束-数据返回回来
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })


  },

  //事件处理函数
  bindViewTap: function () {

    // 页面跳转
    wx.switchTab({
      url: '../countdown_send/countdown_send',
    })

  },
  // 查看纪念日具体
  showDetail: function (e)
  {

    var data = e.currentTarget.dataset;

    //console.log(data.id);

    wx.setStorageSync("detail_tilte", data.title);
    wx.setStorageSync("detail_info", data.info);
    wx.setStorageSync("detail_day", data.day);
    wx.setStorageSync("detail_id", data.id);
    wx.setStorageSync("detail_tip", data.tip);

    wx.setStorageSync("detail_background", data.background);

    console.log(data.background);
    // 页面跳转
    wx.navigateTo({
      url: '../countdown_detail/countdown_detail'
    })
  },
  OnGetConfig :function () {

    var str_username = wx.getStorageSync("username");
    var stropenid = wx.getStorageSync("openid");

    // 发送http请求
    wx.request({
      url: 'https://www.wenxingsen.com/json.php',
      data: {
        from: 'weixin',
        type: 'get_config',
        username: str_username,
        openid: stropenid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 开始-数据返回回来

        console.log(res.data)

        wx.setStorageSync('background_type',
          res.data.item.background_type);
        wx.setStorageSync('background_image',
          res.data.item.background_image);
        wx.setStorageSync('start_page',
          res.data.item.start_page);


        // 结束-数据返回回来
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })

  }
  //end of OnGetConfig





})