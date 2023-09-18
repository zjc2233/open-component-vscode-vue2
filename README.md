# openComponent-vscode-vue2
#### 介绍
vue2项目通过vscode打开对应的组件文件，快速定位组件文件


#### 安装教程
```
npm install -D openComponent-vscode-vue2
```

#### 使用说明
1.  在vue.config.js中配置openComponent-vscode-vue2的loader
```
// vue.config.js

module.exports = {
  chainWebpack(config) {
    config
      .when(process.env.NODE_ENV === 'development', config => {
        config.module
          .rule('open-vscode')
          .test(/\.vue$/)
          .use('open-vscode')
          .loader('open-component-vscode-vue2/index.js')
          .options({
            // 设置键盘按住 shift 按键，同时鼠标单击页面，实现打开vscode对应的组件文件
            keyWord: 'shift',
          })
          config.module
            .rule('open-vscode-initfn')
            .test(/\.js$/)
            .use('open-vscode-initfn')
            .loader('open-component-vscode-vue2/open-vscode-initfn.js')
            .options({
              // 自定义匹配规则
              resourceQuery: /src\/main\.js/,
              bindOpenVscodeFile: 'main.js',
            })
            .end()
      },
      )
  }
}
```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

