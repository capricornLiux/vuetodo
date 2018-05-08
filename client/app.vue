<template>
    <div id="app">
        <!-- 背景虚化效果 -->
        <div id="cover"></div>
        <!-- 使用Header组件 -->
        <Header></Header>

        <!-- 使用todo组件 -->
        <!-- <Todo></Todo> -->
        <!-- 使用路由站位 -->
        <router-view></router-view>

        <!-- 使用Footer组件 -->
        <Footer></Footer>
    </div>
</template>

<script>

// 引入header
import Header from './layout/header.vue'
// 引入footer
import Footer from './layout/footer.jsx'
// 引入todo
import Todo from './views/todo/todo.vue'

export default {
  // 使用vue-meta处理头信息, 有上下级关系
  metaInfo: {
    title: `lance vue todo`
  },
  components: {
    Header,
    Footer,
    Todo
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>

