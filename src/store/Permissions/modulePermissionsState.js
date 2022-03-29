export default {
  userPermissions: localStorage.getItem('user_permissions') || {},
  getUserAuthPermissions: localStorage.getItem('auth_permissions') || {}
}
