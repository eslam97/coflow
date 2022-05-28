import Api from '@/axios'

export default {
  addNewCourses (payload) {
    return Api().post('courses', payload)
  },
  getCoursesDetails (id) {
    return Api().get(`courses/${id}`)
  },
  editCourses (id, payload) {
    return Api().post(`courses/${id}`, payload)
  }
}
