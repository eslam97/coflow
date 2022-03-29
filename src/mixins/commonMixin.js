import CommonApi from '@/services/common/index'
export const commonDataMixin = {
  data () {
    return {
    }
  },
  methods: {
    commonUploadFiles (payload) {
      return new Promise((resolve, reject) => {
        CommonApi.commonUploadFiles(payload)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    deleteFiles (id) {
      return new Promise((resolve, reject) => {
        CommonApi.deleteFiles(id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    }
  }
}
