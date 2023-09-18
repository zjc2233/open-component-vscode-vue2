// path-to-your-custom-loader.js
const path = require('path');
const { getOptions } = require('loader-utils');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;




// 初始化打开 vscode 的方法
const initOpenVscode = (loaderContext, source) => {
    // Vue的变量名称
    let vueVariableName = '';
    // 解析 JavaScript 代码为 AST
    const ast = parser.parse(source, {
        sourceType: 'module',
        plugins: ['jsx'],
    });

    // 遍历 AST
    traverse(ast, {
        ImportDeclaration(path) {
            // 检查导入的模块是否为 'vue'
            if (path.node.source.value === 'vue') {
                // 获取导入的 Vue 变量名称
                vueVariableName = path.node.specifiers[0].local.name;
            }
        },
    });
    source = `${source} \n 
    ${vueVariableName}.prototype.$openVscode = function (path) { \n
        window.open( \n
            "vscode://file/" + path, "_self"\n
        );\n
    };\n `
    return source;
}

module.exports = function (source) {
    if (!source) {
        return source;
    }
    const loaderContext = this;
    const resourcePath = loaderContext.resourcePath;
    const fileName = path.basename(resourcePath);

    // 获取option 参数
    const options = getOptions(loaderContext) || loaderContext.getOptions();
    const bindOpenVscodeFile = options.bindOpenVscodeFile || 'main.js';
    // debugger

    // 初始化打开 vscode 的方法
    if (fileName === bindOpenVscodeFile && !source.includes('$openVscode')) {
        source = initOpenVscode(loaderContext, source,)
    }

    return source;
};