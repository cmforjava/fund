(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*********************************!*\
  !*** C:/git/whowins/pages.json ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!**************************************!*\
  !*** C:/git/whowins/mixins/mgfun.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 12));



var _axios = _interopRequireDefault(__webpack_require__(/*! @/utils/axios.js */ 15));
var _storage2 = _interopRequireDefault(__webpack_require__(/*! @/utils/storage.js */ 49));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} // let baseurl = 'v1'
var baseurl = '';

var request = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {var url, method, data, params, result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:url = _ref.url, method = _ref.method, data = _ref.data;
            params = { url: url, method: method, data: data, params: data };_context.next = 4;return (
              (0, _axios.default)(params).catch(function (err) {
                if (err) err.message = (err.data || {}).message;
                return Promise.reject(err);
              }));case 4:result = _context.sent;return _context.abrupt("return",
            Promise.resolve(result));case 6:case "end":return _context.stop();}}}, _callee);}));return function request(_x) {return _ref2.apply(this, arguments);};}();var _default =


{
  data: function data() {
    return {};

  },
  computed: {
    storage: function storage() {
      return _storage2.default;
    } },

  methods: {
    post: function post(url) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return request({
        url: baseurl + url,
        method: 'post',
        data: params });

    },
    put: function put(url) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return request({
        url: baseurl + url,
        method: 'put',
        data: params });

    },
    get: function get(url) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      params['api_key'] = 'RGAPI-2424e66f-5490-4dbd-91a2-72b4679767fd';
      return request({
        url: baseurl + url,
        method: 'get',
        data: params });

    } },

  onShow: function onShow() {},
  onLoad: function onLoad(options) {
    // window.that = this
  } };exports.default = _default;

/***/ }),
/* 12 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 13);

/***/ }),
/* 13 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 14);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 14 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 15 */
/*!*************************************!*\
  !*** C:/git/whowins/utils/axios.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ 16));
var _qs = _interopRequireDefault(__webpack_require__(/*! qs */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 创建axios实例
var service = _axios.default.create({
  // baseURL: 'https://api.doctorxiong.club/', // api的base_url
  krURL: 'https://kr.api.riotgames.com', // api的base_url
  asiaURL: 'https://asia.api.riotgames.com', // api的base_url
  timeout: 50000 // 请求超时时间
});

service.defaults.adapter = function (config) {
  return new Promise(function (resolve, reject) {
    // console.log(config)
    var settle = __webpack_require__(/*! axios/lib/core/settle */ 31);
    var buildURL = __webpack_require__(/*! axios/lib/helpers/buildURL */ 21);
    var buildFullPath = __webpack_require__(/*! axios/lib/core/buildFullPath */ 35);
    var baseURL = '';
    if (config.url.indexOf('/lol') != -1) {
      baseURL = 'https://kr.api.riotgames.com';
    } else {
      baseURL = 'https://asia.api.riotgames.com';
    }
    var fullurl = buildFullPath(baseURL, config.url);
    uni.request({
      method: config.method.toUpperCase(),
      url: buildURL(fullurl, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config };


        settle(resolve, reject, response);
      } });

  });
};



// respone拦截器
service.interceptors.response.use(
function (response) {
  //Vue.$vux.loading.hide()
  return Promise.resolve(response.data);
},
function (error) {
  return Promise.reject(error.response);
});var _default =


service;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 16 */
/*!**************************************************!*\
  !*** C:/git/whowins/node_modules/axios/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ 17);

/***/ }),
/* 17 */
/*!******************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/axios.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 18);
var bind = __webpack_require__(/*! ./helpers/bind */ 19);
var Axios = __webpack_require__(/*! ./core/Axios */ 20);
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ 40);
var defaults = __webpack_require__(/*! ./defaults */ 26);

/**
                                       * Create an instance of Axios
                                       *
                                       * @param {Object} defaultConfig The default config for the instance
                                       * @return {Axios} A new instance of Axios
                                       */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ 41);
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ 42);
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ 25);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ 43);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),
/* 18 */
/*!******************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/utils.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ 19);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) &&
  typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

/**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
function isString(val) {
  return typeof val === 'string';
}

/**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
function isNumber(val) {
  return typeof val === 'number';
}

/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a plain Object
   *
   * @param {Object} val The value to test
   * @return {boolean} True if value is a plain Object, otherwise false
   */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
  navigator.product === 'NativeScript' ||
  navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined');

}

/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function merge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   * @return {string} content value without BOM
   */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM };

/***/ }),
/* 19 */
/*!*************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/helpers/bind.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/***/ }),
/* 20 */
/*!***********************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/core/Axios.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 18);
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ 21);
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ 22);
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ 23);
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ 40);

/**
                                             * Create a new instance of Axios
                                             *
                                             * @param {Object} instanceConfig The default config for the instance
                                             */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager() };

}

/**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url }));

  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data }));

  };
});

module.exports = Axios;

/***/ }),
/* 21 */
/*!*****************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/helpers/buildURL.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 18);

function encode(val) {
  return encodeURIComponent(val).
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),
/* 22 */
/*!************************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/core/InterceptorManager.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 18);

function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),
/* 23 */
/*!*********************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/core/dispatchRequest.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 18);
var transformData = __webpack_require__(/*! ./transformData */ 24);
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ 25);
var defaults = __webpack_require__(/*! ../defaults */ 26);

/**
                                        * Throws a `Cancel` if cancellation has been requested.
                                        */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
  config.data,
  config.headers,
  config.transformRequest);


  // Flatten headers
  config.headers = utils.merge(
  config.headers.common || {},
  config.headers[config.method] || {},
  config.headers);


  utils.forEach(
  ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
  function cleanHeaderConfig(method) {
    delete config.headers[method];
  });


  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
    response.data,
    response.headers,
    config.transformResponse);


    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
        reason.response.data,
        reason.response.headers,
        config.transformResponse);

      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),
/* 24 */
/*!*******************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/core/transformData.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 18);

/**
                                    * Transform the data for a request or a response
                                    *
                                    * @param {Object|String} data The data to be transformed
                                    * @param {Array} headers The headers for the request or response
                                    * @param {Array|Function} fns A single function or Array of functions
                                    * @returns {*} The resulting transformed data
                                    */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

/***/ }),
/* 25 */
/*!****************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/cancel/isCancel.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),
/* 26 */
/*!*********************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/defaults.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ 18);
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ 29);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded' };


function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ 30);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ 30);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
    utils.isArrayBuffer(data) ||
    utils.isBuffer(data) ||
    utils.isStream(data) ||
    utils.isFile(data) ||
    utils.isBlob(data))
    {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {/* Ignore */}
    }
    return data;
  }],

  /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };


defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*' } };



utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../Users/创否/Downloads/HBuilderX.2.4.5.20191209.full/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 27)))

/***/ }),
/* 27 */
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 28);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),
/* 28 */
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 27)))

/***/ }),
/* 29 */
/*!****************************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ 18);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),
/* 30 */
/*!*************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/adapters/xhr.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 18);
var settle = __webpack_require__(/*! ./../core/settle */ 31);
var cookies = __webpack_require__(/*! ./../helpers/cookies */ 34);
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ 21);
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ 35);
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ 38);
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ 39);
var createError = __webpack_require__(/*! ../core/createError */ 32);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    if (
    (utils.isBlob(requestData) || utils.isFile(requestData)) &&
    requestData.type)
    {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = unescape(encodeURIComponent(config.auth.password)) || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request };


      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
      request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
      cookies.read(config.xsrfCookieName) :
      undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/***/ }),
/* 31 */
/*!************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/core/settle.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ 32);

/**
                                             * Resolve or reject a Promise based on response status.
                                             *
                                             * @param {Function} resolve A function that resolves the promise.
                                             * @param {Function} reject A function that rejects the promise.
                                             * @param {object} response The response.
                                             */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
    'Request failed with status code ' + response.status,
    response.config,
    null,
    response.request,
    response));

  }
};

/***/ }),
/* 32 */
/*!*****************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/core/createError.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ 33);

/**
                                               * Create an Error with the specified message, config, error code, request and response.
                                               *
                                               * @param {string} message The error message.
                                               * @param {Object} config The config.
                                               * @param {string} [code] The error code (for example, 'ECONNABORTED').
                                               * @param {Object} [request] The request.
                                               * @param {Object} [response] The response.
                                               * @returns {Error} The created error.
                                               */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),
/* 33 */
/*!******************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/core/enhanceError.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Update an Error with the specified config, error code, and response.
               *
               * @param {Error} error The error to update.
               * @param {Object} config The config.
               * @param {string} [code] The error code (for example, 'ECONNABORTED').
               * @param {Object} [request] The request.
               * @param {Object} [response] The response.
               * @returns {Error} The error.
               */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code };

  };
  return error;
};

/***/ }),
/* 34 */
/*!****************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/helpers/cookies.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 18);

module.exports =
utils.isStandardBrowserEnv() ?

// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },

    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },

    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    } };

}() :

// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {return null;},
    remove: function remove() {} };

}();

/***/ }),
/* 35 */
/*!*******************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/core/buildFullPath.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ 36);
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ 37);

/**
                                                      * Creates a new URL by combining the baseURL with the requestedURL,
                                                      * only when the requestedURL is not already an absolute URL.
                                                      * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                      *
                                                      * @param {string} baseURL The base URL
                                                      * @param {string} requestedURL Absolute or relative URL to combine
                                                      * @returns {string} The combined full path
                                                      */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

/***/ }),
/* 36 */
/*!**********************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),
/* 37 */
/*!********************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/helpers/combineURLs.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
};

/***/ }),
/* 38 */
/*!*********************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/helpers/parseHeaders.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 18);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
'age', 'authorization', 'content-length', 'content-type', 'etag',
'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
'last-modified', 'location', 'max-forwards', 'proxy-authorization',
'referer', 'retry-after', 'user-agent'];


/**
                                          * Parse headers into an object
                                          *
                                          * ```
                                          * Date: Wed, 27 Aug 2014 08:58:49 GMT
                                          * Content-Type: application/json
                                          * Connection: keep-alive
                                          * Transfer-Encoding: chunked
                                          * ```
                                          *
                                          * @param {String} headers Headers needing to be parsed
                                          * @returns {Object} Headers parsed into an object
                                          */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {return parsed;}

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

/***/ }),
/* 39 */
/*!************************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 18);

module.exports =
utils.isStandardBrowserEnv() ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
                 * Parse a URL to discover it's components
                 *
                 * @param {String} url The URL to be parsed
                 * @returns {Object}
                 */
  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ?
      urlParsingNode.pathname :
      '/' + urlParsingNode.pathname };

  }

  originURL = resolveURL(window.location.href);

  /**
                                                * Determine if a URL shares the same origin as the current location
                                                *
                                                * @param {String} requestURL The URL to test
                                                * @returns {boolean} True if URL shares the same origin, otherwise false
                                                */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol &&
    parsed.host === originURL.host;
  };
}() :

// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),
/* 40 */
/*!*****************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/core/mergeConfig.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ 18);

/**
                                  * Config-specific merge-function which creates a new config-object
                                  * by merging two configuration objects together.
                                  *
                                  * @param {Object} config1
                                  * @param {Object} config2
                                  * @returns {Object} New object resulting from merging config2 to config1
                                  */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
  'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
  'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
  'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
  'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
  'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];

  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys.
  concat(mergeDeepPropertiesKeys).
  concat(defaultToConfig2Keys).
  concat(directMergeKeys);

  var otherKeys = Object.
  keys(config1).
  concat(Object.keys(config2)).
  filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

/***/ }),
/* 41 */
/*!**************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/cancel/Cancel.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * A `Cancel` is an object that is thrown when an operation is canceled.
               *
               * @class
               * @param {string=} message The message.
               */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

/***/ }),
/* 42 */
/*!*******************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/cancel/CancelToken.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ 41);

/**
                                   * A `CancelToken` is an object that can be used to request cancellation of an operation.
                                   *
                                   * @class
                                   * @param {Function} executor The executor function.
                                   */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
   * Throws a `Cancel` if cancellation has been requested.
   */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
    * Returns an object that contains a new `CancelToken` and a function that, when called,
    * cancels the `CancelToken`.
    */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel };

};

module.exports = CancelToken;

/***/ }),
/* 43 */
/*!***************************************************************!*\
  !*** C:/git/whowins/node_modules/axios/lib/helpers/spread.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Syntactic sugar for invoking a function and expanding an array for arguments.
               *
               * Common use case would be to use `Function.prototype.apply`.
               *
               *  ```js
               *  function f(x, y, z) {}
               *  var args = [1, 2, 3];
               *  f.apply(null, args);
               *  ```
               *
               * With `spread` this example can be re-written.
               *
               *  ```js
               *  spread(function(x, y, z) {})([1, 2, 3]);
               *  ```
               *
               * @param {Function} callback
               * @returns {Function}
               */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),
/* 44 */
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ 45);
var parse = __webpack_require__(/*! ./parse */ 48);
var formats = __webpack_require__(/*! ./formats */ 47);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 45 */
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 46);
var formats = __webpack_require__(/*! ./formats */ 47);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),
/* 46 */
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

var encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),
/* 47 */
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 48 */
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 46);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 49 */
/*!***************************************!*\
  !*** C:/git/whowins/utils/storage.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var m;
if (uni) {
  m = uni;
} else {
  m = {
    getStorageSync: function getStorageSync(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    setStorageSync: function setStorageSync(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    removeStorageSync: function removeStorageSync(key) {
      localStorage.removeItem(key);
    },
    clearStorageSync: function clearStorageSync() {
      localStorage.clear();
    } };


}

var storage = {
  get: function get(key) {var nil = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var value;
    try {
      var data = m.getStorageSync(key);
      if (data.outtime < Date.now()) {
        value = nil;
      } else {
        value = data.value;
      }
    } catch (e) {
      value = nil;
    }
    return value;
  },
  set: function set(key, value, outtime) {
    var time = new Date().getTime();
    // let despiretime = time + outtime
    var data = {
      time: time,
      value: value };

    if (outtime) {
      data.outtime = outtime;
    }
    m.setStorageSync(key, data);
  },
  multiset: function multiset(params, outtime) {
    for (var item in params) {
      storage.set(item, params[item], outtime);
    }
  },
  multiget: function multiget() {for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {params[_key] = arguments[_key];}
    return params.map(function (item) {
      return storage.get(item);
    });
  },
  remove: function remove(key) {
    m.removeStorageSync(key);
  },
  clear: function clear() {
    m.clearStorageSync();
  },
  multiremove: function multiremove() {for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {params[_key2] = arguments[_key2];}
    params.forEach(function (item) {
      storage.remove(item);
    });
  } };var _default =

storage;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/*!*************************************!*\
  !*** C:/git/whowins/utils/lol.json ***!
  \*************************************/
