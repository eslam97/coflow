
export default {
  getUserProjects (state, payload) {
    state.userProjects = payload
  },
  getAllProject (state, payload) {
    state.allProjects = payload
  },
  getSpacificProject (state, payload) {
    state.spacificProject = payload
  }
}
