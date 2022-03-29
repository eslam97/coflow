export default {
  getAllTaskCategories: state => {
    return state.allTaskCategories
  },
  getSpacificTaskCategory: state => {
    return state.spacificTaskCategory
  },
  getSelectedCategory: state => {
    return state.selectedCategoryTask
  },
  getSelectedProject: state => {
    return state.selectedProjectTask
  },
  getAllTasks: state => {
    return state.allTasks
  },
  getSpacificTask: state => {
    return state.spacificTask
  }
}
