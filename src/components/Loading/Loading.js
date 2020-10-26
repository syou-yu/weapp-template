/**
 * 显示 loading 提示框
 * @param {*} title 提示的内容
 * @param {*} options 其他非必填配置
 */
export function show(title, options = {}) {
  const { mask = false } = options;
  return wx.showLoading({
    title,
    mask,
  });
}

/**
 * 隐藏 loading 提示框
 */
export function hide() {
  return wx.hideLoading();
}
