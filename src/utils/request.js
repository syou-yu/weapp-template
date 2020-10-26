import { CUR_APPID, TOKEN_KEY } from '@/consts/index';
import { env, version } from './config';
import URL from './url';

let apiPrefix = ''; // 生产环境 host
if (env !== 'prod') {
  apiPrefix = ''; // 开发测试环境 host
}

let { systemInfo } = global;
if (!systemInfo) {
  systemInfo = wx.getSystemInfoSync();
}
const logger = env !== 'prod' && systemInfo.platform !== 'devtools'; // 是否需要打印请求信息

function getPublicHeaders() {
  return {
    'X-Version': version,
  };
}

function getPublicQuery() {
  return {
    // appId: CUR_APPID,
  };
}

export function get(url, params = {}) {
  if (!/^https?:/.test(url)) {
    url = apiPrefix + url;
    url = URL.setQuery(url, getPublicQuery()); // 设置通用的 url query
  }

  // 去掉 null 和 undefined
  Object.keys(params).forEach((key) => {
    if (params[key] === null || params[key] === undefined) {
      delete params[key];
    }
  });

  return new Promise((resolve, reject) => {
    if (logger) {
      console.log(' ');
      console.log('开始请求 GET >>>>>>>>>>>');
      console.info('url', url);
      console.info('params', params);
      console.info('header', getPublicHeaders());
      console.log('  ');
    }

    wx.request({
      method: 'GET',
      url,
      data: params,
      header: {
        ...getPublicHeaders(),
      },
      dataType: 'json',
      success: (res) => {
        if (logger) {
          console.log(' ');
          console.log('请求完成 >>>>>>>>>>>');
          console.info('url', url);
          console.info('res', res);
          console.log('  ');
        }

        if (res.data.error) {
          reject(res.data.error);
        } else {
          resolve(res.data.data);
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}

export function post(url, data = {}) {
  if (!/^https?:/.test(url)) {
    url = apiPrefix + url;
    url = URL.setQuery(url, getPublicQuery()); // 设置通用的 url query
  }

  // 去掉 null 和 undefined
  Object.keys(data).forEach((key) => {
    if (data[key] === null || data[key] === undefined) {
      delete data[key];
    }
  });

  return new Promise((resolve, reject) => {
    if (logger) {
      console.log(' ');
      console.log('开始请求 POST >>>>>>>>>>>');
      console.info('url', url);
      console.info('data', data);
      console.info('header', getPublicHeaders());
      console.log('  ');
    }

    wx.request({
      method: 'POST',
      url,
      data,
      header: {
        ...getPublicHeaders(),
      },
      dataType: 'json',
      success: (res) => {
        if (logger) {
          console.log(' ');
          console.log('请求完成 >>>>>>>>>>>');
          console.info('url', url);
          console.info('res', res);
          console.log('  ');
        }

        if (res.data.error) {
          reject(res.data.error);
        } else {
          resolve(res.data.data);
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}
