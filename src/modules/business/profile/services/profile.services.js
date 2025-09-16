import Api from '@/axios'

export default {
  getProfileData () {
    return Api().get('profile')
  },
  changeStatus (payload) {
    return Api().post('update-status', payload)
  },
  updateProfile (payload) {
    return Api().post('account-update', payload)
  },
  addImage (payload) {
    return Api().post('new-media', payload)
  },
  removeImage (id) {
    return Api().get(`remove-media/${id}`)
  },
  changePassword (payload) {
    return Api().post('change-password', payload)
  },

  addTeamMember (payload) {
    return Api().post('teams', payload)
  },
  editTeamMember (id, payload) {
    return Api().post(`teams/${id}`, payload)
  },

  getSubscribe () {
    return Api().get('subscriptions')
  },
  startTrialSubscription () {
    return Api().get('trial-subscribe')
  },
  editCustomerPurchase (payload) {
    return Api().post('customer-purchase', payload)
  }
}
