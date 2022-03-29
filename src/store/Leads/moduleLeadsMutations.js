
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
  }
}
