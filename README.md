### 项目结构
* app.vue
  * header.vue
  * footer.vue
  * todo.vue
    * input 用户输入input
    * item.vue组件, 事项列表
    * tab

---
### vue-loader的配置
* preserveWhitespace
* extractCSS
* cssModules
* postcss
* hotReload

###### vue-style-loader热更新样式

---
### eslint的配置
* 安装依赖

   ```
   eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
   ```
* 配置.eslintrc文件,
  ```
  {
    "extends": "standard"
  }
  ```
* 安装.vue文件的支持插件
  ```
  eslint-plugin-html
  ```

* 配置.eslintrc配置文件
  ```
  {
    "extends": "standard",
    "plugins": [
        "html"
    ]
  }
  ```
* 配置npm脚本
  * ```eslint --ext xxx client/```
  * ```eslint --fix --ext xxx client/```

---
### 每次修改代码的时候都执行hint
* 安装依赖
  * ```eslint-loader babel-eslint```

---
### precommit 代码提交hook
