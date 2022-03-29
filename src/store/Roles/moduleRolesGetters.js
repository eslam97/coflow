export default {
  getUserRoles: state => {
    return state.userRoles
  },
  getAllRoles: state => {
    return state.allRoles
  },
  getRoleToCreate: state => {
    return state.roleToCreate
  },
  getSpecialRole: state => {
    return state.spacificRole
  }
}
