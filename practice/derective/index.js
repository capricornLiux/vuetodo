import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <input type="checkbox" v-model="isActived"/>
      <br/>
      <input type="checkbox" :value="1" v-model="arr"/>
      <input type="checkbox" :value="2" v-model="arr"/>
      <input type="checkbox" :value="3" v-model="arr"/>
    </div>
  `,
  data: {
    isActived: false,
    arr: [1, 2, 3]
  }
})
