<template>
  <div>
    <p>login</p>
    <input type="text">
    <input type="password">
    <p>异步的数据: {{movie}}</p>
    <p>{{firstName}}</p>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'

const fetchInitialData = ({ store, route }) => {
  // console.log('获取的路由数据',route.params.id);
  console.log('dispatch')
  return store.dispatch('getMovie')
}

export default {
  data () {
    return {
      firstName: '含有异步数据的组件'
    }
  },

  asyncData: fetchInitialData,

  mounted () {
    fetchInitialData({ store: this.$store, route: this.$route })
  },
  computed: {
    ...mapGetters([
      'movie'
    ])
  },
  created () {
    console.log('created')
    console.log(this.movie)
  }
}
</script>

<style lang="stylus" scoped>

</style>


