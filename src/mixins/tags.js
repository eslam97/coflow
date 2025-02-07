import commonServices from '@/modules/business/commonServices'
export const tagMixin = {
  data () {
    return {
      allTags: []
    }
  },
  methods: {
    getAllTags () {
      commonServices.getFacilityTags().then(res => {
        this.allTags = res.data.data
      })
    }
  },
  created () {
    this.getAllTags()
  }
}
