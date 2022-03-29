import systemSetting from '@/services/systemSetting/systemSetting'

export default {
  getSettings () {
    return new Promise((resolve, reject) => {
      systemSetting.getSettings().then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  saveChangeSettings (_, { type, value }) {
    return new Promise((resolve, reject) => {
      systemSetting.saveChangeSettings(type, value).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  }
}
