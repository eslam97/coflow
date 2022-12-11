<template>
  <b-container fluid>
    <!--  End modal  -->
    <end-modal ref="endPopup"/>

    <main-modal id="promotionDetails" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'"><span class="text-warning" >Add: </span> Promotion</h4>
      </template>
      <template v-slot:body>
        <promotion-details @savePromotion="savePromotion" :requestLoading="requestLoading"/>
      </template>
    </main-modal>
    <main-modal id="promotionEdit" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-info" >Edit: </span> Promotion</h4>
      </template>
      <template v-slot:body>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(editPromotion)">
            <b-row>
              <b-col md="6" class="mb-3">
                <b-form-group
                    label="start date"
                    label-for="start date"
                >
                  <validation-provider
                      #default="{ errors }"
                      name="start_date"
                      :rules="'required'"
                  >
                    <flat-pickr
                        :class="['form-control bg-white' , { 'is-invalid': errors.length > 0 }]"
                        v-model="editPromotions.start_date"
                        placeholder="start date"
                        name="start"
                        :config="{
                          minDate: 'today'
                        }"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6" class="mb-3">
                <b-form-group
                    label="end date"
                    label-for="end date"
                >
                  <validation-provider
                      #default="{ errors }"
                      name="end_date"
                      :rules="'required'"
                  >
                    <flat-pickr
                        name="end"
                        :class="['form-control bg-white' , { 'is-invalid': errors.length > 0 }]"
                        v-model="editPromotions.end_date"
                        :config="{
                          minDate: 'today'
                        }"
                        placeholder="end date"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="mt-4">
                <div class="d-flex justify-content-center">
                  <b-button class="button-blue-modal" type="submit" v-if="!requestLoading">
                    <i class="las la-pen"></i>
                  </b-button>
                  <b-button class="button-blue-modal" v-else>
                    <spinner-loading ></spinner-loading>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-form>
        </ValidationObserver>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12"
             class="mb-4 d-flex justify-content-between align-items-center">
        <h3>Promotions</h3>
        <div>
          <b-button variant="warning" v-b-modal:promotionDetails class="add_button text-white">Add
            Promotion<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <div class="w-50 pr-2">
          <b-button :class="['w-100 promotion_button py-2', { 'activePromotion' : isSelected('current')}]"
                    @click="type='current'; pagination.currentPage = 1">
            Current
          </b-button>
        </div>
        <div class="w-50 pl-2">
          <b-button :class="['w-100 promotion_button py-2', { 'activePromotion' : isSelected('history')}]"
                    @click="type='history'; pagination.currentPage = 1">
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
          <template v-slot:cell(offer)="data">
            <p class="m-0 p-0 text-offer" v-if="data.item.promotion_type === 'package'">{{ data.item.package }} for {{data.item.package_price_egp}} EGP</p>
            <p class="m-0 p-0 text-offer" v-else-if="data.item.promotion_type === 'buy_x get_y'">Buy {{ data.item.buy_x }}, Get {{ data.item.get_y }}</p>
            <p class="m-0 p-0 text-offer" v-else>{{ data.item.discount_price_egp }}%</p>
          </template>
          <template v-slot:cell(actions)="data">
            <b-button variant="danger" v-if="type === 'current'" @click="end(data.item)" class="w-100 rounded-0">End</b-button>
            <span v-else class="d-flex justify-content-around">
              <b-button variant="info"  @click="reEnd(data.item.id)" class="w-40 rounded-0">
              Re-Add</b-button>
              <b-button variant="danger"  @click="del(data.item)" class="w-30 rounded-0">
              <i class="las la-trash"></i></b-button>
            </span>
          </template>
        </b-table>
        <b-pagination
            v-if="pagination.total > pagination.per_page"
            v-model="pagination.currentPage"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            first-number
            last-number
            class="mb-3 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
            align="right"
            @input="getAllData"
        >
        </b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import promotionsServices from '../services/promotions.services'
import EventBus from '@/eventBus'
import promotionDetails from '../components/promotionDetails'
import endModal from '@/modules/business/promotions/components/endModal'
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
      pagination: {
        currentPage: 1,
        per_page: 10,
        total: 6
      },
      columns: [
        { label: 'Promotion Type', key: 'promotion_type', class: 'text-left text-capitalize' },
        { label: 'Offer', key: 'offer', class: 'text-left', type: 'offer' },
        { label: 'Start Date', key: 'start_date', class: 'text-left' },
        { label: 'End Date', key: 'end_date', class: 'text-left' },
        { label: 'Offer Title', key: 'offer_title', class: 'text-left' },
        { label: 'Likes', key: 'likes', class: 'text-left' },
        { label: 'Views', key: 'views', class: 'text-left' },
        { label: 'Actions', key: 'actions', class: 'text-left' }
      ],
      typeOfModal: 'add',
      data: [],
      type: 'current',
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
    promotionDetails,
    endModal
  },
  watch: {
    type () {
      this.getAllData()
    }
  },
  methods: {
    isSelected (data) {
      if (this.type === data) {
        return true
      }
    },
    getAllData () {
      this.loadingTable = true
      promotionsServices.getAllPromotions(this.pagination.currentPage, this.type).then(res => {
        this.data = res.data.data.data
        this.pagination = {
          currentPage: res.data.data.current_page,
          per_page: res.data.data.per_page,
          total: res.data.data.total
        }
      }).finally(() => {
        this.loadingTable = false
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
        question: 'Are You Sure You Want Delete This Promotion?',
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
    editPromotion () {
      this.requestLoading = true
      promotionsServices.editPromotion(this.rowId, this.editPromotions).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getAllData()
        this.$bvModal.hide('promotionEdit')
      }).finally(() => {
        this.requestLoading = false
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
<style>
.text-offer {
  width: 175px;
  white-space: break-spaces;
}
</style>
