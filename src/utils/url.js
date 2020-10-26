/**
 * url utility for nodejs and browser
 */

/**
 * 解析 URL，返回解析后的对象
 *
 * @param {string} url URL
 * @returns {Object}
 */
function parse(url) {
  let match = url.match(/^(\w+):\/\/(.*)/) || [];
  let protocol;
  let domain;
  let port;
  let path;
  const query = {};
  let search;
  let hash;

  [, protocol = '', url = '/'] = match;

  match = url.split('?');
  [path, search = ''] = match;

  match = path.split('/');
  [domain, ...path] = match;
  path = `/${path.join('/')}`;

  match = domain.split(':');
  [domain, port] = match;
  port = parseInt(port, 10);

  if (!port) {
    if (protocol === 'http') {
      port = 80;
    } else if (protocol === 'https') {
      port = 443;
    } else {
      port = null;
    }
  }

  match = search.split('#');
  [search, hash = ''] = (match || []);
  if (hash) {
    hash = `#${hash}`;
  }

  match = search.split('&');
  for (const item of match) {
    query[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
  }

  for (const key in query) {
    if (!key) {
      delete query[key];
    }
  }

  return {
    protocol,
    domain,
    path,
    port,
    query,
    hash,
  };
}

/**
 * 重写 URL 参数
 *
 * @param {string} url URL
 * @param {Object} pairs key-value键值对
 * @returns {string} 重写后的 URL
 */
function setQuery(url, pairs) {
  const [prefix, search = ''] = url.split('?');
  const [, hash] = url.split('#');

  const query = {};
  let searchParts = search.split('&');
  for (const part of searchParts) {
    const [key, value] = part.split('=');

    if (typeof key === 'string' && typeof value === 'string') {
      query[key] = decodeURIComponent(value);
    }
  }

  for (const key in pairs) {
    const value = pairs[key];
    if (value === '__DEL__') {
      delete query[key];
    } else {
      query[key] = value;
    }
  }

  searchParts = [];
  for (const key in query) {
    searchParts.push(`${key}=${encodeURIComponent(query[key])}`);
  }

  url = prefix;
  if (searchParts.length > 0) {
    url += `?${searchParts.join('&')}`;
  }

  if (hash) {
    url += `#${hash}`;
  }

  return url;
}

export default {
  parse,
  setQuery,
};
