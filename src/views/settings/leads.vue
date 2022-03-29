<template>
  <b-container fluid>
    <b-row>
      <!-- Start Modal -->
      <b-modal id="modal-5" size="md" title="Remove Project" hide-footer no-close-on-backdrop>
        <p class="font-size-18 text-black">Are you sure you want to delete this Lead? </p>
        <div class="d-flex justify-content-end">
          <b-button variant="danger" @click="deleteLead">Delete Lead</b-button>
        </div>
      </b-modal>
      <b-modal id="statusHistory" size="lg" title="History" show hide-footer no-close-on-backdrop>
        <statusHistory :allHistory="history" :historyId="historyId"/>
      </b-modal>
      <!-- End Modal -->

      <!-- Start Filter-->
      <b-container fluid class="filter">
        <div class="iq-card p-1">
          <div class="row">
            <div class="col-md-3 my-1">
              <input type="text" placeholder="search by user name" class="form-control" v-model="filter.title" @input="filterTable" >
            </div>
            <div class="col-md-9 my-1">
              <date-range-picker
                                class="w-100"
                                 ref="picker"
                                 opens=false
                                 :timePicker=false
                                 :timePicker24Hour=false
                                 :showWeekNumbers=true
                                 :showDropdowns=true
                                 format='mm/dd/yyyy'
                                 direction="center"
                                 :autoApply=true
                                 v-model="dateRange"
                                 :linkedCalendars=true
                                 customRangeLabel= 'Custom Range'
                                 @update="filterTable"
              >
              </date-range-picker>
            </div>
            <div class="col-md-12 d-flex justify-content-start align-items-center" v-if="filter.title || dateRange.endDate || dateRange.startDate">
              <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
            </div>
          </div>
        </div>
      </b-container>
      <!-- End Filter-->

      <!-- Start Table -->
      <b-col lg="9">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">{{ $t('dashboard2.leads')}}</h4>
          </template>
          <template v-slot:headerAction>
            <b-button v-if="loadingOpenAdd && hasPer('lead.create')"  variant="primary" disabled>
              <b-spinner small type="grow"></b-spinner>
              openning...
            </b-button>
            <b-button v-else v-b-modal.modal-all-lead variant="primary" @click="loadData">Add Lead</b-button>
            <b-modal size="lg" id="modal-all-lead" :title="modelTitle" hide-footer no-close-on-backdrop>
              <addLeadModel :allFeatures="allFeatures" :edit="editFlag"/>
            </b-modal>
          </template>
          <template v-slot:body>
            <div v-if="loadTable" class="text-center">
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </div>
            <b-table v-else striped responsive :fields="columns" :items="getAllLeads" class="mb-0 table-borderless"  sort-icon-left primary-key="name" id="table-transition-example" :tbody-transition-props="transProps">
              <template #cell(#)="data">
                {{ data.index + 1 }}
              </template>
              <template v-slot:cell(source)="data">
                             {{data.item.source.title}}
                            </template>
                          <template v-slot:cell(last_call_action)="data1">
                             {{data1.item.last_call_action==null? 'ـــــ' :  data1.item.last_call_action.substr(0,10)}}
                            </template>
              <template v-slot:cell(comment)="data2">
                {{data2.item.comment==null? 'ـــــ' :  data2.item.comment}}
              </template>
              <template v-slot:cell(phone)="data1">
                <p class="holdSelection" v-if="data1.item.id==showPhone">{{data1.item.phone}}</p>
                <b-button v-else variant=" iq-bg-success mr-1 mb-1" size="sm" :id="data1.item.id" @click="showPhone = data1.item.id" ><i class="las la-mobile"></i>Show Phone</b-button>
              </template>
              <template v-slot:cell(created_at)="data1">
                <p class="holdSelection">{{timeConvert(data1.item.created_at)}}</p>
              </template>
              <template v-slot:cell(actions)="data1">
                <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="showHistory(data1.item.id)" ><i class="las la-history"></i> Show History</b-button>
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
      <!-- End Table -->

      <!-- Start Report -->
      <b-col lg="3">
        <iq-card>
          <template v-slot:body>
              <ul class="d-flex justify-content-around cursor-pointer">
                <li @click="(typeOfFilterWidget='daily'); getModeratorsWidget()" :class="typeOfFilterWidget=='daily' ? 'activeButton':''"><span>Daily</span></li>
                <li @click="(typeOfFilterWidget='weekly'); getModeratorsWidget()" :class="typeOfFilterWidget=='weekly' ? 'activeButton':''"><span>Weekly</span></li>
                <li @click="(typeOfFilterWidget='monthly'); getModeratorsWidget()" :class="typeOfFilterWidget=='monthly' ? 'activeButton':''"><span>Monthly</span></li>
              </ul>
            <div class="m-0 p-0 d-flex flex-wrap align-items-center justify-content-between">
              <div class="col-md-12" v-for="(i,key) in Object.keys(allModeratorsWidget)" :key="key">
                <div class="d-flex align-items-center  mt-4">
                  <div class="iq-scale-border mr-3 comment-block"></div>
                  <div class="iq-scale-content">
                    <h6>{{ allModeratorsWidget[i] }}</h6>
                    <p class="mb-0">{{ i }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="d-flex align-items-center mt-4">
                  <div class="iq-scale-border mr-3 repost-block"></div>
                  <div class="iq-scale-content">
                    <h6>{{ sumOfLeads }}</h6>
                    <p class="mb-0">Total</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </iq-card>
      </b-col>
      <!-- End Report -->
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'
const addLeadModel = () => import('../../components/leads/leadsModal')
const statusHistory = () => import('../../components/statusHistory/statusHistory')
export default {
  name: 'leads',
  data () {
    return {
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      currentPage: 1,
      per_page: 10,
      total: '',
      typeOfFilterWidget: 'daily',
      allModeratorsWidget: {},
      modelTitle: 'Add Lead',
      editFlag: false,
      loadingOpenAdd: false,
      loadTable: true,
      switchButton: [],
      showPhone: '',
      deleteId: '',
      history: [],
      historyId: '',
      filter: {
        title: ''
      },
      dateRange: {
        startDate: '',
        endDate: ''
      },
      allFeatures: {}
    }
  },
  computed: {
    ...mapGetters(['getAllLeads']),
    columns () {
      const fields = [
        { label: '#', key: '#', class: 'text-left', sortable: true },
        { label: 'Id', key: 'id', class: 'text-left', sortable: true },
        { label: 'Name', key: 'name', class: 'text-left', sortable: true },
        /*  { label: 'Phone', key: 'phone', class: 'text-left', sortable: true }, */
        { label: 'Ad Source', key: 'source', class: 'text-left', sortable: true },
        { label: 'Last Action', key: 'last_call_action', class: 'text-left', sortable: true },
        { label: 'Type', key: 'type', class: 'text-left', sortable: true },
        { label: 'Created By', key: 'user.name', class: 'text-left', sortable: true },
        { label: 'Created At', key: 'created_at', class: 'text-left', sortable: true },
        { label: 'Note', key: 'comment', class: 'text-left', sortable: true }
      ]
      if (this.hasPer('lead.history')) {
        fields.push({ label: 'History', key: 'actions', class: 'text-left' })
      }
      return fields
    },
    // eslint-disable-next-line vue/return-in-computed-property
    sumOfLeads () {
      var total = 0
      for (var el in this.allModeratorsWidget) {
        total += parseInt(this.allModeratorsWidget[el])
      }
      return total
    }
  },
  methods: {
    show (id) {
      document.getElementsByClassName('phone_' + id)[0].style.display = 'block'
      document.getElementsByClassName('show_' + id)[0].style.display = 'none'
    },
    hide (id) {
      document.getElementsByClassName('phone_' + id)[0].style.display = 'none'
      document.getElementsByClassName('show_' + id)[0].style.display = 'block'
    },
    changeContent () {
      this.filterTable()
    },
    loadData () {
      this.loadingOpenAdd = true
      this.editFlag = false
      this.modelTitle = 'Add Lead'
      this.$store.dispatch('getInfoToCreateLead').then((data) => {
        this.$bvModal.show('modal-all-lead')
        this.allFeatures = data.data.data
        this.loadingOpenAdd = false
      })
    },
    gitDataToEdit (id) {
      this.editFlag = true
      // eslint-disable-next-line no-unused-expressions,no-sequences
      this.modelTitle = 'Edit Lead'
      this.$store.dispatch('GetSpacificProject', id).then(() => {
        this.$bvModal.show('modal-all-lead')
      })
    },
    setDeleteId (id) {
      this.deleteId = id
      this.$bvModal.show('modal-5')
    },
    deleteLead () {
      this.$store.dispatch('deleteLead', this.deleteId).then(() => {
        this.$bvModal.hide('modal-5')
        core.showSnackbar('success', 'Lead has been Edit successfully.')
      })
    },
    print (id) {
      // console.log(id)
    },
    showHistory (id) {
      this.historyId = id
      this.$store.dispatch('gitHistory', { id: id, pageNumber: 1 }).then(res => {
        this.history = res.data.data.data
        this.$bvModal.show('statusHistory')
      })
    },
    reload () {
      this.loadTable = true
      this.$store.dispatch('getAllUser', { pageNumber: this.currentPage }).then(() => {
        this.loadTable = false
      })
    },
    resetFilter () {
      this.filter = {
        title: ''
      }
      // eslint-disable-next-line no-unused-expressions
      this.dateRange = {
        startDate: '',
        endDate: ''
      }
      this.filterTable()
    },
    filterTable () {
      this.loadTable = true
      this.$store.dispatch('getAllLead', { pageNumber: this.currentPage, name: this.filter.title, dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '', dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '' }).then(data => {
        this.currentPage = data.data.meta.current_page
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
        this.loadTable = false
      })
    },
    getModeratorsWidget () {
      this.$store.dispatch('getModeratorsWidget', this.typeOfFilterWidget).then(res => {
        this.allModeratorsWidget = res.data.data
      })
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    addLeadModel,
    // eslint-disable-next-line vue/no-unused-components
    statusHistory
  },
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    this.$store.dispatch('getAllLead', { pageNumber: this.currentPage }).then(res => {
      this.currentPage = res.data.meta.currentPage
      this.per_page = res.data.meta.per_page
      this.total = res.data.meta.total
      this.loadTable = false
    })
    this.getModeratorsWidget()
  }
}
</script>
<style scoped>
.colorSpan{
  width: 20px;
  height: 20px;
}
</style>
