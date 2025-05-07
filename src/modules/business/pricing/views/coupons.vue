<template>
  <div>
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <h3>Coupons</h3>
      <div>
        <b-button @click="showAddCouponModal" variant="warning" class="add_button text-white">
          Add Coupon <i class="las la-plus ml-3"></i>
        </b-button>
      </div>
    </div>

    <main-table
      :fields="columns"
      class="mb-0 table-borderless"
      :list_url="'coupons'"
      :reloadData="reloadTable"
    >
    <template v-slot:validity_days="data">
      {{data.data.validity_days ? data.data.validity_days : 'Unlimited'}}
    </template>
  </main-table>

    <main-modal id="AddCouponModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-warning" >Add: </span> Coupon
        </h4>
      </template>
      <template v-slot:body>
        <CouponForm
          @submitForm="addCoupon"
          :requestLoading="requestLoading"
        />
      </template>
    </main-modal>
    <main-modal id="EditCouponModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-warning" >Edit: </span> Coupon
        </h4>
      </template>
      <template v-slot:body>
        <CouponForm
          @submitForm="editCoupon"
          :requestLoading="requestLoading"
          :details="couponDetails"
        />
      </template>
    </main-modal>
  </div>
</template>

<script>
import { core } from '@/config/pluginInit'
import { couponItems } from '../services/data'
import CouponForm from '../components/CouponForm.vue'
import couponsServices from '../services/coupons.services'

export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      items: couponItems,
      couponDetails: {},
      columns: [
        { label: '#', key: 'id', class: 'text-center', type: 'sort' },
        { label: 'Discount', key: 'discount_ratio', class: 'text-left text-bold' },
        { label: 'Applies on', key: 'applies_on', class: 'text-left' },
        { label: 'Validity', key: 'validity_days', class: 'text-left', type: 'custom' },
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
              actionName: 'showEditCoupon',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Coupon',
              textContent: 'discount_ratio',
              url: 'coupons'
            }
          ]
        }
      ]
    }
  },
  components: { CouponForm },
  methods: {
    showAddCouponModal () {
      this.$bvModal.show('AddCouponModal')
    },
    showEditCoupon (obj) {
      this.couponDetails = obj
      this.$bvModal.show('EditCouponModal')
    },
    addCoupon (payload) {
      console.log('addCoupon: ', payload)
      this.requestLoading = true
      this.reloadTable = false

      const obj = {
        discount_ratio: payload.discount,
        unlimited: payload.unlimited,
        applies_on: payload.appliesOn
      }

      if (payload.unlimited === 0) {
        obj.validity_days = payload.validity_days
      }

      if (payload.appliesOn === 'tickets') {
        delete payload.tickets
      } else {
        obj.tickets = payload.appliesOnGroup.filter((item) => item.type !== 'tickets').map((item) => item.value)
      }

      if (payload.appliesOn === 'promotions') {
        delete payload.promotions
      } else {
        obj.promotions = payload.appliesOnGroup.filter((item) => item.type !== 'promotions').map((item) => item.value)
      }

      couponsServices.addCoupon(obj).then((response) => {
        this.reloadTable = true
        core.showSnackbar('success', 'Added Successfully')
        this.$bvModal.hide('AddCouponModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editCoupon (payload) {
      console.log('editCoupon: ', payload)
      this.requestLoading = true
      this.reloadTable = false
      setTimeout(() => {
        this.reloadTable = true
        core.showSnackbar('success', 'Successfull')
        this.$bvModal.hide('EditCouponModal')
        this.requestLoading = false
      }, 1000)
    }
  },
  created () {
    this.$root.$on('showEditCoupon', this.showEditCoupon)
  },
  beforeDestroy () {
    this.$root.$off('showEditCoupon')
  },
  mounted () {
    core.index()
  }
}
</script>
