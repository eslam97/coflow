export default {
  methods: {
    hasPer: () => true,
    isType: nameOfType => JSON.parse(localStorage.getItem('userInfo')).type.toLowerCase() === nameOfType.toLowerCase(),
    isAdmin: nameOfType => JSON.parse(localStorage.getItem('userInfo')).type === 'admin',
    hasServiceType: nameOfType => {
      if (JSON.parse(localStorage.getItem('userInfo')).service_types) {
        return JSON.parse(localStorage.getItem('userInfo')).service_types.toLowerCase() === nameOfType.toLowerCase()
      } else {
        return true
      }
    }
  }
}
