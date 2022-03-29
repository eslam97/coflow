
export default {
  getUserPermissions (state, payload) {
    state.userPermissions = payload
  },
  getUserAuthPermissions (state, payload) {
    state.getUserAuthPermissions = payload
  }
}
