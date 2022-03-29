<template>
  <b-row>
    <b-modal id="modal-5" size="md" title="Remove departments" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">Are you sure you want to delete this departments? </p>
      <div class="d-flex justify-content-end">
        <b-button variant="danger" @click="deletedepartments">Delete departments</b-button>
      </div>
    </b-modal>
    <b-container fluid class="filter">
      <div class="iq-card p-1">
        <div class="row">
          <div class="col-md-3 my-1">
            <input type="text" placeholder="search by departments name" class="form-control" v-model="filter.title" @input="filterTable" >
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
    <b-col lg="8">
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">{{ $t('dashboard2.listdepartments')}}</h4>
        </template>
        <template v-slot:headerAction>
          <span v-if="hasPer('department.create')">
          <b-button v-if='loadingOpenAdd'  variant="primary" disabled>
            <b-spinner small type="grow"></b-spinner>
            openning...
          </b-button>
          <b-button v-else v-b-modal.modal-departments variant="primary" @click="loadData">Add departments</b-button>
          </span>
          <b-modal id="modal-departments" size="lg"  :title="modelTitle" hide-footer no-close-on-backdrop>
            <adddepartmentsModal :edit="editFlag"/>
          </b-modal>
        </template>
        <template v-slot:body>
          <div v-if="loadTable" class="text-center">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
          <b-table v-else striped responsive :fields="columns" :items="getAlldepartments" class="mb-0 table-borderless">
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
              <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="gitDataToEdit(data1.item.id)" :class="'input_'+data1.item.id" ><i class="ri-ball-pen-fill m-0"></i></b-button>
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
    <b-col lg="4">
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">{{ $t('dashboard2.summary')}}</h4>
        </template>
        <template v-slot:headerAction>
          <b-dropdown id="dropdownMenuButton5" right variant="none" data-toggle="dropdown">
            <template v-slot:button-content>
              <span class="text-primary"><i class="ri-more-2-fill"></i></span>
            </template>
            <b-dropdown-item><i class="ri-eye-fill mr-2"></i>{{ $t('dropdown.view') }}</b-dropdown-item>
            <b-dropdown-item><i class="ri-delete-bin-6-fill mr-2"></i>{{ $t('dropdown.delete') }}</b-dropdown-item>
            <b-dropdown-item><i class="ri-pencil-fill mr-2"></i>{{ $t('dropdown.edit') }}</b-dropdown-item>
            <b-dropdown-item><i class="ri-printer-fill mr-2"></i>{{ $t('dropdown.print') }}</b-dropdown-item>
            <b-dropdown-item><i class="ri-file-download-fill mr-2"></i>{{ $t('dropdown.download') }}</b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-slot:body>
          <p class="mb-0">{{ $t('dashboard2.totalLikeComment')}}</p>
          <div class="m-0 p-0 d-flex flex-wrap align-items-center justify-content-between">
            <div class="col-md-6">
              <div class="d-flex align-items-center  mt-4">
                <div class="iq-scale-border mr-3 like-block"></div>
                <div class="iq-scale-content">
                  <h6>2.864</h6>
                  <p class="mb-0">Likes</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="d-flex align-items-center  mt-4">
                <div class="iq-scale-border mr-3 comment-block"></div>
                <div class="iq-scale-content">
                  <h6>624</h6>
                  <p class="mb-0">Comments</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="d-flex align-items-center mt-4">
                <div class="iq-scale-border mr-3 share-block"></div>
                <div class="iq-scale-content">
                  <h6>1.75</h6>
                  <p class="mb-0">Share</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="d-flex align-items-center mt-4">
                <div class="iq-scale-border mr-3 repost-block"></div>
                <div class="iq-scale-content">
                  <h6>345</h6>
                  <p class="mb-0">Repost</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="d-flex align-items-center mt-4">
                <div class="iq-scale-border mr-3 view-block"></div>
                <div class="iq-scale-content">
                  <h6>845</h6>
                  <p class="mb-0">Views</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="d-flex align-items-center mt-4">
                <div class="iq-scale-border mr-3 post-block"></div>
                <div class="iq-scale-content">
                  <h6>1200</h6>
                  <p class="mb-0">Posts</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </iq-card>
    </b-col>
  </b-row>
</template>
<script>
import { core } from '../../../config/pluginInit'
import { mapGetters } from 'vuex'
const adddepartmentsModal = () => import('../../../components/departments/departmentsModal')
export default {
  name: 'settingsdepartments',
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
      modelTitle: 'Add departments',
      editFlag: false,
      switchButton: [],
      deleteId: ''
    }
  },
  computed: {
    ...mapGetters(['getAlldepartments']),
    columns () {
      const fields = [
        { label: 'Title', key: 'title', class: 'text-left' },
        { label: 'Color', key: 'color', class: 'text-left' }
      ]
      if (this.hasPer('department.status')) {
        fields.push({ label: 'Status', key: 'is_active', class: 'text-left' })
      } if (this.hasPer('department.delete') || this.hasPer('department.update')) {
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
      this.$store.dispatch('getAlldepartments', { filterTitle: this.filter.title, filterStatus: this.filter.status }).then(data => {
        this.currentPage = data.data.meta.currentPage
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
        this.loadTable = false
      })
    },
    changeContent () {
      this.loadTable = true
      this.$store.dispatch('getAlldepartments', { pageNumber: this.currentPage })
      this.loadTable = false
    },
    switchStatus (id) {
      this.$store.dispatch('changeStatusdepartments', id).then(() => {
        core.showSnackbar('success', 'status departments has been Edit successfully.')
      })
    },
    loadData () {
      this.loadingOpenAdd = true
      this.editFlag = false
      this.modelTitle = 'Add departments'
      this.loadingOpenAdd = false
    },
    gitDataToEdit (id) {
      document.getElementsByClassName('input_' + id)[0].innerHTML = '<span class="spinner-grow spinner-grow-sm"></span>'
      this.editFlag = true
      // eslint-disable-next-line no-unused-expressions,no-sequences
      this.modelTitle = 'Edit departments'
      this.$store.dispatch('GetSpacificdepartments', id).then(() => {
        this.$bvModal.show('modal-departments')
        document.getElementsByClassName('input_' + id)[0].innerHTML = ' <i class="ri-ball-pen-fill m-0"></i>'
      })
    },
    setDeleteId (id) {
      this.deleteId = id
      this.$bvModal.show('modal-5')
    },
    deletedepartments () {
      this.$store.dispatch('deletedepartments', this.deleteId).then(() => {
        this.$bvModal.hide('modal-5')
        core.showSnackbar('success', 'departments has been deleted successfully.')
      })
    },
    print (id) {
      // console.log(id)
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    adddepartmentsModal
  },
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    this.$store.dispatch('getAlldepartments', { pageNumber: this.currentPage }).then(data => {
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
</style>
