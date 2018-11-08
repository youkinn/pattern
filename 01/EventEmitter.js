(function(name, definition) {
  // 检测上下文环境是否为AMD或CMD
  var hasDefine = typeof define === "function";

  // 检测上下文环境是否为Node
  var hasExports = typeof module === "object" && module.exports;

  if (hasDefine) {
    // AMD环境或CMD环境
    define(definition);
  } else if (hasExports) {
    // 定义为普通Node模块
    module.exports = definition();
  } else {
    // 将模块的执行结果挂在window变量中，在浏览器中this指向window对象
    this[name] = definition();
  }
})("EventEmitter", function() {
  // 类定义
  function EventEmitter() {
    this.event = {};
  }

  EventEmitter.prototype = {
    // 为指定事件添加一个监听器到监听器数组的尾部。
    addListener: function(event, listener) {
      this.on(event, listener);
    },

    // 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
    on: function(event, listener) {
      if (!this.event[event]) {
        this.event[event] = [];
      }
      this.event[event].push(listener);
    },

    // 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
    once(event, listener) {},

    // 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称。
    removeListener: function(event, listener) {
      if (!this.event[event]) {
        return;
      }
      if (listener) {
        var index = this.event[event].indexOf(listener);
        this.event[event].splice(index, 1);
        return;
      }
    },

    // 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。[event]
    removeAllListeners() {},

    /**
     * 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。
     * setMaxListeners 函数用于提高监听器的默认限制的数量。
     * */
    setMaxListeners(n) {},

    // 返回指定事件的监听器数组。
    listeners: function(event) {},

    // 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。
    emit: function(event) {
      var that = this;
      var params = arguments;
      this.event[event].forEach(function(listener) {
        listener.apply(that, Array.prototype.slice.call(params, 1));
      });
    }
  };

  return EventEmitter;
});
