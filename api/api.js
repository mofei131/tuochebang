import {
  Base
} from '../utils/base.js';
let urlList = {
  login:'wechat/login'
}
class Api extends Base {
  constructor() {
    super();
  }
  
  // 小程序登录
  login(param, callback) {
    var param = {
      url: urlList.login,
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 获取用户信息
  getUserinfo(param, callback) {
    var param = {
      url: 'wechat/getUserinfo',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 获取用户信息
  bindPid(param, callback) {
    var param = {
      url: 'wechat/bindPid',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 用户修改信息
  setUserinfo(param, callback) {
    var param = {
      url: 'wechat/setUserinfo',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 小程序设置手机号
  setMobile(param, callback) {
    var param = {
      url: 'wechat/setMobile',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 获取拖车类型
  getTrailerType(param, callback) {
    var param = {
      url: 'index/getTrailerType',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 手机号查询用户信息
  mobileIsIn(param, callback) {
    var param = {
      url: 'wechat/mobileIsIn',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 平台的保险
  baoxian(param, callback) {
    var param = {
      url: 'index/baoxian',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 获取配置
  setting(param, callback) {
    var param = {
      url: 'index/setting',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 获取特殊要求
  getRequirement(param, callback) {
    var param = {
      url: 'index/getRequirement',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 创建订单
  create(param, callback) {
    var param = {
      url: 'order/create',
      type: "post",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 获取省市区
  getArea(param, callback) {
    var param = {
      url: 'index/getArea',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 订单列表
  orderList(param, callback) {
    var param = {
      url: 'order/orderList',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 取消订单
  cancel(param, callback) {
    var param = {
      url: 'order/cancel',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 分销码
  shareCode(param, callback) {
    var param = {
      url: 'wechat/shareCode',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //我的分销
  myChildren(param, callback) {
    var param = {
      url: 'wechat/myChildren',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //余额明细
  moneyLog(param, callback) {
    var param = {
      url: 'wechat/moneyLog',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //提现限制
  withdrawSet(param, callback) {
    var param = {
      url: 'withDraw/withdrawSet',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //提现
  withdraw(param, callback) {
    var param = {
      url: 'withDraw/withdraw',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }


  //赚钱攻略
  zhuanqiangonglue(param, callback) {
    var param = {
      url: 'index/zhuanqiangonglue',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //验车详情
  yanche(param, callback) {
    var param = {
      url: 'order/yanche',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //验车驳回
  yancheNo(param, callback) {
    var param = {
      url: 'order/yancheNo',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //通过验车
  yancheYes(param, callback) {
    var param = {
      url: 'order/yancheYes',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 获取验证码
  getVerifyCode(param, callback) {
    var param = {
      url: 'app/getVerifyCode',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //修改手机号
  resetMobile(param, callback) {
    var param = {
      url: 'app/resetMobile',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //排行榜
  rank(param, callback) {
    var param = {
      url: 'wechat/rank',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //消息列表
  messagelist(param, callback) {
    var param = {
      url: 'message/list',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //消息未读数量
  noReadNum(param, callback) {
    var param = {
      url: 'message/noReadNum',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //读消息
  messageread(param, callback) {
    var param = {
      url: 'message/read',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //完成订单
  orderfinish(param, callback) {
    var param = {
      url: 'order/finish',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //订单评价
  orderjudge(param, callback) {
    var param = {
      url: 'order/judge',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //订单详情
  driverOrderdetail(param, callback) {
    var param = {
      url: 'driverOrder/detail',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //再次支付
  orderpay(param, callback) {
    var param = {
      url: 'order/pay',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //再次支付
  orderpay2(param, callback) {
    var param = {
      url: 'order/orderPay',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //生成订单后支付
  orderPay2(param, callback) {
    var param = {
      url: 'order/orderPay',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 计算里程费
  computeFee(param, callback) {
    var param = {
      url: 'order/computeFee',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  // 添加地区
  setAreasinfo(param, callback) {
    var param = {
      url: 'index/setAreasinfo',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  // 提交发票
  applyInvoice(param, callback) {
    var param = {
      url: 'Wechat/applyInvoice',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  // 查询发票
  invoiceInfo(param, callback) {
    var param = {
      url: 'Wechat/invoiceInfo',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  // 开屏弹窗
  popup(param, callback) {
    var param = {
      url: 'pop/popup',
      type: "get",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export {
  Api
};