<template>
  <b-row>
    <b-container fluid class="filter">
      <div class="iq-card p-1">
        <div class="row">
          <div class="col-md-3 my-1">
            <input type="text" placeholder="search by project name" class="form-control" v-model="filter.title" @input="filterTable" >
          </div>
          <div class="col-md-3 my-1">
            <select class="form-control" v-model="filter.status" @change="filterTable">
              <option selected disabled value="">select Status...</option>
              <option value="active">active</option>
              <option value="0">disapled</option>
            </select>
          </div>
          <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.title || filter.status">
            <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
          </div>
        </div>
      </div>
    </b-container>
    <b-col lg='12'>
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">All Complains</h4>
        </template>
        <template v-slot:headerAction>
          <b-button v-if='loadingOpenAdd'  variant="primary" disabled>
            <b-spinner small type="grow"></b-spinner>
            openning...
          </b-button>
          <b-button v-else v-b-modal.add_Complain variant="primary" @click="loadData">New Complain</b-button>
          <complainModel  :view="view" :editFlag="editFlag"/>
        </template>
        <template v-slot:body>
          <div v-if="loadTable" class="text-center">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
          <b-table v-else striped responsive :fields="columns" :items="getAllComplains" class="mb-0 table-borderless">
            <template v-slot:cell(is_active)="data3">
              <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                <div class="custom-switch-inner">
                  <input type="checkbox" class="custom-control-input bg-primary" v-model="data3.item.is_active" :id="'customSwitch-11'+data3.item.id"  @change="switchStatus(data3.item.id)" >
                  <label class="custom-control-label" :for="'customSwitch-11'+data3.item.id" data-on-label="on" data-off-label="off">
                  </label>
                </div>
              </div>
            </template>
            <template v-slot:cell(color)="data2">
              <span :style="{ backgroundColor: data2.item.color}" class="rounded-circle colorSpan d-inline-block"></span>

            </template>
            <template v-slot:cell(priority)="data">
              <span v-if="data.item.priority == 'high'" class="bg-amber px-3 py-1 iq-border-radius-5">{{data.item.priority}}</span>
              <span v-if="data.item.priority == 'normal'" class="bg-primary px-3 py-1 iq-border-radius-5">{{data.item.priority}}</span>
              <span v-if="data.item.priority == 'urgent'" class="bg-danger px-3 py-1 iq-border-radius-5">{{data.item.priority}}</span>
            </template>
            <template v-slot:cell(actions)="data1">
              <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="gitData(data1.item.id)"><i class="las la-eye"></i></b-button>
              <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="gitDataToEdit(data1.item.id)" :class="'input_'+data1.item.id"><i class="las la-pen"></i></b-button>
            </template>
          </b-table>
          <b-pagination v-model="currentPage"
                        class="mt-3"
                        :total-rows="total"
                        align="right"
                        :per-page="per_page"
                        aria-controls="my-table"
                        @input="changeContent"
          ></b-pagination>
        </template>
      </iq-card>
    </b-col>
  </b-row>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'
const complainModel = () => import('../../components/complain/complainModal')

export default {
  name: 'complain',
  data () {
    return {
      filter: {
        title: '',
        status: ''
      },
      view: false,
      currentPage: 1,
      per_page: 10,
      total: 6,
      loadingOpenAdd: false,
      loadTable: true,
      modelTitle: 'Add Project',
      editFlag: false,
      switchButton: [],
      deleteId: ''
    }
  },
  computed: {
    ...mapGetters(['getAllComplains']),
    columns () {
      const fields = [
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Phone', key: 'phone', class: 'text-left' },
        { label: 'Project', key: 'project.en_title', class: 'text-left' },
        /* { label: 'Description', key: 'description', class: 'text-left' }, */
        { label: 'Priority', key: 'priority', class: 'text-left' },
        /* { label: 'Assigned To', key: 'users', class: 'text-left' }, */
        /*   { label: 'File', key: 'file', class: 'text-left' }, */
        { label: 'From', key: 'user.name', class: 'text-left' },
        { label: 'Action', key: 'actions', class: 'text-left' }
      ]
      return fields
    }
  },
  methods: {
    resetFilter () {
      this.filter = {
        title: '',
        status: ''
      }
      this.filterTable()
    },
    filterTable () {
      this.loadTable = true
      this.$store.dispatch('getAllComplains', { filterTitle: this.filter.title, filterStatus: this.filter.status }).then(data => {
        this.currentPage = data.data.meta.currentPage
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
        this.loadTable = false
      })
    },
    changeContent () {
      this.loadTable = true
      this.$store.dispatch('getAllComplains', { pageNumber: this.currentPage }).then(() => {
        this.loadTable = false
      })
    },
    switchStatus (id) {
      // console.log(id)
      this.$store.dispatch('changeStatus', id).then(() => {
        core.showSnackbar('success', 'status project has been Edit successfully.')
      })
    },
    loadData () {
      this.loadingOpenAdd = true
      this.editFlag = false
      this.view = false
      this.$bvModal.show('add_Complain')
      this.loadingOpenAdd = false
    },
    gitData (id) {
      this.view = true
      this.$store.dispatch('getSpacificComplain', id).then(res => {
        this.$bvModal.show('add_Complain')
      })
    },
    gitDataToEdit (id) {
      document.getElementsByClassName('input_' + id)[0].innerHTML = '<span class="spinner-grow spinner-grow-sm"></span>'
      this.editFlag = true
      this.$store.dispatch('getSpacificComplain', id).then(res => {
        this.$bvModal.show('add_Complain')
        document.getElementsByClassName('input_' + id)[0].innerHTML = '<span class="las la-pen"></span>'
      })
    },
    setDeleteId (id) {
      this.deleteId = id
      this.$bvModal.show('modal-5')
    },
    deleteProject () {
      this.$store.dispatch('deleteProject', this.deleteId).then(() => {
        this.$bvModal.hide('modal-5')
        core.showSnackbar('success', 'project has been Edit successfully.')
      })
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    complainModel
  },
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    this.$store.dispatch('getAllComplains', { pageNumber: this.currentPage }).then(data => {
      // console.log(data)
      this.currentPage = data.data.meta.currentPage
      this.per_page = data.data.meta.per_page
      this.total = data.data.meta.total
      this.loadTable = false
    })
  }
}
</script>
<style scoped>
.colorSpan{
  width: 20px;
  height: 20px;
}
th{
  white-space: pre !important;
}
td{
  white-space: pre !important;
}
</style>
