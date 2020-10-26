/**
 * 事件总线
 */

const listeners = [];

function on(name, handler) {
  const listener = {
    name,
    handler,
  };
  listeners.push(listener);

  return listener;
}

function emit(name, data) {
  for (const listener of listeners) {
    if (listener.name === name) {
      try {
        listener.handler(data);
      } catch (error) {
        console.error('bus emit error', error);
      }
    }
  }
}

function off(listener) {
  const index = listeners.findIndex((lst) => lst === listener);
  if (index > -1) {
    listeners.splice(index, 1);
  }
}

export default {
  on,
  emit,
  off,
};
