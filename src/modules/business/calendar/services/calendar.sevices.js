import Api from '@/axios'

export default {
  getAllSlots (payload) {
    return Api().get(`calendars?from=${payload.from}&to=${payload.to}`)
  },
  setNewSlot (payload) {
    return Api().post('calendars', payload)
  },
  getScheduleDetails (id) {
    return Api().get(`calendars/${id}`)
  },
  editSchedule (id, payload) {
    return Api().post(`calendars/${id}`, payload)
  }
}
