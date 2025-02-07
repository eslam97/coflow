import commonServices from '@/modules/business/commonServices'
export const folderMixin = {
  data () {
    return {
      allFolders: []
    }
  },
  methods: {
    getAllFolders () {
      commonServices.getAllFolders().then(res => {
        this.allFolders = res.data.data
      })
    }
  },
  created () {
    this.getAllFolders()
  }
}
