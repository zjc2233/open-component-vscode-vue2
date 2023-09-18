const { getOptions } = require('loader-utils');


module.exports = function (source) {
  if (!source) {
    return source;
  }
  // return source
  const loaderContext = this;
  const resourcePath = loaderContext.resourcePath;

  // 获取option 参数
  const options = getOptions(loaderContext) || loaderContext.getOptions();
  const keyWord = options.keyWord || 'shift';


  // 在源代码中匹配到组件的最外层标签
  const regex = /<template>([\s\S]*)<\/template>/;
  const matches = source.match(regex);

  // 如果匹配到了，说明是组件，外层去绑定点击事件
  if (matches && matches.length > 1) {
    const templateCode = matches[1];
    // 给最外层标签添加点击事件
    const transformedTemplate = templateCode.replace(
      /^((\s*)<)([0-9a-zA-Z\-]*)/g,
      `<$3 @click.${keyWord}.stop="$openVscode('${resourcePath}')"`
    );

    // 替换源代码中的模板部分
    source = source.replace(templateCode, transformedTemplate);
  }
  return source;
};
