<template>
  <b-row>
    <b-col lg='12'>
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">whatsapp</h4>
        </template>
        <template v-slot:headerAction>
          <b-button v-if='loadingOpenAdd'  variant="primary" disabled>
            <b-spinner small type="grow"></b-spinner>
            openning...
          </b-button>
          <b-button v-else v-b-modal.modal-4 variant="primary" @click="loadData">Add New</b-button>
          <b-modal id="modal-4" size="lg"  :title="modelTitle" hide-footer no-close-on-backdrop>
            <addWhatsappModal :edit="editFlag" @reload= 'fillWhatsappTable'/>
          </b-modal>
        </template>
        <template v-slot:body>
          <div v-if="loadTable" class="text-center">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
          <b-table v-else striped responsive :fields="columns" :items="allWhatsappSettingData" class="mb-0 table-borderless">
            <template v-slot:cell(is_active)="data3">
              <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                <div class="custom-switch-inner">
                  <input type="checkbox" class="custom-control-input bg-primary" v-model="data3.item.is_active" :id="'customSwitch-11'+data3.item.id"  @change="switchWhatsappStatus(data3.item.id)" >
                  <label class="custom-control-label" :for="'customSwitch-11'+data3.item.id" data-on-label="on" data-off-label="off">
                  </label>
                </div>
              </div>
            </template>
            <template v-slot:cell(actions)="data1">
              <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="gitDataWhatsappToEdit(data1.item.id)" :class="'input_'+data1.item.id"><i class="ri-ball-pen-fill m-0"></i></b-button>
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
const addWhatsappModal = () => import('../../components/whatsapp/whatsappModal')

export default {
  name: 'settingswhatsapp',
  data () {
    return {
      filter: {
        title: '',
        status: ''
      },
      currentPage: 1,
      per_page: 10,
      total: 6,
      allWhatsappSettingData: [],
      loadingOpenAdd: false,
      loadTable: true,
      modelTitle: 'Add Project',
      editFlag: false,
      switchButton: [],
      columns: [
        { label: 'Project', key: 'project.en_title', class: 'text-left' },
        { label: 'whatsapp User', key: 'phone', class: 'text-left' },
        { label: 'Api key', key: 'api_key', class: 'text-left' },
        { label: 'Is Active ', key: 'is_active', class: 'text-left' },
        { label: 'Actions', key: 'actions', class: 'text-left' }
      ]
    }
  },
  computed: {
    ...mapGetters(['getAllProject'])
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
    switchWhatsappStatus (id) {
      // console.log(id)
      this.$store.dispatch('changeStatusSettingWhatsapp', id).then((res) => {
        core.showSnackbar('success', res.data.message)
      })
    },
    gitDataWhatsappToEdit (id) {
      document.getElementsByClassName('input_' + id)[0].innerHTML = '<span class="spinner-grow spinner-grow-sm"></span>'
      this.editFlag = true
      // eslint-disable-next-line no-unused-expressions,no-sequences
      this.modelTitle = 'Edit Project'
      this.$store.dispatch('getSpacificSettingWhatsapp', id).then(() => {
        this.$bvModal.show('modal-4')
        document.getElementsByClassName('input_' + id)[0].innerHTML = ' <i class="ri-ball-pen-fill m-0"></i>'
      })
    },
    fillWhatsappTable () {
      this.loadTable = true
      this.$store.dispatch('getAllsettingWhatsapp', { pageNumber: this.currentPage }).then(data => {
        this.allWhatsappSettingData = data.data.data
        this.currentPage = data.data.meta.currentPage
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
        this.loadTable = false
      })
    },
    loadData () {
      this.loadingOpenAdd = true
      this.editFlag = false
      this.modelTitle = 'Add New'
      this.$bvModal.show('modal-4')
      this.loadingOpenAdd = false
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    addWhatsappModal
  },
  mounted () {
    core.index()
  },
  created () {
    this.fillWhatsappTable()
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
