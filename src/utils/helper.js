/**
 * rpx 单位转换为 px 单位
 * @param {Number} rpx rpx单位
 * @returns {Number} px单位
 */
export function rpx2px(rpx) {
  const systemInfo = wx.getSystemInfoSync();
  return (rpx / 750) * systemInfo.windowWidth;
}

/**
 * 设置导航栏的标题，不传入时取 config.appName
 * @param {String} title 需要设置的标题
 */
export function setTitle(title) {
  wx.setNavigationBarTitle({
    title: title || '',
  });
}

/**
 * 判断是否符合手机号码格式
 * 以 1 开头的 11 位数字复核要求
 *
 * @param {string} mobilePhone 手机号码
 * @return {Boolean}
 */
export function isMobilePhone(mobilePhone) {
  return /^1\d{10}$/.test(mobilePhone);
}

/**
 * 将函数包装成单例
 * @param {function} fn 需要包裹的函数
 */
export function singletonFactory(fn) {
  let data = null;
  let isGetting = false;
  const cbs = new Set();

  return async function singletonFunction(...params) {
    if (data) return data; // 已经有值
    if (isGetting) return new Promise((resolve) => cbs.add(resolve)); // 加入回调队列
    isGetting = true;
    data = await fn(...params);
    isGetting = false;
    cbs.forEach((resolve) => resolve(data)); // 执行回调
    cbs.clear();
    return data;
  };
}
