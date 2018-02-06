yoastWebpackJsonp([88],{

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (e.ReactIntlLocaleData = e.ReactIntlLocaleData || {}, e.ReactIntlLocaleData.nn = t());
}(undefined, function () {
  "use strict";
  return [{ locale: "nn", pluralRuleFunction: function pluralRuleFunction(e, t) {
      return t ? "other" : 1 == e ? "one" : "other";
    }, fields: { year: { displayName: "år", relative: { 0: "this year", 1: "next year", "-1": "last year" }, relativeTime: { future: { one: "om {0} år", other: "om {0} år" }, past: { one: "for {0} år siden", other: "for {0} år siden" } } }, month: { displayName: "månad", relative: { 0: "this month", 1: "next month", "-1": "last month" }, relativeTime: { future: { one: "om {0} måned", other: "om {0} måneder" }, past: { one: "for {0} måned siden", other: "for {0} måneder siden" } } }, day: { displayName: "dag", relative: { 0: "i dag", 1: "i morgon", 2: "i overmorgon", "-2": "i forgårs", "-1": "i går" }, relativeTime: { future: { one: "om {0} døgn", other: "om {0} døgn" }, past: { one: "for {0} døgn siden", other: "for {0} døgn siden" } } }, hour: { displayName: "time", relative: { 0: "this hour" }, relativeTime: { future: { one: "om {0} time", other: "om {0} timer" }, past: { one: "for {0} time siden", other: "for {0} timer siden" } } }, minute: { displayName: "minutt", relative: { 0: "this minute" }, relativeTime: { future: { one: "om {0} minutt", other: "om {0} minutter" }, past: { one: "for {0} minutt siden", other: "for {0} minutter siden" } } }, second: { displayName: "sekund", relative: { 0: "now" }, relativeTime: { future: { one: "om {0} sekund", other: "om {0} sekunder" }, past: { one: "for {0} sekund siden", other: "for {0} sekunder siden" } } } } }];
});

/***/ })

});