!function e(t,u,i){function f(n,r){if(!u[n]){if(!t[n]){var o="function"==typeof require&&require;if(!r&&o)return o(n,!0);if(c)return c(n,!0);throw(o=new Error("Cannot find module '"+n+"'")).code="MODULE_NOT_FOUND",o}o=u[n]={exports:{}},t[n][0].call(o.exports,function(r){return f(t[n][1][r]||r)},o,o.exports,e,t,u,i)}return u[n].exports}for(var c="function"==typeof require&&require,r=0;r<i.length;r++)f(i[r]);return f}({1:[function(r,n,o){"use strict";o.__esModule=!0;o=r("./util"),r=(0,o.random)(10),o=(0,o.random)(20);console.log(r+", "+o)},{"./util":2}],2:[function(r,n,o){"use strict";o.__esModule=!0,o.random=void 0;o.random=function(r){return Math.floor(Math.random()*r)}},{}]},{},[1]);
//# sourceMappingURL=main.js.map