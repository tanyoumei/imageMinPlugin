'use strict';

var _https = require('https');

var _chalk = require('chalk');

var _path = require('path');

var _fs = require('fs');

var options = {
  hostname: 'tinypng.com',
  port: 443,
  path: '/web/shrink',
  method: 'POST',
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  }
};

var imageMinPlugin = function imageMinPlugin() {};
imageMinPlugin.prototype.apply = function (compiler) {
  compiler.plugin('after-compile', function (compilation, callback) {
    var imgList = [];
    var proList = [];
    compilation.modules.forEach(function (module) {
      if (/(.+\.png|\.jpg)$/.test(module.resource) && !imgList[module.resource]) {
        for (var k in module.assets) {
          imgList[module.resource] = k;
          proList.push(compress({
            path: module.resource,
            name: k
          }, compilation));
        }
      }
    });
    Promise.all(proList).then(function () {
      callback();
    });
  });
};

//  操作当前的tiny文件
var operateTinyFile = function operateTinyFile(dir, relativePath) {
  var _relativePath = relativePath.replace(/^\//, '');
  var path = dir + '/tiny.json';
  try {
    var json = require(path);
    if (json[_relativePath]) {
      return json[_relativePath];
    } else {
      json[_relativePath] = '1';
      (0, _fs.writeFileSync)(path, JSON.stringify(json, null, '\t'));
    }
  } catch (e) {
    (0, _fs.appendFileSync)(path, '{}');
    return false;
  }
};
var PROMO_PATH = process.cwd();
// 压缩一张图
var compress = function compress(val, compilation) {
  return new Promise(function (resolve, reject) {
    var path = val.path;
    var file = val.name;

    var _parse = (0, _path.parse)(path),
        dir = _parse.dir,
        base = _parse.base;

    var relativePath = path.split(PROMO_PATH)[1];
    // 已经压缩过了
    if (operateTinyFile(dir, relativePath)) {
      resolve();
      return false;
    }

    (0, _fs.createReadStream)('' + path).pipe((0, _https.request)(option, function (res) {
      res.on('data', function (resInfo) {
        try {
          resInfo = JSON.parse(resInfo.toString());
          if (resInfo.error) {
            return console.log('CompressError \'' + (0, _chalk.red)(relativePath) + '\'.....' + resInfo.message);
          }
          var oldSize = (resInfo.input.size / 1024).toFixed(2);
          var newSize = (resInfo.output.size / 1024).toFixed(2);
          (0, _https.get)(resInfo.output.url, function (imgRes) {
            var writeS = (0, _fs.createWriteStream)('' + path);
            imgRes.pipe(writeS);
            var buffers = [];
            imgRes.on('data', function (buffer) {
              buffers.push(buffer);
            });
            (function (relativePath) {
              imgRes.on('end', function () {
                console.log('CompressDone ' + (0, _chalk.blue)(relativePath) + ' ' + (0, _chalk.blue)(oldSize + 'KB') + ' ==> ' + (0, _chalk.blue)(newSize + 'KB') + ' -' + (0, _chalk.blue)(Math.floor((oldSize - newSize) / oldSize * 100) + '%'));
                operateTinyFile(dir, relativePath);
                // 改变chunk
                compilation.assets[file] = {
                  source: function source() {
                    return Buffer.concat(buffers);
                  },
                  size: function size() {
                    return newSize * 1024;
                  }
                };
                resolve();
              });
            })(relativePath);

            writeS.on('close', function () {});
          });
        } catch (error) {
          return console.log('CompressError \'' + base + '\'.....' + resInfo.message);
        }
      });
    }));
  });
};
module.exports = imageMinPlugin;
