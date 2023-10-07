const { getOptions } = require('loader-utils');

// 原始的dom
const originDomList = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
];


module.exports = function (source) {
  if (!source) {
    return source;
  }
  const loaderContext = this;
  let resourcePath = loaderContext.resourcePath || '';
  resourcePath = resourcePath.replace(/\\/g, '/')

  // 获取option 参数
  const options = getOptions(loaderContext) || loaderContext.getOptions();
  const keyWord = options.keyWord || 'shift';


  // 在源代码中匹配到组件的最外层标签
  const regex = /<template>([\s\S]*)<\/template>/;
  const matches = source.match(regex);
  // 如果匹配到了，说明是组件，外层去绑定点击事件
  if (matches && matches.length > 1) {
    const templateCode = matches[1];
    // 判断template下第一个元素是否合适的dom
    let isPreDom = false
    let preDom  // 暂存最外层的dom，后期用来替换代码使用
    let transformedTemplate = templateCode

    // 判断是否是合适的dom
    isPreDom = originDomList.some((item) => {
      if (templateCode.startsWith(`<${item} `)) {
        preDom = `<${item} `
        return true
      }
    })

    // 如果没有pre的dom，就在最外层添加一个div
    if (!isPreDom) {
      transformedTemplate = `<div @click.${keyWord}.stop="$openVscode('${resourcePath}')">${transformedTemplate}</div>`
    } else {
      transformedTemplate = templateCode.replace(
        /^((\s*)<)([0-9a-zA-Z\-]*)/g, () => {
          return `${preDom} @click.${keyWord}.stop="$openVscode('${resourcePath}')"`
        }
      );
    }
    // 替换源代码中的模板部分
    source = source.replace(templateCode, transformedTemplate);
  }
  return source;
};
