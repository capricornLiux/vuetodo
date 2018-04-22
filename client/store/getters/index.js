// 可以理解为组件内的computed
export const count = state => state.count
export const addCount = state => {
  return state.count + 'hello'
}

export const movie = state => state.movie
