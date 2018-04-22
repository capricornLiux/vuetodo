import axios from 'axios'
export const updateCountAsync = function ({commit, state}, data) {
  setTimeout(() => {
    commit('updateCount', data.num)
  }, data.time)
}

export const getMovie = function ({commit, state}) {
  return axios.get('http://localhost:4444').then((res) => {
    console.log('title')
    commit('getMovie', res.data.name)
  })
}
