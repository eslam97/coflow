import Api from '@/axios'

export default {
  getUserNotification (pageNumber) {
    return Api().get(`notifications?page=${pageNumber}`)
  },
  getNotificationDetails (id) {
    return Api().get(`notifications/${id}`)
  },
  getAllNotificationsSetting (pageNumber) {
    return Api().get(`notifications/settings?page=${pageNumber}`)
  },
  getSpacificNotificationSetting (id) {
    return Api().get(`notifications/settings/${id}`)
  },
  editNotifications (id, data) {
    return Api().post(`notifications/settings/${id}`, data)
  },
  changeNotificationStatus (id) {
    return Api().patch(`notifications/status/${id}`)
  }
}
