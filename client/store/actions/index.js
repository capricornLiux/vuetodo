export const updateCountAsync = function ({commit, state}, data) {
  setTimeout(() => {
    commit('updateCount', data.num)
  }, data.time)
}
