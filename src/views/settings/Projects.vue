<template>
    <b-row>
      <b-modal id="modal-5" size="md" title="Remove Branch" hide-footer no-close-on-backdrop>
        <p class="font-size-18 text-black">Are you sure you want to delete this Branch? </p>
        <div class="d-flex justify-content-end">
          <b-button variant="danger" @click="deleteProject">Delete Branch</b-button>
        </div>
      </b-modal>
      <b-container fluid class="filter">
        <div class="iq-card p-1">
          <div class="row">
            <div class="col-md-3 my-1">
              <input type="text" placeholder="search by branch name" class="form-control" v-model="filter.title" @input="filterTable" >
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
            <h4 class="card-title">{{ $t('dashboard2.listProjects')}}</h4>
          </template>
          <template v-slot:headerAction>
            <b-button v-if='loadingOpenAdd'  variant="primary" disabled>
              <b-spinner small type="grow"></b-spinner>
              openning...
            </b-button>
            <b-button v-else v-b-modal.modal-4 variant="primary" @click="loadData">Add Branch</b-button>
            <b-modal id="modal-4" size="lg"  :title="modelTitle" hide-footer no-close-on-backdrop>
              <add-project-modal :edit="editFlag"/>
            </b-modal>
          </template>
          <template v-slot:body>
            <div v-if="loadTable" class="text-center">
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </div>
            <b-table v-else striped responsive :fields="columns" :items="getAllProject" class="mb-0 table-borderless">
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
              <template v-slot:cell(enterprise)="data">
                {{data.item.enterprise.title}}
              </template>
              <template v-slot:cell(actions)="data1">
                <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="gitDataToEdit(data1.item.id)" :class="'input_'+data1.item.id"><i class="ri-ball-pen-fill m-0"></i></b-button>
                <b-button variant=" iq-bg-danger" size="sm" @click="setDeleteId(data1.item.id)"><i class="ri-delete-bin-line m-0"  ></i></b-button>
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
const addProjectModal = () => import('../../components/projects/projectModal')

export default {
  name: 'settingsprojects',
  data () {
    return {
      filter: {
        title: '',
        status: ''
      },
      currentPage: 1,
      per_page: 10,
      total: 6,
      loadingOpenAdd: false,
      loadTable: true,
      modelTitle: 'Add Branch',
      editFlag: false,
      switchButton: [],
      deleteId: ''
    }
  },
  computed: {
    ...mapGetters(['getAllProject']),
    columns () {
      const fields = [
        { label: 'Title', key: 'en_title', class: 'text-left' },
        { label: 'Ar Title', key: 'ar_title', class: 'text-left' },
        { label: 'Code', key: 'code', class: 'text-left' },
        { label: 'Enterprise', key: 'enterprise', class: 'text-left' },
        { label: 'Color', key: 'color', class: 'text-left' },
        { label: 'Sort', key: 'sort', class: 'text-left' }
      ]
      if (this.hasPer('project.status')) {
        fields.push({ label: 'Status', key: 'is_active', class: 'text-left' })
      } if (this.hasPer('project.delete') || this.hasPer('project.update')) {
        fields.push({ label: 'Actions', key: 'actions', class: 'text-left' })
      }
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
      this.$store.dispatch('getAllProject', { filterTitle: this.filter.title, filterStatus: this.filter.status }).then(data => {
        this.currentPage = data.data.meta.currentPage
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
        this.loadTable = false
      })
    },
    changeContent () {
      this.loadTable = true
      this.$store.dispatch('getAllProject', { pageNumber: this.currentPage }).then(() => {
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
      this.modelTitle = 'Add Branch'
      this.$bvModal.show('modal-4')
      this.loadingOpenAdd = false
    },
    gitDataToEdit (id) {
      document.getElementsByClassName('input_' + id)[0].innerHTML = '<span class="spinner-grow spinner-grow-sm"></span>'
      this.editFlag = true
      // eslint-disable-next-line no-unused-expressions,no-sequences
      this.modelTitle = 'Edit Branch'
      this.$store.dispatch('GetSpacificProject', id).then(() => {
        this.$bvModal.show('modal-4')
        document.getElementsByClassName('input_' + id)[0].innerHTML = ' <i class="ri-ball-pen-fill m-0"></i>'
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
    addProjectModal
  },
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    this.$store.dispatch('getAllProject', { pageNumber: this.currentPage }).then(data => {
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
