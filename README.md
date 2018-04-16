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

---
### vue的生命周期

---
### vue的数据绑定
* 绑定动态class的三种写法
  * 对象写法
  ```html
  <div :class="{ active: isActived }">
  </div>
  ```

  * 数组写法
  ```html
  <div :class="[isActived ? 'active' : '']">
  </div>
  ```

  * 对象数组
  ```html
  <div :class="[{ active: isActived }, { title: isTitle}]">

  </div>
  ```
---
### 计算型属性和watch

---
### 指令
* v-text
* v-html
* v-show
* v-if
* v-else-if
* v-else
* v-for **(:key一般使用唯一的值, 不要使用index, 可能导致错误的缓存)**
  * 数组 ```(item, index) in arr```
  * 对象 ```(value, key, index) in obj```

* v-model
  * input checkbox
  * input radio

  * v-model.trim
  * v-model.number
  * v-model.lazy 绑定onchange事件, 不是input事件

* v-pre 不解析{{}} 表达式
* v-cloak 解决模板视图显示的问题
* v-once 只绑定一次

---
### 组件的定义
* 定义全局组件
* 定义组件推荐大写, 驼峰命名法
* data以函数的形式返回一个临时的对象
* props的驼峰命名法, 子组件中定义的时候使用驼峰命名法, 父组件传递的时候使用小写+-
* 子组件中不要修改props属性的值
  * 子组件中定义props一个事件

