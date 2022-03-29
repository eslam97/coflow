<template>
  <b-row>
    <b-modal id="model-fromDelete" size="md" title="Remove Role" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">Are you sure you want to delete this From? </p>
      <div class="d-flex justify-content-end">
        <b-button variant="danger" @click="deleteRole">Delete From</b-button>
      </div>
    </b-modal>
    <b-container fluid class="filter">
      <div class="iq-card p-1">
        <div class="row">
          <div class="col-md-3 my-1">
            <input type="text" placeholder="search by Lead name" class="form-control" v-model="filter.title" @input="filterTable" >
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
    <b-col lg="12">
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">Lead From</h4>
        </template>
        <template v-slot:headerAction>
          <b-button v-if='loadingOpenAdd'  variant="primary" disabled>
            <b-spinner small type="grow"></b-spinner>
            openning...
          </b-button>
          <b-button v-else variant="primary" @click="loadData">Add From</b-button>
          <b-modal id="modal-leadfrom" size="lg"  :title="modelTitle" hide-footer no-close-on-backdrop>
            <lead-from :edit="editFlag"/>
          </b-modal>
        </template>
        <template v-slot:body>
          <div v-if="loadTable" class="text-center">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
          <b-table v-else striped responsive :fields="columns" :items="getLeadFrom" class="mb-0 table-borderless">
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
            <template v-slot:cell(actions)="data1">
              <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="gitDataToEdit(data1.item.id)" :class="'input_'+data1.item.id">
                <i class="ri-ball-pen-fill m-0"></i>
              </b-button>
              <b-button variant=" iq-bg-danger" size="sm" @click="setDeleteId(data1.item.id)"><i class="ri-delete-bin-line m-0"  ></i></b-button>
            </template>
          </b-table>
          <div class="d-flex justify-content-end align-items-end">
            <b-pagination v-model="currentPage"
                          class="mt-3"
                          :total-rows="total"
                          align="right"
                          :per-page="per_page"
                          aria-controls="my-table"
                          @input="changeContent"
            ></b-pagination>
          </div>
        </template>
      </iq-card>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from 'vuex'
import { core } from '../../config/pluginInit'
// eslint-disable-next-line no-unused-vars
const leadFrom = () => import('../../components/leads/leadFrom')

export default {
  name: 'settingsleadsFrom',
  created () {
    this.loadTable = true
    this.$store.dispatch('getLeadFrom', { pageNumber: this.currentPage }).then(data => {
      this.loadTable = false
      this.currentPage = data.data.meta.currentPage
      this.per_page = data.data.meta.per_page
      this.total = data.data.meta.total
    })
  },
  data () {
    return {
      filter: {
        title: '',
        status: ''
      },
      currentPage: 1,
      per_page: 10,
      total: 6,
      modelTitle: 'Add Load',
      loadingOpenAdd: false,
      loadTable: true,
      editFlag: false,
      switchButton: [],
      deleteId: '',
      columns: [
        { label: 'Title', key: 'title', class: 'text-left' },
        { label: 'Colors', key: 'color', class: 'text-left' },
        { label: 'Is Active', key: 'is_active', class: 'text-left' },
        { label: 'Actions', key: 'actions', class: 'text-left' }
      ]
    }
  },
  computed: {
    ...mapGetters(['getLeadFrom'])
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
      this.$store.dispatch('getLeadFrom', { filterTitle: this.filter.title, filterStatus: this.filter.status }).then(data => {
        this.currentPage = data.data.meta.currentPage
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
        this.loadTable = false
      })
    },
    switchStatus (id) {
      this.$store.dispatch('changeStatusFrom', id).then(() => {
        core.showSnackbar('success', 'status From has been Edit successfully.')
      })
    },
    changeContent () {
      this.loadTable = true
      this.$store.dispatch('getLeadFrom', { pageNumber: this.currentPage })
      this.loadTable = false
    },
    loadData () {
      this.loadingOpenAdd = true
      this.editFlag = false
      this.modelTitle = 'Add From'
      this.$store.dispatch('roleToCreate').then(() => {
        this.$bvModal.show('modal-leadfrom')
        this.loadingOpenAdd = false
      })
    },
    gitDataToEdit (id) {
      document.getElementsByClassName('input_' + id)[0].innerHTML = '<span class="spinner-grow spinner-grow-sm"></span>'
      this.editFlag = true
      this.modelTitle = 'Edit From'
      this.$store.dispatch('getSpacificFrom', id).then(() => {
        this.$bvModal.show('modal-leadfrom')
        document.getElementsByClassName('input_' + id)[0].innerHTML = ' <i class="ri-ball-pen-fill m-0"></i>'
      })
    },
    setDeleteId (id) {
      this.deleteId = id
      this.$bvModal.show('model-fromDelete')
    },
    deleteRole () {
      this.$store.dispatch('deleteSpacificLeadFrom', this.deleteId).then(() => {
        this.$bvModal.hide('model-fromDelete')
        core.showSnackbar('success', 'leadFrom has been deleted successfully.')
      })
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components,no-undef
    leadFrom
  }
}

</script>
<style>

.colorSpan{
  width: 20px;
  height: 20px;
}
[dir=ltr][mode=light] .nav-tabs {
  background: #fff !important;
  border-radius: 10px !important;
}
</style>
