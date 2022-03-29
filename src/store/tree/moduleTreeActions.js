import treeServices from '@/services/Tree/tree'

export default {
  getTree ({ commit }) {
    return new Promise((resolve, reject) => {
      treeServices.getTree().then(res => {
        commit('getTree', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
