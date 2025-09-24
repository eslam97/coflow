<template>
  <div>
    <!--  End modal  -->
    <end-modal ref="endPopup"/>

    <main-modal id="PromotionModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'"><span class="text-warning" >Add: </span> Promotion</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Promotion</h4>
      </template>
      <template v-slot:body>
        <PromotionForm
          :requestLoading="requestLoading"
          :typeOfModal="typeOfModal"
          :promotionDetails="promotionDetails"
          @addPromotion="addPromotion"
          @editPromotion="editPromotion"
          :allCoupons="allCoupons"
          :allTickets="allTickets"
        />
      </template>
    </main-modal>

    <b-row>
      <b-col lg="12"
             class="mb-4 d-flex justify-content-between align-items-center">
        <h3>Promotions</h3>
        <div>
          <b-button variant="warning" @click="showPromotionAddModal" class="add_button text-white">Add Promotion<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <div class="w-50 pr-2">
          <b-button :class="['w-100 promotion_button py-2', { 'active-tab' : isSelected('current')}]"
                    @click="activeTab='current'">
            Current
          </b-button>
        </div>
        <div class="w-50 pl-2">
          <b-button :class="['w-100 promotion_button py-2', { 'active-tab' : isSelected('history')}]"
                    @click="activeTab='history'">
            History
          </b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
          :key="activeTab"
          :fields="columns"
          class="mb-0 table-borderless"
          :items="activeTab=='current' ? (data.current.data || []) : (data.history.data || [])"
          :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import EventBus from '@/eventBus'
import promotionsServices from '../services/promotions.services'
import couponsServices from '@/modules/business/pricing/services/coupons.services'
import ticketsServices from '@/modules/business/pricing/services/tickets.services'
import PromotionForm from '../components/PromotionForm'
import endModal from '../components/endModal'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      allCoupons: [],
      allTickets: [],
      allData: [],
      columns: [
        { label: 'Offer name', key: 'name', class: 'text-left' },
        { label: 'Type', key: 'type', class: 'text-left' },
        { label: 'Start Date', key: 'start_date', class: 'text-left' },
        { label: 'End Date', key: 'end_date', class: 'text-left' },
        { label: 'Views', key: 'views', class: 'text-left' },
        { label: 'Likes', key: 'likes', class: 'text-left' },
        { label: 'Limit', key: 'payment_limit', class: 'text-left' },
        { label: 'Purchases', key: 'purchases', class: 'text-left' },
        // { label: 'Actions', key: 'actions', class: 'text-left' }
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showPromotionEditModal',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Promotion',
              textContent: 'name',
              url: 'promotions'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      data: [],
      activeTab: 'current',
      loadingTable: false,
      rowId: '',
      editPromotions: {
        start_date: '',
        end_date: '',
        _method: 'put'
      },
      endInfo: {
        actionHeader: 'End',
        titleHeader: 'Promotion',
        question: 'Are You Sure You Want End This Promotion?',
        textDeleteButton: 'YES, END',
        textCancelButton: 'NO, CANCEL',
        icon: '',
        type: 'end',
        actionOnAlert: '',
        data: {}
      }
    }
  },
  components: {
    PromotionForm,
    endModal
  },
  methods: {
    showPromotionAddModal () {
      this.typeOfModal = 'add'
      this.promotionDetails = {}
      this.$bvModal.show('PromotionModal')
    },
    showPromotionEditModal (obj) {
      this.typeOfModal = 'edit'
      promotionsServices.getPromotionDetails(obj.id).then(res => {
        this.promotionDetails = res.data.data
        this.$bvModal.show('PromotionModal')
      })
    },

    isSelected (data) {
      if (this.activeTab === data) {
        return true
      }
    },
    getAllData () {
      this.loadingTable = true
      promotionsServices.getAllPromotions().then(res => {
        this.data = res.data.data
      }).finally(() => {
        this.loadingTable = false
        this.reloadTable = true
      })
    },
    end (data) {
      this.endInfo.textContent = data.title
      this.endInfo.rowId = data.id
      this.endInfo.data = { start_date: data.start_date, end_date: data.end_date }
      this.$refs.endPopup.show(this.endInfo)
      this.$bvModal.show('endModal')
    },
    del (data) {
      EventBus.$emit('openDeleteModal', {
        actionHeader: 'Delete',
        titleHeader: 'Promotion',
        textContent: data.offer_title,
        question: 'Are you sure you want delete this promotion?',
        textDeleteButton: 'YES, Delete',
        textCancelButton: 'NO, CANCEL',
        icon: 'las la-trash-alt',
        type: 'delete',
        actionOnAlert: '',
        text: 'Delete',
        url: 'promotions',
        rowId: data.id
      })
    },
    reEnd (id) {
      this.rowId = id
      this.$bvModal.show('promotionEdit')
    },
    addPromotion (data) {
      if (data.payment_unlimited) {
        delete data.payment_limit
      }
      if (data.unlimited) {
        delete data.validity_days
      }
      this.requestLoading = true
      promotionsServices.addPromotion(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getAllData()
        this.$bvModal.hide('PromotionModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editPromotion (data) {
      this.requestLoading = true
      if (data.payment_unlimited) {
        delete data.payment_limit
      }
      if (data.unlimited) {
        delete data.validity_days
      }
      promotionsServices.editPromotion(data.id, data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getAllData()
        this.$bvModal.hide('PromotionModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },

    getAllCouponsLimit () {
      this.requestLoading = true
      couponsServices.getAllCouponsLimit().then(res => {
        this.allCoupons = res.data.data.data
        this.requestLoading = false
      })
    },
    getAllTicketsLimit () {
      this.requestLoading = true
      ticketsServices.getAllTicketsLimit().then(res => {
        this.allTickets = res.data.data.data
        this.requestLoading = false
      })
    }
  },
  mounted () {
    core.index()
    EventBus.$on('reloadTableAfterDelete', ifReload => { this.getAllData() })
  },
  created () {
    this.getAllCouponsLimit()
    this.getAllTicketsLimit()
    this.getAllData()
    this.$root.$on('showPromotionEditModal', this.showPromotionEditModal)
  },
  beforeDestroy () {
    this.$root.$off('showPromotionEditModal')
  }
}
</script>
<style>
.text-offer {
  width: 175px;
  white-space: break-spaces;
}
</style>
