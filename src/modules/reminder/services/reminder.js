import Api from '@/axios'

export default {
  getAllReminder ({ pageNumber, dateFrom, dateTo }) {
    return Api().get(`reminders?page=${pageNumber}&date_from=${dateFrom}&date_to=${dateTo}`)
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
    return Api().delete(`reminders/${reminderId}`)
  }
}
