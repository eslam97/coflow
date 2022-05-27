<template>
  <b-container fluid>
    <main-modal id="promotionDetails" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'"><span class="text-warning" >Add: </span> Promotion</h4>
      </template>
      <template v-slot:body>
        <promotion-details @savePromotion="savePromotion" :requestLoading="requestLoading"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12"
             class="mb-4 d-flex justify-content-between align-items-center">
        <h3>Promotions</h3>
        <div>
          <b-button variant="warning" v-b-modal:promotionDetails class="add_button text-white">Create
            Promotion<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <div class="w-50 pr-2">
          <b-button :class="['w-100 promotion_button py-2', { 'activePromotion' : isSelected('current')}]"
                    @click="type='current'">
            Current
          </b-button>
        </div>
        <div class="w-50 pl-2">
          <b-button :class="['w-100 promotion_button py-2', { 'activePromotion' : isSelected('history')}]"
                    @click="type='history'">
            History
          </b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <b-table :busy="loadingTable" show-empty responsive :items="data" :fields="columns" class="mb-0 table-borderless"
                 sort-icon-left
                  primary-key="name" id="my-table" :tbody-transition-props="transProps">
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner
                  type="grow"
                  label="Loading..."
                  variant="primary"
              />
            </div>
          </template>
          <template v-slot:cell(actions)="data">
            <b-button variant="danger" @click="end(data.item.id, data.item.offer_title)" class="w-100 rounded-0">End</b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import promotionsServices from '../services/promotions.services'
import EventBus from '@/eventBus'
import promotionDetails from '../components/promotionDetails'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      allData: [],
      paginationCurrent: {
        currentPage: 1,
        per_page: 10,
        total: 6
      },
      paginationHistory: {
        currentPage: 1,
        per_page: 10,
        total: 6
      },
      columns: [
        { label: 'Promotion Type', key: 'promotion_type', class: 'text-left' },
        { label: 'Offer', key: 'offer_title', class: 'text-left' },
        { label: 'Start Date', key: 'start_date', class: 'text-left' },
        { label: 'End Date', key: 'end_date', class: 'text-left' },
        { label: 'Description', key: 'description', class: 'text-left' },
        { label: 'Likes', key: 'likes', class: 'text-left' },
        { label: 'Views', key: 'views', class: 'text-left' },
        { label: 'Actions', key: 'actions', class: 'text-left' }
      ],
      typeOfModal: 'add',
      allCurrent: [],
      allHistory: [],
      data: [],
      type: 'current',
      loadingTable: false
    }
  },
  components: {
    promotionDetails
  },
  watch: {
    type (val) {
      if (val === 'current') {
        this.data = this.allCurrent
      } else {
        this.data = this.allHistory
      }
    }
  },
  methods: {
    isSelected (data) {
      if (this.type === data) {
        return true
      }
    },
    getAllData () {
      this.allCurrent = []
      this.allHistory = []
      this.data = []
      this.loadingTable = true
      promotionsServices.getAllPromotions().then(res => {
        this.allCurrent = res.data.data.current.data
        this.allHistory = res.data.data.history.data
        this.data = this.allCurrent
      }).finally(() => {
        this.loadingTable = false
      })
    },
    end (id, title) {
      EventBus.$emit('openDeleteModal', {
        actionHeader: 'End',
        titleHeader: 'Promotion',
        textContnet: title,
        url: 'promotions',
        rowId: id,
        question: 'Are You Sure You Want Delete This Promotion?',
        textDeleteButton: 'YES, END',
        textCancelButton: 'NO, CANCEL',
        icon: '',
        type: 'delete',
        actionOnAlert: ''
      })
    },
    savePromotion (data) {
      this.requestLoading = true
      promotionsServices.addPromotion(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getAllData()
        this.$bvModal.hide('promotionDetails')
      }).finally(() => {
        this.requestLoading = false
      })
    }
  },
  mounted () {
    core.index()
    EventBus.$on('reloadTableAfterDelete', ifReload => { this.getAllData() })
  },
  created () {
    this.getAllData()
  }
}
</script>
