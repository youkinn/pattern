var EventEmitter = require("./EventEmitter.js");

var event = new EventEmitter();

event.on("click", function(a, b) {
  console.log(1);
});

event.on("click", function(a, b) {
  console.log(2);
});

event.emit("click", 3, 4);

event.removeListener("click");

event.emit("click", 3, 4);
