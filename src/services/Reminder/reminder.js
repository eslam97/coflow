import Api from '@/axios'

export default {
  getAllReminder (pageNumber) {
    return Api().get(`reminders?page=${pageNumber}`)
  },
  setSalesReminder (data) {
    return Api().post('reminders/sales/store', data)
  },
  setReminder (data) {
    return Api().post('reminders/store', data)
  },
  getReminderData (reminderId) {
    return Api().post(`reminders/${reminderId}`)
  },
  deleteReminder (reminderId) {
    return Api().delete(`reminderId/${reminderId}`)
  }
}
