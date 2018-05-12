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
    this.fetchTodos()
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
    // addTodo (e) {
    //   // unshift 在数组的前端添加并返回数组的长度
    //   this.todos.unshift({
    //     id: id++, // 事项索引
    //     content: e.target.value, // 事项内容
    //     completed: false // 事项的完成清空, 默认未完成
    //   })
    //   // 清空输入框
    //   e.target.value = ''
    // },
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
        this.addTodo(todo)
        e.target.value = ''
      }
    },

    // 删除事项
    // deleteTodo (para) {
    //   // 返回符合条件的第一个元素的索引位置
    //   let pos = this.todos.findIndex((value, index, arr) => {
    //     return value.id === para
    //   })
    //   this.todos.splice(pos, 1)
    // },

    // 切换todo状态
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.compeleted
        })
      })
    },

    toggle (tab) {
      this.filter = tab
    },
    clearCompleted () {
      // 如果使用splice方法进行删除的话, 删除一个之后后面的顺序就变了, 所以不好
      // this.todos = this.todos.filter(function (todo) {
      //   return todo.completed === false
      // })
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


