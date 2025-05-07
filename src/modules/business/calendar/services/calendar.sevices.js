import Api from '@/axios'

export default {
  getAllSlots (payload) {
    return Api().get(`calendars?from=${payload.from}&to=${payload.to}`)
  },
  getCalendarDetails (id) {
    return Api().get(`calendars/${id}`)
  },
  setNewSlot (payload) {
    return Api().post('calendars', payload)
  },
  editCalendar (id, payload) {
    return Api().post(`calendars/${id}`, payload)
  },
  getSettings () {
    return Api().get('calender-setting')
  },
  updateSettings (payload) {
    return Api().post('calender-setting', payload)
  },
  clearCalendar (payload) {
    return Api().post('calender-clear', payload)
  },
  loadSchedule (payload) {
    return Api().post('calender-loadSchedule', payload)
  },

  getAllServicesLimit () {
    return Api().get('services?limit=1000&type=flow')
  },
  calenderReservation (payload) {
    return Api().post('calender-reservation', payload)
  }
}
