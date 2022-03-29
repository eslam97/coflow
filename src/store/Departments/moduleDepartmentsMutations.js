
export default {
  getAlldepartments (state, payload) {
    state.alldepartments = payload
  },
  getSpacificdepartments (state, payload) {
    state.spacificdepartments = payload
  },
  getUserDepartments (state, payload) {
    state.getUserDepartments = payload
  }
}
