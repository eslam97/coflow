
export default {
  SAVE_USER_DATA (state, payload) {
    state.userData = payload
  },
  getAllUser (state, payload) {
    state.allUser = payload
  },
  getSpacificUser (state, payload) {
    state.spacificUser = payload
  }
}
