
export default {
  getUserRoles (state, payload) {
    state.userRoles = payload
  },
  getAllRoles (state, payload) {
    state.allRoles = payload
  },
  getSpacificRole (state, payload) {
    state.spacificRole = payload
  },
  roleToCreate (state, payload) {
    state.roleToCreate = payload
  }
}
