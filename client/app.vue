<template>
    <div id="app">
        <!-- 背景虚化效果 -->
        <div id="cover"></div>

        <!-- 使用Header组件 -->
        <Header></Header>

        <!-- 使用路由占位 -->
        <!-- 添加动画 -->
        <!-- 淡出的组件消失之后进入的组件再进入, 避免dom拥挤错乱 -->
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>

        <!-- 使用Footer组件 -->
        <Footer></Footer>

        <!-- 使用loading组件 -->
        <div id="loading" v-show="loading">
          <loading></loading>
        </div>
    </div>
</template>

<script>
// 导入vuex相关操作的语法糖
import {mapGetters} from 'vuex'

// 引入header
import Header from './layout/header.vue'

// 引入footer
import Footer from './layout/footer.jsx'

// 引入loading
import Loading from './components/loading/loading.vue'

export default {
  // 使用vue-meta处理头信息, 有上下级关系
  metaInfo: {
    title: `lance vue todo`
  },
  components: {
    Header,
    Footer,
    Loading
  },
  computed: {
    // 获取state中存储的loading状态
    ...mapGetters(['loading'])
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.9;
  z-index: -1;
}

#loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
