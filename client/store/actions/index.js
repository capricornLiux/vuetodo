import axios from 'axios'
export const updateCountAsync = function ({commit, state}, data) {
  setTimeout(() => {
    commit('updateCount', data.num)
  }, data.time)
}

export const getMovie = function ({commit, state}) {
  return axios.get('https://api.douban.com//v2/movie/top250').then((res) => {
    // console.log('title')
    // console.log(res)
    // console.log(res.title)
    commit('getMovie', res.title)
  })
}
