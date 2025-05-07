import commonServices from '@/modules/business/commonServices'
export const tagMixin = {
  data () {
    return {
      allTags: []
    }
  },
  methods: {
    getAllTags (type = '') {
      commonServices.getFacilityTags(type).then(res => {
        this.allTags = res.data.data
      })
    }
  },
  created () {
    this.getAllTags()
  }
}