/*! exports provided: type, format, version, data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"type\":\"champion\",\"format\":\"standAloneComplex\",\"version\":\"10.19.1\",\"data\":{\"Aatrox\":{\"version\":\"10.19.1\",\"id\":\"Aatrox\",\"key\":\"266\",\"name\":\"暗裔剑魔\",\"title\":\"亚托克斯\",\"blurb\":\"亚托克斯和他的同胞们曾是恕瑞玛对抗虚空之地时满载荣耀的守护者一族，最终却变成了符文之地的一个更大的威胁，并且仅被击败于被诡诈的致命巫术。但在被囚禁了数个世纪后，亚托克斯率先找到重获自由之法，那就是对那些蠢得妄图尝试挥舞那把含有他灵魂精华的神奇武器的愚妄之徒进行腐蚀和转化。现在，凭借偷来的血肉躯体，他以一种近似他之前形态的凶残外表行走于符文之地中，寻求着一次毁天灭地且久未兑现的复仇。\",\"info\":{\"attack\":8,\"defense\":4,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Aatrox.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"鲜血魔井\",\"stats\":{\"hp\":580,\"hpperlevel\":90,\"mp\":0,\"mpperlevel\":0,\"movespeed\":345,\"armor\":38,\"armorperlevel\":3.25,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":3,\"hpregenperlevel\":1,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":5,\"attackspeedperlevel\":2.5,\"attackspeed\":0.651}},\"Ahri\":{\"version\":\"10.19.1\",\"id\":\"Ahri\",\"key\":\"103\",\"name\":\"九尾妖狐\",\"title\":\"阿狸\",\"blurb\":\"符文之地的潜在力量和她有着与生俱来的共鸣。原始的魔法在她手中凝为魔法宝珠。瓦斯塔亚人阿狸醉心于玩弄猎物的情感，然后吞噬他们的生命精魄。虽然阿狸是天生的掠食者，但她却对猎物始终保存着一份同情，因为每一个被吞噬的灵魂，都伴随着他们生前的记忆。\",\"info\":{\"attack\":3,\"defense\":4,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Ahri.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":48,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":526,\"hpperlevel\":92,\"mp\":418,\"mpperlevel\":25,\"movespeed\":330,\"armor\":20.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.04,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.668}},\"Akali\":{\"version\":\"10.19.1\",\"id\":\"Akali\",\"key\":\"84\",\"name\":\"离群之刺\",\"title\":\"阿卡丽\",\"blurb\":\"无论是均衡教派还是暗影之拳的称号，都已被阿卡丽抛弃，如今的阿卡丽独来独往，随时可以成为她的人民所需要的夺命武器。虽然她牢牢铭记着她从宗师慎身上学来的一切，但她效忠的保护艾欧尼亚并铲除敌人，每次一条命。或许阿卡丽的出击悄然无声，但她传达的信息将响亮无比：不听命于任何人的刺客最为可怕。\",\"info\":{\"attack\":5,\"defense\":3,\"magic\":8,\"difficulty\":7},\"image\":{\"full\":\"Akali.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":96,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Assassin\"],\"partype\":\"能量\",\"stats\":{\"hp\":575,\"hpperlevel\":95,\"mp\":200,\"mpperlevel\":0,\"movespeed\":345,\"armor\":23,\"armorperlevel\":3.5,\"spellblock\":37,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.5,\"mpregen\":50,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62.4,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":3.2,\"attackspeed\":0.625}},\"Alistar\":{\"version\":\"10.19.1\",\"id\":\"Alistar\",\"key\":\"12\",\"name\":\"牛头酋长\",\"title\":\"阿利斯塔\",\"blurb\":\"阿利斯塔一直都是威名远扬的巨力勇士，他要为自己被屠杀的氏族向诺克萨斯帝国复仇。虽然他曾被奴役，并被迫成为斗兽场中的角斗士，但他坚不可摧的意志使他免于沦为真正的野兽。现在，挣脱了奴役枷锁的他继续以受苦之人和弱者的名义战斗。他的愤怒，还有犄角、蹄子和拳头，都是他的武器。\",\"info\":{\"attack\":6,\"defense\":9,\"magic\":5,\"difficulty\":7},\"image\":{\"full\":\"Alistar.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":144,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":600,\"hpperlevel\":106,\"mp\":350,\"mpperlevel\":40,\"movespeed\":330,\"armor\":44,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.85,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":3.75,\"attackspeedperlevel\":2.125,\"attackspeed\":0.625}},\"Amumu\":{\"version\":\"10.19.1\",\"id\":\"Amumu\",\"key\":\"32\",\"name\":\"殇之木乃伊\",\"title\":\"阿木木\",\"blurb\":\"在远古的恕瑞玛，有一个孤独而又忧郁的灵魂，阿木木。他在世间游荡，只为找到一个朋友。他遭受了一种远古的巫术诅咒，注定忍受永世的孤单，因为被他触碰就意味着死亡，他的喜爱便是毁灭。所有自称见过阿木木的人都说他是一具活生生的死尸，身材矮小，通体捆绑着青灰色的绷带。世人围绕阿木木编造了许多神话故事、民间传说和史诗传奇。这些故事世代传颂，以至于再也没人能分得清哪些是真相，哪些是幻想。\",\"info\":{\"attack\":2,\"defense\":6,\"magic\":8,\"difficulty\":3},\"image\":{\"full\":\"Amumu.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":192,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":613.12,\"hpperlevel\":84,\"mp\":287.2,\"mpperlevel\":40,\"movespeed\":335,\"armor\":33,\"armorperlevel\":3.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9,\"hpregenperlevel\":0.85,\"mpregen\":7.382,\"mpregenperlevel\":0.525,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.38,\"attackdamageperlevel\":3.8,\"attackspeedperlevel\":2.18,\"attackspeed\":0.736}},\"Anivia\":{\"version\":\"10.19.1\",\"id\":\"Anivia\",\"key\":\"34\",\"name\":\"冰晶凤凰\",\"title\":\"艾尼维亚\",\"blurb\":\"艾尼维亚是一个充满仁慈的飞禽形态灵体，曾经历过无数次诞生、死亡与重生的轮回，始终眷顾着弗雷尔卓德。她是生于凛冽冰风中的半神，可以操控冰雪的元素之力，阻挡那些胆敢侵犯她家园的人。艾尼维亚指引并保护着北方贫瘠土地上的人类部落，而这些人类也将她奉为希望的象征和重大变革的预兆。她的每一次奋战都不遗余力，因为她知道，自己的记忆将会超越牺牲，长久地留存，而她也将在崭新的明天中重生。\",\"info\":{\"attack\":1,\"defense\":4,\"magic\":10,\"difficulty\":10},\"image\":{\"full\":\"Anivia.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":240,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":480,\"hpperlevel\":82,\"mp\":495,\"mpperlevel\":25,\"movespeed\":325,\"armor\":21.22,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":600,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":51.376,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":1.68,\"attackspeed\":0.625}},\"Annie\":{\"version\":\"10.19.1\",\"id\":\"Annie\",\"key\":\"1\",\"name\":\"黑暗之女\",\"title\":\"安妮\",\"blurb\":\"既拥有危险夺命的能力，又拥有小大人儿的可爱模样，安妮是一名掌握着深不可测的占火魔法的幼女魔法师。安妮生活在诺克萨斯北边的山脚下，即使是在这种地方，她也仍然是魔法师中的异类。她与火焰的紧密关系与生俱来，最初是伴随着喜怒无常的情绪冲动出现的，不过后来她学会了如何掌握这些“好玩的小把戏”。其中她最喜欢的就是召唤她亲爱的泰迪熊提伯斯——一头狂野的守护兽。安妮已经迷失在了永恒的天真里。她在黑暗的森林中游荡，始终寻觅着能陪自己玩耍的人。\",\"info\":{\"attack\":2,\"defense\":3,\"magic\":10,\"difficulty\":6},\"image\":{\"full\":\"Annie.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":288,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":524,\"hpperlevel\":88,\"mp\":418,\"mpperlevel\":25,\"movespeed\":335,\"armor\":19.22,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":625,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50.41,\"attackdamageperlevel\":2.625,\"attackspeedperlevel\":1.36,\"attackspeed\":0.579}},\"Aphelios\":{\"version\":\"10.19.1\",\"id\":\"Aphelios\",\"key\":\"523\",\"name\":\"残月之肃\",\"title\":\"厄斐琉斯\",\"blurb\":\"如月影般神出鬼没、时刻剑拔弩张的厄斐琉斯沉默地弑杀一切自身信仰的敌人。他的语言只有精确的瞄准和枪火。虽然他饮下了让他失声的毒药，但他也因此得到了妹妹拉露恩的引导，从遥远的神庙中将月石打造的各种武器送到他手里。只要头顶的明月依然皎洁，厄斐琉斯就永不孤单。\",\"info\":{\"attack\":6,\"defense\":2,\"magic\":1,\"difficulty\":10},\"image\":{\"full\":\"Aphelios.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":336,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":530,\"hpperlevel\":88,\"mp\":348,\"mpperlevel\":42,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3,\"spellblock\":26,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.25,\"hpregenperlevel\":0.55,\"mpregen\":6.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":57,\"attackdamageperlevel\":2.4,\"attackspeedperlevel\":2.1,\"attackspeed\":0.64}},\"Ashe\":{\"version\":\"10.19.1\",\"id\":\"Ashe\",\"key\":\"22\",\"name\":\"寒冰射手\",\"title\":\"艾希\",\"blurb\":\"作为阿瓦罗萨部族的战母，寒冰血脉的艾希率领着北方人数最多的部落。她克己、智慧、忠于理想，但并不适应自己作为领袖的角色，艾希与自己血脉中蕴藏的先祖魔法相通，挽起了臻冰打造的长弓。她的族人相信她就是神话中的女英雄阿瓦罗萨的转世，在人们的追随下，艾希希望夺回那些属于部族的古代领土，从而让弗雷尔卓德再次实现统一。\",\"info\":{\"attack\":7,\"defense\":3,\"magic\":2,\"difficulty\":4},\"image\":{\"full\":\"Ashe.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":384,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":570,\"hpperlevel\":87,\"mp\":280,\"mpperlevel\":32,\"movespeed\":325,\"armor\":26,\"armorperlevel\":3.4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":600,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":6.972,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":2.96,\"attackspeedperlevel\":3.33,\"attackspeed\":0.658}},\"AurelionSol\":{\"version\":\"10.19.1\",\"id\":\"AurelionSol\",\"key\":\"136\",\"name\":\"铸星龙王\",\"title\":\"奥瑞利安·索尔\",\"blurb\":\"奥瑞利安•索尔曾创造了奇迹般的群星，为无垠的荒芜太空布下他宏伟的恩典。而如今，他的威能却遭人设计，被迫服务于某个潜藏在深空中的帝国。为了重返铸星大道，奥瑞利安•索尔誓要夺回属于自己的自由。哪怕召星降怒，倾覆众生。\",\"info\":{\"attack\":2,\"defense\":3,\"magic\":8,\"difficulty\":7},\"image\":{\"full\":\"AurelionSol.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":432,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":575,\"hpperlevel\":92,\"mp\":350,\"mpperlevel\":50,\"movespeed\":325,\"armor\":19,\"armorperlevel\":3.6,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":7,\"hpregenperlevel\":0.6,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":57,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"Azir\":{\"version\":\"10.19.1\",\"id\":\"Azir\",\"key\":\"268\",\"name\":\"沙漠皇帝\",\"title\":\"阿兹尔\",\"blurb\":\"阿兹尔是上古时期恕瑞玛的一位凡人皇帝，一位站在不朽神话巅峰的自豪之人。但他的狂妄引来了旁人的背叛，在最伟大胜利降临的那一刻将他杀害。而现在，数千年后，他重获新生并成为了力量无边的飞升者。阿兹尔的城市已经从黄沙之下崛起，他要让恕瑞玛恢复曾经的荣光。\",\"info\":{\"attack\":6,\"defense\":3,\"magic\":8,\"difficulty\":9},\"image\":{\"full\":\"Azir.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":0,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":552,\"hpperlevel\":92,\"mp\":480,\"mpperlevel\":21,\"movespeed\":335,\"armor\":19.04,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":7,\"hpregenperlevel\":0.75,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":52,\"attackdamageperlevel\":2.8,\"attackspeedperlevel\":3,\"attackspeed\":0.625}},\"Bard\":{\"version\":\"10.19.1\",\"id\":\"Bard\",\"key\":\"432\",\"name\":\"星界游神\",\"title\":\"巴德\",\"blurb\":\"巴德是星界彼端的旅者，是奇缘巧遇的使者。他艰难地维护着宇宙的平衡，从而让生命能够抵御无情的混乱。符文之地有许多人传唱关于他的歌谣，内容里流露出对他超凡本质的猜想，而所有这些歌谣都会提及同一件事：这位星界游荡者总是会被强大的魔法圣物所吸引。一群木灵欢唱乐团始终围绕在巴德身边充当小帮手，他的行为绝不会被误会带有任何恶意，因为他永远都是在为更大的良善尽职尽责，只不过他的方式不为常人理解。\",\"info\":{\"attack\":4,\"defense\":4,\"magic\":5,\"difficulty\":9},\"image\":{\"full\":\"Bard.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":48,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":560,\"hpperlevel\":89,\"mp\":350,\"mpperlevel\":50,\"movespeed\":330,\"armor\":34,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":6,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":52,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"Blitzcrank\":{\"version\":\"10.19.1\",\"id\":\"Blitzcrank\",\"key\":\"53\",\"name\":\"蒸汽机器人\",\"title\":\"布里茨\",\"blurb\":\"布里茨是来自祖安的一个巨大的、几乎坚不可摧的机械体，最初被制造出来的目的是为了处理有毒废料。然而他觉得自己存在的意义太过狭隘，于是就改装了自己的形态，以便更好地效力于地沟区的孱弱人群。布里茨无私地使用自己的力量和钢铁之躯保护其他人，伸出长长的机械援手，或者发出能量脉冲，制服任何带来麻烦的人。\",\"info\":{\"attack\":4,\"defense\":8,\"magic\":5,\"difficulty\":4},\"image\":{\"full\":\"Blitzcrank.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":96,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":582.6,\"hpperlevel\":95,\"mp\":267.2,\"mpperlevel\":40,\"movespeed\":325,\"armor\":37,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.75,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61.54,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":1.13,\"attackspeed\":0.625}},\"Brand\":{\"version\":\"10.19.1\",\"id\":\"Brand\",\"key\":\"63\",\"name\":\"复仇焰魂\",\"title\":\"布兰德\",\"blurb\":\"基根·诺和曾经是一名普通弗雷尔卓德部族居民，现在则变成了另一种生物，布兰德。他的身世警醒着后人，被更强大的力量所诱惑会带来什么后果。基根为了追寻传说中的世界符文，背叛了自己的同伴并将符文据为己有，就在那一瞬间，这个人彻底消失了。他的灵魂被彻底燃尽，他的身躯成为了活体烈焰的容器，如今，布兰德游荡在瓦洛兰，寻觅着其他的符文。他曾遭受的苦难，凡人活上十几辈子也未必能够经历，而他发誓此仇必报。\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":9,\"difficulty\":4},\"image\":{\"full\":\"Brand.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":144,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":519.68,\"hpperlevel\":88,\"mp\":469,\"mpperlevel\":21,\"movespeed\":340,\"armor\":21.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":10.665,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":57.04,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"Braum\":{\"version\":\"10.19.1\",\"id\":\"Braum\",\"key\":\"201\",\"name\":\"弗雷尔卓德之心\",\"title\":\"布隆\",\"blurb\":\"拥有大块肌肉和更大颗心脏的布隆，是弗雷尔卓德的一个受人爱戴的英雄。弗雷尔卓德北部的任何一家蜜酒坊里都有人会致敬他传奇般的强壮，据说他曾在一夜之间扫平一整片橡树森林，还曾用拳头把一整座山打成碎石子。一扇附有魔法的秘库大门被他拿在手中当做盾牌，布隆在北方的冻土上漫游，小胡子勾勒出的微笑和他的肌肉块头一样大， 真诚友善地帮助所有危难之中的人。\",\"info\":{\"attack\":3,\"defense\":9,\"magic\":4,\"difficulty\":3},\"image\":{\"full\":\"Braum.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":192,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":540,\"hpperlevel\":98,\"mp\":310.6,\"mpperlevel\":45,\"movespeed\":335,\"armor\":47,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":1,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55.376,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":3.5,\"attackspeed\":0.644}},\"Caitlyn\":{\"version\":\"10.19.1\",\"id\":\"Caitlyn\",\"key\":\"51\",\"name\":\"皮城女警\",\"title\":\"凯特琳\",\"blurb\":\"凯特琳被誉为皮尔特沃夫最顶尖的和平卫士，同时也是让这座城市真正摆脱地下隐秘犯罪的最有希望的人选。她经常和蔚联手执行任务，以冷静和沉着弥补自己搭档的鲁莽天性。虽然她的海克斯科技步枪独一无二，但凯特琳最强大的武器其实是她过人的智谋，总是能设下天罗地网，迎接任何傻到敢在进步之城作案的不法之徒。\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":2,\"difficulty\":6},\"image\":{\"full\":\"Caitlyn.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":240,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":510,\"hpperlevel\":93,\"mp\":313.7,\"mpperlevel\":35,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":650,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":7.4,\"mpregenperlevel\":0.55,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":2.88,\"attackspeedperlevel\":3.5,\"attackspeed\":0.681}},\"Camille\":{\"version\":\"10.19.1\",\"id\":\"Camille\",\"key\":\"164\",\"name\":\"青钢影\",\"title\":\"卡蜜尔\",\"blurb\":\"卡蜜尔是菲罗斯家族的首席密探，游走于法律已然失效的边缘地带，小心地维护着皮尔特沃夫这台机器和其下的祖安，保证一切都能顺畅地运转。灵活而精准的她认为，任何浮皮潦草的技术都是必须被禁绝的丑陋行径。她的心智也如同身下的刀刃一般锐利。为了追求极致，她对自己进行了大幅度的海克斯人体增强手术。这也让很多人不禁怀疑，她根本就是一台纯粹的机器，而不是一个女人。\",\"info\":{\"attack\":8,\"defense\":6,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Camille.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":288,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":575.6,\"hpperlevel\":85,\"mp\":338.8,\"mpperlevel\":32,\"movespeed\":340,\"armor\":35,\"armorperlevel\":3.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.8,\"mpregen\":8.15,\"mpregenperlevel\":0.75,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2.5,\"attackspeed\":0.644}},\"Cassiopeia\":{\"version\":\"10.19.1\",\"id\":\"Cassiopeia\",\"key\":\"69\",\"name\":\"魔蛇之拥\",\"title\":\"卡西奥佩娅\",\"blurb\":\"卡西奥佩娅是个夺命的生物，决心要操纵其他人屈服于自己的阴险意志之下。身为诺克萨斯贵族杜·克卡奥家族的最年轻、最漂亮的女儿，她冒险深入恕瑞玛古代墓穴找寻远古的力量。在墓穴中，她被恐怖的墓穴守卫咬中，在毒液的作用下变成了毒蛇外形的掠食者。狡猾而敏捷的卡西奥佩娅如今在夜幕的掩护下蜿蜒滑行，用阴森的凝视让敌人石化。\",\"info\":{\"attack\":2,\"defense\":3,\"magic\":9,\"difficulty\":10},\"image\":{\"full\":\"Cassiopeia.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":336,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":560,\"hpperlevel\":90,\"mp\":350,\"mpperlevel\":40,\"movespeed\":328,\"armor\":18,\"armorperlevel\":3.5,\"spellblock\":32,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.5,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.5,\"attackspeed\":0.647}},\"Chogath\":{\"version\":\"10.19.1\",\"id\":\"Chogath\",\"key\":\"31\",\"name\":\"虚空恐惧\",\"title\":\"科加斯\",\"blurb\":\"自从科加斯出现在符文之地烈日照射之下的那一刻起，它就被永不餍足的饥饿所驱使。虚空吞噬一切生命的欲望完美地体现在科加斯的身上，它复杂的生物构造能够迅速将物质转化为身体的成长，不仅会增加肌肉的质量和密度，还能让外壳变得有如钻石般坚硬。当单纯的体型增长已经不能满足它时，这只虚空生物就会将多余的物质形成锋利的骨刺吐出体外，刺穿猎物，为稍后的盛宴进行准备。\",\"info\":{\"attack\":3,\"defense\":7,\"magic\":7,\"difficulty\":5},\"image\":{\"full\":\"Chogath.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":384,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":574.4,\"hpperlevel\":80,\"mp\":272.2,\"mpperlevel\":40,\"movespeed\":345,\"armor\":38,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9,\"hpregenperlevel\":0.85,\"mpregen\":7.206,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":69,\"attackdamageperlevel\":4.2,\"attackspeedperlevel\":1.44,\"attackspeed\":0.625}},\"Corki\":{\"version\":\"10.19.1\",\"id\":\"Corki\",\"key\":\"42\",\"name\":\"英勇投弹手\",\"title\":\"库奇\",\"blurb\":\"约德尔飞行员库奇最爱两件事物：一是飞行，二是自己英俊的小胡子，排名不分先后。离开班德尔城以后，他在皮尔特沃夫安家，从此爱上了这里奇异壮观的各式机器。他决定投身于飞行装置的开发事业，带领一群老练飞行员组成了一只空中防御力量，得名“尖啸之蛇”。临危不乱的库奇在他第二故乡的空域戒备巡逻，而他还从没见过什么问题是一轮导弹齐射不能解决的。\",\"info\":{\"attack\":8,\"defense\":3,\"magic\":6,\"difficulty\":6},\"image\":{\"full\":\"Corki.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":432,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":518,\"hpperlevel\":87,\"mp\":350.16,\"mpperlevel\":34,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":7.424,\"mpregenperlevel\":0.55,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":2.5,\"attackspeedperlevel\":2.3,\"attackspeed\":0.638}},\"Darius\":{\"version\":\"10.19.1\",\"id\":\"Darius\",\"key\":\"122\",\"name\":\"诺克萨斯之手\",\"title\":\"德莱厄斯\",\"blurb\":\"提到诺克萨斯力量的象征，帝国上下没有人能比德莱厄斯这名久经沙场的指挥官更加适合。他从无名小卒逐渐成长为诺克萨斯之手，劈开了无数敌人的身躯 —— 其中也不乏诺克萨斯自己人。他从不怀疑自己执行的公义，也从不会在举起战斧后迟疑。作为崔法利军团的领导者，德莱厄斯的任何对手都不用指望他手下留情。\",\"info\":{\"attack\":9,\"defense\":5,\"magic\":1,\"difficulty\":2},\"image\":{\"full\":\"Darius.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":0,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":582.24,\"hpperlevel\":100,\"mp\":263,\"mpperlevel\":37.5,\"movespeed\":340,\"armor\":39,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":10,\"hpregenperlevel\":0.95,\"mpregen\":6.6,\"mpregenperlevel\":0.35,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":5,\"attackspeedperlevel\":1,\"attackspeed\":0.625}},\"Diana\":{\"version\":\"10.19.1\",\"id\":\"Diana\",\"key\":\"131\",\"name\":\"皎月女神\",\"title\":\"黛安娜\",\"blurb\":\"黛安娜永远都佩着她的月刃 ，她是皎月教派的武士，不过她的教派在巨神峰周围地区几乎已经销声匿迹。黛安娜身穿闪烁着冬夜寒雪之光的铠甲，是皎月神力的凡间化身。她在巨神峰之巅与星灵精魄相融，不再是单纯的凡人。现在的她努力抗争着，寻找着神的启示，以及自己的力量和存在对于这个世界的意义。\",\"info\":{\"attack\":7,\"defense\":6,\"magic\":8,\"difficulty\":4},\"image\":{\"full\":\"Diana.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":48,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":570,\"hpperlevel\":95,\"mp\":375,\"mpperlevel\":25,\"movespeed\":345,\"armor\":31,\"armorperlevel\":3.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":7.5,\"hpregenperlevel\":0.85,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":57,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.25,\"attackspeed\":0.625}},\"Draven\":{\"version\":\"10.19.1\",\"id\":\"Draven\",\"key\":\"119\",\"name\":\"荣耀行刑官\",\"title\":\"德莱文\",\"blurb\":\"在诺克萨斯，有一种战士被称为“清算人”。他们在竞技场里互相厮杀，以鲜血作为赌注进行力量的考验，不过没有任何人能像德莱文那样受人追捧。曾经参过军的他，发现竞技场的观众们尤为喜爱他的耀武扬威和刻意表演，和他使用飞斧的无匹技艺。这种狂傲的完美带来的赞叹令他上瘾，因此德莱文发誓要不惜代价打败任何对手，以此确保自己的名字在帝国之中永世传唱。\",\"info\":{\"attack\":9,\"defense\":3,\"magic\":1,\"difficulty\":8},\"image\":{\"full\":\"Draven.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":96,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":605,\"hpperlevel\":90,\"mp\":360.56,\"mpperlevel\":39,\"movespeed\":330,\"armor\":29,\"armorperlevel\":3.3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.75,\"hpregenperlevel\":0.7,\"mpregen\":8.042,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3.61,\"attackspeedperlevel\":2.7,\"attackspeed\":0.679}},\"DrMundo\":{\"version\":\"10.19.1\",\"id\":\"DrMundo\",\"key\":\"36\",\"name\":\"祖安狂人\",\"title\":\"蒙多医生\",\"blurb\":\"精神与认知彻底崩坏、杀人的欲望永不满足、浑身皮肤紫得发黑，这就是蒙多医生，这就是祖安人在漆黑的夜里不敢出门的原因。这个头脑简单的恐怖怪人似乎唯一关心的东西就是痛苦，不仅是施加痛苦，而且也是感受痛苦。他抡着一把巨大的切肉刀，举重若轻。他曾经捕捉并折磨过数十名祖安居民，因此声名狼藉。他将自己的行为称为“手术”，但却没有任何真正的目的。他残酷无情。他神出鬼没。他想去哪儿就去哪儿。另外，准确地说，他并不是一名医生。\",\"info\":{\"attack\":5,\"defense\":7,\"magic\":6,\"difficulty\":5},\"image\":{\"full\":\"DrMundo.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":144,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"无\",\"stats\":{\"hp\":582.52,\"hpperlevel\":89,\"mp\":0,\"mpperlevel\":0,\"movespeed\":345,\"armor\":36,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61.27,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2.8,\"attackspeed\":0.721}},\"Ekko\":{\"version\":\"10.19.1\",\"id\":\"Ekko\",\"key\":\"245\",\"name\":\"时间刺客\",\"title\":\"艾克\",\"blurb\":\"艾克是一名来自祖安不良街区的奇才。他可以操纵时间，从而让任何处境都变得对自己有利。通过使用他自己的发明——Z型驱动——他可以探索其他平行现实的分支并创造最完美的条件。尽管他酷爱这种自由，但只要他的朋友们遇到了威胁，他就会不顾一切地去保护他们。在旁观者眼里，艾克总是能初次尝试就完成不可能之举，屡试不爽。 \",\"info\":{\"attack\":5,\"defense\":3,\"magic\":7,\"difficulty\":8},\"image\":{\"full\":\"Ekko.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":192,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":585,\"hpperlevel\":85,\"mp\":280,\"mpperlevel\":50,\"movespeed\":340,\"armor\":32,\"armorperlevel\":3,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9,\"hpregenperlevel\":0.9,\"mpregen\":7,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.3,\"attackspeed\":0.688}},\"Elise\":{\"version\":\"10.19.1\",\"id\":\"Elise\",\"key\":\"60\",\"name\":\"蜘蛛女皇\",\"title\":\"伊莉丝\",\"blurb\":\"诺克萨斯帝国最古老城市的地下深处，有一处不见天日的禁地，这是夺命的掠食者伊莉丝的宫殿。当她还是一个凡人的时候，她是曾经显赫一时的家族女主人，但是自从被一个卑鄙的半神咬伤之后，她就化身成了美丽的不死异类，一个形似蜘蛛的生物，用蛛网诱捕毫无防备的猎物。为了永葆青春，伊莉丝现在喜欢捕食那些无戒心、无信仰的人，而这世上也鲜少有人能够抗拒她的诱惑。\",\"info\":{\"attack\":6,\"defense\":5,\"magic\":7,\"difficulty\":9},\"image\":{\"full\":\"Elise.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":240,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":534,\"hpperlevel\":93,\"mp\":324,\"mpperlevel\":50,\"movespeed\":330,\"armor\":27,\"armorperlevel\":3.35,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.6,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.75,\"attackspeed\":0.625}},\"Evelynn\":{\"version\":\"10.19.1\",\"id\":\"Evelynn\",\"key\":\"28\",\"name\":\"痛苦之拥\",\"title\":\"伊芙琳\",\"blurb\":\"在符文之地的黑暗裂缝中，恶魔伊芙琳一直在搜寻着下一个目标。她披着人类女性的撩人外表，勾引她的猎物。只要有人被她魅惑，伊芙琳就会显露出真正的形态。她会施加难以言喻的折磨，从而让自己在猎物的疼痛中获得满足。对于这个恶魔来说，这样的欢愉只是无心无邪的滥情。但是对于符文之地上的其他人，听到的则是血肉模糊的传说，提醒着人们肉欲的危险和纵欲的代价。\",\"info\":{\"attack\":4,\"defense\":2,\"magic\":7,\"difficulty\":10},\"image\":{\"full\":\"Evelynn.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":288,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":572,\"hpperlevel\":84,\"mp\":315.6,\"mpperlevel\":42,\"movespeed\":335,\"armor\":37,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.75,\"mpregen\":8.108,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.1,\"attackspeed\":0.667}},\"Ezreal\":{\"version\":\"10.19.1\",\"id\":\"Ezreal\",\"key\":\"81\",\"name\":\"探险家\",\"title\":\"伊泽瑞尔\",\"blurb\":\"神采奕奕的冒险家伊泽瑞尔拥有自己不知道的魔法天赋，他搜刮失落已久的古墓，触碰古老的诅咒，还举重若轻地挑战常人不可能完成的极限。他的勇气和壮举无边无际，总是喜欢随机应变地解决任何情况，一定程度上依赖他的小聪明，但更主要是依赖他神秘的恕瑞玛护手，在他的操控下释放出破坏性的奥术爆弹。有一件事可以肯定——只要伊泽瑞尔出现，那么麻烦一定接踵而至。或是还没走远。范围大概是随时随地。\",\"info\":{\"attack\":7,\"defense\":2,\"magic\":6,\"difficulty\":7},\"image\":{\"full\":\"Ezreal.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":336,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":530,\"hpperlevel\":88,\"mp\":375,\"mpperlevel\":50,\"movespeed\":325,\"armor\":22,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":4,\"hpregenperlevel\":0.55,\"mpregen\":8.5,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":2.5,\"attackspeedperlevel\":2.5,\"attackspeed\":0.625}},\"Fiddlesticks\":{\"version\":\"10.19.1\",\"id\":\"Fiddlesticks\",\"key\":\"9\",\"name\":\"远古恐惧\",\"title\":\"费德提克\",\"blurb\":\"某物已在符文之地苏醒，远古且可怖。它潜伏于人类世界的边缘，被浓烈的妄想所吸引，以受害者的惊骇为食，人们将这永恒的恐怖之物称为费德提克。这个狂乱的拼凑之物挥舞着镰刀收割恐惧，摧毁不幸与之相逢的人的神志。当心乌鸦的声响，或是那<i>近乎</i>人形的怪物所发出的呓语吧……费德提克已经归来。\",\"info\":{\"attack\":2,\"defense\":3,\"magic\":9,\"difficulty\":9},\"image\":{\"full\":\"Fiddlesticks.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":384,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":580.4,\"hpperlevel\":92,\"mp\":500,\"mpperlevel\":28,\"movespeed\":335,\"armor\":34,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":480,\"hpregen\":5.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55.36,\"attackdamageperlevel\":2.625,\"attackspeedperlevel\":2.11,\"attackspeed\":0.625}},\"Fiora\":{\"version\":\"10.19.1\",\"id\":\"Fiora\",\"key\":\"114\",\"name\":\"无双剑姬\",\"title\":\"菲奥娜\",\"blurb\":\"菲奥娜是全瓦洛兰最可怕的决斗家。她以雷厉风行、狡黠聪慧闻名于世，同样著名的还有她舞弄自己蓝钢佩剑的矫健。菲奥娜出生在德玛西亚王国的劳伦特家族，她从父亲的手中接管了家业，并在一场丑闻风波中将家族拯救于灭亡的边缘。虽然劳伦特家威严不再，但菲奥娜却一直在不懈地努力，希望重振家族荣耀，让劳伦特这个名字重回德玛西亚名望贵族之列。\",\"info\":{\"attack\":10,\"defense\":4,\"magic\":2,\"difficulty\":3},\"image\":{\"full\":\"Fiora.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":432,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":550,\"hpperlevel\":85,\"mp\":300,\"mpperlevel\":40,\"movespeed\":345,\"armor\":33,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":8.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":3.2,\"attackspeed\":0.69}},\"Fizz\":{\"version\":\"10.19.1\",\"id\":\"Fizz\",\"key\":\"105\",\"name\":\"潮汐海灵\",\"title\":\"菲兹\",\"blurb\":\"菲兹是一名水陆两栖的约德尔人，生活在比尔吉沃特周围的群礁之间。他会经常把迷信的船长们抛进海中的什一税捡起来物归原主。不过即使是最粗鲁的水手也知道不要招惹他，因为这里流传着的各种教训，都是因为低估了这个小鬼。经常有人误会他的行为只是海洋精灵的任性举动，而事实上他可以号令来自深渊的巨型猛兽，而且不管是盟友还是敌人他都喜欢捉弄。\",\"info\":{\"attack\":6,\"defense\":4,\"magic\":7,\"difficulty\":6},\"image\":{\"full\":\"Fizz.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":570,\"hpperlevel\":98,\"mp\":317.2,\"mpperlevel\":37,\"movespeed\":335,\"armor\":22.412,\"armorperlevel\":3.4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.7,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58.04,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.1,\"attackspeed\":0.658}},\"Galio\":{\"version\":\"10.19.1\",\"id\":\"Galio\",\"key\":\"3\",\"name\":\"正义巨像\",\"title\":\"加里奥\",\"blurb\":\"光彩熠熠的德玛西亚城外，石巨像加里奥始终如一地守望着。他被创造出来是为了抵挡来犯的法师，但却经常要一动不动地矗立数十年，只有当强大的魔法力量出现时，他才会激活。而只要加里奥活动起来，他便会充分利用每一刻，品味荡气回肠的战斗和来之不易的守护人民的荣耀。可惜，他的胜利永远都喜忧参半，因为消灭魔法的同时，也消灭了他活跃力量的源泉。每一次胜利都会使他再次进入不知世事的休眠。\",\"info\":{\"attack\":1,\"defense\":10,\"magic\":6,\"difficulty\":5},\"image\":{\"full\":\"Galio.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":48,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":562,\"hpperlevel\":112,\"mp\":500,\"mpperlevel\":40,\"movespeed\":335,\"armor\":24,\"armorperlevel\":3.5,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":8,\"hpregenperlevel\":0.8,\"mpregen\":9.5,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":1.5,\"attackspeed\":0.625}},\"Gangplank\":{\"version\":\"10.19.1\",\"id\":\"Gangplank\",\"key\":\"41\",\"name\":\"海洋之灾\",\"title\":\"普朗克\",\"blurb\":\"诡计多端、心狠手辣的普朗克是被废黜的强盗之王，他令人恐惧的名号广达远至。他一度是港口城市比尔吉沃特的统治者。虽然现在他的威权已经不再，但人们相信这只会让他变得更加可怖。普朗克若是知道有人要从他手中抢走比尔吉沃特，必然会大肆血洗这座城市。而如今有了火枪、弯刀，还有一桶桶的火药，他决心要夺回自己失去的东西。\",\"info\":{\"attack\":7,\"defense\":6,\"magic\":4,\"difficulty\":9},\"image\":{\"full\":\"Gangplank.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":96,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":540,\"hpperlevel\":82,\"mp\":282,\"mpperlevel\":40,\"movespeed\":345,\"armor\":35,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":6,\"hpregenperlevel\":0.6,\"mpregen\":7.5,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.2,\"attackspeed\":0.658}},\"Garen\":{\"version\":\"10.19.1\",\"id\":\"Garen\",\"key\":\"86\",\"name\":\"德玛西亚之力\",\"title\":\"盖伦\",\"blurb\":\"作为一名自豪而高贵的勇士，盖伦将自己当做无畏先锋中的普通一员参与战斗。他既受到同袍手足的爱戴，也受到敌人对手的尊敬——尤其作为尊贵的冕卫家族的子嗣，他被委以重任，守卫德玛西亚的疆土和理想。他身披抵御魔法的重甲，手持阔剑，时刻准备着用正义的钢铁风暴在战场上正面迎战一切操纵魔法的狂人。\",\"info\":{\"attack\":7,\"defense\":7,\"magic\":1,\"difficulty\":5},\"image\":{\"full\":\"Garen.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":144,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"无\",\"stats\":{\"hp\":620,\"hpperlevel\":84,\"mp\":0,\"mpperlevel\":0,\"movespeed\":340,\"armor\":36,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":0.75,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.5,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":4.5,\"attackspeedperlevel\":3.65,\"attackspeed\":0.625}},\"Gnar\":{\"version\":\"10.19.1\",\"id\":\"Gnar\",\"key\":\"150\",\"name\":\"迷失之牙\",\"title\":\"纳尔\",\"blurb\":\"纳尔是一个原始约德尔人，讨人喜爱的小个子突然发起脾气来，就会变成一头巨大的野兽，脑海中只剩下破坏的念头。纳尔被臻冰冻结了数千年，如今他重获自由。这个面目全非的世界，在他充满好奇的眼里处处都是新鲜奇妙。因为纳尔在危险中会特别兴奋，所以他会随便抓起任何东西丢向自己的敌人，无论是他的骨齿回力标，还是手边的大房子。\",\"info\":{\"attack\":6,\"defense\":5,\"magic\":5,\"difficulty\":8},\"image\":{\"full\":\"Gnar.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":192,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"怒气\",\"stats\":{\"hp\":510,\"hpperlevel\":65,\"mp\":100,\"mpperlevel\":0,\"movespeed\":335,\"armor\":32,\"armorperlevel\":2.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":175,\"hpregen\":4.5,\"hpregenperlevel\":1.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":3,\"attackspeedperlevel\":6,\"attackspeed\":0.625}},\"Gragas\":{\"version\":\"10.19.1\",\"id\":\"Gragas\",\"key\":\"79\",\"name\":\"酒桶\",\"title\":\"古拉加斯\",\"blurb\":\"豪爽而且威严的古拉加斯是一位身宽体胖、吵闹喧哗的酿酒大师，只为找到最完美的那一口麦酒。他从未知的地方前来，在弗雷尔卓德纯洁的荒原上寻找稀有的酿酒原料，尝试着各种不同的酿制配方。他总是酩酊大醉而且冲动鲁莽，他挑起的斗殴事件堪称传奇，经常造成一整夜的狂欢和殃及池鱼的破坏。只要古拉加斯在某地现身，接踵而至的往往是饮酒和闹事——就按这个顺序。\",\"info\":{\"attack\":4,\"defense\":7,\"magic\":6,\"difficulty\":5},\"image\":{\"full\":\"Gragas.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":240,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":600,\"hpperlevel\":95,\"mp\":400,\"mpperlevel\":47,\"movespeed\":330,\"armor\":38,\"armorperlevel\":3.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":5.5,\"hpregenperlevel\":0.5,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2.05,\"attackspeed\":0.675}},\"Graves\":{\"version\":\"10.19.1\",\"id\":\"Graves\",\"key\":\"104\",\"name\":\"法外狂徒\",\"title\":\"格雷福斯\",\"blurb\":\"马尔科姆·格雷福斯是有名的佣兵、赌徒和窃贼，凡是他到过的城邦或帝国，都在通缉悬赏他的人头。虽然他脾气暴躁，但却非常讲究黑道的义气，他的双管散弹枪“命运”就经常用来纠正背信弃义之事。几年前他和老搭档崔斯特·菲特冰释前嫌，如今二人一同在比尔吉沃特的地下黑道纷争中再次如鱼得水。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":3},\"image\":{\"full\":\"Graves.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":288,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":555,\"hpperlevel\":92,\"mp\":325,\"mpperlevel\":40,\"movespeed\":340,\"armor\":33,\"armorperlevel\":3.4,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":425,\"hpregen\":8,\"hpregenperlevel\":0.7,\"mpregen\":8,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.6,\"attackspeed\":0.475}},\"Hecarim\":{\"version\":\"10.19.1\",\"id\":\"Hecarim\",\"key\":\"120\",\"name\":\"战争之影\",\"title\":\"赫卡里姆\",\"blurb\":\"赫卡里姆是人与兽的幽灵混合体，身上的诅咒让他永世都只能不停地蹂躏践踏生者的灵魂。在福光岛被暗影吞噬之际，这位自豪的骑士被破败之咒的毁灭能量彻底湮没，连同他的骑兵团和他们胯下的坐骑。现在，符文之地上只要有黑雾出现的地方，就会有他率军冲锋的鬼影，在屠杀中狂欢，用铁蹄摧残脚下的敌人。\",\"info\":{\"attack\":8,\"defense\":6,\"magic\":4,\"difficulty\":6},\"image\":{\"full\":\"Hecarim.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":336,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":580,\"hpperlevel\":90,\"mp\":277.2,\"mpperlevel\":40,\"movespeed\":345,\"armor\":36,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":7,\"hpregenperlevel\":0.75,\"mpregen\":6.5,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":2.5,\"attackspeed\":0.67}},\"Heimerdinger\":{\"version\":\"10.19.1\",\"id\":\"Heimerdinger\",\"key\":\"74\",\"name\":\"大发明家\",\"title\":\"黑默丁格\",\"blurb\":\"塞西尔·B·黑默丁格教授是一个才华横溢但古怪反常的约德尔科学家。他被称赞为皮尔特沃夫前所未见的最具革新意识和受人尊敬的发明家之一。他不间断地工作，孜孜不倦地尝试解答宇宙中最费解的难题，达到了神经痴迷的程度。尽管他的理论经常会看起来晦涩难懂，但他也曾制造出许多发明，堪称皮尔特沃夫最为惊奇，当然也同样危险的机械，他也在不断改进自己的发明，让它们更加高效。\",\"info\":{\"attack\":2,\"defense\":6,\"magic\":8,\"difficulty\":8},\"image\":{\"full\":\"Heimerdinger.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":384,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":488,\"hpperlevel\":87,\"mp\":385,\"mpperlevel\":20,\"movespeed\":340,\"armor\":19.04,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55.536,\"attackdamageperlevel\":2.7,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"Illaoi\":{\"version\":\"10.19.1\",\"id\":\"Illaoi\",\"key\":\"420\",\"name\":\"海兽祭司\",\"title\":\"俄洛伊\",\"blurb\":\"俄洛伊的体格强横无比，却唯独会在她的坚定信仰面前屈身。作为大海兽的先知，她挥舞着一个巨大的金色神像，将敌人的灵魂抽离体外，完全击毁他们对现实的感知。所有对“娜伽卡波洛丝的真者”发起挑战的人，很快就会发现，俄洛伊从来不单打独斗——蟒行群岛的神明会与她并肩作战。\",\"info\":{\"attack\":8,\"defense\":6,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Illaoi.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":432,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":585.6,\"hpperlevel\":95,\"mp\":300,\"mpperlevel\":40,\"movespeed\":340,\"armor\":35,\"armorperlevel\":3.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9.5,\"hpregenperlevel\":0.8,\"mpregen\":7.5,\"mpregenperlevel\":0.75,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":5,\"attackspeedperlevel\":2.5,\"attackspeed\":0.571}},\"Irelia\":{\"version\":\"10.19.1\",\"id\":\"Irelia\",\"key\":\"39\",\"name\":\"刀锋舞者\",\"title\":\"艾瑞莉娅\",\"blurb\":\"诺克萨斯对艾欧尼亚的占领催生了许多英雄，但没有谁像纳沃利的艾瑞莉娅一般令人意外。她将家乡的古老舞艺化为战技，以精心修习的优雅身姿操控着致命的刀丛。在她证明了自己的战斗实力后，被众人推举为反抗军的领袖和首脑，为了守卫家园而奋斗至今。\",\"info\":{\"attack\":7,\"defense\":4,\"magic\":5,\"difficulty\":5},\"image\":{\"full\":\"Irelia.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":0,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":580,\"hpperlevel\":95,\"mp\":350,\"mpperlevel\":30,\"movespeed\":335,\"armor\":36,\"armorperlevel\":3,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":200,\"hpregen\":8.5,\"hpregenperlevel\":0.85,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":4,\"attackspeedperlevel\":2.5,\"attackspeed\":0.656}},\"Ivern\":{\"version\":\"10.19.1\",\"id\":\"Ivern\",\"key\":\"427\",\"name\":\"翠神\",\"title\":\"艾翁\",\"blurb\":\"半人半树的艾翁•荆足常在符文之地的丛林中游荡，所经之处无不生机盎然。他知晓自然界的种种秘密，无论是飞禽走兽还是游鱼虫孑，都与他交谊深厚。在逍遥四野的途中，艾翁会向路遇的人传授奇特的智慧，或是培植丰茂的丛林。时不时地，他也会向口风不严的蝴蝶托付自己所知的秘密。\",\"info\":{\"attack\":3,\"defense\":5,\"magic\":7,\"difficulty\":7},\"image\":{\"full\":\"Ivern.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":48,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":585,\"hpperlevel\":95,\"mp\":450,\"mpperlevel\":60,\"movespeed\":330,\"armor\":27,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":475,\"hpregen\":7,\"hpregenperlevel\":0.85,\"mpregen\":6,\"mpregenperlevel\":0.75,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.4,\"attackspeed\":0.644}},\"Janna\":{\"version\":\"10.19.1\",\"id\":\"Janna\",\"key\":\"40\",\"name\":\"风暴之怒\",\"title\":\"迦娜\",\"blurb\":\"风暴是她的武器，符文之地是她的家园。神秘的迦娜是风元素的精灵，保护着祖安城内无依无靠的人们。有人相信她的诞生是源于符文之地水手们的祈愿，他们会祈祷友善的风伴他们渡过险恶的海域，战胜无情的风暴。后来她的眷顾和庇护被召唤到了祖安深处，在那里，迦娜成为了无助之人的希望灯塔。没人知道她会在何时何地出现，但大多数时候，她的到来都意味着援手。\",\"info\":{\"attack\":3,\"defense\":5,\"magic\":7,\"difficulty\":7},\"image\":{\"full\":\"Janna.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":96,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":500,\"hpperlevel\":70,\"mp\":350,\"mpperlevel\":64,\"movespeed\":315,\"armor\":28,\"armorperlevel\":3.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":46,\"attackdamageperlevel\":1.5,\"attackspeedperlevel\":2.95,\"attackspeed\":0.625}},\"JarvanIV\":{\"version\":\"10.19.1\",\"id\":\"JarvanIV\",\"key\":\"59\",\"name\":\"德玛西亚皇子\",\"title\":\"嘉文四世\",\"blurb\":\"皇子嘉文四世是皇家的血脉，意味着他便是德玛西亚的下一任国王。他自小被寄予厚望，有朝一日能够成为德玛西亚的楷模，而如此沉重的负担令他的心中充满了挣扎。在战场上，他英勇无畏的气势和一往无前的决心鼓舞着全军上下，显现出身为人主的真实才干。\",\"info\":{\"attack\":6,\"defense\":8,\"magic\":3,\"difficulty\":5},\"image\":{\"full\":\"JarvanIV.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":144,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":570,\"hpperlevel\":90,\"mp\":300,\"mpperlevel\":40,\"movespeed\":340,\"armor\":34,\"armorperlevel\":3.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.7,\"mpregen\":6.5,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3.4,\"attackspeedperlevel\":2.5,\"attackspeed\":0.658}},\"Jax\":{\"version\":\"10.19.1\",\"id\":\"Jax\",\"key\":\"24\",\"name\":\"武器大师\",\"title\":\"贾克斯\",\"blurb\":\"无论是各种兵器的技法，还是刻薄的挖苦嘲讽，贾克斯都无人能及，他是目前已知的最后一名艾卡西亚武器大师。曾经，故乡的人们狂妄自大地引来了虚空，结果导致家园被夷为平地。在那之后，贾克斯和他的同胞发誓要保护仅存的一切。如今，世界上的魔法再次涌起，沉睡的威胁也再次被触动。于是贾克斯开始在瓦洛兰漫游，手握艾卡西亚的最后光明，考验他遇到的每一名战士，寻找可与自己分庭抗礼的强者，并肩作战。\",\"info\":{\"attack\":7,\"defense\":5,\"magic\":7,\"difficulty\":5},\"image\":{\"full\":\"Jax.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":192,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":592.8,\"hpperlevel\":85,\"mp\":338.8,\"mpperlevel\":32,\"movespeed\":350,\"armor\":36,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.55,\"mpregen\":7.576,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.375,\"attackspeedperlevel\":3.4,\"attackspeed\":0.638}},\"Jayce\":{\"version\":\"10.19.1\",\"id\":\"Jayce\",\"key\":\"126\",\"name\":\"未来守护者\",\"title\":\"杰斯\",\"blurb\":\"杰斯是一位天才发明家，他为了守护皮尔特沃夫和这座城市对于进步的追求贡献了毕生的心血。杰斯依靠手中的海克斯科技变形锤，还有自己的力量、勇气和出众的智慧守护着他的故乡。虽然整座城市都将他视为英雄，但他却并没有处理好这样的声名。即便如此，杰斯的心之所向依旧纯良，即使是那些嫉妒他天赋的人，也会真心实意地感谢他给进步之城带来的保护。\",\"info\":{\"attack\":8,\"defense\":4,\"magic\":3,\"difficulty\":7},\"image\":{\"full\":\"Jayce.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":240,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":560,\"hpperlevel\":90,\"mp\":375,\"mpperlevel\":45,\"movespeed\":335,\"armor\":27,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":125,\"hpregen\":6,\"hpregenperlevel\":0.6,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54,\"attackdamageperlevel\":4.25,\"attackspeedperlevel\":3,\"attackspeed\":0.658}},\"Jhin\":{\"version\":\"10.19.1\",\"id\":\"Jhin\",\"key\":\"202\",\"name\":\"戏命师\",\"title\":\"烬\",\"blurb\":\"作为一名心思缜密的癫狂杀手，烬坚信谋杀是一门艺术。他曾在艾欧尼亚的监狱中服刑，但却因为执政议会里涌动着的暗流而得到释放，成为了权术斗争所利用的刺客。烬将手中的枪当成画笔，尽情地挥洒他所追求的残忍艺术，让受害者肝胆俱裂，令旁观者震悚难平。他在自己制作的阴森剧目里肆意取乐，让“恐怖”二字有了最合适不过的信使。\",\"info\":{\"attack\":10,\"defense\":2,\"magic\":6,\"difficulty\":6},\"image\":{\"full\":\"Jhin.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":288,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":585,\"hpperlevel\":93,\"mp\":300,\"mpperlevel\":50,\"movespeed\":330,\"armor\":24,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.75,\"hpregenperlevel\":0.55,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":4.7,\"attackspeedperlevel\":0,\"attackspeed\":0.625}},\"Jinx\":{\"version\":\"10.19.1\",\"id\":\"Jinx\",\"key\":\"222\",\"name\":\"暴走萝莉\",\"title\":\"金克丝\",\"blurb\":\"神经狂躁、冲动任性、劣迹斑斑……金克丝出身自祖安，生来就爱不计后果地大搞破坏。她就是一座人形自走军火库，所经之处必定会留下夺目的火光和震耳的爆炸。金克丝最讨厌无聊，所以不管她去到哪里，混乱和骚动就会如期而至，这就是她留下的“到此一游”。\",\"info\":{\"attack\":9,\"defense\":2,\"magic\":4,\"difficulty\":6},\"image\":{\"full\":\"Jinx.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":336,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":610,\"hpperlevel\":86,\"mp\":245,\"mpperlevel\":45,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":3.75,\"hpregenperlevel\":0.5,\"mpregen\":6.7,\"mpregenperlevel\":1,\"crit\":0,\"critperlevel\":0,\"attackdamage\":57,\"attackdamageperlevel\":3.4,\"attackspeedperlevel\":1,\"attackspeed\":0.625}},\"Kaisa\":{\"version\":\"10.19.1\",\"id\":\"Kaisa\",\"key\":\"145\",\"name\":\"虚空之女\",\"title\":\"卡莎\",\"blurb\":\"在孩童时期就被虚空夺走的卡莎，凭着纯粹的固执和意志力活了下来。她的历练让她成为了一位夺命的猎手，或者也有人会称她为黑暗未来的使者。她与一副有生命的虚空生物甲壳形成了一种不得安宁的共生状态，而很快她就将面临一个重大的抉择，究竟是原谅那些称她为怪物的凡人并协力抵御压境的黑暗……还是干脆忘记，放任虚空吞噬这个已将她抛弃的世界。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"Kaisa.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":384,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":600,\"hpperlevel\":88,\"mp\":344.88,\"mpperlevel\":38,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":8.2,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":2,\"attackspeedperlevel\":1.8,\"attackspeed\":0.644}},\"Kalista\":{\"version\":\"10.19.1\",\"id\":\"Kalista\",\"key\":\"429\",\"name\":\"复仇之矛\",\"title\":\"卡莉丝塔\",\"blurb\":\"卡莉丝塔是充满复仇怨念的幽灵，是不灭的复仇之魂，是召唤自暗影岛的噩梦，专门猎杀背信弃义之人。因遭人背叛而受害的人会以血泪盼望着复仇，但只有甘愿献上自己灵魂的人，才能获得卡莉丝塔的回应。所有被卡莉丝塔盯上的人都将不可避免地遭遇不幸，因为这位死亡猎手完成誓约的方式只有一种，那就是她灵魂标枪上的冷酷灵火。\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":4,\"difficulty\":7},\"image\":{\"full\":\"Kalista.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":432,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":534,\"hpperlevel\":100,\"mp\":250,\"mpperlevel\":45,\"movespeed\":325,\"armor\":21,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":3.75,\"hpregenperlevel\":0.55,\"mpregen\":6.3,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":69,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":4,\"attackspeed\":0.694}},\"Karma\":{\"version\":\"10.19.1\",\"id\":\"Karma\",\"key\":\"43\",\"name\":\"天启者\",\"title\":\"卡尔玛\",\"blurb\":\"要说哪位英雄能代表艾欧尼亚的精神传统，没有谁比卡尔玛更合适。她是一个古代灵魂在当代的化身，经历过无数次转世，每次获得新生都会继承以前的全部记忆，同时也被赐予常人无法理解的力量。她在最近一次遭遇危难之时倾尽全力引领她的人民，但她知道，要获得和平与和谐，就必须付出重大代价——既是对她自己，也是对她深爱的土地。\",\"info\":{\"attack\":1,\"defense\":7,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Karma.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":0,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":534,\"hpperlevel\":95,\"mp\":374,\"mpperlevel\":50,\"movespeed\":335,\"armor\":26,\"armorperlevel\":3.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":11.5,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.544,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.3,\"attackspeed\":0.625}},\"Karthus\":{\"version\":\"10.19.1\",\"id\":\"Karthus\",\"key\":\"30\",\"name\":\"死亡颂唱者\",\"title\":\"卡尔萨斯\",\"blurb\":\"卡尔萨斯是湮灭的使者，是不死的亡灵。从来都是未见其恐怖身影，先闻其鬼魅挽歌。活着的人惧怕那些永世不得超生的亡灵，但卡尔萨斯却在亡灵的存在中只看到了美丽和纯洁，这是生与死的完美融合。当卡尔萨斯从暗影岛获得新生的时候，他决心要担任不死亡灵的使徒，把死亡的欣喜带给所有凡人。\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":10,\"difficulty\":7},\"image\":{\"full\":\"Karthus.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":48,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":550,\"hpperlevel\":87,\"mp\":467,\"mpperlevel\":30.5,\"movespeed\":335,\"armor\":20.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":450,\"hpregen\":6.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":45.66,\"attackdamageperlevel\":3.25,\"attackspeedperlevel\":2.11,\"attackspeed\":0.625}},\"Kassadin\":{\"version\":\"10.19.1\",\"id\":\"Kassadin\",\"key\":\"38\",\"name\":\"虚空行者\",\"title\":\"卡萨丁\",\"blurb\":\"在世界上最黑暗的地方，卡萨丁切出了一道燃烧的裂口，他知道自己已经时日无多。他曾是恕瑞玛地区的向导和冒险家，后来选择在恕瑞玛南方平静的部落中安家落户——直到那一天，他的村庄被虚空吞噬。卡萨丁发誓要报仇雪恨，于是整合了许多秘法器物和禁忌之术，以便应对前方的险阻。最后，卡萨丁动身前往艾卡西亚的废土，准备面对任何虚空的造物，寻找那位自封的先知，玛尔扎哈。\",\"info\":{\"attack\":3,\"defense\":5,\"magic\":8,\"difficulty\":8},\"image\":{\"full\":\"Kassadin.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":96,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":576,\"hpperlevel\":90,\"mp\":397.6,\"mpperlevel\":67,\"movespeed\":335,\"armor\":19,\"armorperlevel\":2.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":150,\"hpregen\":6,\"hpregenperlevel\":0.5,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58.852,\"attackdamageperlevel\":3.9,\"attackspeedperlevel\":3.7,\"attackspeed\":0.64}},\"Katarina\":{\"version\":\"10.19.1\",\"id\":\"Katarina\",\"key\":\"55\",\"name\":\"不祥之刃\",\"title\":\"卡特琳娜\",\"blurb\":\"果断坚决、心狠手辣，卡特琳娜是诺克萨斯的顶尖刺客。作为传奇将军杜·克卡奥的长女，她凭借出其不意的迅猛刺杀很快声名鹊起。强烈的野心曾经驱使她挑战重兵把守的暗杀目标，甚至不惜冒险让友军暴露在危险中。不过无论是怎样的任务，卡特琳娜都会毫不迟疑地在锯刃匕首的风暴中履行自己的使命。\",\"info\":{\"attack\":4,\"defense\":3,\"magic\":9,\"difficulty\":8},\"image\":{\"full\":\"Katarina.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":144,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Mage\"],\"partype\":\"无\",\"stats\":{\"hp\":602,\"hpperlevel\":94,\"mp\":0,\"mpperlevel\":0,\"movespeed\":340,\"armor\":27.88,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7.5,\"hpregenperlevel\":0.7,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":2.74,\"attackspeed\":0.658}},\"Kayle\":{\"version\":\"10.19.1\",\"id\":\"Kayle\",\"key\":\"10\",\"name\":\"正义天使\",\"title\":\"凯尔\",\"blurb\":\"在符文战争最激烈的时刻，一位巨神星灵诞下了凯尔，她传承了母亲的荣耀，在圣火飞翼的承载下为了正义而战。她和孪生妹妹莫甘娜曾是德玛西亚的保护神——但凡人反反复复的失败最终让凯尔的幻想破灭，彻底抛弃了这个国度。但关于她用火焰长剑惩罚不义之徒的传说依然在流传，关于她终将回归的希望也依然在持续……\",\"info\":{\"attack\":6,\"defense\":6,\"magic\":7,\"difficulty\":7},\"image\":{\"full\":\"Kayle.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":192,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":600,\"hpperlevel\":85,\"mp\":330,\"mpperlevel\":50,\"movespeed\":335,\"armor\":26,\"armorperlevel\":3,\"spellblock\":34,\"spellblockperlevel\":0.5,\"attackrange\":175,\"hpregen\":5,\"hpregenperlevel\":0.5,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50,\"attackdamageperlevel\":2.5,\"attackspeedperlevel\":1.5,\"attackspeed\":0.625}},\"Kayn\":{\"version\":\"10.19.1\",\"id\":\"Kayn\",\"key\":\"141\",\"name\":\"影流之镰\",\"title\":\"凯隐\",\"blurb\":\"悉达·凯隐是修行暗影魔法的精英，他战斗的意义，是为了实现自己真正的命运——为了有朝一日能够率领影流教派，开创艾欧尼亚霸业的新世代。凯隐挥舞着活体暗裔武器拉亚斯特，毫不在意它给自己身体和思想带来的腐化。这样后果只可能有两种：要么，凯隐让这把武器屈服于自己的意志；要么，这副恶毒的刀刃将他彻底吞噬，为符文之地的毁灭奏响序曲。\",\"info\":{\"attack\":10,\"defense\":6,\"magic\":1,\"difficulty\":8},\"image\":{\"full\":\"Kayn.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":240,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":585,\"hpperlevel\":85,\"mp\":410,\"mpperlevel\":50,\"movespeed\":340,\"armor\":38,\"armorperlevel\":3.3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.75,\"mpregen\":11.5,\"mpregenperlevel\":0.95,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.7,\"attackspeed\":0.669}},\"Kennen\":{\"version\":\"10.19.1\",\"id\":\"Kennen\",\"key\":\"85\",\"name\":\"狂暴之心\",\"title\":\"凯南\",\"blurb\":\"凯南不仅是捍卫艾欧尼亚均衡的迅猛如雷电的执法者，而且还是均衡教派中唯一的一名约德尔人。虽然他身体小巧，浑身绒毛，但他能用手里剑的风暴和无限的热情迎接任何敌人的威胁。他和自己的师父慎一起在精神领域巡逻，使用雷电的能量痛击敌人。\",\"info\":{\"attack\":6,\"defense\":4,\"magic\":7,\"difficulty\":4},\"image\":{\"full\":\"Kennen.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":288,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Marksman\"],\"partype\":\"能量\",\"stats\":{\"hp\":541,\"hpperlevel\":84,\"mp\":200,\"mpperlevel\":0,\"movespeed\":335,\"armor\":29,\"armorperlevel\":3.75,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.65,\"mpregen\":50,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":48,\"attackdamageperlevel\":3.75,\"attackspeedperlevel\":3.4,\"attackspeed\":0.625}},\"Khazix\":{\"version\":\"10.19.1\",\"id\":\"Khazix\",\"key\":\"121\",\"name\":\"虚空掠夺者\",\"title\":\"卡兹克\",\"blurb\":\"虚空在成长，虚空在不断适应。在众多虚空生物中，没有哪种比卡兹克更能体现这一特性。进化的动力让这种恐怖不断变异，本能地求生并弑杀强者。只要它遇到了障碍，就会进化出新的、更有效的方法反制并杀掉猎物。卡兹克最初只是个愚钝的野兽，然而它的智力和它的形态一样获得了发展。现在，这只生物会提前计划狩猎行动，甚至懂得在猎物心中制造最真实的恐惧。\",\"info\":{\"attack\":9,\"defense\":4,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"Khazix.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":336,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":572.8,\"hpperlevel\":85,\"mp\":327.2,\"mpperlevel\":40,\"movespeed\":350,\"armor\":36,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7.5,\"hpregenperlevel\":0.75,\"mpregen\":7.59,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.7,\"attackspeed\":0.668}},\"Kindred\":{\"version\":\"10.19.1\",\"id\":\"Kindred\",\"key\":\"203\",\"name\":\"永猎双子\",\"title\":\"千珏\",\"blurb\":\"千珏，作为象征死亡的一对精魂，他们互相独立，却从未分离。对于坦然接受命运的人来说，羊灵的长弓可以痛快地送他们离开生者的乐园，而妄图逃脱宿命的人则由狼灵追捕，痛苦地倒在他有力的撕咬下。虽然在符文之地上到处是关于千珏的不同传言，但每个人在临终时都会看到死亡的真正面孔。至于是哪一面，完全出自个人的抉择。\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":2,\"difficulty\":4},\"image\":{\"full\":\"Kindred.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":384,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":540,\"hpperlevel\":85,\"mp\":300,\"mpperlevel\":35,\"movespeed\":325,\"armor\":29,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":7,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":65,\"attackdamageperlevel\":2.5,\"attackspeedperlevel\":3.5,\"attackspeed\":0.625}},\"Kled\":{\"version\":\"10.19.1\",\"id\":\"Kled\",\"key\":\"240\",\"name\":\"暴怒骑士\",\"title\":\"克烈\",\"blurb\":\"无畏而且无赖的约德尔人克烈是诺克萨斯的意志化身、帝国士兵的仰慕偶像、长官眼里的定时炸弹、贵族鄙夷的送死小卒。很多军士都说，克烈参与了有史以来军团所挑起的每一场征战，“获得”了军中的每一份头衔，而且从来没有却步于任何一次战斗。虽然传闻总是不可全信，但至少有一件事毋庸置疑：只要克烈骑着胆小的斯嘎尔冲进战场，他的战斗便是为了保住所拥有的一切……或是抢走他想要的一切。\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":2,\"difficulty\":7},\"image\":{\"full\":\"Kled.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":432,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"勇气\",\"stats\":{\"hp\":340,\"hpperlevel\":70,\"mp\":100,\"mpperlevel\":0,\"movespeed\":345,\"armor\":35,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":6,\"hpregenperlevel\":0.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":65,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":3.5,\"attackspeed\":0.625}},\"KogMaw\":{\"version\":\"10.19.1\",\"id\":\"KogMaw\",\"key\":\"96\",\"name\":\"深渊巨口\",\"title\":\"克格莫\",\"blurb\":\"从艾卡西亚废墟深处的腐败裂口中，克格莫喷着进食后的胀气走入了符文之地，它是一只好奇的生物，然而身上散发着腐烂的恶臭，血盆大口里淌着腐蚀性的粘液。这只特别的虚空生物需要用牙齿和口水去理解周围的事物。虽然克格莫并非本性邪恶，但它的天真无知同样很危险，因为它的无知往往预示着一场疯狂的暴食——并不是为了填饱肚子，而是为了满足它无尽的好奇。\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":5,\"difficulty\":6},\"image\":{\"full\":\"KogMaw.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":565,\"hpperlevel\":85,\"mp\":325,\"mpperlevel\":40,\"movespeed\":330,\"armor\":24,\"armorperlevel\":3.25,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":3.75,\"hpregenperlevel\":0.55,\"mpregen\":8.75,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.11,\"attackspeedperlevel\":2.65,\"attackspeed\":0.665}},\"Leblanc\":{\"version\":\"10.19.1\",\"id\":\"Leblanc\",\"key\":\"7\",\"name\":\"诡术妖姬\",\"title\":\"乐芙兰\",\"blurb\":\"即使是在秘密团体黑色玫瑰的成员内部，乐芙兰也同样保持神秘，而乐芙兰这个名字也只是众多化名之一。这个皮肤惨白的女人自从诺克萨斯建国初期就开始操纵大小人物，推动事态发展。这位女法师能用魔法制造自己的镜像，她可以出现在任何地点、任何人面前、甚至同时现身于许多地方。乐芙兰永远都在暗处密谋策划，而她真正的动机和她变换不定的身份一样令人难以捉摸。\",\"info\":{\"attack\":1,\"defense\":4,\"magic\":10,\"difficulty\":9},\"image\":{\"full\":\"Leblanc.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":48,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":528,\"hpperlevel\":92,\"mp\":334,\"mpperlevel\":50,\"movespeed\":340,\"armor\":21.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":7.5,\"hpregenperlevel\":0.55,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54.88,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":1.4,\"attackspeed\":0.625}},\"LeeSin\":{\"version\":\"10.19.1\",\"id\":\"LeeSin\",\"key\":\"64\",\"name\":\"盲僧\",\"title\":\"李青\",\"blurb\":\"李青是艾欧尼亚古老武术的大师，讲原则、重信义的他能将神龙之灵的精粹运用自如，助他面对任何挑战。虽然他多年前便已双目失明，但这位武僧依然献出自己的全部力量，用生命捍卫家园，抵御任何胆敢打破这里神圣均衡的人。所有因他安静冥想的举动而掉以轻心的敌人都将品尝他燃烧的拳头和炽烈的回旋踢。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"LeeSin.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":96,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"能量\",\"stats\":{\"hp\":575,\"hpperlevel\":85,\"mp\":200,\"mpperlevel\":0,\"movespeed\":345,\"armor\":33,\"armorperlevel\":3.7,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7.5,\"hpregenperlevel\":0.7,\"mpregen\":50,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":70,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":3,\"attackspeed\":0.651}},\"Leona\":{\"version\":\"10.19.1\",\"id\":\"Leona\",\"key\":\"89\",\"name\":\"曙光女神\",\"title\":\"蕾欧娜\",\"blurb\":\"蕾欧娜是被灌注了烈阳之火的烈阳教派圣殿武士，用天顶之刃和破晓之盾守护着巨神峰。她的皮肤闪烁着星火，她体内天界星灵的力量透过她的双眼炯炯燃烧。蕾欧娜身披金色铠甲，背负着沉重的上古知识，为一些人带来启示，为另一些人带去死亡。\",\"info\":{\"attack\":4,\"defense\":8,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Leona.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":144,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":576.16,\"hpperlevel\":87,\"mp\":302.2,\"mpperlevel\":40,\"movespeed\":335,\"armor\":47,\"armorperlevel\":3.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.85,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60.04,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.9,\"attackspeed\":0.625}},\"Lillia\":{\"version\":\"10.19.1\",\"id\":\"Lillia\",\"key\":\"876\",\"name\":\"含羞蓓蕾\",\"title\":\"莉莉娅\",\"blurb\":\"羞怯难当的仙灵小鹿莉莉娅在艾欧尼亚的森林中蹦跳着游荡。她躲藏在凡人视线的边缘，因为凡人的神秘一直都让她着迷，同时也让她害怕。莉莉娅要查清楚为什么他们的梦境再也无法抵达幻梦树。如今她带着一根魔法树枝游历艾欧尼亚，寻找人们未实现的梦境。只有通过梦境，莉莉娅才能绽放，并帮助其他人解开恐惧的郁结，找寻内心的闪光。呦——！\",\"info\":{\"attack\":0,\"defense\":2,\"magic\":10,\"difficulty\":8},\"image\":{\"full\":\"Lillia.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":192,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":580,\"hpperlevel\":90,\"mp\":410,\"mpperlevel\":50,\"movespeed\":330,\"armor\":20,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":0.75,\"attackrange\":325,\"hpregen\":9,\"hpregenperlevel\":0.75,\"mpregen\":11.5,\"mpregenperlevel\":0.95,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.7,\"attackspeed\":0.625}},\"Lissandra\":{\"version\":\"10.19.1\",\"id\":\"Lissandra\",\"key\":\"127\",\"name\":\"冰霜女巫\",\"title\":\"丽桑卓\",\"blurb\":\"丽桑卓的魔法将纯净的冰霜之力扭曲为某种黑暗而可怕的东西。她的黯冰之力不仅能冻结一切，还能将任何反抗之人刺穿并粉碎。在北部终日惊惶的居民中，人们只知道她是“冰霜女巫”。但事实却更为邪恶：丽桑卓是自然世界的腐化者，她的阴谋是要让全世界都进入都彻骨寒冷的冰河世纪。\",\"info\":{\"attack\":2,\"defense\":5,\"magic\":8,\"difficulty\":6},\"image\":{\"full\":\"Lissandra.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":240,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":550,\"hpperlevel\":90,\"mp\":475,\"mpperlevel\":30,\"movespeed\":325,\"armor\":22,\"armorperlevel\":3.7,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53,\"attackdamageperlevel\":2.7,\"attackspeedperlevel\":1.36,\"attackspeed\":0.656}},\"Lucian\":{\"version\":\"10.19.1\",\"id\":\"Lucian\",\"key\":\"236\",\"name\":\"圣枪游侠\",\"title\":\"卢锡安\",\"blurb\":\"卢锡安，一名光明哨兵，一个狩猎不死亡灵的残酷猎手，使用一双圣物手枪进行无情的追踪与杀灭。当怨灵锤石夺走他妻子的生命后，卢锡安踏上了复仇之路。但即便她已重获新生，他的怒火也没有平息。无情而又固执的卢锡安将不惜一切代价，保护生者，对抗黑雾中那亡故已久的恐怖。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"Lucian.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":288,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":571,\"hpperlevel\":86,\"mp\":348.88,\"mpperlevel\":38,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":3.75,\"hpregenperlevel\":0.65,\"mpregen\":8.176,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":2.3,\"attackspeedperlevel\":3.3,\"attackspeed\":0.638}},\"Lulu\":{\"version\":\"10.19.1\",\"id\":\"Lulu\",\"key\":\"117\",\"name\":\"仙灵女巫\",\"title\":\"璐璐\",\"blurb\":\"璐璐是一位约德尔女巫，最著名的能力是召来梦境般的幻觉和奇异的小动物，小仙灵皮克斯就是她云游符文之地的伙伴。璐璐可以突发奇想地重塑现实，改变世界的本质结构，改造这个平凡的物质领域中任何让她感觉是限制的东西。虽然其他人对她的魔法颇有微词，往好听了说是一种异象，往难听了说是一种危害。但是璐璐始终认为，一点魔力的启发对任何人都没有坏处。\",\"info\":{\"attack\":4,\"defense\":5,\"magic\":7,\"difficulty\":5},\"image\":{\"full\":\"Lulu.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":336,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":525,\"hpperlevel\":74,\"mp\":350,\"mpperlevel\":55,\"movespeed\":330,\"armor\":29,\"armorperlevel\":3.7,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6,\"hpregenperlevel\":0.6,\"mpregen\":11,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":47,\"attackdamageperlevel\":2.6,\"attackspeedperlevel\":2.25,\"attackspeed\":0.625}},\"Lux\":{\"version\":\"10.19.1\",\"id\":\"Lux\",\"key\":\"99\",\"name\":\"光辉女郎\",\"title\":\"拉克丝\",\"blurb\":\"拉克珊娜·冕卫出身自德玛西亚，一个将魔法视为禁忌的封闭国度。只要一提起魔法，人们总是带着恐惧和怀疑。所以拥有折光之力的她，在童年的成长过程中始终担心被人发现进而遭到放逐，一直强迫自己隐瞒力量，以此保住家族的贵族地位。虽然如此，拉克丝的乐观和顽强让她学会拥抱自己独特的天赋，现在的她正在秘密地运用自己的能力为祖国效力。\",\"info\":{\"attack\":2,\"defense\":4,\"magic\":9,\"difficulty\":5},\"image\":{\"full\":\"Lux.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":384,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":490,\"hpperlevel\":85,\"mp\":480,\"mpperlevel\":23.5,\"movespeed\":330,\"armor\":18.72,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.54,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":1,\"attackspeed\":0.669}},\"Malphite\":{\"version\":\"10.19.1\",\"id\":\"Malphite\",\"key\":\"54\",\"name\":\"熔岩巨兽\",\"title\":\"墨菲特\",\"blurb\":\"墨菲特是一个庞大的岩石生物，为了给混乱的世界赐予秩序而不懈奋斗。他诞生之初的身份是一个石仆，侍奉着一块超乎凡人理解的石碑，名为“独石”。他用万钧元素之力维护自己的先祖，但最终遭遇了失败。在随后的毁灭中，墨菲特成为了唯一的幸存者。如今他忍受着符文之地的脆弱凡人和他们流水一般多变的性情，同时想尽办法给自己寻找一个存于世上的新位置，让自己不愧为同胞中的最后一员。\",\"info\":{\"attack\":5,\"defense\":9,\"magic\":7,\"difficulty\":2},\"image\":{\"full\":\"Malphite.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":432,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":574.2,\"hpperlevel\":90,\"mp\":282.2,\"mpperlevel\":40,\"movespeed\":335,\"armor\":37,\"armorperlevel\":3.75,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":7.324,\"mpregenperlevel\":0.55,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61.97,\"attackdamageperlevel\":4,\"attackspeedperlevel\":3.4,\"attackspeed\":0.736}},\"Malzahar\":{\"version\":\"10.19.1\",\"id\":\"Malzahar\",\"key\":\"90\",\"name\":\"虚空先知\",\"title\":\"玛尔扎哈\",\"blurb\":\"玛尔扎哈是一名狂热的先知，将自己的全部奉献给一切生命的大一统。他坚信，近来新出现的虚空就是符文之地的救赎。在恕瑞玛的沙漠荒原上，他曾一度追随着脑海中的窃窃私语，一路来到古艾卡西亚。在这片废墟中，他窥见了虚空深处的黑暗核心，被赋予了新的力量和目标。玛尔扎哈现在视自己为迷途羔羊的牧人，将其他人带进畜栏，或是放出藏身地下的虚灵生物。\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":9,\"difficulty\":6},\"image\":{\"full\":\"Malzahar.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":0,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":537,\"hpperlevel\":87,\"mp\":375,\"mpperlevel\":27.5,\"movespeed\":335,\"armor\":18,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":6,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.5,\"attackspeed\":0.625}},\"Maokai\":{\"version\":\"10.19.1\",\"id\":\"Maokai\",\"key\":\"57\",\"name\":\"扭曲树精\",\"title\":\"茂凯\",\"blurb\":\"茂凯是一只内心暴怒外形魁梧的树精，不知疲倦地对抗暗影岛的骇人异象。一场魔法灾变摧毁了他的家园，同时也将他变成一股复仇的力量，使他免遭不死诅咒的，全靠他芯中灌注融合的生命之水。曾经的茂凯是一只平和的自然之灵，而现在的他则一直在暴怒地战斗，只为了将不死的灾祸逐出暗影岛，让他的家园重归往日的秀美。\",\"info\":{\"attack\":3,\"defense\":8,\"magic\":6,\"difficulty\":3},\"image\":{\"full\":\"Maokai.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":48,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":565,\"hpperlevel\":95,\"mp\":375,\"mpperlevel\":43,\"movespeed\":335,\"armor\":39,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":5,\"hpregenperlevel\":0.75,\"mpregen\":7.2,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63.54,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.125,\"attackspeed\":0.8}},\"MasterYi\":{\"version\":\"10.19.1\",\"id\":\"MasterYi\",\"key\":\"11\",\"name\":\"无极剑圣\",\"title\":\"易\",\"blurb\":\"易师锤炼身体、磨砺心智，直至身心合一。尽管他将暴力作为不得已的选择，但他优雅迅猛的剑法总是让这一手段显得尤为快捷。作为无极之道最后的门徒，易大师致力于这个门派的传承，用七度洞悉目镜搜寻着最有资格的人，寻找潜在的新弟子。\",\"info\":{\"attack\":10,\"defense\":4,\"magic\":2,\"difficulty\":4},\"image\":{\"full\":\"MasterYi.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":96,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":598.56,\"hpperlevel\":92,\"mp\":250.56,\"mpperlevel\":42,\"movespeed\":355,\"armor\":33,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7.5,\"hpregenperlevel\":0.65,\"mpregen\":7.256,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.679}},\"MissFortune\":{\"version\":\"10.19.1\",\"id\":\"MissFortune\",\"key\":\"21\",\"name\":\"赏金猎人\",\"title\":\"厄运小姐\",\"blurb\":\"以美貌闻名，但却以无情立命的莎拉是一位比尔吉沃特的船长，她在这座港镇的强硬犯罪集团中塑造了不容轻视的形象。在她还是个孩子的时候，亲眼目睹了海盗之王普朗克谋杀了自己的家人。多年以后她残忍地报仇雪恨，把他和他的旗舰连人带船一同炸飞。所有低估她的人都会发现，自己面对的是一个极具欺骗性的狡黠对手，还有可能要处理肚子里的一两颗子弹。\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":5,\"difficulty\":1},\"image\":{\"full\":\"MissFortune.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":144,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":570,\"hpperlevel\":93,\"mp\":325.84,\"mpperlevel\":35,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.75,\"hpregenperlevel\":0.65,\"mpregen\":8.042,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":52,\"attackdamageperlevel\":2.7,\"attackspeedperlevel\":3,\"attackspeed\":0.656}},\"MonkeyKing\":{\"version\":\"10.19.1\",\"id\":\"MonkeyKing\",\"key\":\"62\",\"name\":\"齐天大圣\",\"title\":\"孙悟空\",\"blurb\":\"悟空是一个瓦斯塔亚族的机灵鬼，用自己的力量、灵敏和机智迷惑对手并抢得先机。机缘巧合让他结识了一位剑客并与之成为一生的挚友，这位剑客被人称作易大师。后来，悟空就成为了古老武术门派“无极”的最后一位弟子。如今，附魔长棍傍身的悟空，目标是让艾欧尼亚免遭崩溃的命运。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":2,\"difficulty\":3},\"image\":{\"full\":\"MonkeyKing.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":192,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":540,\"hpperlevel\":85,\"mp\":300,\"mpperlevel\":45,\"movespeed\":345,\"armor\":31,\"armorperlevel\":3.5,\"spellblock\":28,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":4,\"hpregenperlevel\":0.65,\"mpregen\":8,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":4,\"attackspeedperlevel\":3,\"attackspeed\":0.711}},\"Mordekaiser\":{\"version\":\"10.19.1\",\"id\":\"Mordekaiser\",\"key\":\"82\",\"name\":\"铁铠冥魂\",\"title\":\"莫德凯撒\",\"blurb\":\"两度被杀，三度重生。莫德凯撒是一位来自远古纪元的残酷军阀，他使用死灵巫术将无数灵魂禁锢在永恒的奴役中。现在几乎无人记得他早期的那些征服战争，也无人知道他有多强大的力量，但也有一些古老的灵魂认得他，而他们一直都在担心有一天他会回来，同时统治生者和死者。\",\"info\":{\"attack\":4,\"defense\":6,\"magic\":7,\"difficulty\":4},\"image\":{\"full\":\"Mordekaiser.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":240,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\"],\"partype\":\"护盾\",\"stats\":{\"hp\":575,\"hpperlevel\":90,\"mp\":100,\"mpperlevel\":0,\"movespeed\":335,\"armor\":37,\"armorperlevel\":3,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":5,\"hpregenperlevel\":0.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":4,\"attackspeedperlevel\":1,\"attackspeed\":0.625}},\"Morgana\":{\"version\":\"10.19.1\",\"id\":\"Morgana\",\"key\":\"25\",\"name\":\"堕落天使\",\"title\":\"莫甘娜\",\"blurb\":\"在天界与凡间双重本性的夹缝中左右为难的莫甘娜，束缚了自己的双翼并拥抱了人性，还将自己的痛苦和怨恨施加给那些失信和堕落之人。她抗拒一切在她眼中不公正的法律和传统，并从德玛西亚的黑影中投出保护的盾牌和暗焰的锁链，在别人想要打压的暗处为真理而战。最重要的是，莫甘娜坚信，即使是被放逐、被遗弃的人，也可能有朝一日东山再起。\",\"info\":{\"attack\":1,\"defense\":6,\"magic\":8,\"difficulty\":1},\"image\":{\"full\":\"Morgana.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":288,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":560,\"hpperlevel\":90,\"mp\":340,\"mpperlevel\":60,\"movespeed\":335,\"armor\":25,\"armorperlevel\":3.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":450,\"hpregen\":5.5,\"hpregenperlevel\":0.4,\"mpregen\":11,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":56,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":1.53,\"attackspeed\":0.625}},\"Nami\":{\"version\":\"10.19.1\",\"id\":\"Nami\",\"key\":\"267\",\"name\":\"唤潮鲛姬\",\"title\":\"娜美\",\"blurb\":\"娜美是一名强大年轻的瓦斯塔亚海族。当鲛人族与巨神族之间自古订立的契约被打破，她是第一个离开海洋、踏上陆地的人。她别无选择，只能挺身而出担此重任，完成神圣的仪式从而确保族人的安全。在这崭新时代的混乱浪潮中，娜美用无比的决心和无畏的斗志面对未知的明天，用手中的唤潮者之杖召唤来自海洋的力量。\",\"info\":{\"attack\":4,\"defense\":3,\"magic\":7,\"difficulty\":5},\"image\":{\"full\":\"Nami.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":336,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":475,\"hpperlevel\":74,\"mp\":365,\"mpperlevel\":43,\"movespeed\":335,\"armor\":29,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":51.208,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.61,\"attackspeed\":0.644}},\"Nasus\":{\"version\":\"10.19.1\",\"id\":\"Nasus\",\"key\":\"75\",\"name\":\"沙漠死神\",\"title\":\"内瑟斯\",\"blurb\":\"内瑟斯是一位庄严威武的犬首人身飞升者，在古代恕瑞玛帝国时期，是被沙漠子民敬仰为半神的英雄人物。作为知识的守护者和无双的战术家，他用高绝的智慧引导着古代恕瑞玛帝国在数百年间走向了繁荣伟大。帝国陨落以后，他开始了自我放逐，成为了人们口中缥缈的传说。现在，恕瑞玛古城已经再一次崛起，他也随之回归，并决心绝不让它再度陨落。\",\"info\":{\"attack\":7,\"defense\":5,\"magic\":6,\"difficulty\":6},\"image\":{\"full\":\"Nasus.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":384,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":561.2,\"hpperlevel\":90,\"mp\":325.6,\"mpperlevel\":42,\"movespeed\":350,\"armor\":34,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9,\"hpregenperlevel\":0.9,\"mpregen\":7.44,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":67,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":3.48,\"attackspeed\":0.638}},\"Nautilus\":{\"version\":\"10.19.1\",\"id\":\"Nautilus\",\"key\":\"111\",\"name\":\"深海泰坦\",\"title\":\"诺提勒斯\",\"blurb\":\"早在比尔吉沃特立起第一座码头的时候，就有一个孤独的传说。身着铁甲的巨人诺提勒斯在蓝焰岛附近的黑暗水域中徘徊。他心里记恨着一桩不可原谅的背叛，毫无预警地出手。他甩动巨大的船锚，拯救落难的可怜虫，或是将贪婪的人拖进末日。据说，没有缴“比尔吉沃特什一税”的人就是他的目标。他会带着他们和自己一起沉入波涛——相当于一个铁板钉钉的提醒，没人能逃脱深海的制裁。\",\"info\":{\"attack\":4,\"defense\":6,\"magic\":6,\"difficulty\":6},\"image\":{\"full\":\"Nautilus.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":432,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":576.48,\"hpperlevel\":86,\"mp\":400,\"mpperlevel\":47,\"movespeed\":325,\"armor\":39,\"armorperlevel\":3.75,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8.5,\"hpregenperlevel\":0.55,\"mpregen\":8.626,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":1,\"attackspeed\":0.706}},\"Neeko\":{\"version\":\"10.19.1\",\"id\":\"Neeko\",\"key\":\"518\",\"name\":\"万花通灵\",\"title\":\"妮蔻\",\"blurb\":\"妮蔻来自一个早已迷失的瓦斯塔亚部落。她可以借用别人的外表来伪装自己，融入人群，甚至通过影响别人的情绪状态，一瞬间就能化敌为友。没人知道妮蔻到底在哪儿——或者到底是谁，但是想要为难她的人会立刻见识到她的本色，感受原始的精神魔法倾泻在自己身上的痛苦。\",\"info\":{\"attack\":1,\"defense\":1,\"magic\":9,\"difficulty\":5},\"image\":{\"full\":\"Neeko.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":0,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":540,\"hpperlevel\":90,\"mp\":450,\"mpperlevel\":30,\"movespeed\":340,\"armor\":21,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":7.5,\"hpregenperlevel\":0.75,\"mpregen\":7,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":48,\"attackdamageperlevel\":2.5,\"attackspeedperlevel\":3.5,\"attackspeed\":0.625}},\"Nidalee\":{\"version\":\"10.19.1\",\"id\":\"Nidalee\",\"key\":\"76\",\"name\":\"狂野女猎手\",\"title\":\"奈德丽\",\"blurb\":\"在密林深处长大的奈德丽是一位追猎大师，她可以变换形态，成为一只凶猛的美洲狮。她既不是真正的人类，也不是真正的野兽，但她会用精心布置的陷阱和灵活自如的标枪，凶狠地捍卫自己的领地不被任何人侵犯。她会先打击猎物的行动能力，然后再以大猫的形态上前扑杀。只有很少数人曾侥幸逃脱并活下来讲述一个狂野女猎手的故事，讲述她锐利的猎手本能，以及更加锐利的爪子。\",\"info\":{\"attack\":5,\"defense\":4,\"magic\":7,\"difficulty\":8},\"image\":{\"full\":\"Nidalee.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":48,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":545,\"hpperlevel\":85,\"mp\":295.6,\"mpperlevel\":45,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":6,\"hpregenperlevel\":0.6,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":3.22,\"attackspeed\":0.638}},\"Nocturne\":{\"version\":\"10.19.1\",\"id\":\"Nocturne\",\"key\":\"56\",\"name\":\"永恒梦魇\",\"title\":\"魔腾\",\"blurb\":\"将一切有知觉的脑海中萦绕的噩梦提取出来，进而融合成一个恶魔般的实体，这就是被人称为魔腾的存在，它已成为一种纯粹邪恶的原始力量。它的外形捉摸不定，一团无面的黑影中睁着一双冰冷的眼睛，身体两侧是一对形状恐怖的刀刃。魔腾摆脱了精神领域的束缚，进入了梦醒后的凡尘世界，寻觅那些在真正的黑暗中疯长的恐惧，作为自己的食粮。\",\"info\":{\"attack\":9,\"defense\":5,\"magic\":2,\"difficulty\":4},\"image\":{\"full\":\"Nocturne.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":96,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":585,\"hpperlevel\":85,\"mp\":275,\"mpperlevel\":35,\"movespeed\":345,\"armor\":38,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":0.75,\"attackrange\":125,\"hpregen\":7,\"hpregenperlevel\":0.75,\"mpregen\":7,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.7,\"attackspeed\":0.721}},\"Nunu\":{\"version\":\"10.19.1\",\"id\":\"Nunu\",\"key\":\"20\",\"name\":\"雪原双子\",\"title\":\"努努和威朗普\",\"blurb\":\"很久以前，曾有个小男孩，他要证明自己是个英雄，于是决定去杀掉一头凶猛的怪兽——但他却发现这个怪兽其实是个孤独的魔法雪人，而且他需要的只是一个朋友。雪人和男孩被古老的力量所连结，也因对雪球的共同爱好而玩到一起。努努和威朗普如今在弗雷尔卓德的土地上肆意撒欢打滚，为想象中的冒险注入鲜活的生命力。他们希望能够在前面的某个地方找到努努的母亲。如果他们能拯救她，或许他们就真的是英雄了。\",\"info\":{\"attack\":4,\"defense\":6,\"magic\":7,\"difficulty\":4},\"image\":{\"full\":\"Nunu.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":144,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":570,\"hpperlevel\":82,\"mp\":280,\"mpperlevel\":42,\"movespeed\":345,\"armor\":32,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":5,\"hpregenperlevel\":0.8,\"mpregen\":7,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.25,\"attackspeed\":0.625}},\"Olaf\":{\"version\":\"10.19.1\",\"id\":\"Olaf\",\"key\":\"2\",\"name\":\"狂战士\",\"title\":\"奥拉夫\",\"blurb\":\"奥拉夫是一股无坚不摧的毁灭之力，战斧在手的他别无所求，只想光荣地死在战斗中。奥拉夫来自弗雷尔卓德的海岸半岛洛克法，他曾在一次占卜预言中听闻自己将安详地死去——这是懦夫的命运，也是对他们族人的莫大侮辱。于是，为了追寻另外一种结局，他在狂怒的驱动下在这片土地上暴跳横行，屠杀了数十名伟大的战士和传说中的野兽，希望能够找到能够阻止自己的对手。如今他是凛冬之爪部族残酷的执法者，希望在即将到来的大战中找到自己的终结。\",\"info\":{\"attack\":9,\"defense\":5,\"magic\":3,\"difficulty\":3},\"image\":{\"full\":\"Olaf.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":192,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":597.24,\"hpperlevel\":93,\"mp\":315.6,\"mpperlevel\":42,\"movespeed\":350,\"armor\":35,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.9,\"mpregen\":7.466,\"mpregenperlevel\":0.575,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2.7,\"attackspeed\":0.694}},\"Orianna\":{\"version\":\"10.19.1\",\"id\":\"Orianna\",\"key\":\"61\",\"name\":\"发条魔灵\",\"title\":\"奥莉安娜\",\"blurb\":\"奥莉安娜曾是一个拥有血肉之躯的好奇女孩，而现在则是全身上下部由发条和齿轮构成的科技奇观。祖安下层地区的一次事故间接导致了她身染重病，日渐衰竭的身体必须替换为精密的人造器官，一个接一个，直到全身上下再也没有人类的肉体。她给自己制作了一枚奇妙的黄铜球体，既是伙伴，也是保镖。如今她已经可以自由地探索壮观的皮尔特沃夫，以及更遥远的地方。\",\"info\":{\"attack\":4,\"defense\":3,\"magic\":9,\"difficulty\":7},\"image\":{\"full\":\"Orianna.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":240,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":530,\"hpperlevel\":91,\"mp\":418,\"mpperlevel\":25,\"movespeed\":325,\"armor\":17.04,\"armorperlevel\":3,\"spellblock\":26,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":40.368,\"attackdamageperlevel\":2.6,\"attackspeedperlevel\":3.5,\"attackspeed\":0.658}},\"Ornn\":{\"version\":\"10.19.1\",\"id\":\"Ornn\",\"key\":\"516\",\"name\":\"山隐之焰\",\"title\":\"奥恩\",\"blurb\":\"奥恩是弗雷尔卓德的一位半神，主掌着锻造和工艺。他在名为炉乡的火山下的溶洞中凿出了一座雄伟的工坊，独自一人在里头干活。他摆弄着熔岩沸腾的坩埚，提炼矿石，打造出无与伦比的精良物件。当其他神灵——尤其是沃利贝尔，在大地上行走并且介入了凡间的事务时，奥恩就会出面，将这些鲁莽的家伙劝回各自的位置上。要么是用手里可靠的锤子，要么就是群山的烈火。\",\"info\":{\"attack\":5,\"defense\":9,\"magic\":3,\"difficulty\":5},\"image\":{\"full\":\"Ornn.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":288,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":590,\"hpperlevel\":95,\"mp\":340.6,\"mpperlevel\":45,\"movespeed\":335,\"armor\":33,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":9,\"hpregenperlevel\":0.9,\"mpregen\":8.01,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":69,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"Pantheon\":{\"version\":\"10.19.1\",\"id\":\"Pantheon\",\"key\":\"80\",\"name\":\"不屈之枪\",\"title\":\"潘森\",\"blurb\":\"曾经被战争星灵附体的阿特瑞斯，在他体内那股天界力量被弑杀的时候，以凡人的身份活了下来，即便是那裂空摘星的一击，也无法让他屈服。不久以后，他学会了拥抱自己凡性的力量，以及凡性之中顽强的韧劲。如今的阿特瑞斯作为重生的潘森，反抗神性。他坚不可摧的意志在战场上化为火焰，注入那些曾经属于星灵的武具中。\",\"info\":{\"attack\":9,\"defense\":4,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Pantheon.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":336,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":580,\"hpperlevel\":95,\"mp\":317.12,\"mpperlevel\":31,\"movespeed\":355,\"armor\":40,\"armorperlevel\":3.75,\"spellblock\":28,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":10,\"hpregenperlevel\":0.65,\"mpregen\":7.356,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.95,\"attackspeed\":0.644}},\"Poppy\":{\"version\":\"10.19.1\",\"id\":\"Poppy\",\"key\":\"78\",\"name\":\"圣锤之毅\",\"title\":\"波比\",\"blurb\":\"符文之地从来都不缺勇敢的英雄，但很少有谁能像波比一样坚毅。她一直带着奥伦的传奇圣锤，哪怕锤柄立起来有两个她那么高。这位意志坚决的约德尔人在无数个岁月中一直都在秘密地寻找“德玛西亚的英雄”，也就是传说中这把战锤的最合适的主人。在找到他之前，波比肩负起战斗的使命，用旋风般的攻击打退王国的敌人。\",\"info\":{\"attack\":6,\"defense\":7,\"magic\":2,\"difficulty\":6},\"image\":{\"full\":\"Poppy.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":384,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":540,\"hpperlevel\":90,\"mp\":280,\"mpperlevel\":40,\"movespeed\":345,\"armor\":38,\"armorperlevel\":3.5,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.8,\"mpregen\":7,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":4,\"attackspeedperlevel\":2.5,\"attackspeed\":0.625}},\"Pyke\":{\"version\":\"10.19.1\",\"id\":\"Pyke\",\"key\":\"555\",\"name\":\"血港鬼影\",\"title\":\"派克\",\"blurb\":\"在比尔吉沃特的屠宰码头，颇有名气的鱼叉手派克葬身在一条巨大的琢珥鱼腹内……然而，他却回来了。他在家乡的阴街陋巷中徘徊着，用超自然的手段干脆残忍地解决那些鱼肉他人的恶棍——一座因捕猎怪物而自豪的城市如今发觉自己却成了狩猎的目标。\",\"info\":{\"attack\":9,\"defense\":3,\"magic\":1,\"difficulty\":7},\"image\":{\"full\":\"Pyke.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":432,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":600,\"hpperlevel\":90,\"mp\":415,\"mpperlevel\":50,\"movespeed\":330,\"armor\":45,\"armorperlevel\":3.5,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":7,\"hpregenperlevel\":0.5,\"mpregen\":8,\"mpregenperlevel\":1,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":2,\"attackspeedperlevel\":2.5,\"attackspeed\":0.667}},\"Qiyana\":{\"version\":\"10.19.1\",\"id\":\"Qiyana\",\"key\":\"246\",\"name\":\"元素女皇\",\"title\":\"奇亚娜\",\"blurb\":\"在丛林都市以绪奥肯中，奇亚娜谋划着自己荣登育恩塔尔塔座的无情之路。作为父母的末位继承人，她以前无古人的元素魔法技艺，傲视所有挡在面前的人。这片大地服从着奇亚娜的每一道指令，她认为自己是以绪奥肯历史上最伟大的元素使——就凭这点，她理应执掌的不仅是一座城邦，而是一个帝国。\",\"info\":{\"attack\":0,\"defense\":2,\"magic\":4,\"difficulty\":8},\"image\":{\"full\":\"Qiyana.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":590,\"hpperlevel\":90,\"mp\":320,\"mpperlevel\":50,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":8.5,\"hpregenperlevel\":0.65,\"mpregen\":8,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.1,\"attackspeed\":0.625}},\"Quinn\":{\"version\":\"10.19.1\",\"id\":\"Quinn\",\"key\":\"133\",\"name\":\"德玛西亚之翼\",\"title\":\"奎因\",\"blurb\":\"奎因是德玛西亚的游骑兵精锐，经常深入敌国腹地执行危险的任务，她和她的传奇巨鹰华洛之间存在着一种牢不可破的纽带。很多时候，他们的对手死到临头也没意识到，自己面对着的这位德玛西亚英雄，并不是在孤军奋战。战斗中的奎因灵巧敏捷，十字弓例无虚发，而华洛则会从空中标记隐蔽的敌人。两者之间默契的配合造就了战场上一对致命凶狠的搭档。\",\"info\":{\"attack\":9,\"defense\":4,\"magic\":2,\"difficulty\":5},\"image\":{\"full\":\"Quinn.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":48,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":532.8,\"hpperlevel\":85,\"mp\":268.8,\"mpperlevel\":35,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":6.972,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":2.4,\"attackspeedperlevel\":3.1,\"attackspeed\":0.668}},\"Rakan\":{\"version\":\"10.19.1\",\"id\":\"Rakan\",\"key\":\"497\",\"name\":\"幻翎\",\"title\":\"洛\",\"blurb\":\"对洛特兰部落而言，瓦斯塔亚的洛是臭名远播的捣蛋鬼，同时也是有史以来最为出色的战舞舞者。他风流潇洒，魅力无穷，同时却令人难以捉摸。在艾欧尼亚高地的居民眼中，“洛”这个名字一旦出现，就一定会带来热闹非凡的节日庆典、热火朝天的狂欢派对和杂乱无章的音乐。很少人知道，这个精力充沛的浪荡子和叛逆的霞是一对儿，而他的一举一动就是为了全力配合她的行动。\",\"info\":{\"attack\":2,\"defense\":4,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Rakan.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":96,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":540,\"hpperlevel\":85,\"mp\":315,\"mpperlevel\":50,\"movespeed\":335,\"armor\":32,\"armorperlevel\":3.9,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":300,\"hpregen\":5,\"hpregenperlevel\":0.5,\"mpregen\":8.75,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":3,\"attackspeed\":0.635}},\"Rammus\":{\"version\":\"10.19.1\",\"id\":\"Rammus\",\"key\":\"33\",\"name\":\"披甲龙龟\",\"title\":\"拉莫斯\",\"blurb\":\"许多人对其崇拜敬仰，少数人对其嗤之以鼻，但所有人都对其一无所知。奇怪而有趣的生物拉莫斯就是一个谜团。他全身覆盖尖刺硬壳，人们对他的出身来历的猜测层出不穷——有人说他是半神，有人说他是神谕者，有人说他只是普通的野兽，遭遇了魔法的影响而发生彻底变异。无论真相如何，拉莫斯始终都默不作声，而且不会为任何人停留，永远都在沙漠中奔走游荡。\",\"info\":{\"attack\":4,\"defense\":10,\"magic\":5,\"difficulty\":5},\"image\":{\"full\":\"Rammus.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":144,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":564.48,\"hpperlevel\":95,\"mp\":310.44,\"mpperlevel\":33,\"movespeed\":335,\"armor\":36,\"armorperlevel\":4.3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.55,\"mpregen\":7.84,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55.88,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2.215,\"attackspeed\":0.656}},\"RekSai\":{\"version\":\"10.19.1\",\"id\":\"RekSai\",\"key\":\"421\",\"name\":\"虚空遁地兽\",\"title\":\"雷克塞\",\"blurb\":\"作为食物链顶端的掠食者，残忍无情的虚空生物，雷克赛能够在地下挖掘隧道，偷袭并吞食毫无防备的猎物。她那永不满足的饥渴让曾经鼎盛一时的恕瑞玛帝国所在的地区满目疮痍。商人、贸易者和武装商队都会绕行百里，来躲开这些广袤的地区。一旦有人在遥远的地平线看到雷克赛，就等于看到自己葬身沙砾之下的命运。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":2,\"difficulty\":3},\"image\":{\"full\":\"RekSai.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":192,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\"],\"partype\":\"怒气\",\"stats\":{\"hp\":570,\"hpperlevel\":85,\"mp\":100,\"mpperlevel\":0,\"movespeed\":335,\"armor\":36,\"armorperlevel\":3.75,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":7.5,\"hpregenperlevel\":0.65,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.667}},\"Renekton\":{\"version\":\"10.19.1\",\"id\":\"Renekton\",\"key\":\"58\",\"name\":\"荒漠屠夫\",\"title\":\"雷克顿\",\"blurb\":\"雷克顿是一位来自恕瑞玛炙热沙漠中的面目可怖、野蛮狂怒的飞升者。他曾经是帝国最受尊敬的战士，带领恕瑞玛的军队取得过无数次胜利。然而，在帝国陨落以后，雷克顿被困在了沙漠之下，慢慢地，在世界变迁的同时，雷克顿丧失了理智。现在他重获自由，但却被一个执念吞噬：找到并杀死他的哥哥内瑟斯，因为疯狂之中的他坚信内瑟斯是害他经受数百年黑暗束缚的罪魁祸首。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":2,\"difficulty\":3},\"image\":{\"full\":\"Renekton.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":240,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"怒气\",\"stats\":{\"hp\":575,\"hpperlevel\":87,\"mp\":100,\"mpperlevel\":0,\"movespeed\":345,\"armor\":35,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":69,\"attackdamageperlevel\":3.75,\"attackspeedperlevel\":2.75,\"attackspeed\":0.665}},\"Rengar\":{\"version\":\"10.19.1\",\"id\":\"Rengar\",\"key\":\"107\",\"name\":\"傲之追猎者\",\"title\":\"雷恩加尔\",\"blurb\":\"瓦斯塔亚的雷恩加尔是一名声名远扬又凶残无比的猎手。他的人生充满着追寻猎杀危险的生物的快感。他寻遍整个世界，只为寻找他能找到的最可怕的野兽，特别是寻找任何关于卡兹克的踪迹。这头来自虚空的野兽弄瞎了他的一只眼睛。雷恩加尔追寻着猎物，不为捕食也不为荣耀，只是为了纯粹的猎杀所带来的激烈美感。\",\"info\":{\"attack\":7,\"defense\":4,\"magic\":2,\"difficulty\":8},\"image\":{\"full\":\"Rengar.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":288,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"残暴\",\"stats\":{\"hp\":585,\"hpperlevel\":90,\"mp\":4,\"mpperlevel\":0,\"movespeed\":345,\"armor\":34,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7,\"hpregenperlevel\":0.5,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3,\"attackspeed\":0.667}},\"Riven\":{\"version\":\"10.19.1\",\"id\":\"Riven\",\"key\":\"92\",\"name\":\"放逐之刃\",\"title\":\"锐雯\",\"blurb\":\"<p>曾担任诺克萨斯军队剑士长的锐雯，如今在那片她曾要征服的土地上流浪。她通过自己信念的力量和野蛮的行事风格在军中不断晋升，因此获得了一把传奇的符文之刃和自己的战团作为奖赏——然而在艾欧尼亚的前线上，锐雯对祖国的信仰遭到了考验，并最终粉碎。她切断了与帝国的一切关联，在分崩离析的世界中找寻自己的归宿，即使纷飞的谣言传说着诺克萨斯已经重铸……</p>\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":1,\"difficulty\":8},\"image\":{\"full\":\"Riven.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":336,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"无\",\"stats\":{\"hp\":560,\"hpperlevel\":86,\"mp\":0,\"mpperlevel\":0,\"movespeed\":340,\"armor\":33,\"armorperlevel\":3.2,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.5,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.5,\"attackspeed\":0.625}},\"Rumble\":{\"version\":\"10.19.1\",\"id\":\"Rumble\",\"key\":\"68\",\"name\":\"机械公敌\",\"title\":\"兰博\",\"blurb\":\"兰博是一个有脾气的约德尔青年发明家。他仅用自己的双手和一堆废铁，就造出了一架巨大的机甲，上面还搭载了电击鱼叉和燃烧火箭弹等超常规武器。虽然其他人可能对他的垃圾场发明嗤之以鼻，但兰博根本不在乎——毕竟，喷出铄金之火的枪口，在他自己手里。\",\"info\":{\"attack\":3,\"defense\":6,\"magic\":8,\"difficulty\":10},\"image\":{\"full\":\"Rumble.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":384,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Mage\"],\"partype\":\"热量\",\"stats\":{\"hp\":589,\"hpperlevel\":85,\"mp\":100,\"mpperlevel\":0,\"movespeed\":345,\"armor\":31,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.6,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":1.85,\"attackspeed\":0.644}},\"Ryze\":{\"version\":\"10.19.1\",\"id\":\"Ryze\",\"key\":\"13\",\"name\":\"符文法师\",\"title\":\"瑞兹\",\"blurb\":\"瑞兹是符文之地广为人知的最老练的法师之一。他生于远古，饱经风霜，肩负着不可承受之重任。这位大法师的武器，是他无可摧折的决心和丰富的秘法学识，他一生都在寻找着世界符文 ——它们是令这世界从无到有、万物成形的原生魔法所留下的碎片。他一定要找到所有这些神秘的字符，以免落入恶人之手，因为瑞兹知道它们可能给符文之地带来怎样的浩劫。\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":10,\"difficulty\":7},\"image\":{\"full\":\"Ryze.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":432,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":575,\"hpperlevel\":98,\"mp\":300,\"mpperlevel\":50,\"movespeed\":340,\"armor\":22,\"armorperlevel\":3,\"spellblock\":36,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":8,\"hpregenperlevel\":0.8,\"mpregen\":8,\"mpregenperlevel\":1,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.112,\"attackspeed\":0.625}},\"Samira\":{\"version\":\"10.19.1\",\"id\":\"Samira\",\"key\":\"360\",\"name\":\"沙漠玫瑰\",\"title\":\"莎弥拉\",\"blurb\":\"莎弥拉以寸步不让的自信直视死亡，无论走到哪里都要寻找刺激。生于恕瑞玛的她在很小的时候就被摧毁了家园，后来受到了诺克萨斯的感召，在那里，她成为了英姿飒爽的孤胆女将，专门处理最高规格的凶险任务。莎弥拉使用黑火药双枪外加一把特殊制程工艺的大刀，她在生死存亡的关头尤为勇猛，以闪钢与烈焰终结任何拦路者。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"Samira.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":0,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":600,\"hpperlevel\":88,\"mp\":348.88,\"mpperlevel\":38,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":3.25,\"hpregenperlevel\":0.55,\"mpregen\":8.176,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":2.3,\"attackspeedperlevel\":3.3,\"attackspeed\":0.658}},\"Sejuani\":{\"version\":\"10.19.1\",\"id\":\"Sejuani\",\"key\":\"113\",\"name\":\"北地之怒\",\"title\":\"瑟庄妮\",\"blurb\":\"瑟庄妮是凛冬之爪部族的战母。继承了寒冰血脉的她残忍无情，带领的部族也是弗雷尔卓德土地上最令人闻风丧胆的。她的部族的生存，是一场旷日持久的、毫无希望的对抗元素之力的战斗，迫使他们劫掠诺克萨斯人、德玛西亚人，还有阿瓦罗萨部族等等，以便渡过残酷的凛冬。瑟庄妮在最危险的战斗中身先士卒，骑着居瓦斯克野猪“钢鬃”冲在最前方，用她臻冰打造的链枷让敌人粉身碎骨。\",\"info\":{\"attack\":5,\"defense\":7,\"magic\":6,\"difficulty\":4},\"image\":{\"full\":\"Sejuani.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":48,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":560,\"hpperlevel\":100,\"mp\":400,\"mpperlevel\":40,\"movespeed\":340,\"armor\":34,\"armorperlevel\":4.25,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":8.5,\"hpregenperlevel\":1,\"mpregen\":7,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":4,\"attackspeedperlevel\":3.5,\"attackspeed\":0.688}},\"Senna\":{\"version\":\"10.19.1\",\"id\":\"Senna\",\"key\":\"235\",\"name\":\"涤魂圣枪\",\"title\":\"赛娜\",\"blurb\":\"在孩童时期就受到诅咒的赛娜，注定被超自然的黑雾不断侵扰，于是她加入了一个名叫“光明哨兵”的神圣教团，进行勇猛的反击。但最后她却在战斗中殒命，灵魂被囚禁在残酷怨灵锤石的灯笼中。拒绝失去希望的赛娜，在灯笼中学会了如何使用黑雾，并重获新生，接受了永久的改变。如今的赛娜同时使用黑暗和光明的力量，要用黑雾自己的力量终结黑雾——每一次圣物武器的炮火，都救赎着雾中的迷魂。\",\"info\":{\"attack\":7,\"defense\":2,\"magic\":6,\"difficulty\":7},\"image\":{\"full\":\"Senna.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":96,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":520,\"hpperlevel\":75,\"mp\":350,\"mpperlevel\":45,\"movespeed\":330,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":600,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50,\"attackdamageperlevel\":0,\"attackspeedperlevel\":4,\"attackspeed\":0.625}},\"Sett\":{\"version\":\"10.19.1\",\"id\":\"Sett\",\"key\":\"875\",\"name\":\"腕豪\",\"title\":\"瑟提\",\"blurb\":\"在与诺克萨斯的战争结束之后，艾欧尼亚的地下王国日渐兴起，瑟提在其中脱颖而出，成为了一方霸主。虽然他一开始只是纳沃利的搏击场里的无名小卒，但他有着一身蛮力，而且极其耐打，很快就名声鹊起。等到当地的搏击手尽数被他击败之后，瑟提靠着一腔勇武，掌控了自己曾经浴血奋战的搏击场。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":1,\"difficulty\":2},\"image\":{\"full\":\"Sett.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":144,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"豪意\",\"stats\":{\"hp\":600,\"hpperlevel\":93,\"mp\":0,\"mpperlevel\":0,\"movespeed\":340,\"armor\":33,\"armorperlevel\":4,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7,\"hpregenperlevel\":0.5,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":4,\"attackspeedperlevel\":1.75,\"attackspeed\":0.625}},\"Shaco\":{\"version\":\"10.19.1\",\"id\":\"Shaco\",\"key\":\"35\",\"name\":\"恶魔小丑\",\"title\":\"萨科\",\"blurb\":\"很久以前有人为一个孤独的小王子制作了一个玩物，一只附有魔法的提线人偶，它就是如今那个以杀人和破坏取乐的萨科。由于黑魔法的腐化，再加上痛失爱主，曾经友善的人偶如今只能在折磨灵魂制造苦痛的时候才能感到愉悦。小孩子的玩具和简单的戏法在他手中都有了致命的效果。而且，他觉得自己的血腥“游戏”滑稽至极——如果有谁在死寂的夜里听到了阴森的窃笑，或许那就是恶魔小丑看中了他们，作为自己新的玩物。\",\"info\":{\"attack\":8,\"defense\":4,\"magic\":6,\"difficulty\":9},\"image\":{\"full\":\"Shaco.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":192,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":587,\"hpperlevel\":89,\"mp\":297.2,\"mpperlevel\":40,\"movespeed\":350,\"armor\":30,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.55,\"mpregen\":7.156,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3,\"attackspeed\":0.694}},\"Shen\":{\"version\":\"10.19.1\",\"id\":\"Shen\",\"key\":\"98\",\"name\":\"暮光之眼\",\"title\":\"慎\",\"blurb\":\"在隐秘的艾欧尼亚武装力量均衡教派中，慎背负着领袖的职责和暮光之眼的称号。他力求超脱自身的情感、偏执以及自我，行走于灵魂领域和物质世界之间无人通晓的隐秘道路。为了贯彻精神与物质之间的均衡，慎用一把钢刀和一把魂刃对抗任何威胁到均衡的人。\",\"info\":{\"attack\":3,\"defense\":9,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Shen.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":240,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\"],\"partype\":\"能量\",\"stats\":{\"hp\":540,\"hpperlevel\":85,\"mp\":400,\"mpperlevel\":0,\"movespeed\":340,\"armor\":34,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.75,\"mpregen\":50,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3,\"attackspeed\":0.751}},\"Shyvana\":{\"version\":\"10.19.1\",\"id\":\"Shyvana\",\"key\":\"102\",\"name\":\"龙血武姬\",\"title\":\"希瓦娜\",\"blurb\":\"希瓦娜是一只魔法生物，心中有一块燃烧不灭的符文碎片。虽然她时常以人的形象出现，但她真正的形态是一条威猛的巨龙，可以用龙息烈焰吞噬敌人。希瓦娜曾拯救过皇子嘉文四世的性命，如今她心神不安地在皇子的卫队中效力，力图在多疑的德玛西亚人中求得接纳。\",\"info\":{\"attack\":8,\"defense\":6,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Shyvana.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":288,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"怒气\",\"stats\":{\"hp\":595,\"hpperlevel\":95,\"mp\":100,\"mpperlevel\":0,\"movespeed\":350,\"armor\":38,\"armorperlevel\":3.35,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.8,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":3.4,\"attackspeedperlevel\":2.5,\"attackspeed\":0.658}},\"Singed\":{\"version\":\"10.19.1\",\"id\":\"Singed\",\"key\":\"27\",\"name\":\"炼金术士\",\"title\":\"辛吉德\",\"blurb\":\"辛吉德是一位智力超群的祖安炼金术士，用自己的生命推动知识的边界。没有什么代价是他不能付出的，包括自己的理智。他的疯狂是否有迹可循？他的合剂几乎无不生效，只不过多数人都认为辛吉德已经丧失了全部人性的感知，所到之处只会留下苦难与恐惧的剧毒踪迹。\",\"info\":{\"attack\":4,\"defense\":8,\"magic\":7,\"difficulty\":5},\"image\":{\"full\":\"Singed.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":336,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":580,\"hpperlevel\":85,\"mp\":330,\"mpperlevel\":45,\"movespeed\":345,\"armor\":34,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9.5,\"hpregenperlevel\":0.55,\"mpregen\":7.5,\"mpregenperlevel\":0.55,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3.375,\"attackspeedperlevel\":1.9,\"attackspeed\":0.613}},\"Sion\":{\"version\":\"10.19.1\",\"id\":\"Sion\",\"key\":\"14\",\"name\":\"亡灵战神\",\"title\":\"赛恩\",\"blurb\":\"赛恩是一个来自先前时代的诺克萨斯战争英雄，曾经徒手掐死过一代德玛西亚国王。但他拒绝了死亡和湮灭，以活尸的状态继续为帝国效命。只要挡住他的去路，都会被他无差别地屠杀，敌我不分，足可证明他已经失去了从前的人性。即便如此，他腐朽的身体还是被钉进了粗糙的装甲，继续以丧心病狂的鲁莽冲上战场，在每一下巨斧的挥砍中艰难地回忆真正的自我。\",\"info\":{\"attack\":5,\"defense\":9,\"magic\":3,\"difficulty\":5},\"image\":{\"full\":\"Sion.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":384,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":545,\"hpperlevel\":73,\"mp\":330,\"mpperlevel\":42,\"movespeed\":345,\"armor\":32,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":7.5,\"hpregenperlevel\":0.8,\"mpregen\":8,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":4,\"attackspeedperlevel\":1.3,\"attackspeed\":0.679}},\"Sivir\":{\"version\":\"10.19.1\",\"id\":\"Sivir\",\"key\":\"15\",\"name\":\"战争女神\",\"title\":\"希维尔\",\"blurb\":\"希维尔是著名的宝藏猎人和雇佣兵队长，在恕瑞玛沙漠中进行频繁的契约交易。她的兵器是一柄颇具传奇色彩的十字刃，她曾赢得过无数次战斗，虽然她本人报价不菲，但却深得雇主青睐。她有着著名的无畏决心和无尽的野心，并且以自己的事业为傲——只要赏金够高，她就能从凶险的恕瑞玛古墓中寻回深埋于地下的宝藏。不过随着好几股远古的力量搅动着恕瑞玛的根骨，希维尔突然发现自己被裹挟着、拉扯着，卷入了截然不同的命运。\",\"info\":{\"attack\":9,\"defense\":3,\"magic\":1,\"difficulty\":4},\"image\":{\"full\":\"Sivir.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":432,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":562,\"hpperlevel\":90,\"mp\":284,\"mpperlevel\":50,\"movespeed\":335,\"armor\":26,\"armorperlevel\":3.25,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":3.25,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.9,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.6,\"attackspeed\":0.625}},\"Skarner\":{\"version\":\"10.19.1\",\"id\":\"Skarner\",\"key\":\"72\",\"name\":\"水晶先锋\",\"title\":\"斯卡纳\",\"blurb\":\"斯卡纳是一只身形庞大的水晶蝎，来自于恕瑞玛的一处隐秘的山谷。作为古老的壳人族，斯卡纳和他的同胞因卓然的智慧和与大地深切的联系而闻名。他们的灵魂都得到过生命水晶的加持，所以祖先的记忆与现世的思绪都被完好地保存了下来。在久远的过去，壳人族为了躲避神秘的魔法灾难而进入了长眠，然而现在，新的威胁唤醒了斯卡纳。作为整个部族中唯一醒来的人，他将拼尽全力保护其余的同胞，免遭任何人的迫害。\",\"info\":{\"attack\":7,\"defense\":6,\"magic\":5,\"difficulty\":5},\"image\":{\"full\":\"Skarner.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":0,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":601.28,\"hpperlevel\":90,\"mp\":320,\"mpperlevel\":40,\"movespeed\":335,\"armor\":38,\"armorperlevel\":3.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9,\"hpregenperlevel\":0.85,\"mpregen\":7.206,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":65,\"attackdamageperlevel\":4.5,\"attackspeedperlevel\":2.1,\"attackspeed\":0.625}},\"Sona\":{\"version\":\"10.19.1\",\"id\":\"Sona\",\"key\":\"37\",\"name\":\"琴瑟仙女\",\"title\":\"娑娜\",\"blurb\":\"娑娜是德玛西亚的一流弦乐演奏家，“叆华”的优美和弦与多变曲调就是她唯一的语言。这种文雅的举止让她深得上流社会的宠爱，不过也有其他人怀疑她如魔咒般的旋律其实是在施放魔法——而魔法可是德玛西亚的大忌。娑娜始终对外人一言不发，但她最亲密的同伴却不知为何能完全理解她。娑娜弹拨的和声不仅能够安抚受伤的盟友，而且还能打击掉以轻心的敌人。\",\"info\":{\"attack\":5,\"defense\":2,\"magic\":8,\"difficulty\":4},\"image\":{\"full\":\"Sona.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":48,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":480,\"hpperlevel\":77,\"mp\":340,\"mpperlevel\":45,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3.3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":49,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.3,\"attackspeed\":0.644}},\"Soraka\":{\"version\":\"10.19.1\",\"id\":\"Soraka\",\"key\":\"16\",\"name\":\"众星之子\",\"title\":\"索拉卡\",\"blurb\":\"索拉卡是来自巨神峰彼端天界维度的流浪者。她放弃了不朽的神格，保护凡间的种族免遭他们自身暴力本能的伤害。她对自己遇见的每个人都施以同情与仁慈——即使是那些对她心存恶念的人也不例外。虽然索拉卡见证了这世上如此多的苦痛与挣扎，但她依然相信符文之地的人们依然有更多潜力尚未发现。\",\"info\":{\"attack\":2,\"defense\":5,\"magic\":7,\"difficulty\":3},\"image\":{\"full\":\"Soraka.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":96,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":535,\"hpperlevel\":74,\"mp\":425,\"mpperlevel\":40,\"movespeed\":325,\"armor\":32,\"armorperlevel\":3.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":2.5,\"hpregenperlevel\":0.5,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.14,\"attackspeed\":0.625}},\"Swain\":{\"version\":\"10.19.1\",\"id\":\"Swain\",\"key\":\"50\",\"name\":\"诺克萨斯统领\",\"title\":\"斯维因\",\"blurb\":\"斯维因是一位高瞻远瞩的帝国统领，他指挥着帝国的战团在前线冲杀。虽然他在艾欧尼亚的战场上受到了重伤，但他靠着一只新生的恶魔手臂以及无情的意志夺得了诺克萨斯的权力。如今，这位统领正在向着只有他一人能看见的黑暗进军。\",\"info\":{\"attack\":2,\"defense\":6,\"magic\":9,\"difficulty\":8},\"image\":{\"full\":\"Swain.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":144,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":525,\"hpperlevel\":85,\"mp\":468,\"mpperlevel\":28.5,\"movespeed\":325,\"armor\":22.72,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":7,\"hpregenperlevel\":0.65,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":2.7,\"attackspeedperlevel\":2.11,\"attackspeed\":0.625}},\"Sylas\":{\"version\":\"10.19.1\",\"id\":\"Sylas\",\"key\":\"517\",\"name\":\"解脱者\",\"title\":\"塞拉斯\",\"blurb\":\"在小城边沟镇长大的塞拉斯，如今却成了德玛西亚雄都的黑暗面的代表人物。当他还是个男孩的时候，人人避之唯恐不及的搜魔人发现他拥有感知法师的能力，便将他控制起来，利用这种能力来对付塞拉斯的同类。逃出生天之后的塞拉斯现在是一个坚定的抗命者，他要借助法师的力量摧毁自己曾经侍奉过的王国。遭到放逐而前来追随他的法师也与日俱增。\",\"info\":{\"attack\":3,\"defense\":4,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Sylas.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":192,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":525,\"hpperlevel\":115,\"mp\":280,\"mpperlevel\":50,\"movespeed\":340,\"armor\":27,\"armorperlevel\":4,\"spellblock\":32,\"spellblockperlevel\":1.75,\"attackrange\":175,\"hpregen\":9,\"hpregenperlevel\":0.9,\"mpregen\":7,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.5,\"attackspeed\":0.645}},\"Syndra\":{\"version\":\"10.19.1\",\"id\":\"Syndra\",\"key\":\"134\",\"name\":\"暗黑元首\",\"title\":\"辛德拉\",\"blurb\":\"辛德拉是一位令人胆寒的艾欧尼亚魔法师，操纵着难以置信的力量。她在孩童时期就因为狂暴而不受控制的魔法而让村庄的长老们深感不安。长老们把她送到外地接受严密的监管和训练，但她发现所谓的训练其实是对自己能力的限制。辛德拉将自己感受到的背叛与痛楚融入暗黑法球，并发誓消灭所有想要控制她的人。\",\"info\":{\"attack\":2,\"defense\":3,\"magic\":9,\"difficulty\":8},\"image\":{\"full\":\"Syndra.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":240,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":523,\"hpperlevel\":90,\"mp\":480,\"mpperlevel\":40,\"movespeed\":330,\"armor\":24.712,\"armorperlevel\":3.4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.872,\"attackdamageperlevel\":2.9,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"TahmKench\":{\"version\":\"10.19.1\",\"id\":\"TahmKench\",\"key\":\"223\",\"name\":\"河流之王\",\"title\":\"塔姆\",\"blurb\":\"塔姆·肯奇在历史上有许多不同的名字，他游历于符文大陆的各条水道，用大意之人的悲惨喂养自己贪得无厌的食欲。虽然他的外表可能富有古怪的魅力和得意，但他在物质领域的漫游只是为了寻找毫无戒心的猎物。他的舌头像巨大的鞭子，即使是全副武装的重甲士兵也会被他从十几步以外的距离击晕，而如果跌入了他隆隆作响的肚子里，就相当于掉进了九死一生的绝命深渊。\",\"info\":{\"attack\":3,\"defense\":9,\"magic\":6,\"difficulty\":5},\"image\":{\"full\":\"TahmKench.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":288,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":600,\"hpperlevel\":100,\"mp\":325,\"mpperlevel\":40,\"movespeed\":335,\"armor\":47,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":6.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":1,\"crit\":0,\"critperlevel\":0,\"attackdamage\":56,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":2.5,\"attackspeed\":0.658}},\"Taliyah\":{\"version\":\"10.19.1\",\"id\":\"Taliyah\",\"key\":\"163\",\"name\":\"岩雀\",\"title\":\"塔莉垭\",\"blurb\":\"塔莉垭是一位来自恕瑞玛的游牧民族的法师，孩子的好奇与大人的责任两股力量同时拉扯着她。她曾踏遍瓦洛兰的山山水水，只为寻得控制己身异能的法门，不过最近，她已经回到了故乡，保护生她养她的部族。有些人把她的温柔善意当做是懦弱的表现，最终也为自己的愚鲁付出了代价。塔莉垭青春稚嫩的举止背后，是一颗敢于移山填海的雄心，和一个堪能倾世的灵魂。\",\"info\":{\"attack\":1,\"defense\":7,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Taliyah.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":336,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":532,\"hpperlevel\":90,\"mp\":425,\"mpperlevel\":30,\"movespeed\":335,\"armor\":20,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":7,\"hpregenperlevel\":0.7,\"mpregen\":9.335,\"mpregenperlevel\":0.85,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"Talon\":{\"version\":\"10.19.1\",\"id\":\"Talon\",\"key\":\"91\",\"name\":\"刀锋之影\",\"title\":\"泰隆\",\"blurb\":\"泰隆是黑暗中的匕首，是绝无仁慈的杀手，他出手前不会有任何警告，不会留任何退路，也不会引起任何警觉。泰隆在诺克萨斯的野蛮街巷中深深烙印了自己危险的名号，在这里他被迫为了生存而战斗、杀戮、偷窃。后来恶名昭彰的杜·克卡奥家族收养了他，现在他为帝国的指挥部贡献自己的夺命手段，暗杀敌人的领袖、军官和英雄，当然也包括任何得罪了最高长官们的诺克萨斯蠢货。\",\"info\":{\"attack\":9,\"defense\":3,\"magic\":1,\"difficulty\":7},\"image\":{\"full\":\"Talon.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":384,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":588,\"hpperlevel\":95,\"mp\":377.2,\"mpperlevel\":37,\"movespeed\":335,\"armor\":30,\"armorperlevel\":3.5,\"spellblock\":39,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.75,\"mpregen\":7.6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.9,\"attackspeed\":0.625}},\"Taric\":{\"version\":\"10.19.1\",\"id\":\"Taric\",\"key\":\"44\",\"name\":\"瓦洛兰之盾\",\"title\":\"塔里克\",\"blurb\":\"塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。\",\"info\":{\"attack\":4,\"defense\":8,\"magic\":5,\"difficulty\":3},\"image\":{\"full\":\"Taric.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":432,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":575,\"hpperlevel\":85,\"mp\":300,\"mpperlevel\":60,\"movespeed\":340,\"armor\":40,\"armorperlevel\":3.4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":6,\"hpregenperlevel\":0.5,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"Teemo\":{\"version\":\"10.19.1\",\"id\":\"Teemo\",\"key\":\"17\",\"name\":\"迅捷斥候\",\"title\":\"提莫\",\"blurb\":\"不惧艰难险阻、不惧坎坷危途，提莫怀着无比的热情和欢欣的精神探索着整个世界。作为一个约德尔人，他对自己的道德观坚定不移，同时对班德尔斥候的信条感到自豪，有的时候，他的热忱甚至会让他无法看到，自己行为会在更大的意义上导致什么样的后果。虽然有的人认为这支斥候小队是否真正存在还有待商榷，但有一件事是肯定的：提莫的信念绝不容小觑。\",\"info\":{\"attack\":5,\"defense\":3,\"magic\":7,\"difficulty\":6},\"image\":{\"full\":\"Teemo.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":528,\"hpperlevel\":90,\"mp\":334,\"mpperlevel\":20,\"movespeed\":330,\"armor\":24.3,\"armorperlevel\":3.75,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":5.5,\"hpregenperlevel\":0.65,\"mpregen\":9.6,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.38,\"attackspeed\":0.69}},\"Thresh\":{\"version\":\"10.19.1\",\"id\":\"Thresh\",\"key\":\"412\",\"name\":\"魂锁典狱长\",\"title\":\"锤石\",\"blurb\":\"暴虐又狡猾的锤石是一个来自暗影岛的亡灵，野心勃勃、不知疲倦。他曾经是无数奥秘的看守，在一种超越生死的力量下骨肉瓦解，而现在他则使用自己独创的钻心痛苦缓慢地折磨并击溃其他人，以此作为自己存在下去的手段。被他迫害的人需要承受远超死亡的痛苦，因为锤石会让他们的灵魂也饱尝剧痛，将他们的灵魂囚禁在自己的灯笼中，经受永世的折磨。\",\"info\":{\"attack\":5,\"defense\":6,\"magic\":6,\"difficulty\":7},\"image\":{\"full\":\"Thresh.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":48,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Fighter\"],\"partype\":\"法力\",\"stats\":{\"hp\":560.52,\"hpperlevel\":93,\"mp\":273.92,\"mpperlevel\":44,\"movespeed\":335,\"armor\":28,\"armorperlevel\":0,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":450,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":56,\"attackdamageperlevel\":2.2,\"attackspeedperlevel\":3.5,\"attackspeed\":0.625}},\"Tristana\":{\"version\":\"10.19.1\",\"id\":\"Tristana\",\"key\":\"18\",\"name\":\"麦林炮手\",\"title\":\"崔丝塔娜\",\"blurb\":\"许多约德尔人都将自己的精力花在探索发现、发明创造或者搞恶作剧上，然而崔丝塔娜则一心向往伟大勇者们的冒险故事。她听闻了太多关于符文之地的事，关于不同的势力、关于庞大的战争。崔丝塔娜相信自己也有资格成为传奇。她首次踏进了这个世界，拿着她信赖的加农炮“轰隆”，用坚定的勇气和乐观精神跳进战场。\",\"info\":{\"attack\":9,\"defense\":3,\"magic\":5,\"difficulty\":4},\"image\":{\"full\":\"Tristana.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":96,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":559,\"hpperlevel\":88,\"mp\":250,\"mpperlevel\":32,\"movespeed\":325,\"armor\":26,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":3.75,\"hpregenperlevel\":0.65,\"mpregen\":7.2,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":1.5,\"attackspeed\":0.656}},\"Trundle\":{\"version\":\"10.19.1\",\"id\":\"Trundle\",\"key\":\"48\",\"name\":\"巨魔之王\",\"title\":\"特朗德尔\",\"blurb\":\"特朗德尔是一个粗鄙且狡猾的巨魔，性格非常顽劣。没有什么东西不能被他打到屈服认输，甚至是弗雷尔卓德本身。他的领土意识极强，任何进入他领地的蠢蛋都会被他追杀。巨大的臻冰棍棒随时伺候。他会让敌人感到刺骨寒冷，并且用锯齿状的冰柱刺穿他们，最后在他们血溅冰原的时候放声大笑。\",\"info\":{\"attack\":7,\"defense\":6,\"magic\":2,\"difficulty\":5},\"image\":{\"full\":\"Trundle.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":144,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":616,\"hpperlevel\":96,\"mp\":281,\"mpperlevel\":45,\"movespeed\":350,\"armor\":37,\"armorperlevel\":2.7,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":6,\"hpregenperlevel\":0.75,\"mpregen\":7.5,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.9,\"attackspeed\":0.67}},\"Tryndamere\":{\"version\":\"10.19.1\",\"id\":\"Tryndamere\",\"key\":\"23\",\"name\":\"蛮族之王\",\"title\":\"泰达米尔\",\"blurb\":\"桀骜不羁和无尽的愤怒驱使着泰达米尔在弗雷尔卓德所向披靡。他曾公开挑战北方最伟大的战士，让自己为未来更黑暗的时代做好准备。这位愤怒的野蛮人一直都在为自己被灭绝的氏族寻求复仇，不过最近他与阿瓦洛萨部族的战母艾希联手，并在她的族群中重新安家。他非人的力量与毅力是众人皆知的传奇，而且也为他和他的新盟友带来了无数次奇迹般的胜利。\",\"info\":{\"attack\":10,\"defense\":5,\"magic\":2,\"difficulty\":5},\"image\":{\"full\":\"Tryndamere.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":192,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"怒气\",\"stats\":{\"hp\":625.64,\"hpperlevel\":98,\"mp\":100,\"mpperlevel\":0,\"movespeed\":345,\"armor\":33,\"armorperlevel\":3.1,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.9,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":69,\"attackdamageperlevel\":3.7,\"attackspeedperlevel\":2.9,\"attackspeed\":0.67}},\"TwistedFate\":{\"version\":\"10.19.1\",\"id\":\"TwistedFate\",\"key\":\"4\",\"name\":\"卡牌大师\",\"title\":\"崔斯特\",\"blurb\":\"崔斯特·菲特是一名声名狼藉的纸牌高手和诈骗惯犯，世界上任何有人烟的地方都有他施展魅力和赌艺的足迹，让那些富人和痴人既羡慕又嫉恨。他很少会认真起来干一件事，总是用一抹轻蔑的微笑和一副漫不经心的随性面对每一天。无论面对什么情况，崔斯特的袖子里永远都会藏着一张王牌。\",\"info\":{\"attack\":6,\"defense\":2,\"magic\":6,\"difficulty\":9},\"image\":{\"full\":\"TwistedFate.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":240,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":534,\"hpperlevel\":94,\"mp\":333,\"mpperlevel\":19,\"movespeed\":330,\"armor\":21,\"armorperlevel\":3.15,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":5.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":52,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":3.22,\"attackspeed\":0.651}},\"Twitch\":{\"version\":\"10.19.1\",\"id\":\"Twitch\",\"key\":\"29\",\"name\":\"瘟疫之源\",\"title\":\"图奇\",\"blurb\":\"虽然出身只是一只瘟疫老鼠，但图奇却靠热情成为了一位污秽的鉴赏家，他可不介意弄脏自己的爪子。他使用一把炼金动力十字弩瞄准皮城人的镀金心脏，发誓要让这些生活在上层都市的人们知道他们真实的自我究竟有多么肮脏。他总是鬼鬼祟祟蹑手蹑脚，不是在地沟区翻来翻去，就是在别的地方深挖人类的垃圾堆，寻找被丢弃的宝藏……或者是一块发霉的三明治。\",\"info\":{\"attack\":9,\"defense\":2,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"Twitch.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":288,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":612,\"hpperlevel\":86,\"mp\":287.2,\"mpperlevel\":40,\"movespeed\":330,\"armor\":27,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.75,\"hpregenperlevel\":0.6,\"mpregen\":7.256,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":3.11,\"attackspeedperlevel\":3.38,\"attackspeed\":0.679}},\"Udyr\":{\"version\":\"10.19.1\",\"id\":\"Udyr\",\"key\":\"77\",\"name\":\"兽灵行者\",\"title\":\"乌迪尔\",\"blurb\":\"乌迪尔不只是一个人而已；他体内承载着四个原始兽灵的不羁能量。在与这些兽灵的野性进行心灵感应时，乌迪尔可以驾驭它们独特的力量：猛虎让他矫健凶猛，灵龟为他提供韧劲，巨熊是蛮力的源头，而凤凰为他带来永恒的烈焰。结合它们的能量，乌迪尔就能击退那些妄图危害自然秩序的人。\",\"info\":{\"attack\":8,\"defense\":7,\"magic\":4,\"difficulty\":7},\"image\":{\"full\":\"Udyr.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":336,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":594,\"hpperlevel\":99,\"mp\":271,\"mpperlevel\":30,\"movespeed\":350,\"armor\":34,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":6,\"hpregenperlevel\":0.75,\"mpregen\":7.5,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":5,\"attackspeedperlevel\":2.67,\"attackspeed\":0.658}},\"Urgot\":{\"version\":\"10.19.1\",\"id\":\"Urgot\",\"key\":\"6\",\"name\":\"无畏战车\",\"title\":\"厄加特\",\"blurb\":\"厄加特曾一度是诺克萨斯强大的处刑人，但这个让他为之杀人如麻的帝国，最后却背叛了他。铁链束缚着他，并迫使他在一个新的地方懂得了力量的真正意义——祖安地下深处的监牢矿坑——“沉钩”。后来的一场灾难让祖安城中混乱肆虐，厄加特也借机破土而出，在祖安的地下犯罪世界傲视群雄。曾经奴役他的铁链，现在是他折磨猎物的工具，他会用枪火洗礼自己新的家园，肃清那些不配苟活的人，将祖安铸成一座痛苦的熔炉。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":8},\"image\":{\"full\":\"Urgot.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":384,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":585,\"hpperlevel\":88,\"mp\":340,\"mpperlevel\":45,\"movespeed\":330,\"armor\":36,\"armorperlevel\":4.25,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":350,\"hpregen\":7.5,\"hpregenperlevel\":0.7,\"mpregen\":7.25,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":4,\"attackspeedperlevel\":3.75,\"attackspeed\":0.625}},\"Varus\":{\"version\":\"10.19.1\",\"id\":\"Varus\",\"key\":\"110\",\"name\":\"惩戒之箭\",\"title\":\"韦鲁斯\",\"blurb\":\"韦鲁斯是古老暗裔的一员。身为一名冷血的杀手，他最爱的就是用箭矢折磨敌人。先让他们失心发疯，再了结他们的性命。韦鲁斯俊美非常，虽然在大暗裔战争结束后便遭囚禁，但却在几百年后成功逃脱，寄宿于两位艾欧尼亚猎人再造的血肉之躯中。这二人无意之间释放了韦鲁斯，从此便背上了那把蕴含着韦鲁斯精魄的长弓。如今的韦鲁斯开始残酷地报复那些囚禁他的人，但他体内纠缠的两个凡人灵魂却在阻挠他的每一步。\",\"info\":{\"attack\":7,\"defense\":3,\"magic\":4,\"difficulty\":2},\"image\":{\"full\":\"Varus.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":432,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":530,\"hpperlevel\":91,\"mp\":360,\"mpperlevel\":33,\"movespeed\":330,\"armor\":27,\"armorperlevel\":3.4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":575,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3,\"attackspeedperlevel\":4,\"attackspeed\":0.658}},\"Vayne\":{\"version\":\"10.19.1\",\"id\":\"Vayne\",\"key\":\"67\",\"name\":\"暗夜猎手\",\"title\":\"薇恩\",\"blurb\":\"肖娜·薇恩是一位无情的德玛西亚怪物猎手。终其一生，她都在寻找杀害她全家的恶魔。她的手臂上装着十字弩，心中燃烧着熊熊的复仇怒火，从暗影中射出圣银弩箭的风暴，薇恩只有在杀死那些为黑暗魔法所控制的人和生物时，才能真正感到愉悦。\",\"info\":{\"attack\":10,\"defense\":1,\"magic\":1,\"difficulty\":8},\"image\":{\"full\":\"Vayne.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":0,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":515,\"hpperlevel\":89,\"mp\":231.8,\"mpperlevel\":35,\"movespeed\":330,\"armor\":23,\"armorperlevel\":3.4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":6.972,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":2.36,\"attackspeedperlevel\":3.3,\"attackspeed\":0.658}},\"Veigar\":{\"version\":\"10.19.1\",\"id\":\"Veigar\",\"key\":\"45\",\"name\":\"邪恶小法师\",\"title\":\"维迦\",\"blurb\":\"维迦是热衷于黑暗巫术的大师。几乎没有哪个凡人敢碰的恐怖力量，他却能敞开怀抱。作为拥有自由精神的班德尔城居民，他渴望突破约德尔魔法的边界，于是转而研究那些被隐藏数千年的秘法文字。现在他已经变成了一个偏执的生物，对宇宙的奥秘无限向往。人们总会低估维迦的力量。虽然维迦发自心底地觉得自己是邪恶的，不过他的一些心底的原则也的确会让人质疑他的深层动机。\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":10,\"difficulty\":7},\"image\":{\"full\":\"Veigar.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":48,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":505,\"hpperlevel\":94,\"mp\":490,\"mpperlevel\":26,\"movespeed\":340,\"armor\":23,\"armorperlevel\":3.75,\"spellblock\":32,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":52,\"attackdamageperlevel\":2.7,\"attackspeedperlevel\":2.24,\"attackspeed\":0.625}},\"Velkoz\":{\"version\":\"10.19.1\",\"id\":\"Velkoz\",\"key\":\"161\",\"name\":\"虚空之眼\",\"title\":\"维克兹\",\"blurb\":\"人们不太确定维克兹是否是符文之地上出现的第一个虚空生物，但可以确定的是没有第二个虚空生物能超过他的残忍和精明。他的同类通常都会吞噬或者破坏周围的一切，然而维克兹却一直在仔细观察并研究这个物质世界，以及世界上这些奇怪的好战生物，寻找虚空可以利用的弱点。但维克兹绝不是个被动的观察者，他会用致命的电浆射线回击任何威胁，甚至还能扰动世界本身的基础构造。\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":10,\"difficulty\":8},\"image\":{\"full\":\"Velkoz.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":96,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":520,\"hpperlevel\":88,\"mp\":469,\"mpperlevel\":21,\"movespeed\":340,\"armor\":21.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54.9379,\"attackdamageperlevel\":3.1416,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"Vi\":{\"version\":\"10.19.1\",\"id\":\"Vi\",\"key\":\"254\",\"name\":\"皮城执法官\",\"title\":\"蔚\",\"blurb\":\"蔚曾经是祖安黑街上的破坏分子。她性格急躁、脾气火爆、凶神恶煞，对权威满心不屑。蔚从小到大都是孤身一人，所以练就了一身生存的本能，也培养了一种恶毒刻薄的幽默感。现在，蔚与皮尔特沃夫守卫一起合作，维护着皮城的安宁。靠着她手上的一副巨型海克斯科技拳套，无论是铜墙铁壁还是心理防线都不在话下。\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Vi.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":144,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":585,\"hpperlevel\":85,\"mp\":295,\"mpperlevel\":45,\"movespeed\":340,\"armor\":30,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":10,\"hpregenperlevel\":1,\"mpregen\":8,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2,\"attackspeed\":0.644}},\"Viktor\":{\"version\":\"10.19.1\",\"id\":\"Viktor\",\"key\":\"112\",\"name\":\"机械先驱\",\"title\":\"维克托\",\"blurb\":\"他是崭新科技时代的领路先驱，将自己毕生精力奉献给了人类的进步。他是寻求人性启迪的理想主义者，信奉着唯有光荣进化才能实现人类全部的潜能。在钢铁与科学的加持之下，维克托狂热地追求着自己理想中的光明未来。\",\"info\":{\"attack\":2,\"defense\":4,\"magic\":10,\"difficulty\":9},\"image\":{\"full\":\"Viktor.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":192,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":530,\"hpperlevel\":90,\"mp\":405,\"mpperlevel\":25,\"movespeed\":335,\"armor\":23,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":8,\"hpregenperlevel\":0.65,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.11,\"attackspeed\":0.658}},\"Vladimir\":{\"version\":\"10.19.1\",\"id\":\"Vladimir\",\"key\":\"8\",\"name\":\"猩红收割者\",\"title\":\"弗拉基米尔\",\"blurb\":\"弗拉基米尔是一个渴望凡人鲜血的魔鬼，早在诺克萨斯帝国建立之初就开始干涉帝国的内政。他的血巫术不仅能超越自然规律延长他的寿命，而且还能让他随心所欲地控制其他人的身体和思想。在诺克萨斯贵族奢华的沙龙聚会上，这个能力让他围绕自己建立了狂热的教众，而在底层的后巷里，这个能力则让他吸干敌人的鲜血。\",\"info\":{\"attack\":2,\"defense\":6,\"magic\":8,\"difficulty\":7},\"image\":{\"full\":\"Vladimir.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":240,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"猩红冲刺\",\"stats\":{\"hp\":537,\"hpperlevel\":96,\"mp\":2,\"mpperlevel\":0,\"movespeed\":330,\"armor\":23,\"armorperlevel\":3.3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":450,\"hpregen\":7,\"hpregenperlevel\":0.6,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.658}},\"Volibear\":{\"version\":\"10.19.1\",\"id\":\"Volibear\",\"key\":\"106\",\"name\":\"不灭狂雷\",\"title\":\"沃利贝尔\",\"blurb\":\"对于那些敬畏旧神的人，沃利贝尔是风暴的实体化身。他充满怪力、野性和倔强的坚毅，早在凡人行走于弗雷尔卓德的冻土苔原之前，他就已经存在。这片土地由他和他的半神同胞们共同创造，是他要拼死保护的东西。人类的文明以及随之而来的软弱让他积怨已久，如今他为了旧习古道而战——要让这片土地回归野性，让鲜血畅流无阻。他渴望迎战任何反对者，亮出他的尖牙、利爪和雷霆般的压制力。\",\"info\":{\"attack\":7,\"defense\":7,\"magic\":4,\"difficulty\":3},\"image\":{\"full\":\"Volibear.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":288,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":580,\"hpperlevel\":90,\"mp\":350,\"mpperlevel\":50,\"movespeed\":340,\"armor\":31,\"armorperlevel\":4,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":9,\"hpregenperlevel\":0.75,\"mpregen\":6.25,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"Warwick\":{\"version\":\"10.19.1\",\"id\":\"Warwick\",\"key\":\"19\",\"name\":\"祖安怒兽\",\"title\":\"沃里克\",\"blurb\":\"沃里克是一头游猎于祖安灰色小巷的怪兽。他的身体接受了痛苦的实验并发生了变异，融合了精密复杂的储液舱和药泵，向他的血管中注入炼金合成的愤怒激素。他从阴影中一跃而出，猎杀那些在城市最深处肆虐的罪犯。沃里克会被鲜血吸引，血腥味让他失去理智。没有哪个沾血的人能够逃过他的猎杀。\",\"info\":{\"attack\":9,\"defense\":5,\"magic\":3,\"difficulty\":3},\"image\":{\"full\":\"Warwick.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":336,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":550,\"hpperlevel\":85,\"mp\":280,\"mpperlevel\":35,\"movespeed\":335,\"armor\":33,\"armorperlevel\":3.2,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":4,\"hpregenperlevel\":0.75,\"mpregen\":7.466,\"mpregenperlevel\":0.575,\"crit\":0,\"critperlevel\":0,\"attackdamage\":65,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.3,\"attackspeed\":0.638}},\"Xayah\":{\"version\":\"10.19.1\",\"id\":\"Xayah\",\"key\":\"498\",\"name\":\"逆羽\",\"title\":\"霞\",\"blurb\":\"身为瓦斯塔亚的志士，霞要掀起一场革命来拯救她的族群。她身法敏捷又慧心独具，凭借锋芒逼人的羽刃，扫除任何异己。霞与她的灵魂伴侣洛并肩作战，共同守护他们日渐衰落的部族，同时韬光养晦，希望终有一天能率领全族重夺昔日荣光。\",\"info\":{\"attack\":10,\"defense\":6,\"magic\":1,\"difficulty\":5},\"image\":{\"full\":\"Xayah.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":384,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"法力\",\"stats\":{\"hp\":590,\"hpperlevel\":88,\"mp\":340,\"mpperlevel\":40,\"movespeed\":325,\"armor\":25,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":3.25,\"hpregenperlevel\":0.75,\"mpregen\":8.25,\"mpregenperlevel\":0.75,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":3.3,\"attackspeed\":0.625}},\"Xerath\":{\"version\":\"10.19.1\",\"id\":\"Xerath\",\"key\":\"101\",\"name\":\"远古巫灵\",\"title\":\"泽拉斯\",\"blurb\":\"泽拉斯是古代恕瑞玛的巫师，飞升以后的他变成了一种奥术能量体，在魔法石棺的碎片之中涌动。数千年来，他被囚禁在沙漠之下，但最近恕瑞玛的崛起却将他从远古的牢笼中解放出来。对权力的疯狂渴求驱使着他，想要夺回他认为属于自己的东西，并取代世界上这些自命不凡的文明，让自己成为唯一受膜拜的偶像，统一整个世界。\",\"info\":{\"attack\":1,\"defense\":3,\"magic\":10,\"difficulty\":8},\"image\":{\"full\":\"Xerath.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":432,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":526,\"hpperlevel\":92,\"mp\":459,\"mpperlevel\":22,\"movespeed\":340,\"armor\":21.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54.7,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"XinZhao\":{\"version\":\"10.19.1\",\"id\":\"XinZhao\",\"key\":\"5\",\"name\":\"德邦总管\",\"title\":\"赵信\",\"blurb\":\"赵信是效忠于光盾王朝的坚毅勇士。他曾经沦落于诺克萨斯的角斗场，在无数次角斗中得以幸存。被德玛西亚军队解救以后，他便发誓为这群勇敢的解放者贡献生命和忠诚。最称手的三爪长枪相伴，赵信现在为自己的第二祖国而战，一往无前，暴虎冯河。\",\"info\":{\"attack\":8,\"defense\":6,\"magic\":3,\"difficulty\":2},\"image\":{\"full\":\"XinZhao.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":0,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"法力\",\"stats\":{\"hp\":570,\"hpperlevel\":92,\"mp\":273.8,\"mpperlevel\":35,\"movespeed\":345,\"armor\":35,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.7,\"mpregen\":7.256,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.5,\"attackspeed\":0.645}},\"Yasuo\":{\"version\":\"10.19.1\",\"id\":\"Yasuo\",\"key\":\"157\",\"name\":\"疾风剑豪\",\"title\":\"亚索\",\"blurb\":\"<p>亚索是一个百折不屈的艾欧尼亚人，也是一名身手敏捷的御风剑客。这位生性自负的年轻人，被误认为杀害长老的凶手——由于无法证明自己的清白，他出于自卫而杀死了自己的哥哥。虽然长老死亡的真相已然大白，亚索还是无法原谅自己的所作所为。他在家园的土地上流浪，只有疾风指引着他的剑刃。</p>\",\"info\":{\"attack\":8,\"defense\":4,\"magic\":4,\"difficulty\":10},\"image\":{\"full\":\"Yasuo.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":48,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"剑意\",\"stats\":{\"hp\":490,\"hpperlevel\":87,\"mp\":100,\"mpperlevel\":0,\"movespeed\":345,\"armor\":30,\"armorperlevel\":3.4,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":6.5,\"hpregenperlevel\":0.9,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":2.5,\"attackspeed\":0.697}},\"Yone\":{\"version\":\"10.19.1\",\"id\":\"Yone\",\"key\":\"777\",\"name\":\"封魔剑魂\",\"title\":\"永恩\",\"blurb\":\"生前，他是永恩，是亚索同母异父的哥哥，是故乡剑术道场的知名弟子。但当他死在弟弟手下以后，却发现自己被精神领域中的恶毒灵体所侵扰，不得不用它自己的刀剑将它弑杀。如今，被诅咒的永恩戴上了它的恶魔面具，开始了不懈的追猎，他要猎尽所有同种的恶魔，从而查清自己究竟成为了什么。\",\"info\":{\"attack\":8,\"defense\":4,\"magic\":4,\"difficulty\":8},\"image\":{\"full\":\"Yone.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":96,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"剑意\",\"stats\":{\"hp\":550,\"hpperlevel\":85,\"mp\":500,\"mpperlevel\":0,\"movespeed\":345,\"armor\":28,\"armorperlevel\":3.4,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":7.5,\"hpregenperlevel\":0.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.5,\"attackspeed\":0.625}},\"Yorick\":{\"version\":\"10.19.1\",\"id\":\"Yorick\",\"key\":\"83\",\"name\":\"牧魂人\",\"title\":\"约里克\",\"blurb\":\"约里克所在的教团早已被世人忘却，而他也成为了最后的幸存者。说不上是诅咒抑或是祝福，他拥有操控死者的能力。与他一同被困在暗影岛上的，只有逐渐腐败的尸体，还有他引到自己身边终日尖啸的死灵。约里克怪异的举止下掩藏着的却是他决绝的憧憬：在破败之咒的阴影下解放他的家园。\",\"info\":{\"attack\":6,\"defense\":6,\"magic\":4,\"difficulty\":6},\"image\":{\"full\":\"Yorick.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":144,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"法力\",\"stats\":{\"hp\":580,\"hpperlevel\":100,\"mp\":300,\"mpperlevel\":40,\"movespeed\":340,\"armor\":39,\"armorperlevel\":4,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.8,\"mpregen\":7.5,\"mpregenperlevel\":0.75,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":5,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"Yuumi\":{\"version\":\"10.19.1\",\"id\":\"Yuumi\",\"key\":\"350\",\"name\":\"魔法猫咪\",\"title\":\"悠米\",\"blurb\":\"作为一只来自班德尔城的魔法猫咪，悠米曾是一名约德尔魔女的守护灵，她的主人名叫诺拉。而当主人神秘消失以后，悠米就成为了《门扉魔典》的守护者，这是诺拉留下的一本有灵性的书，他们一起穿越书页中的传送门，共同寻找诺拉。渴望被宠爱的悠米在她的旅途中寻找着友善的同伴，为同伴们提供闪光护盾和坚决意志作为保护。虽然魔典竭尽全力让她把注意力留在最初的任务上，但悠米经常会被世俗的安逸所吸引，比如打盹和吃鱼。但安逸过后，她总是会回归自己的任务，找寻自己的朋友。\",\"info\":{\"attack\":5,\"defense\":1,\"magic\":8,\"difficulty\":2},\"image\":{\"full\":\"Yuumi.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":192,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":480,\"hpperlevel\":70,\"mp\":400,\"mpperlevel\":45,\"movespeed\":330,\"armor\":25,\"armorperlevel\":3,\"spellblock\":25,\"spellblockperlevel\":0.3,\"attackrange\":500,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":10,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":1,\"attackspeed\":0.625}},\"Zac\":{\"version\":\"10.19.1\",\"id\":\"Zac\",\"key\":\"154\",\"name\":\"生化魔人\",\"title\":\"扎克\",\"blurb\":\"一滩泄漏的毒液，顺着炼金科技设施的裂缝流进了祖安的地沟区，在深处一个与世隔绝的坑洞里积成了一洼。出身虽然如此低微，但扎克却从一团蒙昧的黏液长成了一个有思想的实体，栖息在城里的管道中，偶尔露面，帮助那些无助的人，或是修缮祖安的各种公共设施。\",\"info\":{\"attack\":3,\"defense\":7,\"magic\":7,\"difficulty\":8},\"image\":{\"full\":\"Zac.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":240,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"无\",\"stats\":{\"hp\":615,\"hpperlevel\":95,\"mp\":0,\"mpperlevel\":0,\"movespeed\":340,\"armor\":33,\"armorperlevel\":3.5,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.5,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3.4,\"attackspeedperlevel\":1.6,\"attackspeed\":0.736}},\"Zed\":{\"version\":\"10.19.1\",\"id\":\"Zed\",\"key\":\"238\",\"name\":\"影流之主\",\"title\":\"劫\",\"blurb\":\"彻底抛弃了仁慈与怜悯的劫，是影流教派的领袖。他创立影流的目标是将艾欧尼亚的魔法和传统武术用于实战，驱逐诺克萨斯侵略者。在战争中，绝望指引他开启了神秘的暗影形态。这是一种恶灵魔法，虽然强大，但同时非常危险且有腐化之力。劫已经完全掌握了这种禁忌之术，用它摧毁自己眼中的威胁，维护自己的国家，以及自己的教派。\",\"info\":{\"attack\":9,\"defense\":2,\"magic\":1,\"difficulty\":7},\"image\":{\"full\":\"Zed.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":288,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\"],\"partype\":\"能量\",\"stats\":{\"hp\":584,\"hpperlevel\":85,\"mp\":200,\"mpperlevel\":0,\"movespeed\":345,\"armor\":32,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7,\"hpregenperlevel\":0.65,\"mpregen\":50,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3.4,\"attackspeedperlevel\":3.3,\"attackspeed\":0.651}},\"Ziggs\":{\"version\":\"10.19.1\",\"id\":\"Ziggs\",\"key\":\"115\",\"name\":\"爆破鬼才\",\"title\":\"吉格斯\",\"blurb\":\"炸弹越大越好，引线越短越好，带着这种喜好的约德尔人吉格斯就是天生的爆炸狂人。他曾是皮尔特沃夫一位发明家的助手，不过因为自己千篇一律的生活而感到无聊，后来和一个名为金克丝的蓝头发小疯子交上了朋友。疯狂的城中一夜过后，吉格斯接受了她的建议，搬到了祖安，在那里更加自由地探索自己着迷的东西。在他对于爆炸的无尽追寻过程中，一直恐吓着炼金男爵和普通市民之流。\",\"info\":{\"attack\":2,\"defense\":4,\"magic\":9,\"difficulty\":4},\"image\":{\"full\":\"Ziggs.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":336,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":536,\"hpperlevel\":92,\"mp\":480,\"mpperlevel\":23.5,\"movespeed\":325,\"armor\":21.544,\"armorperlevel\":3.3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54.208,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2,\"attackspeed\":0.656}},\"Zilean\":{\"version\":\"10.19.1\",\"id\":\"Zilean\",\"key\":\"26\",\"name\":\"时光守护者\",\"title\":\"基兰\",\"blurb\":\"基兰曾是一位强大的艾卡西亚法师，在目睹了家园被虚空毁灭以后，他开始执迷于时间的流逝。他甚至没有时间为这场灾难感到悲哀，立刻就召唤了远古的时间魔法，预测全部的发展结局。从实际结果来说，他已成为不朽的存在。如今的基兰在过去、现在、未来之间漂泊，弯折、扭曲自己周围的时间，追寻那稍纵即逝的关键时刻，逆转时光，阻止艾卡西亚的毁灭。\",\"info\":{\"attack\":2,\"defense\":5,\"magic\":8,\"difficulty\":6},\"image\":{\"full\":\"Zilean.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":384,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"法力\",\"stats\":{\"hp\":504,\"hpperlevel\":82,\"mp\":452,\"mpperlevel\":30,\"movespeed\":335,\"armor\":24,\"armorperlevel\":3.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.5,\"mpregen\":11.335,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":51.64,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.13,\"attackspeed\":0.625}},\"Zoe\":{\"version\":\"10.19.1\",\"id\":\"Zoe\",\"key\":\"142\",\"name\":\"暮光星灵\",\"title\":\"佐伊\",\"blurb\":\"调皮捣蛋、异想天开而且变化莫测，佐伊就是这一切的现实化身。作为巨神族的宇宙信使，她的出现就是惊天巨变的先兆。她甚至无需任何行为，只是单纯地出现在某个地方，就足以扭曲周围的奥术数学法则，从而扰乱现实的物理定律。有的时候还会带来浩劫与灾难，虽然她本身并无半点恶意。或许这就是为什么她对待自己的职责总是那么地漫不经心，给了她充足的时间用来玩游戏、捉弄凡人，或者自娱自乐。与佐伊的邂逅可能会给人带来欢乐与激励，但她的现身往往没这么简单，甚至常常意味着极大的危险。\",\"info\":{\"attack\":1,\"defense\":7,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Zoe.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":432,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":560,\"hpperlevel\":92,\"mp\":425,\"mpperlevel\":25,\"movespeed\":340,\"armor\":20.8,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.5,\"attackspeed\":0.625}},\"Zyra\":{\"version\":\"10.19.1\",\"id\":\"Zyra\",\"key\":\"143\",\"name\":\"荆棘之兴\",\"title\":\"婕拉\",\"blurb\":\"婕拉诞生于一次远古的巫术灾难，她是获得了实体形态的自然之怒，是拥有诱人外观的植物与人类的混合体。她的每一个脚步都在点燃新的生命。在她眼里，瓦洛兰的众多凡人都只不过供她播种的猎物，用夺命的尖刺杀死他们也是一件不值一提的小事。虽然她的真正目的还是个谜，但婕拉一直在世界上流浪，肆意放纵自己占领土地的欲望，同时扼杀自己领地上的所有其他生命。\",\"info\":{\"attack\":4,\"defense\":3,\"magic\":8,\"difficulty\":7},\"image\":{\"full\":\"Zyra.png\",\"sprite\":\"champion5.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"法力\",\"stats\":{\"hp\":504,\"hpperlevel\":79,\"mp\":418,\"mpperlevel\":25,\"movespeed\":340,\"armor\":29,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":575,\"hpregen\":5.5,\"hpregenperlevel\":0.5,\"mpregen\":13,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.376,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":2.11,\"attackspeed\":0.625}}}}");

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map