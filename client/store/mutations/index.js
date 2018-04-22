const mutations = {
  updateCount (state, num) {
    state.count = num
  },
  getMovie (state, title) {
    state.movie = title
  }
}

export default mutations
