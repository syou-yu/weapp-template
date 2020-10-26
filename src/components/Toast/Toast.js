/**
 * 显示消息提示框
 * @param {*} title 提示的内容
 * @param {*} options 其他非必填配置
 */
export function show(title, options = {}) {
  const { icon = 'none', duration = 3000, mask = false } = options;
  return wx.showToast({
    title,
    icon,
    duration,
    mask,
  });
}

/**
 * 隐藏消息提示框
 */
export function hide() {
  return wx.hideToast();
}
