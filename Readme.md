
### 如果你觉得好的话 帮我点一个star 可以吗

## intro
### a plugin for webpack aim to Compress dependency pictures
### webpack插件，通过tinypng的网站来压缩图片 会生成tiny.json压缩文件列表
### 在生产环境使用 压缩过后的图片下次构建的时候不会再次进行压缩了

## Example

```js
var ImageMinPlugin = require('image-min-plugin');
plugins: [
    new ImageMinPlugin()
]
```

## License
  MIT