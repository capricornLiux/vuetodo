import Vue from 'vue'
import Vuex from 'vuex'

import state from './state/index'
import mutations from './mutations/index'
import * as getters from './getters/index'
import * as actions from './actions/index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// export default new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     updateCount (state, num) {
//       state.count = num
//     }
//   },
//   strict: debug
// })

// 为了避免SSR内存溢出的问题, 需要导出一个function
export default function () {
  return new Vuex.Store({
    // state: {
    //   count: 0
    // },
    // mutations: {
    //   updateCount (state, num) {
    //     state.count = num
    //   }
    // },
    state,
    mutations,
    getters,
    actions,
    strict: debug
  })
}
