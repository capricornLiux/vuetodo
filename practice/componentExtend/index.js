import Vue from 'vue'
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
    console.log('obj mounted')
  }
}

// 使用Vue的extend拓展Vue
// 可以认为它是Vue这个类的子类
// 默认的Vue实例没有任何配置, 可以通过new它创建vue实例
const CompVue = Vue.extend(component)

new CompVue({
  el: '#root',
  // 通过propsData传递props
  propsData: {
    propOne: 'zakas'
  },
  // 通过data覆盖data
  data: {
    text: 'nikolas'
  },
  // 生命周期方法都会调用
  mounted () {
    console.log('instance mounted')
  }
})
