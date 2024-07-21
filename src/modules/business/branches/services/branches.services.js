import Api from '@/axios'

export default {
  getAllBranches: () => {
    return Api().get('branches')
  },

  addNewBranch: (payload) => {
    return Api().post('branches', payload)
  },

  getBranchDetails: (id) => {
    return Api().get(`branches/${id}`)
  },

  editBranch: (id, payload) => {
    return Api().post(`branhces/${id}`, payload)
  }
}
