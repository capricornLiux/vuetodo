import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <p>字符串拼接: My name is {{firstName + ' ' + lastName}}</p>
      <p>computed: {{name}}</p>
      <p>方法: {{getName()}}</p>
      <p>{{num}}</p>
      <p><input type="text" v-model="num" /></p>
      <p><input type="text" v-model="firstName"/></p>
      <p><input type="text" v-model="lastName"/></p>
      <p>fullName: {{fullName}}</p>
    </div>
  `,
  data: {
    firstName: 'Xin',
    lastName: 'Liu',
    num: 0,
    fullName: ''
  },
  computed: {
    name () {
      console.log('computed')
      return `${this.firstName} ${this.lastName}`
    }
  },
  methods: {
    getName () {
      // 只要data中的数据发生变化, 就会调用, 前提是在dom中调用了
      console.log('methods')
      return `${this.firstName} ${this.lastName}`
    }
  },
  // watch 默认是不会执行的
  watch: {
    // firstName (newValue, oldValue) {
    //   this.fullName = newValue + this.lastName
    // },
    // lastName (newValue, oldValue) {
    //   this.fullName = this.firstName + newValue
    // },
    firstName: {
      handler (newValue, oldValue) {
        this.fullName = newValue + this.lastName
      },
      immediate: true
    }
  }
})
