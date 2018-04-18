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

---
### vue-router
* vue-router默认只用哈希路由 ```http://0.0.0.0:9000/#/```
* 使用```<router-view></router-view>```组件占位
* 从定向
  ```javascript
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo
  },
  ```

* 哈希路由很多情况下使用来**定位**使用的, 而且做**SSR**也不希望这种路由, 也不利于SEO
  ```javascript
  export default () => {
    return new Router({
      // 使用history模式
      mode: 'history',
      routes
    })
  }
  ```

* ```base``` 应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"
  ```javascript
  export default () => {
    return new Router({
      // 使用history模式
      mode: 'history',
      // base: '/base/', // 基地址
      routes
    })
  }
  ```

* ```linkActiveClass``` ```<router-link>``` 标签内部渲染的是a标签, 利于SEO, 给a标签添加了事件, 变成前端路由跳转
* ```linkExactActiveClass```
* 输入地址回车404的问题, 因为**使用history模式的路由, 请求的时候需要服务端的处理, 而webpack没有做地址的映射, 所以显示404**, 通过webpack-dev-server的 ```historyApiFallback: true```解决
* scrollBehavior
* parseQuery
* stringifyQuery
* fallback
---
### 路由的参数传递

---
### 路由守卫

---
### Vuex
* 集成
  * store
    * index.js
      ```javascript
      import Vue from 'vue'
      import Vuex from 'vuex'

      Vue.use(Vuex)

      const debug = process.env.NODE_ENV !== 'production'

      export default new Vuex.Store({
        state: {
          count: 0
        },
        mutations: {
          updateCount (state, num) {
            state.count = num
          }
        },
        strict: debug
      })
      ```
  * index.js
    ```javascript
    // ...

    // 导入store
    import store from './store/index'

    new Vue({
      router,
      // 使用store
      store,
      render: (h) => h(App)
    }).$mount('#root')
    ```
  * 组件中
    ```javascript
    computed: {
      count () {
        return this.$store.state.count
      }
    },
    // 测试vuex的commit
    fixCount () {
      // 通过commit调用一个mutation
      this.$store.commit('updateCount', 2)
    },
    ```

---
### SSR与Vuex
* 为了避免SSR内存溢出的问题, 需要导出一个function
```javascript
export default function () {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      updateCount (state, num) {
        state.count = num
      }
    },
    strict: debug
  })
}
```

---
### 分离
* 在vuex.store的创建中, 分离state和mutations
* 创建getters, 不直接访问state, 通过getters访问state

```javascript
const state = {
  count: 0
}

export default state
```

```javascript
const mutations = {
  updateCount (state, num) {
    state.count = num
  }
}

export default mutations
```

```javascript

// 可以理解为组件内的computed
export const count = state => state.count

```

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state/index'
import mutations from './mutations/index'
import * as getters from './getters/index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


// 为了避免SSR内存溢出的问题, 需要导出一个function
export default function () {
  return new Vuex.Store({
    state,
    mutations,
    getters,
    strict: debug
  })
}

```

```javascript
computed: {
  // count () {
  //   return this.$store.state.count
  // }

  // 使用getters
  count () {
    return this.$store.getters.count
  }
},
```
---
### vuex的语法糖
* mapState
* mapGetters

---
### mutations和actions

* mutation只有一个参数payload, 如果传递多个值的时候, 可以使用对象, 在mutation具体方法中使用解构使用
* 修改state中的数据的时候, 要通过mutation进行修改, 也可以直接修改, 但是不推荐
* 创建vuex.store的时候可以指定 ```strict``` 控制, **但是生产环境下不要使用, 因为会深度检测状态树, 影响性能**
