import Vue from 'vue'
new Vue({
  el: '#root',
  // template: `
  //   <div>
  //     {{isActived ? 'active': 'not active'}}
  //   </div>
  // `,

  // template: `
  //   <div :class="{ active: isActived }">
  //     {{isActived ? 'active': 'not active'}}
  //   </div>
  // `,

  // template: `
  // <div :class="[isActived ? 'active' : '']">
  //   {{isActived ? 'active': 'not active'}}
  // </div>
  // `,

  template: `
  <div :class="[{ active: isActived }, { title: isTitle}]">
    {{isActived ? 'active': 'not active'}}
  </div>
  `,
  data: {
    isActived: true,
    isTitle: true
    // vue在{{}} 模板中能访问的: data中的, 还有一些白名单(一些全局对象), 比如new Data()

    // v-html
    // v-bind
    // v-on
  }
})
