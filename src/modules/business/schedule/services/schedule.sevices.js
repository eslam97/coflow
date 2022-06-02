import Api from '@/axios'

export default {
  getAllSlots () {
    return Api().get('schedules')
  },
  setNewSlot (payload) {
    return Api().post('schedules', payload)
  },
  getScheduleDetails (id) {
    return Api().get(`schedules/${id}`)
  },
  editSchedule (id, payload) {
    return Api().post(`schedules/${id}`, payload)
  }
}
