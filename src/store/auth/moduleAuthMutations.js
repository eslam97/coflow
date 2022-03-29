
export default {
  SAVE_TOKEN (state, payload) {
    state.tokenInfo = payload
  },
  changeAllowMessage (state) {
    state.allowMessage = 'you are not in maxevia!'
  }
}
