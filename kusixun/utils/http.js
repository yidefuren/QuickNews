import {
  config
} from '../config.js'
class HTTP {
  constructor() {
    this.baseRestUrl = config.api_base_url
  }
  request(params) {
    var url = this.baseRestUrl + params.url;
    if (!params.method) {
      params.method = 'GET';
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.method,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.success && params.success(res.data);
        } else {
          console.log('err' + JSON.stringify(err))
          wx.showToast({
            title: err,
            icon: 'error',
            make: true
          })
          params.error && params.error(res);
        }
      },
      fail: function(err) {
        console.log('fail' + JSON.stringify(err))
        wx.showToast({
          title: err,
          icon: 'error',
          make: true
        })
        params.fail && params.fail(err)
      }
    });
  }
};

export {
  HTTP
};