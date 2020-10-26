import URL from './url';
import { env } from './config';

/**
 * push 的方式进行跳转
 * @param url 页面路径/链接
 * @param params 页面的参数
 */
function push(url, params) {
  if (/^https?:\/\//.test(url)) {
    // 这里需要跳 webview，跳转的路径改为 webview 页，参数变为链接
    // url = '/pages/webview/index';
    // params = Object.assign(params, { pageUrl: url });
  }

  url = URL.setQuery(url, params); // 将页面参数写入

  wx.navigateTo({
    url,
  });
}

/**
 * replace 的方式进行跳转
 * @param url 页面路径/链接
 * @param params 页面的参数
 */
function replace(url, params) {
  if (/^https?:\/\//.test(url)) {
    // 这里需要跳 webview，跳转的路径改为 webview 页，参数变为链接
    // url = '/pages/webview/index';
    // params = Object.assign(params, { pageUrl: url });
  }

  url = URL.setQuery(url, params); // 将页面参数写入

  wx.redirectTo({
    url,
  });
}

/**
 * reLaunch 的方式进行跳转
 * @param url 页面路径/链接
 * @param params 页面的参数
 */
function reLaunch(url, params) {
  if (/^https?:\/\//.test(url)) {
    // 这里需要跳 webview，跳转的路径改为 webview 页，参数变为链接
    // url = '/pages/webview/index';
    // params = Object.assign(params, { pageUrl: url });
  }

  url = URL.setQuery(url, params); // 将页面参数写入

  wx.reLaunch({
    url,
  });
}

/**
 * 页面后退 back
 * @param {number} [delta = 1] 需要返回的页面数
 */
function back(delta = 1) {
  if (!Number.isInteger(delta) || delta <= 0) {
    throw new Error('返回的页面数需为大于0的整数');
  }

  wx.navigateBack({
    delta,
  });
}

/**
 * 打开指定 appId 小程序
 * @param {string} appId 要打开的小程序 appId
 * @param {object} options 其他非必填参数
 */
function navigateToMiniProgram(appId, options) {
  wx.navigateToMiniProgram({
    appId,
    envVersion: env === 'prod' ? 'release' : 'trial', // develop开发版、trial体验版、release正式版
    ...options,
  });
}

export default {
  push,
  replace,
  back,
  reLaunch,
  navigateToMiniProgram,
};
