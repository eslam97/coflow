export default {
  getUserPermissions: state => {
    return state.userPermissions
  },
  getUserAuthPermissions: state => {
    return state.getUserAuthPermissions
  },
  hasPermission: (state) => (name) => {
    if (state.getUserAuthPermissions) {
      return (state.getUserAuthPermissions.indexOf(name) > -1 || state.getUserAuthPermissions.indexOf('super.admin') > -1)
    }
  }
}
