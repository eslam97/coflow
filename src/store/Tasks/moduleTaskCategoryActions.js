import taskCategoryServices from '@/services/Tasks/tasks'

export default {
  addTaskCategory ({ dispatch }, taskCategoryData) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.addTaskCategory(taskCategoryData).then(res => {
        dispatch('getAllTaskCategories', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllTaskCategories ({ commit }, { pageNumber = 1, filterTitle = '', filterStatus = '' }) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.getAllTaskCategories(pageNumber, filterTitle, filterStatus).then(res => {
        commit('getAllTaskCategories', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  deleteTaskCategory ({ dispatch }, TaskCategoryId) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.deleteTaskCategory(TaskCategoryId).then(res => {
        dispatch('getAllTaskCategories', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editTaskCategory ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0
    return new Promise((resolve, reject) => {
      taskCategoryServices.editTaskCategory(payload.categoryId, payload.newData).then(res => {
        dispatch('getAllTaskCategories', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getSpacificTaskCategory ({ commit }, taskCategoryId) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.getSpacificTaskCategory(taskCategoryId).then(res => {
        commit('getSpacificTaskCategory', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  changeStatusTaskCategory (_, taskCategoryId) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.changeStatusTaskCategory(taskCategoryId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllTasks ({ commit }, { pageNumber = 1, projectId = '', categoryId = '', task = '', priority = '', toUser = '', byUser = '', objectid = '' }) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.getAllTasks(pageNumber, projectId, categoryId, task, priority, toUser, byUser, objectid).then(res => {
        commit('getAllTasks', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getCreateTask (_, projectId) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.getCreateTask(projectId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addNewTask ({ dispatch }, task) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.addNewTask(task).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSpacificTask ({ commit }, taskId) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.getSpacificTask(taskId).then(res => {
        commit('getSpacificTask', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editTaskData (_, { taskId, newTask }) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.editTaskData(taskId, newTask).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  chageTaskStatus (_, taskId) {
    return new Promise((resolve, reject) => {
      taskCategoryServices.chageTaskStatus(taskId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
