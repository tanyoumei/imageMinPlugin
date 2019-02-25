import {
  request,
  get
} from 'https'
import {
  red,
  blue
} from 'chalk'
import {
  parse
} from 'path'
import {
  createReadStream,
  createWriteStream,
  appendFileSync,
  writeFileSync,
  readFileSync
} from 'fs'

const OPTIONS = {
  hostname: 'tinypng.com',
  port: 443,
  path: '/web/shrink',
  method: 'POST',
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  }
}
const PROMO_PATH = process.cwd()

class ImageMinPlugin {

  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.plugin('after-compile', (compilation, callback) => {
      var imgList = []
      var proList = []
      compilation.modules.forEach((module) => {
        if (/(.+\.png|\.jpg)$/.test(module.resource) && !imgList[module.resource]) {
          for (var k in module.assets) {
            imgList[module.resource] = k
            proList.push(compress({
              path: module.resource,
              name: k
            }, compilation))
          }
        }
      })
      Promise.all(proList)
        .then(() => {
          callback();
        })
    })
  }
}


//  操作当前的tiny文件
var operateTinyFile = (dir, relativePath) => {
  var _relativePath = relativePath.replace(/^\//, '')
  var path = `${dir}/tiny.json`
  try {
    var json = readFileSync(path, { encoding: 'utf8' });
    json = JSON.parse(json)
    if (json[_relativePath]) {
      return json[_relativePath]
    } else {
      json[_relativePath] = 'true'
      writeFileSync(path, JSON.stringify(json, null, '\t'))
    }
  } catch (e) {
    appendFileSync(path, '{}')
    return false
  }
}

// 压缩一张图
var compress = (val, compilation) => {
  return new Promise((resolve, reject) => {
    var path = val.path
    var file = val.name
    var {
      dir,
      base
    } = parse(path)
    var relativePath = path.split(PROMO_PATH)[1]
    // 已经压缩过了
    if (operateTinyFile(dir, relativePath)) {
      resolve()
      return false
    }

    createReadStream(`${path}`).pipe(request(OPTIONS, (res) => {
      res.on('data', resInfo => {
        try {
          resInfo = JSON.parse(resInfo.toString())
          if (resInfo.error) {
            return console.log(`CompressError '${red(relativePath)}'.....${resInfo.message}`)
          }
          var oldSize = (resInfo.input.size / 1024).toFixed(2)
          var newSize = (resInfo.output.size / 1024).toFixed(2)
          get(resInfo.output.url, imgRes => {
            let writeS = createWriteStream(`${path}`)
            imgRes.pipe(writeS)
            var buffers = []
            imgRes.on('data', function (buffer) {
              buffers.push(buffer);
            });
            ((relativePath) => {
              imgRes.on('end', () => {
                console.log(`CompressDone ${blue(relativePath)} ${blue(`${oldSize}KB`)} ==> ${blue(`${newSize}KB`)} -${blue(`${Math.floor(((oldSize - newSize) / oldSize * 100))}%`)}`)
                operateTinyFile(dir, relativePath)
                // 改变chunk
                compilation.assets[file] = {
                  source: () => {
                    return Buffer.concat(buffers)
                  },
                  size: () => {
                    return newSize * 1024
                  }
                }
                resolve()
              })
            })(relativePath)

            writeS.on('close', () => { })
          })
        } catch (error) {
          return console.log(`CompressError '${base}'.....${resInfo.message}`)
        }
      })
    }))
  })
}



module.exports = ImageMinPlugin
