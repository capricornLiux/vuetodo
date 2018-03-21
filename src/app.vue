<template>
    <div id="app">
        <!-- 背景虚化效果 -->
        <div id="cover"></div>
        <!-- 使用Header组件 -->
        <Header></Header>

        <!-- 使用todo组件 -->
        <Todo></Todo>

        <!-- 使用Footer组件 -->
        <Footer></Footer>
    </div>
</template>

<script>

// 引入header
import Header from './todo/header.vue';
// 引入footer
import Footer from './todo/footer.jsx';
// 引入todo
import Todo from './todo/todo.vue';

export default {
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

