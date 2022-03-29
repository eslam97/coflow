<template>
  <section>
    <b-modal centered id="refundDetails" title="Details" hide-footer no-close-on-backdrop>
      <b-list-group-item class="border-active border-1  my-1 d-flex d-flex w-100 justify-content-between" v-for="(i, key) in refundDetails" :key="key">
        <span> {{ i.value }}</span>
        <span> {{ i.status }}</span>
        <b-button v-if="i.status == 'approved' && !i.done_at"  variant=" iq-bg-success mr-1 mb-0" size="sm" @click="refundDone(i.id)"><i class="las la-check"></i></b-button>
        <b-button v-if="i.status == 'approved' && !i.done_at"  variant=" iq-bg-danger mr-1 mb-0" size="sm" @click="refundReject(i.id)"><i class="las la-times"></i></b-button>
        <span v-if="i.done_at">{{i.done_at.substring(0,10)}}</span>
      </b-list-group-item>
    </b-modal>
    <b-modal centered id="packageDetails" title="Details" hide-footer no-close-on-backdrop>
      <package-info :packageInfo="popupPackageInfo"></package-info>
    </b-modal>
    <b-modal id="packageService" size="md" :title="packageName" hide-footer no-close-on-backdrop>
      <servicesPackage :services="servicesPackge"/>
    </b-modal>
    <b-modal id="pay" size="md" :title="packageName" hide-footer no-close-on-backdrop>
      <pay :remainingAmount="remainingAmount" @pay="pay"/>
    </b-modal>
    <b-modal id="freeze" size="md" :title="packageName" hide-footer no-close-on-backdrop>
      <freeze :freezeNumber="frezzeNumber" @freeze="freeze"/>
    </b-modal>
    <b-modal id="invitation" size="md" :title="packageName" hide-footer no-close-on-backdrop>
      <invitation @invite="inviteFriend"/>
    </b-modal>
    <b-modal id="transfer" size="lg" :title="packageName" hide-footer no-close-on-backdrop>
      <transfer @transfer="trnasfer"/>
    </b-modal>
    <b-modal id="breackFrezze" size="md" :title="packageName" hide-footer no-close-on-backdrop>
      <b-container fluid>
        <h5>Are You sure breack frezze in {{packageName}} ?</h5>
        <b-button variant="primary" class="float-right w-25 mt-4" @click="breackFrezze">Yes</b-button>
      </b-container>
    </b-modal>
    <b-modal id="upgrade" size="xl" :title="packageName" hide-footer no-close-on-backdrop>
      <b-container fluid>
        <upgrade :availablePackages="availablePackages" :packageInfoToUpgrade = "packageInfoToUpgrade" @upgrade="upgrade"/>
      </b-container>
    </b-modal>
    <div v-if="loading" class="text-center">
      <div class="text-cesnter">
        <b-spinner small type="grow"></b-spinner>
        Loading...
      </div>
    </div>
    <div v-else>
      <span v-if="details.length > 0">
        <iq-card body-class="p-0" class="rounded" v-for="(i, key) in details" :key="key">
        <template v-slot:body>
          <div class="user-post-data px-3 py-2">
            <div class="d-flex flex-wrap">
              <div class="media-support-info mt-2">
                <h5 class="mb-0" v-if="i.type =='package'" @click="showPackageInfo(i)"><b-link href="#" class="">{{ i.title }}</b-link></h5>
                <h5 class="mb-0" v-else><b-link href="#" class="">{{ i.title }}</b-link></h5>
                <p v-if="i.available" class="mb-0 text-primary">Active</p>
                <p v-else class="mb-0 text-danger">Expired</p>
              </div>
              <span class="d-flex align-items-center">
                <b-button variant="secondary" type="submit" class="mr-4" v-if="i.member_refund.length>0 && i.member_refund[0].status == 'pending'">Refund</b-button>
                <b-button variant="success" type="submit" class="mr-4" @click="show_details_refund(i.member_refund)" v-else-if="i.member_refund.length>0 && i.member_refund[0].status == 'approved'">Refund</b-button>
                <b-button variant="danger" type="submit" class="mr-4" v-else-if="i.member_refund.length>0 && i.member_refund[0].status == 'rejected'">Refund</b-button>
                <span class="text-primary cursor-pointer" @click="showServices(i.id, i.title)" v-if="i.type =='package'">Services</span>
                <div class="iq-card-header-toolbar" v-if="i.available">
                  <b-dropdown id="dropdownMenuButton40" right variant="none" menu-class="p-0">
                    <template v-slot:button-content>
                      <b-link href="#" class="text-secondary"><i class="ri-more-2-line ml-3"></i></b-link>
                    </template>
                    <b-dropdown-item href="#" @click="showPopupUpgrade(i.package_id,i.id, i.title, i)"><i class="las la-inbox mr-2"></i>Upgrade</b-dropdown-item>
                    <b-dropdown-item v-if="i.available_invitation" @click="showInvitation(i.id, i.title)"><i class="ri-user-add-line mr-2"></i>Invitations</b-dropdown-item>
                    <b-dropdown-item href="#" @click="showTransfer(i.id, i.title)"><i class="las la-exchange-alt mr-2"></i>Transfer</b-dropdown-item>
                    <b-dropdown-item v-if="i.remaining != 0" @click="showPay(i.id, i.title, i.remaining)"><i class="las la-money-bill-wave mr-2"></i>Pay</b-dropdown-item>
                    <b-dropdown-item v-if="i.available_freezing" @click="showFreeze(i.id, i.title, i.available_freezing)"><i class="las la-snowflake mr-2"></i>Freeze</b-dropdown-item>
                    <b-dropdown-item v-if="i.available_freezing && i.freezing" @click="showPopupBreackFrezze(i.id, i.title)"><i class="las la-snowflake mr-2"></i>Breack Freeze</b-dropdown-item>
                </b-dropdown>
                </div>
              </span>
            </div>
          </div>
        </template>
        <hr class="mt-0">
        <div class="user-post">
          <div class="px-3 pt-1 pb-2">
            <div class="about-info m-0 p-0">
              <b-row>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-success">Start Date: </b-col>
                    <b-col cols="7">{{ i.start_at }}</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black" >Created By: </b-col>
                    <b-col cols="7">{{ i.user.created_by }}</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-danger">End Date: </b-col>
                    <b-col cols="7">{{ i.expire_at }}</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                           <b-col cols="5" class="text-black" >Created At: </b-col>
                    <b-col cols="7">  {{timeConvert(i.created_at)}}</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Freeze: </b-col>
                    <b-col cols="7">{{ i.available_freezing }}  <span class="text-warning" v-if="i.freezing">( {{i.freezing}} )</span></b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Sales Person: </b-col>
                    <b-col cols="7">{{ i.sales_target ? i.sales_target.sales.name : 'From Branch' }}</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Invitations: </b-col>
                    <b-col cols="7">{{ i.available_invitation }}</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Count: </b-col>
                    <b-col cols="7">{{ i.available_visits }}</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Cost: </b-col>
                    <b-col cols="7">{{ parseFloat(i.cost) }} EGP</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Discount: </b-col>
                    <b-col cols="7">{{ parseFloat(i.discount) }} EGP</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">After Discount: </b-col>
                    <b-col cols="7">{{ parseFloat(i.net) }} EGP</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Paid Amount: </b-col>
                    <b-col cols="7">{{ parseFloat(i.paid) }} EGP</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Remaining Amount: </b-col>
                    <b-col cols="7">{{ parseFloat(i.remaining) }} EGP</b-col>
                  </b-row>
                </div>
              </b-row>
            </div>
          </div>
        </div>
      </iq-card>
      </span>
      <iq-card v-else body-class="p-0" class="rounded text-center">
        <img :src="require('../../../assets/images/error/search.png')" class="avatar-200" />
        <p class="font-size-18 pb-2">Oops!... no data found</p>
      </iq-card>
    </div>
  </section>
