import Vue from 'vue'

// 声明一个组件
const component = {
  template: `
    <div>
      <input type="text" v-model="text"/>
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  props: {
    active: Boolean,
    propOne: String
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  },
  mounted () {
    console.log('comp mounted')
  }
}

// 再声明一个组件
const component2 = {
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    console.log('comp2 mounted')
  }
}

new Vue({
  el: '#root',
  components: {
    Comp: component2
  },
  template: `<comp></comp>`
})

// 组件比较公用, 有很多配置项, 组件在业务中不需要许多配置项, 需要拓展一些属性, 先extends, 再覆盖一些属性
