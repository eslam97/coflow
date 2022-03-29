
export default {
  getAllTaskCategories (state, payload) {
    state.allTaskCategories = payload
  },
  getSpacificTaskCategory (state, payload) {
    state.spacificTaskCategory = payload
  },
  changeSelectedCategory (state, payload) {
    state.selectedCategoryTask = payload
  },
  changeSelectedProject (state, payload) {
    state.selectedProjectTask = payload
  },
  getAllTasks (state, payload) {
    state.allTasks = payload
  },
  getSpacificTask (state, payload) {
    state.spacificTask = payload
  }
}