</template>

<script>
import servicesPackage from './modal/servicesPackage'
import pay from './modal/pay'
import freeze from './modal/freeze'
import invitation from './modal/invitation'
import transfer from './modal/transfer'
import upgrade from './modal/upgrade'
import { core } from '../../../config/pluginInit'
import packageInfo from '../../packageInfo'
import eventBus from '../../../eventBus'
export default {
  name: 'packageOrServiceDetails',
  props: {
    details: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  data () {
    return {
      popupPackageInfo: {},
      servicesPackge: [],
      packageId: '',
      packageName: '',
      remainingAmount: '',
      frezzeNumber: '',
      package_main_id: '',
      availablePackages: [],
      refundDetails: '',
      packageInfoToUpgrade: {}
    }
  },
  methods: {
    refundReject (id) {
      this.$store.dispatch('submitStatus', { refundId: id, data: { status: 'rejected', value: 0 } }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('refundDetails')
      }).catch(err => {
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        } else if (err.response.data.error) {
          core.showSnackbar('error', err.response.data.error)
        }
      })
    },
    showPackageInfo (info) {
      this.$store.dispatch('getSpacificPackages', info.package_id).then(data => {
        // console.log(data.data.data)
        this.popupPackageInfo = data.data.data
        this.$bvModal.show('packageDetails')
      })
    },
    showServices (packageID, packageName) {
      this.packageName = packageName
      this.servicesPackge = this.$store.getters.getServicesOfPackage(packageID)
      this.$bvModal.show('packageService')
    },
    showPay (packageID, packageName, remaining) {
      this.packageId = packageID
      this.packageName = packageName
      this.remainingAmount = remaining
      this.$bvModal.show('pay')
    },
    showFreeze (packageID, packageName, frezzeNumber) {
      this.packageId = packageID
      this.packageName = packageName
      this.frezzeNumber = frezzeNumber
      this.$bvModal.show('freeze')
    },
    showInvitation (packageID, packageName) {
      this.packageId = packageID
      this.packageName = packageName
      this.$bvModal.show('invitation')
    },
    showTransfer (packageID, packageName) {
      this.packageId = packageID
      this.packageName = packageName
      this.$bvModal.show('transfer')
    },
    showPopupBreackFrezze (packageId, packageName) {
      this.packageId = packageId
      this.packageName = packageName
      this.$bvModal.show('breackFrezze')
    },
    showPopupUpgrade (packageId, packageID, packageName, infoPackage) {
      this.packageInfoToUpgrade = infoPackage
      this.package_main_id = packageID
      this.$store.dispatch('getAvailablePackageToUpgrade', packageId).then(res => {
        this.availablePackages = res.data.data
      })
      this.packageId = packageId
      this.packageName = packageName
      this.$bvModal.show('upgrade')
    },
    pay (data) {
      this.$store.dispatch('payRemaining', { memberId: this.$route.params.id, packageId: this.packageId, data: data }).then(res => {
        // eslint-disable-next-line eqeqeq
        var position = this.details.findIndex(p => p.id == this.packageId)
        this.details[position].paid = parseFloat(this.details[position].paid) + parseFloat(data.value)
        this.details[position].remaining = parseFloat(this.details[position].remaining) - parseFloat(data.value)
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('pay')
      }).catch(err => {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          core.showSnackbar('error', value)
        }
      })
    },
    freeze (data) {
      this.$store.dispatch('storeFrezze', {
        userId: this.$route.params.id,
        data: { member_package: this.packageId, start: data.start, weeks: data.weeks }
      }).then(res => {
        // eslint-disable-next-line eqeqeq
        var position = this.details.findIndex(p => p.id == this.packageId)
        this.details[position].available_freezing = parseFloat(this.details[position].available_freezing) - res.data.data.weeks_count
        this.details[position].freezing = res.data.data.end.date.toString().substring(0, 10)
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('freeze')
      }).catch(err => {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          core.showSnackbar('error', value)
        }
      })
    },
    inviteFriend (data) {
      this.$store.dispatch('inviteFriend', {
        memberId: this.$route.params.id,
        data: { member_package: this.packageId, phone: data.phone, name: data.name, national: data.national }
      }).then(res => {
        // eslint-disable-next-line eqeqeq
        var position = this.details.findIndex(p => p.id == this.packageId)
        this.details[position].available_invitation = parseFloat(this.details[position].available_invitation) - 1
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('invitation')
        eventBus.$emit('invitation_event')
      }).catch(err => {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          core.showSnackbar('error', value)
        }
      })
    },
    trnasfer (data) {
      this.$store.dispatch('transferPackage', {
        memberId: this.$route.params.id,
        data: {
          transfer_to: data.id,
          fees: data.fees,
          payment_method: data.payment_method,
          member_packages: [this.packageId]
        }
      }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('transfer')
      }).catch(err => {
        core.showSnackbar('error', err.response.data.error)
      })
    },
    breackFrezze () {
      this.$store.dispatch('breackFrezze', {
        packageId: this.packageId,
        memberId: this.$route.params.id
      }).then(res => {
        core.showSnackbar('success', res.data.message)

        this.$bvModal.hide('breackFrezze')
      }).catch(err => {
        core.showSnackbar('error', err.response.data.error)
      })
    },
    upgrade (details) {
      // console.log(details)
      this.$store.dispatch('upgradePackage', {
        memberId: this.$route.params.id,
        data: {
          package_to: details.details.packageId,
          fees: details.details.fees,
          payment_method: details.details.payment_method,
          member_package: this.package_main_id
        }
      }).then(res => {
        // console.log('res', res)
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('upgrade')
        this.$emit('reload')
      }).catch(err => {
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        } else if (err.response.data.error) {
          core.showSnackbar('error', err.response.data.error)
        }
      })
    },
    show_details_refund (details) {
      this.refundDetails = details
      this.$emit('reload')
      this.$bvModal.show('refundDetails')
    },
    refundDone (id) {
      // console.log(id)
      this.$store.dispatch('refundDone', { userId: this.$route.params.id, id: id }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('refundDetails')
      }).catch(err => {
        core.showSnackbar('error', err.response.data.error)
      })
    }
  },
  components: {
    servicesPackage,
    pay,
    invitation,
    freeze,
    transfer,
    upgrade,
    packageInfo
  }
}
</script>

<style scoped>

</style>
