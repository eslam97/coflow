<template>
  <iq-card>
    <b-modal id="statusHistory" size="lg" title="History" hide-footer no-close-on-backdrop>
      <div class="border border-dark" style="padding: 10px;border: 1px solid #cbcbcb !important;margin-bottom: 16px;">
        <statusHistory :allHistory="history"/>
      </div>
    </b-modal>
    <template v-slot:headerTitle>
      <h4 class="card-title">Info</h4>
    </template>
    <b-modal id="checkInModal" size="lg" title="Check In" hide-footer no-close-on-backdrop>
      <check-in-modal :member="member" :member_package="member_package" :member_Service="member_Service" :memberId="user.membership_id"/>
    </b-modal>
    <b-modal id="addMyLead" size="lg" title="Add My Lead" hide-footer no-close-on-backdrop>
      <addMyLead :leads="lead" />
    </b-modal>
    <template v-slot:body>
      <div class="about-info m-0 p-0" v-if="user.membership_id">
        <b-row class="mb-2">
          <b-col cols="3">Qr Code: </b-col>
          <b-col cols="9">
            <img alt="search button" :src="'data:image/svg+xml;base64,' + user.QrCode" />
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">ID: </b-col>
          <b-col cols="9">{{user.membership_id}}</b-col>
        </b-row>
        <!--        <b-row class="mb-2">
                  <b-col cols="3">Branch: </b-col>
                  <b-col cols="9">{{user.email}}</b-col>
                </b-row>-->
        <b-row class="mb-2">
          <b-col cols="3">Email: </b-col>
          <b-col cols="9">{{user.email}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">Phone:</b-col>
          <b-col cols="9">{{user.phone}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">Birthday:</b-col>
          <b-col cols="9">{{user.birthday}}</b-col>
        </b-row>
        <b-row>
          <b-col cols="3">National:</b-col>
          <b-col cols="9">{{user.national_id}}</b-col>
        </b-row>
        <b-row>
          <div class="w-100">
            <b-button variant=" iq-bg-primary iq-waves-effect" class="w-100 mt-3" @click="checkin" v-if="!checkinLoading">Check In</b-button>
            <b-button variant=" iq-bg-primary iq-waves-effect" class="w-100 mt-3" v-else><spinner-loading
                text="Loading" /></b-button>
          </div>
          <b-button variant=" iq-bg-primary iq-waves-effect" class="mt-2 w-100" @click = goToPackage>Add Package / Service</b-button>
          <b-button variant=" iq-bg-primary iq-waves-effect" class="mt-2 w-100" @click = "showAddMyLead">Add My Lead</b-button>
          <b-button variant=" iq-bg-primary iq-waves-effect" class="mt-2 w-100" @click = "showHistory">Show History
          </b-button>
        </b-row>
      </div>
      <div class="about-info m-0 p-0" v-else>
        <div class="text-center">
          <b-spinner small type="grow"></b-spinner>
          Loading...
        </div>
      </div>
    </template>
  </iq-card>
</template>

<script>
import checkInModal from '../checkInModal'
import addMyLead from '../../../components/leads/addMyLead'
import leadService from '@/modules/leads/services/leads'
const statusHistory = () => import('@/components/statusHistory/statusHistory')
export default {
  name: 'info',
  props: {
    user: {
      type: Object
    },
    lead: {
      type: Object
    }
  },
  components: {
    checkInModal,
    addMyLead,
    statusHistory
  },
  data () {
    return {
      finishSearch: true,
      member: {},
      member_package: [],
      member_Service: [],
      history: [],
      checkinLoading: false
    }
  },
  methods: {
    showHistory () {
      leadService.gitHistory({ id: this.lead.id, pageNumber: 1 }).then(res => {
        this.history = res.data.data.data
        this.$bvModal.show('statusHistory')
      })
    },
    checkin () {
      this.checkinLoading = true
      this.member_package = []
      this.member_Service = []
      this.$store.dispatch('searchByMemberID', this.user.membership_id).then(res => {
        this.member = res.data.data.member
        var newArr = res.data.data.all
        for (var index = 0; index < newArr.length; index++) {
          for (var index1 = 0; index1 < newArr[index].length; index1++) {
            newArr[index][index1].active = false
            if (newArr[index][index1].type === 'package') {
              this.member_package.push(newArr[index][index1])
            } else {
              this.member_Service.push(newArr[index][index1])
            }
          }
        }
        this.openPackageId = this.member_package[0].id
        this.$bvModal.show('checkInModal')
      }).catch((err) => {
        console.log(err.response)
      }).finally(() => {
        this.checkinLoading = false
      })
    },
    goToPackage () {
      this.$router.push({ name: 'newMember', query: { member_id: this.$route.params.id } })
    },
    showAddMyLead () {
      this.$bvModal.show('addMyLead')
    }
  }
}
</script>

<style scoped>

</style>
