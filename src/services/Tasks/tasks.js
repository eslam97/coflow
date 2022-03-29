import Api from '@/axios'

export default {
  addTaskCategory (TaskCategoryData) {
    return Api().post('tasks/categories/store', TaskCategoryData)
  },
  getAllTaskCategories (pageNumber, filterTitle, filterStatus) {
    return Api().get(`tasks/categories?page=${pageNumber}&title=${filterTitle}&status=${filterStatus}`)
  },
  getSpacificTaskCategory (TaskCategoryId) {
    return Api().get(`tasks/categories/${TaskCategoryId}`)
  },
  editTaskCategory (TaskCategoryId, newData) {
    return Api().post(`tasks/categories/${TaskCategoryId}`, newData)
  },
  deleteTaskCategory (TaskCategoryId) {
    return Api().delete(`tasks/categories/${TaskCategoryId}`)
  },
  changeStatusTaskCategory (TaskCategoryId) {
    return Api().patch(`tasks/categories/status/${TaskCategoryId}`)
  },
  getAllTasks (pageNumber, projectId, categoryId, task, priority, toUser, byUser, objectid) {
    return Api().get(`tasks?page=${pageNumber}&project_id=${projectId}&category_id=${categoryId}&task=${task}&priority=${priority}&by_user_id=${byUser}&to_user_id=${toUser}&object_id=${objectid}`)
  },
  getCreateTask (projectId) {
    return Api().get(`tasks/create/${projectId}`)
  },
  addNewTask (task) {
    return Api().post('tasks/store', task)
  },
  getSpacificTask (taksId) {
    return Api().get(`tasks/${taksId}`)
  },
  editTaskData (taskId, newData) {
    return Api().post(`tasks/${taskId}`, newData)
  },
  chageTaskStatus (taskId) {
    return Api().patch(`tasks/status/${taskId}`)
  }
}
