
export default {
  getAllLeads (state, payload) {
    state.allLeads = payload
  },
  getSpacificLead (state, payload) {
    state.spacificLead = payload
  },
  getLeadFrom (state, payload) {
    state.leadFrom = payload
  },
  getSpacificFrom (state, payload) {
    state.getSpacificFrom = payload
  },
  getInfoToCreateLead (state, payload) {
    state.getInfoToCreateLead = payload
  },
  getSpacificshift_times (state, payload) {
    // console.log('payload', payload)
    state.getSpacificshift_times = payload
  },
  getAllshift_times (state, payload) {
    state.getAllshift_times = payload
  },
  getAllPackageOrService (state, payload) {
    state.getAllPackageOrService = payload
  }
}
