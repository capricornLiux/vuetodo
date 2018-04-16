import Vue from 'vue'

// const data = {
//   name: 'Rose'
// }

/**
 *     <p>component</p>
    <span>{{name}}</span>
 */
const component = {
  props: {
    active: {
      type: Boolean,
      required: true
    },
    propOne: {
      type: String
    },
    onChange: {
      type: Function
    }
  },
  template: `
  <div>
    <input type="text" v-model="name" />
    <p v-show="active">see me if active</p>
    <p>{{propOne}}</p>
    <button @click="onChange">btn</button>
  </div>
  `,
  data () {
    return {
      name: 'Jack'
    }

    // 这种写法会导致数据共享
    // return data
  }
}

// 定义全局组件
// 定义组件推荐大写, 驼峰命名法
// Vue.component('CompOne', component)

new Vue({
  el: '#root',
  template: `
    <div>

      <comp-one :active="true" :prop-one="text" :on-change="change"></comp-one>

    </div>
  `,
  components: {
    CompOne: component
  },
  data: {
    text: 'hello'
  },
  methods: {
    change () {
      this.text = 'world'
    }
  }
})
// <p>hello world</p>
// <comp-one :active="false"></comp-one>
