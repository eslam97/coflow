import notification from '@/services/Notifications/notifications'

export default {
  getUserNotification (_, pageNumber) {
    return new Promise((resolve, reject) => {
      notification.getUserNotification(pageNumber).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getNotificationDetails (_, id) {
    return new Promise((resolve, reject) => {
      notification.serachByPhone(id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllNotificationsSetting (_, { pageNumber }) {
    return new Promise((resolve, reject) => {
      notification.getAllNotificationsSetting(pageNumber).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSpacificNotificationSetting (_, id) {
    return new Promise((resolve, reject) => {
      notification.getSpacificNotificationSetting(id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  editNotifications (_, payload) {
    return new Promise((resolve, reject) => {
      notification.editNotifications(payload.notificationId, payload.data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeNotificationStatus (_, id) {
    return new Promise((resolve, reject) => {
      notification.changeNotificationStatus(id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
