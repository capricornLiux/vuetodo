<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="添加一个任务"
            @keyup.enter="handleAdd"
        >

        <!-- 使用item组件 todo列表 -->
        <item
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
            @toggle="toggleTodoState"
        >
        </item>

        <!-- 使用tab组件 底部tab -->
        <Tabs
            :filter="filter"
            :todo="todos"
            @toggle="toggle"
            @clearCompleted="clearCompleted"
            >
        </Tabs>
    </section>
</template>

<script>

import Item from './item.vue'
import Tabs from './tabs.vue'

// 引入vuex的帮助方法
import { mapGetters, mapActions } from 'vuex'

// 事项索引
// let id = 0

export default {
  components: {
    Item,
    Tabs
  },
  data () {
    return {
      // 默认的过滤条件
      filter: 'all'
    }
  },
  mounted () {
    // 调用获取todos的方法
    // 服务端渲染的时候不会运行mounted生命周期钩子
    // this.fetchTodos()

    // 根据store.state中的todos判断是否再次发送请求
    if (this.todos && this.todos.length < 1) {
      // todos为空
      // 发送请求
      console.log('--------------------------------------------------前端请求')
      this.fetchTodos()
    }
  },
  // 声明一个方法, 获取数据, 默认不会被执行
  asyncData ({store, router}) {
    // 因为server端直接调用的db, 没有调用api, 所以没有限制
    console.log('======================store.state')
    console.log(store.state)
    if (store.state.user) {
      // 用户已经登录了
      // 派发一个 action dispatch action
      console.log('+++++++++++++++++++++++')
      return store.dispatch('fetchTodos')
    } else {
      // 没有登录, 进行页面跳转
      router.replace('/login')
      // 没有登录, 使用Promise.resolve()方法, 直接返回一个resolved状态的promise对象
      return Promise.resolve()
    }
  },
  computed: {
    // 使用vuex的getter获取state中的todos
    ...mapGetters([
      'todos'
    ]),
    // 使用计算型属性过滤todo的状态
    filteredTodos () {
      // 根据filter进行判断
      if (this.filter === 'all') {
        // 所有的
        return this.todos
      }

      // 过滤条件是不是所有的
      // filter到这里有可能是 completed / actived
      const isCompleted = this.filter === 'completed'

      // filter, 对数组中的每一项运行给定函数, 返回true的项组成的数组
      return this.todos.filter(function (todo) {
        return todo.completed === isCompleted
      })
    }
  },
  methods: {
    // 将 `this.fetchTodos()` 映射为 `this.$store.dispatch('fetchTodos')`
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteCompleted' // 删除完成的
    ]),

    // 输入框输入内容, 点击回车按钮时调用
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        alert('请输入提醒内容') // eslint-disable-line
      } else {
        // 有输入的内容
        const todo = {
          content,
          completed: false
        }
        // 执行一个action
        this.addTodo(todo)
        e.target.value = ''
      }
    },

    // 切换todo状态
    toggleTodoState (todo) {
      // 执行updateTodo的action
      this.updateTodo({
        id: todo.id,
        // 使用对象的合并方法, 将源对象的所有可枚举属性, 复制到目标对象
        todo: Object.assign({}, todo, {
          completed: !todo.compeleted
        })
      })
    },

    // 切换tab
    toggle (tab) {
      this.filter = tab
    },

    // 清空已完成
    clearCompleted () {
      this.deleteCompleted()
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>


