import Api from '@/axios'

export default {
  saveStepAdmin (payload) {
    return Api().post('step-admin', payload)
  },
  saveStepFacility (payload) {
    return Api().post('step-facility', payload)
  },
  uploadProviderImage (payload, config) {
    return Api().post('provider-image', payload, config)
  },
  saveStepLocationBased (payload) {
    return Api().post('step-location-based', payload)
  },
  saveStepLocationRemote (payload) {
    return Api().post('step-location-remote', payload)
  },
  saveStepOperation (payload) {
    return Api().post('step-operation', payload)
  }
}
