<template>
  <div>
    <p>login</p>
    <input type="text">
    <input type="password">
    <p>{{movie}}</p>
    <p>{{firstName}}</p>
  </div>

</template>

<script>
import {mapState} from 'vuex'

const fetchInitialData = ({ store, route }) => {
  // console.log('获取的路由数据',route.params.id);
  return store.dispatch('getMovie')
}

export default {
  data () {
    return {
      firstName: '2'
    }
  },

  asyncData: fetchInitialData,

  computed: {
    ...mapState(['movie']),
  },
}
</script>

<style lang="stylus" scoped>

</style>


