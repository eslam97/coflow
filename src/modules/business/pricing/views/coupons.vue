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
      :items="items"
    />

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
        />
      </template>
    </main-modal>
  </div>
</template>

<script>
import { core } from '@/config/pluginInit'
import { couponItems } from '../services/data'
import CouponForm from '../components/CouponForm.vue'

export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      items: couponItems,
      columns: [
        { label: '#', key: 'id', class: 'text-center', type: 'sort' },
        { label: 'Discount', key: 'discount', class: 'text-left text-bold' },
        { label: 'Applies on', key: 'applies_on', class: 'text-left' },
        { label: 'Validity', key: 'validity', class: 'text-left' },
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
              actionName: 'showEditCouponModal',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Activity',
              textContent: 'name',
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
    showEditCouponModal () {
      this.$bvModal.show('EditCouponModal')
    },
    addCoupon (payload) {
      console.log('addCoupon: ', payload)
      this.requestLoading = true
      this.reloadTable = false
      setTimeout(() => {
        this.reloadTable = true
        core.showSnackbar('success', 'Added Successfully')
        this.$bvModal.hide('AddCouponModal')
        this.requestLoading = false
      }, 1000)
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
    this.$root.$on('showEditCouponModal', this.showEditCouponModal)
  },
  beforeDestroy () {
    this.$root.$off('showEditCouponModal')
  },
  mounted () {
    core.index()
  }
}
</script>
