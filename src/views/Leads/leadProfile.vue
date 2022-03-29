<template>
  <b-row>
    <b-modal id="addMyLead" size="lg" title="Add My Lead" hide-footer no-close-on-backdrop>
      <addMyLead :leads="userInfo.data" />
    </b-modal>
    <b-col sm="12" v-if="userInfo">
      <iq-card body-class=" profile-page p-0">
        <template v-slot:body>
          <div class="profile-header">
            <div class="profile-info p-2">
              <b-row v-if="!loading">
                <b-col md="6" sm="12">
                  <div class="user-detail pl-5">
                    <div class="d-flex flex-wrap align-items-center">
                      <div class="profile-img pr-4">
                        <b-img v-bind:src="profile" ref="file" alt="profile-img" fluid class="avatar-80 cursor-pointer" />
                      </div>
                      <div class="profile-detail d-flex align-items-center">
                        <h4>{{userInfo.data.name}}</h4>
                      </div>
                      <div class="profile-detail d-flex align-items-center">
                        <h5 class="m-0 pl-3 text-secondary"> {{userInfo.data.phone}} </h5>
                      </div>
                    </div>
                  </div>
                </b-col>
                <b-col md="6" sm="12" class="d-flex align-items-center justify-content-end">
                  <b-button variant="primary" @click = "showAddMyLead">Add My Lead</b-button>
                </b-col>
              </b-row>
            </div>
          </div>
        </template>
      </iq-card>
    </b-col>
    <b-col sm="12">
      <b-row>
        <b-col lg="12" class="profile-center">
          <div class="text-center" v-if="loadingTable">
            <div class="text-cesnter">
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </div>
          </div>
          <iq-card class="rounded pb-1" v-else>
            <template v-slot:body>
            <b-table striped responsive :fields="columns" :items="allHistory" class="mb-0 table-borderless">
              <template v-slot:cell(call_status)="data3">
                {{data3.item.call_status? data3.item.call_status.title:'ــــــــ'}}
              </template>
              <template v-slot:cell(user)="data3">
                {{data3.item.user.name}}
              </template>
              <template v-slot:cell(date)="data3">
                {{data3.item.date?data3.item.date.substr(0,10):'ــــــــ'}}
              </template>
              <template v-slot:cell(period)="data3">
                {{data3.item.period?data3.item.period.substr(0,10):'ــــــــ'}}
              </template>
              <template v-slot:cell(source)="data3">
                {{data3.item.source?data3.item.source.title:'ــــــــ'}}
              </template>
              <template v-slot:cell(inquiry)="data3">
                {{data3.item.inquiry?data3.item.inquiry.title:'ــــــــ'}}
              </template>
              <template v-slot:cell(project)="data3">
                {{data3.item.project?data3.item.project.en_title:'ــــــــ'}}
              </template>
              <template v-slot:cell(comment)="data3">
                {{data3.item.comment?data3.item.comment:'ــــــــ'}}
              </template>
            </b-table>
            </template>
            <b-pagination v-model="currentPage"
                          class="mt-3"
                          :total-rows="total"
                          align="right"
                          :per-page="per_page"
                          aria-controls="my-table"
                          @input="changeContent"
            ></b-pagination>
<!--          <span v-if="details.length > 0">
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
                    <b-dropdown-item href="#" @click="showPopupUpgrade(i.package_id,i.id, i.title)"><i class="las la-inbox mr-2"></i>Upgrade</b-dropdown-item>
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
                  <b-row>d
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
            </iq-card>-->
          </iq-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { core } from '../../config/pluginInit'
import addMyLead from '../../components/leads/addMyLead'
export default {
  name: 'leadProfile',
  mounted () {
    core.index()
  },
  components: {
    addMyLead
  },
  data () {
    return {
      loading: false,
      loadingTable: false,
      userInfo: {},
      allHistory: [],
      profile: require('../../assets/images/user/user.jpg'),
      columns: [
        { label: 'Status', key: 'call_status', class: 'text-left' },
        { label: 'Comment', key: 'comment', class: 'text-left' },
        { label: 'User Name', key: 'user', class: 'text-left' },
        { label: 'Date', key: 'date', class: 'text-left' },
        { label: 'End_Period', key: 'period', class: 'text-left' },
        { label: 'Inquiry', key: 'inquiry', class: 'text-left' },
        { label: 'Project', key: 'project', class: 'text-left' },
        { label: 'Source', key: 'source', class: 'text-left' }
      ],
      currentPage: 1,
      per_page: 10,
      total: 6
    }
  },
  props: ['newId'],
  watch: {
    '$route.params.id' (newId) {
      this.loadingTable = true
      this.$store.dispatch('gitHistory', { id: newId, pageNumber: 1 }).then(res => {
        this.allHistory = res.data.data.data
        this.loadingTable = false
      })
    }
  },
  methods: {
    showAddMyLead () {
      this.$bvModal.show('addMyLead')
    },
    getInfoAboutMember () {
      this.loading = true
      this.$store.dispatch('GetSpacificLead', this.$route.params.id).then(res => {
        // console.log(res)
        this.userInfo = res.data
        this.loading = false
      })
    },
    getLeadHistory () {
      this.loadingTable = true
      this.$store.dispatch('GetSpacificLead', this.$route.params.id).then(res => {
        this.userInfo = res.data
        this.loadingTable = false
      })
    },
    showHistory () {
      this.loadingTable = true
      this.$store.dispatch('gitHistory', { id: this.$route.params.id, pageNumber: 1 }).then(res => {
        this.allHistory = res.data.data.data
        this.loadingTable = false
      })
    }
  },
  created () {
    this.getInfoAboutMember()
    this.showHistory()
  }
}
</script>
<style scoped>
.profile-img{
  margin-top: 0 !important;
}
</style>
