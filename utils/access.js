import {
  Config
} from 'config.js';
class Access {
  getOpenid(callBack, pid = '', isLogin = 1) {
    var that = this;
    if (isLogin == 1) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }
}
export {
  Access
};