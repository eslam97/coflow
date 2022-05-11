import Api from '@/axios'

export default {
  // profile
  getProfileSettings () {
    return Api().get('settings')
  },
  updateProfileSettings (payload) {
    return Api().post('settings', payload)
  },

  // Activity Line
  getAllActivityLine () {
    return Api().get('activityLines')
  },
  addNewActivityLine (payload) {
    return Api().post('activityLines', payload)
  },

  // Activity Type
  getAllActivityType () {
    return Api().get('activityTypes')
  },
  addNewActivityType (payload) {
    return Api().post('activityTypes', payload)
  },

  // Durations
  addNewDurationList (payload) {
    return Api().post('durationLists', payload)
  },

  // Nationalities
  getAllnationalities () {
    return Api().get('nationalities')
  },
  addNewNationality (payload) {
    return Api().post('nationalities', payload)
  },

  // Accommodation Types
  getAllAccommodationTypes () {
    return Api().get('accommodationTypes')
  },
  addNewAccommodationType (payload) {
    return Api().post('accommodationTypes', payload)
  },

  // Link
  getAllLinks () {
    return Api().get('links')
  },
  addNewLink (payload) {
    return Api().post('links', payload)
  },

  // Language
  getAllLanguages () {
    return Api().get('languages')
  },
  addNewLanguage (payload) {
    return Api().post('languages', payload)
  },

  // Countries
  getAllCountries () {
    return Api().get('countries')
  },
  getCountryCity (countryId) {
    return Api().get(`countries/${countryId}`)
  },
  addNewCountry (payload) {
    return Api().post('countries', payload)
  },

  // Cities
  getAllCities () {
    return Api().get('cities')
  },
  addNewCity (payload) {
    return Api().post('cities', payload)
  },

  // Cities
  getAllAreas () {
    return Api().get('areas')
  },
  addNewArea (payload) {
    return Api().post('areas', payload)
  }
}
