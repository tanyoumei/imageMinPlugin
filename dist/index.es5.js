(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("chalk"));
	else if(typeof define === 'function' && define.amd)
		define(["chalk"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("chalk")) : factory(root["_"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE_chalk__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _https = __webpack_require__(/*! https */ \"https\");\n\nvar _chalk = __webpack_require__(/*! chalk */ \"chalk\");\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar OPTIONS = {\n  hostname: 'tinypng.com',\n  port: 443,\n  path: '/web/shrink',\n  method: 'POST',\n  headers: {\n    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'\n  }\n};\nvar PROMO_PATH = process.cwd();\n\nvar ImageMinPlugin = function () {\n  function ImageMinPlugin() {\n    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    _classCallCheck(this, ImageMinPlugin);\n\n    this.options = options;\n  }\n\n  _createClass(ImageMinPlugin, [{\n    key: 'apply',\n    value: function apply(compiler) {\n      compiler.plugin('after-compile', function (compilation, callback) {\n        var imgList = [];\n        var proList = [];\n        compilation.modules.forEach(function (module) {\n          if (/(.+\\.png|\\.jpg)$/.test(module.resource) && !imgList[module.resource]) {\n            for (var k in module.assets) {\n              imgList[module.resource] = k;\n              proList.push(compress({\n                path: module.resource,\n                name: k\n              }, compilation));\n            }\n          }\n        });\n        Promise.all(proList).then(function () {\n          callback();\n        });\n      });\n    }\n  }]);\n\n  return ImageMinPlugin;\n}();\n\n//  操作当前的tiny文件\n\n\nvar operateTinyFile = function operateTinyFile(dir, relativePath) {\n  var _relativePath = relativePath.replace(/^\\//, '');\n  var path = dir + '/tiny.json';\n  try {\n    var json = (0, _fs.readFileSync)(path, { encoding: 'utf8' });\n    json = JSON.parse(json);\n    if (json[_relativePath]) {\n      return json[_relativePath];\n    } else {\n      json[_relativePath] = 'true';\n      (0, _fs.writeFileSync)(path, JSON.stringify(json, null, '\\t'));\n    }\n  } catch (e) {\n    (0, _fs.appendFileSync)(path, '{}');\n    return false;\n  }\n};\n\n// 压缩一张图\nvar compress = function compress(val, compilation) {\n  return new Promise(function (resolve, reject) {\n    var path = val.path;\n    var file = val.name;\n\n    var _parse = (0, _path.parse)(path),\n        dir = _parse.dir,\n        base = _parse.base;\n\n    var relativePath = path.split(PROMO_PATH)[1];\n    // 已经压缩过了\n    if (operateTinyFile(dir, relativePath)) {\n      resolve();\n      return false;\n    }\n\n    (0, _fs.createReadStream)('' + path).pipe((0, _https.request)(OPTIONS, function (res) {\n      res.on('data', function (resInfo) {\n        try {\n          resInfo = JSON.parse(resInfo.toString());\n          if (resInfo.error) {\n            return console.log('CompressError \\'' + (0, _chalk.red)(relativePath) + '\\'.....' + resInfo.message);\n          }\n          var oldSize = (resInfo.input.size / 1024).toFixed(2);\n          var newSize = (resInfo.output.size / 1024).toFixed(2);\n          (0, _https.get)(resInfo.output.url, function (imgRes) {\n            var writeS = (0, _fs.createWriteStream)('' + path);\n            imgRes.pipe(writeS);\n            var buffers = [];\n            imgRes.on('data', function (buffer) {\n              buffers.push(buffer);\n            });\n            (function (relativePath) {\n              imgRes.on('end', function () {\n                console.log('CompressDone ' + (0, _chalk.blue)(relativePath) + ' ' + (0, _chalk.blue)(oldSize + 'KB') + ' ==> ' + (0, _chalk.blue)(newSize + 'KB') + ' -' + (0, _chalk.blue)(Math.floor((oldSize - newSize) / oldSize * 100) + '%'));\n                operateTinyFile(dir, relativePath);\n                // 改变chunk\n                compilation.assets[file] = {\n                  source: function source() {\n                    return Buffer.concat(buffers);\n                  },\n                  size: function size() {\n                    return newSize * 1024;\n                  }\n                };\n                resolve();\n              });\n            })(relativePath);\n\n            writeS.on('close', function () {});\n          });\n        } catch (error) {\n          return console.log('CompressError \\'' + base + '\\'.....' + resInfo.message);\n        }\n      });\n    }));\n  });\n};\n\nmodule.exports = ImageMinPlugin;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "chalk":
/*!**********************************************************************************!*\
  !*** external {"commonjs":"chalk","commonjs2":"chalk","amd":"chalk","root":"_"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_chalk__;\n\n//# sourceURL=webpack:///external_%7B%22commonjs%22:%22chalk%22,%22commonjs2%22:%22chalk%22,%22amd%22:%22chalk%22,%22root%22:%22_%22%7D?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });
});