const fs = require('fs');
const path = require('path');
const openVscode = require('../index.js');

// 测试vue组件template标签下面一行是注释的情况
fs.readFile(path.resolve(__dirname, './test1.vue'), 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    // console.log(data);
    openVscode(data)
  }
});
