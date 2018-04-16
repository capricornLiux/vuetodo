import Vue from 'vue'
const compoennt = {
  props: ['value'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value"/>
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('emitInput', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: compoennt
  },
  el: '#root',
  template: `
    <div>
      <comp-one :value="value" @emitInput="value = arguments[0]"></comp-one>
    </div>
  `,
  data () {
    return {
      value: 123
    }
  }
})
