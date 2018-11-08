// 订阅者类定义
function Subscriber() {}

// 原型定义
Subscriber.prototype = {
  // 订阅操作
  subscribe: function(publisher, handle) {
    this.handle = handle;
    publisher.subs.push(this);
  },
  // 收到消息后的操作
  update: function(data) {
    this.handle(data);
  }
};

// 发布者类定义
function Publisher() {
  this.subs = [];
}

// 原型定义
Publisher.prototype = {
  // 发布消息、通知订阅者
  publish: function(data) {
    this.subs.forEach(function(sub) {
      sub.update(data);
    });
  }
};
