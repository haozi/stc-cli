
'use strict'

const stc = require('stc');
const uglify = require('stc-uglify')
const eslint = require('stc-eslint')
const inline = require('stc-inline')
const moveto = require('stc-moveto')
const babel = require('stc-babel')
const htmlCompress = require('stc-html-compress')
const less2css = require('stc-less')
const cssCombine = require('stc-css-combine')
const emptyfile = require('stc-empty-file')


stc.config({
  include: ['template', 'static'],
  product: 'build',
  tpl: {
    engine: 'smarty',
    extname: 'tpl',
    ld: '{%',
    rd: '%}'
  }
})

stc.lint({
  eslint: {
    plugin: eslint, include: /\.js$/, options: {
      rules: {
        'semi': 0 // 不检测分号
      }
    }
  },
  emptyfile: {plugin: emptyfile, include: /\.*$/}
});
stc.transpile({
  babel: {plugin: babel, include: /\.js$/, options: {}},
  less2css: {plugin: less2css, include: /\.less$/}
});

stc.workflow({
  moveto: {plugin: moveto, include: {type: 'tpl'}, options: {
  }},



  CSSCombine: {plugin: cssCombine, include: /\.css$/},

  compressHtml: {
    plugin: htmlCompress, include: {type: 'tpl'}, options: {
      'trim': true,  //去除首尾空白字符
      'removeComment': true,  //移除注释
      'simpleDoctype': true,  //简化doctype
      'simpleCharset': true,  //简化charset
      'tagToLower': true,  //小写标签名
      'removeHtmlXmlns': true,  //移除html的命名空间
      'removeInterTagSpace': false,  //移除标签之间的空格，非安全
      'removeEmptyScript': true,  //移除空的script标签
      'removeEmptyStyle': true,  //移除空的style标签
      'removeOptionalAttrs': true,  //移除可选的属性
      'removeAttrsQuote': true,  //移除属性值的引号
      'removeAttrsOptionalValue': true,  //移除可选属性的值
      'removeHttpProtocol': true,  //移除http协议
      'removeHttpsProtocol': true,  //移除https协议
      'removeOptionalEndEag': true,  //移除可选的结束标签
      'optionalEndTagList': ['<li>'],  //结束标签列表，数组
      'removeVoidElementSlash': true, //移除单一标签最后的 /
      'compressStyleValue': true,  //压缩标签的style值
      'compressInlineCss': true,  //压缩内联的CSS
      'compressInlineJs': true,  //压缩内联的JS
      'removeInlineJsCdata': true,  //
      'compressJsTpl': true,  //压缩前端模版
      'compressTag': true  //压缩标签
    }
  },
  inline: {
    plugin: inline, include: {type: 'tpl'}, options: {
      uglify: true,
      datauri: true,
      jsinline: true
    }
  },
  uglify: {plugin: uglify, include: /\.js$/, options: {}}
});


stc.start()
