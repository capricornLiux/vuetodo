<template>
  <div class="helper">
      <span class="left">{{unFinishedTodoLength}} items left</span>
      <span class="tabs">
        <span 
            v-for="state in states" 
            :key="state" 
            :class="[filter === state ? 'actived' : '']"
            @click="toggleFilter(state)"
        >
            {{state}}
        </span>
      </span>
      <span class="clear" @click="clearAllCompleted">clear completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todo: {
      type: Array,
      required: true
    }
  },
  // 使用计算型属性
  computed: {
    unFinishedTodoLength () {
      // 数组的filter方法, 返回符合函数条件的数组
      return this.todo.filter(function (todo) {
        return todo.completed === false
      }).length
    }
  },
  data () {
    return {
      states: [
        'all',
        'active',
        'completed'
      ]
    }
  },
  methods: {
    clearAllCompleted () {
      this.$emit('clearCompleted')
    },
    toggleFilter (tab) {
      this.$emit('toggle', tab)
    }
  }
}
</script>

<style lang="stylus" scoped>
.helper{
  font-weight 100
  display flex
  justify-content space-between
  padding 5px 0
  line-height 30px
  background-color #fff
  font-size 14px
  font-smoothing: antialiased
}
.left, .clear, .tabs{
  padding 0 10px
  box-sizing border-box
}
.left, .clear{
  width 150px
}
.left{
  text-align left
}
.clear{
  text-align right
  cursor pointer
}
.tabs{
  width 200px
  display flex
  justify-content space-around
  * {
    display inline-block
    padding 0 10px
    cursor pointer
    border 1px solid rgba(175,47,47,0)
    &.actived{
      border-color rgba(175,47,47,0.4)
      border-radius 5px
    }
  }
}
</style>

