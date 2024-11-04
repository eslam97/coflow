import Api from '@/axios'

export default {
  getAllSlots (payload) {
    return Api().get(`calendars?from=${payload.from}&to=${payload.to}`)
  },
  setNewSlot (payload) {
    return Api().post('calendars', payload)
  },
  editSlot (id, payload) {
    return Api().post(`calendars/${id}`, payload)
  },

  updateSettings (payload) {
    return Api().post('calender-setting', payload)
  }
  // getCalendarDetails (id) {
  //   return Api().get(`calendars/${id}`)
  // },
}
