export default {
  methods: {
    hasPer: () => true,
    isType: nameOfType => JSON.parse(localStorage.getItem('userInfo')).type.toLowerCase() === nameOfType.toLowerCase(),
    isAdmin: nameOfType => JSON.parse(localStorage.getItem('userInfo')).type === 'admin',
    hasServiceType: nameOfType => {
      console.log(JSON.parse(localStorage.getItem('userInfo')).service_types.toLowerCase())
      console.log(nameOfType.toLowerCase())
      return JSON.parse(localStorage.getItem('userInfo')).service_types.toLowerCase() === nameOfType.toLowerCase()
    }
  }
}
