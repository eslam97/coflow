export default {
  methods: {
    hasPer: () => true,
    isType: nameOfType => JSON.parse(localStorage.getItem('userInfo')).type === nameOfType,
    isAdmin: nameOfType => JSON.parse(localStorage.getItem('userInfo')).type === 'admin',
    hasServiceType: nameOfType => {
      console.log(JSON.parse(localStorage.getItem('userInfo')).service_types === nameOfType)
      return JSON.parse(localStorage.getItem('userInfo')).service_types === nameOfType
    }
  }
}
