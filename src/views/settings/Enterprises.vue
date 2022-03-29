<template>
  <b-row>
    <b-modal id="modal-6" size="md" title="Remove Enterprise" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">Are you sure you want to delete this Entertrise? </p>
      <div class="d-flex justify-content-end">
        <b-button variant="danger" @click="deleteEnterprises">Delete Entertrise</b-button>
      </div>
    </b-modal>
    <b-col lg='12'>
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">All Projects</h4>
        </template>
        <template v-slot:headerAction>
          <span  v-if="hasPer('enterprise.create')">
             <b-button v-if='loadingOpenAdd'  variant="primary" disabled>
            <b-spinner small type="grow"></b-spinner>
            openning...
          </b-button>
          <b-button v-else v-b-modal.modal-4 variant="primary" @click="loadData" >Add Project</b-button>
          </span>
          <b-modal id="modal-11" size="lg"  :title="modelTitle" hide-footer no-close-on-backdrop>
            <addenterpriseModal :edit="editFlag"/>
          </b-modal>
        </template>
        <template v-slot:body>
          <div v-if="loadTable" class="text-center">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
          <b-table v-else striped responsive :fields="columns" :items="getAllenterprises" class="mb-0 table-borderless">
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
              <b-button v-if="hasPer('enterprise.update')" variant=" iq-bg-success mr-1 mb-1" size="sm" @click="gitDataToEdit(data1.item.id)" :class="'input_'+data1.item.id"><i class="ri-ball-pen-fill m-0"></i></b-button>
              <b-button v-if="hasPer('enterprise.delete')" variant=" iq-bg-danger" size="sm" @click="setDeleteId(data1.item.id)"><i class="ri-delete-bin-line m-0"  ></i></b-button>
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
const addenterpriseModal = () => import('../../components/enterPrises/enterPrisesModal')
export default {
  name: 'settingsenterprises',
  data () {
    return {
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
    ...mapGetters(['getAllenterprises']),
    columns () {
      const fields = [
        { label: 'Title', key: 'title', class: 'text-left' },
        { label: 'Link', key: 'link', class: 'text-left' },
        { label: 'Color', key: 'color', class: 'text-left' }]
      if (this.hasPer('enterprise.status')) {
        fields.push({ label: 'Status', key: 'is_active', class: 'text-left' })
      } if (this.hasPer('enterprise.update') || this.hasPer('enterprise.delete')) {
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
      this.$store.dispatch('getAllenterprises', { filterTitle: this.filter.title, filterStatus: this.filter.status }).then(data => {
        this.currentPage = data.data.meta.currentPage
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
        this.loadTable = false
      })
    },
    changeContent () {
      this.loadTable = true
      this.$store.dispatch('getAllenterprises', { pageNumber: this.currentPage }).then(() => {
        this.loadTable = false
      })
    },
    switchStatus (id) {
      // console.log(id)
      this.$store.dispatch('changeStatus', id).then(() => {
        core.showSnackbar('success', 'status enterprise has been Edit successfully.')
      })
    },
    loadData () {
      this.loadingOpenAdd = true
      this.editFlag = false
      this.modelTitle = 'Add Project'
      this.$bvModal.show('modal-11')
      this.loadingOpenAdd = false
    },
    gitDataToEdit (id) {
      document.getElementsByClassName('input_' + id)[0].innerHTML = '<span class="spinner-grow spinner-grow-sm"></span>'
      this.editFlag = true
      // eslint-disable-next-line no-unused-expressions,no-sequences
      this.modelTitle = 'Edit Project'
      this.$store.dispatch('GetSpacificenterprise', id).then(() => {
        this.$bvModal.show('modal-11')
        document.getElementsByClassName('input_' + id)[0].innerHTML = ' <i class="ri-ball-pen-fill m-0"></i>'
      })
    },
    setDeleteId (id) {
      this.deleteId = id
      this.$bvModal.show('modal-6')
    },
    deleteEnterprises () {
      this.$store.dispatch('deleteEnterprises', this.deleteId).then(() => {
        this.$bvModal.hide('modal-6')
        core.showSnackbar('success', 'enterprise has been Edit successfully.')
      })
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    addenterpriseModal
  },
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    this.$store.dispatch('getAllenterprises', { pageNumber: this.currentPage }).then(data => {
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
