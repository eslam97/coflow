import Api from '@/axios'

export default {
  saveStepAdmin (payload) {
    return Api().post('step-admin', payload)
  },
  saveStepFacility (payload) {
    return Api().post('step-facility', payload)
  },
  uploadProviderImage (payload, config) {
    return Api().post('new-media', payload, config)
  },
  removeProviderImage (id) {
    return Api().get(`remove-media/${id}`)
  },
  saveStepLocationBased (payload) {
    return Api().post('step-location-based', payload)
  },
  saveStepLocationRemote (payload) {
    return Api().post('step-location-remote', payload)
  },
  saveStepOperation (payload) {
    return Api().post('step-operation', payload)
  },
  getProfileDetails (id) {
    return Api().get(`providers/${id}`)
  },
  getInTouch (payload) {
    return Api().post('get-in-touch', payload)
  }
}
