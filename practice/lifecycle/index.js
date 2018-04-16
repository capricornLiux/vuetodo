import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <p>This is {{text}}</p>
      <button @click="btnClick">btn</button>
    </div>
  `,
  data: {
    text: 'hello'
  },

  beforeCreate () {
    // 没有data, 没有el
    console.log(this.$data, this.$el, 'beforeCreate')
  },
  created () {
    // 有data, 没有el
    console.log(this.$data, this.$el, 'created')
  },

  beforeMount () {
    // 有data el还没有被替换
    console.log(this.$data, this.$el, 'beforeMount')
  },
  mounted () {
    // 有data, el被替换
    console.log(this.$data, this.$el, 'mounted')
  },
  beforeUpdate () {
    // data已经改变了
    console.log(this.$data, 'beforeUpdate')
  },
  updated () {
    console.log(this.$data, 'updated')
  },

  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },

  activated () {

  },
  deactivated () {

  },

  render (h) {
    console.log('render')
    return h('div', {}, this.text)
  },

  renderError (h, error) {
    // 当调用render方法出错的时候调用, 线上不会调用
    // 本组件出错的时候才会调用
    return h('div', {}, error.stack)
  },

  errorCaptured () {
    // 可以收集线上错误
    // 子组件中的所有错误都会捕获到
  },
  methods: {
    btnClick () {
      console.log(1)
      this.text = 'world'
    }
  }
})
