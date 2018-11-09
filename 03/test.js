var LinkList = require('struct2').LinkedList;

var order500 = function (orderType, pay, stock) {
  if (pay && orderType === 1) {
    console.log('500元定金预购，得到100优惠券');
  } else {
    return 'nuxtSuccessor';
  }
};

var order200 = function (orderType, pay, stock) {
  if (pay && orderType === 2) {
    console.log('200元定金预购，得到50优惠券');
  } else {
    return 'nuxtSuccessor';
  }
};

var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    return '手机库存不足';
  }
};

var list = new LinkList();
list.append(order500);
list.append(order200);
list.append(orderNormal);

function compute (orderType, pay, stock) {
  var item = list.getHead();
  var result;
  while (typeof item.element === 'function') {
    result = item.element(orderType, pay, stock);
    if (result === 'nuxtSuccessor') {
      item = item.next;
    } else {
      return;
    }
  }
}

compute(1, true, 500);
compute(2, true, 500);
compute(3, true, 500);
compute(1, false, 0);
