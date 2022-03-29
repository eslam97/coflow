<template>
    <b-row>
      <b-col sm="12">
        <iq-card body-class=" profile-page p-0">
          <template v-slot:body>
            <div class="profile-header">
              <div class="profile-info p-2">
                <b-row>
                  <b-col md="6" sm="12">
                    <div class="user-detail pl-5">
<!--                      {{userImage}}-->
                      <div class="d-flex flex-wrap align-items-center">
                        <div class="profile-div text-center m-auto position-relative" :style="{
                          backgroundImage:'url(' + userImage+ ')' }"
                             @click="viewMemberImage">
                          <span
                              ref="file"
                              class="position-absolute d-block capture_image"
                          ><i class="las la-camera"></i></span>
                          <input type="file" id="file" @change="previewImage" class=" position-absolute capture_image"
                                 accept="image/*" style="opacity: 0;"/>
                        </div>
                        <div class="profile-detail d-flex align-items-center">
                          <h4>{{user.name}}</h4>
                          <h5 class="m-0 pl-3 text-secondary"> {{user.phone}} </h5>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="6" sm="12" class="d-flex align-items-center justify-content-center">
                    <tab-nav :pills="true" id="pills-tab" class="profile-feed-items d-flex justify-content-between">
                      <tab-nav-items :active="true" id="pills-feed-tab" href="#profile-package" ariaControls="pills-home" role="tab" :ariaSelected="true" title="Membership" />
                      <tab-nav-items :active="false" id="pills-friend-tab" href="#profile-friends" ariaControls="pills-contact" role="tab" :ariaSelected="false" title="Financial" @click="getAllPayments"/>
                      <tab-nav-items :active="false" id="pills-profile-tab" ariaControls="pills-contact" role="tab" :ariaSelected="false" title="trainning" />
                      <tab-nav-items :active="false" id="pills-activities-tab" href="#profile-activity" ariaControls="pills-contact" role="tab" :ariaSelected="false" title="activities" @click="getFreezeReport(); getFreezeReport(); getRefundReport()"/>
                    </tab-nav>
                  </b-col>
                </b-row>
              </div>
            </div>
          </template>
        </iq-card>
      </b-col>
      <b-col sm="12">
        <b-row>
          <b-col lg="4" class="profile-right">
            <user-info :user= "user" :lead="lead"/>
            <invitations></invitations>
          </b-col>
          <b-col lg="8" class="profile-center">
            <tab-content id="pills-tabContent-2">
              <tab-content-item :active="true" id="profile-package" aria-labelled-by="pills-feed-tab">
                <div class="iq-card p-1">
                  <b-tabs content-class="mt-1 pb-0" align="left">
                    <b-tab title="Packages" active @click="setgetMemberPackagesOrMemberServices('package')">
                    </b-tab>
                    <b-tab title="Services" @click="setgetMemberPackagesOrMemberServices('service')">
                    </b-tab>
                  </b-tabs>
                </div>
                <!--details-->
                <packageOrServiceDetails :details="getMemberPackagesOrMemberServices" :loading="packageOrServiceDetailsLoading" @reload="setgetMemberPackagesOrMemberServices"/>
              </tab-content-item>
              <tab-content-item :active="false" id="profile-activity" aria-labelled-by="pills-activity-tab">
                <div class="iq-card p-1">
                  <tab-nav :tabs="true" id="myTab-three">
                    <tab-nav-items :active="true" id="home-tab-three" ariaControls="home" href="#refund-activity" role="tab" :ariaSelected="true" title="Check In" @click="changeTitle('Check In')" @submit="getVisitReport"/>
                    <tab-nav-items :active="false" id="profile-tab-three" ariaControls="profile" href="#profile-three" role="tab" :ariaSelected="false" title="Refund" @click="changeTitle('Refund')" @submit="getRefundReport"/>
                    <tab-nav-items :active="false" id="freeze-tab-three" ariaControls="freeze" href="#freeze-activity" role="tab" :ariaSelected="false" title="Freeze" @click="changeTitle('Freeze')" @submit="getFreezeReport"/>
                  </tab-nav>
                </div>
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title"> {{ activityTitle }} Activity</h4>
                  </template>
                  <template  v-slot:body>
                    <tab-content id="myTabContent-4">
                      <tab-content-item :active="true" id="refund-activity" aria-labelled-by="home-tab-three">
                        <div v-if="AllVisits.length > 0">
                          <ul class="iq-timeline" id="visitesList">
                            <li v-for="(item,index) in AllVisits" :key="index">
                              <div class="timeline-dots" :class="'border-primary'"></div>
                              <h6 class="float-left mb-1">Check In</h6>
                              <small class="float-right mt-1 font-weight-bold text-success" v-html="item.check_in"></small>
                              <div class="d-inline-block w-100">
                                <h6 class="float-left mb-1 text-secondary">Check Out</h6>
                                <small class="float-right mt-1 font-weight-bold text-danger" v-html="item.check_out ? item.check_out : 'In Gym'"></small>
                              </div>
                              <h5 class="float-left mb-1 text-success">Details :</h5>
                              <div class="d-inline-block w-100 pl-4">
                                <div class="mt-1 font-weight-bold text-secondary">
<!--                                  {{item.activity[0].member_package.package_title}}-->
                                  <p v-for="(i, key) in item.activity" :key="key">
                                    <span class="text-primary">{{i.member_package.package_title}}</span> =>
                                    <span v-for="(data, key) in i.services" :key="key">
                                      <span class="text-success">{{data.service_title}}</span>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <b-pagination v-model="visiteCurrentPage"
                                        class="mt-3"
                                        :total-rows="visitetotal"
                                        align="right"
                                        :per-page="visiteper_page"
                                        aria-controls="visiteList"
                                        @input="changeContentActivities"
                          ></b-pagination>
                        </div>
                        <div v-else>
                          <iq-card body-class="p-0" class="rounded text-center">
                            <img :src="require('../../assets/images/error/search.png')" class="avatar-200" />
                            <p class="font-size-18 pb-2">Oops!... no data found</p>
                          </iq-card>
                        </div>                  </tab-content-item>
                      <tab-content-item :active="false" id="profile-three" aria-labelled-by="profile-tab-three">
                        <div v-if="allRefunds.length > 0">
                          <ul class="iq-timeline" id="refundsList">
                            <li v-for="(item,index) in allRefunds" :key="index">
                              <div class="timeline-dots" :class="'border-primary'"></div>
                              <h6 class="float-left mb-1">{{ item.member_package.package_title }} <span class="text-black"> - Paid Amount</span> <span class="text-success"> {{ parseFloat(item.cost) }} EGP</span></h6>
                              <small class="float-right mt-1 font-weight-bold text-primary">{{ item.updated_at }}</small>
                              <div class="d-inline-block w-100">
                                <h6 class="float-left mb-1 text-secondary">
                                  <span v-if="item.status == 'rejected'" class="text-danger">{{ item.status }}</span>
                                  <span v-if="item.status == 'pinding'" class="text-gray">{{ item.status }}</span>
                                  <span v-if="item.status == 'approved'" class="text-success">{{ item.status }} - Refund Amount {{parseFloat(item.value)}} EGP</span>
                                </h6>
                              </div>
                            </li>
                          </ul>
                          <b-pagination v-model="visiteCurrentPage"
                                        class="mt-3"
                                        :total-rows="visitetotal"
                                        align="right"
                                        :per-page="visiteper_page"
                                        aria-controls="visiteList"
                                        @input="changeContentActivities"
                          ></b-pagination>
                        </div>
                        <div v-else>
                          <iq-card body-class="p-0" class="rounded text-center">
                            <img :src="require('../../assets/images/error/search.png')" class="avatar-200" />
                            <p class="font-size-18 pb-2">Oops!... no data found</p>
                          </iq-card>
                        </div>
                      </tab-content-item>
                      <tab-content-item :active="false" id="freeze-activity" aria-labelled-by="freeze-tab-three">
                        <div v-if="allFreeze.length > 0">
                          <ul class="iq-timeline" id="freezeList">
                            {{item}}
                            <li v-for="(item,index) in allFreeze" :key="index">
                              <div class="timeline-dots" :class="'border-primary'"></div>
                             <h6 class="float-left mb-1"> <span class="text-success">{{ item.member_package.freezing_weeks }} Weeks</span> In <span class="text-success">{{ item.member_package.package_title }} </span></h6>
                              <small class="float-right mt-1 font-weight-bold text-success"> Start -> {{item.start}}</small>
                              <div class="d-inline-block w-100">
                                <small class="float-right mt-1 font-weight-bold text-danger"> end -> {{item.end}}</small>

                                <!--                                <h6 class="float-left mb-1 text-secondary">
                                                                  <span class="text-danger">{{ item.member_package }}</span>
                                                                  <span class="text-gray">{{ item.end }}</span>
                                                                  &lt;!&ndash; <span v-if="item.status == 'aproved'" class="text-success">{{ item.status }} - Refund Amount {{parseFloat(item.value)}} EGP</span>&ndash;&gt;
                                                                </h6>-->
                              </div>
                            </li>
                          </ul>
                          <b-pagination v-model="visiteCurrentPage"
                                        class="mt-3"
                                        :total-rows="visitetotal"
                                        align="right"
                                        :per-page="visiteper_page"
                                        aria-controls="visiteList"
                                        @input="changeContentActivities"
                          ></b-pagination>
                        </div>
                        <div v-else>
                          <iq-card body-class="p-0" class="rounded text-center">
                            <img :src="require('../../assets/images/error/search.png')" class="avatar-200" />
                            <p class="font-size-18 pb-2">Oops!... no data found</p>
                          </iq-card>
                        </div>
                      </tab-content-item>
                    </tab-content>
                  </template>
                </iq-card>
              </tab-content-item>
              <tab-content-item :active="false" id="profile-friends" aria-labelled-by="pills-friend-tab">
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">Financial</h4>
                  </template>
                  <template v-slot:body>
                    <div v-if="financialList.length > 0">
                      <ul class="iq-timeline" id="financialList">
                      <li v-for="(item,index) in financialList" :key="index">
                        <div class="timeline-dots" :class="'border-primary'"></div>
<!--                        {{item}}-->
                         <h6 class="float-left mb-1">Pay <span
                             class="text-success font-weight-bold">{{parseFloat(item.pay)}} EGP</span> in
                           {{item.member_package.package_title}} <span v-if="item.member_upgrade.length > 0"
                                                                       class="text-danger"> ( upgraded )</span></h6>
<!--                        <h6 class="float-left mb-1"> Method <span
                            class="text-success font-weight-bold">{{item.method}}</span></h6>-->
                        <small class="float-right mt-1 font-weight-bold text-success"> {{item.created_at.substring(0,10)}}</small>
                        <div class="d-inline-block w-100">
                          <h6 class="float-left mb-1">Remaining <span
                              class="text-danger  font-weight-bold">{{parseFloat(item.remaining)}} EGY</span> <span v-if="false" class="d-inline-block ml-5">Receptionist : {{item.user.name}}</span></h6>
                          <br/>
                          <h6 class="float-left mb-1">Payment Method <span
                              class="text-success  font-weight-bold">{{item.method}}</span> </h6>
                        </div>
                      <!-- <h6 class="float-left mb-1">Pay <span class="text-success font-weight-bold">{{parseFloat(item.pay)}} EGP</span> in {{item.member_package.package_title}}</h6>
                       <small class="float-right mt-1 font-weight-bold text-success"> {{item.created_at.substring(0,10)}}</small>
                       <div class="d-inline-block w-100">
                         <h6 class="float-left mb-1">Remaining <span class="text-danger font-weight-bold">{{parseFloat(item.remaining)}} EGY</span> <span v-if="false" class="d-inline-block ml-5">Receptionist : {{item.user.name}}</span></h6>
                       </div>-->
                      </li>
                    </ul>
                      <b-pagination v-model="financialCurrentPage"
                                  class="mt-3"
                                  :total-rows="financialtotal"
                                  align="right"
                                  :per-page="financialper_page"
                                  aria-controls="financialList"
                                  @input="changeContentFinancial"
                    ></b-pagination>
                    </div>
                    <div v-else>
                      <iq-card body-class="p-0" class="rounded text-center">
                        <img :src="require('../../assets/images/error/search.png')" class="avatar-200" />
                        <p class="font-size-18 pb-2">Oops!... no data found</p>
                      </iq-card>
                    </div>
                  </template>
                </iq-card>
              </tab-content-item>
              <tab-content-item :active="false" id="profile-profile" aria-labelled-by="pills-profile-tab">
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">Profile</h4>
                  </template>
                  <template v-slot:body>
                    <div class="user-detail text-center">
                      <div class="user-profile">
                        <b-img :src="require('../../assets/images/user/user-11.png')" alt="profile-img" fluid class="avatar-130" />
                      </div>
                      <div class="profile-detail mt-3">
                        <h3 class="d-inline-block">Nik Jone</h3>
                        <p class="d-inline-block pl-3"> - Web designer</p>
                        <p class="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 500s</p>
                      </div>
                    </div>
                  </template>
                </iq-card>
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">About User</h4>
                  </template>
                  <template v-slot:body>
                    <div class="user-bio">
                      <p>Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes.Topping cake wafer.</p>
                    </div>
                  </template>
                </iq-card>
              </tab-content-item>
            </tab-content>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
</template>
<script>
import { core } from '../../config/pluginInit'
import info from '../../components/members/profile/info'
import packageOrServiceDetails from '../../components/members/profile/packageOrServiceDetails'
import { mapGetters } from 'vuex'
import eventBus from '../../eventBus'
import { commonDataMixin } from '@/mixins/commonMixin'
import memberShipService from '@/services/MemberShip/memberShip'
const invitations = () => import('../../components/members/profile/invitations')
export default {
  name: 'profile',
  data () {
    return {
      user: {
        profile: require('../../assets/images/user/user-11.png'),
        name: '',
        phone: '',
        membership_id: '',
        email: '',
        type: '',
        birthday: '',
        national_id: '',
        QrCode: ''
      },
      userImage: require('../../assets/images/user/user-11.png'),
      lead: {},
      activityTitle: '',
      visiteCurrentPage: 1,
      visiteper_page: 10,
      visitetotal: 6,
      visiteLoading: true,
      galary: [
        { image: require('../../assets/images/page-img/g1.jpg'), href: 'javascript:void(0);' },
        { image: require('../../assets/images/page-img/g2.jpg'), href: 'javascript:void(0);' },
        { image: require('../../assets/images/page-img/g3.jpg'), href: 'javascript:void(0);' },
        { image: require('../../assets/images/page-img/g4.jpg'), href: 'javascript:void(0);' },
        { image: require('../../assets/images/page-img/g5.jpg'), href: 'javascript:void(0);' },
        { image: require('../../assets/images/page-img/g6.jpg'), href: 'javascript:void(0);' },
        { image: require('../../assets/images/page-img/g7.jpg'), href: 'javascript:void(0);' },
        { image: require('../../assets/images/page-img/g8.jpg'), href: 'javascript:void(0);' },
        { image: require('../../assets/images/page-img/g9.jpg'), href: 'javascript:void(0);' }
      ],
      AllVisits: [],
      allRefunds: [],
      allFreeze: [],
      packageOrServiceDetailsLoading: true,
      financialList: [],
      financialCurrentPage: 1,
      financialper_page: 10,
      financialtotal: 6,
      financialLoading: true
    }
  },
  mixins: [commonDataMixin],
  computed: {
    ...mapGetters(['getMemberPackagesOrMemberServices'])
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    packageOrServiceDetails,
    invitations,
    userInfo: info
  },
  methods: {
    viewMemberImage () {
      console.log('aaaaaaaaaaaa')
    },
    resetUser () {
      this.user = {
        profile: require('../../assets/images/user/user-11.png'),
        name: '',
        phone: '',
        membership_id: '',
        email: '',
        type: '',
        birthday: '',
        national_id: '',
        QrCode: ''
      }
    },
    getInfoAboutMember () {
      this.resetUser()
      this.$store.dispatch('getMembership', this.$route.params.id).then(res => {
        this.user.name = res.data.data.member.name
        this.user.phone = res.data.data.member.phone
        this.user.membership_id = res.data.data.member.membership_id
        this.user.type = res.data.data.member.type
        this.user.email = res.data.data.member.email
        this.user.national_id = res.data.data.member.national_id
        this.user.birthday = res.data.data.member.birthday
        this.user.QrCode = res.data.data.code
        this.userImage = res.data.data.member.profile
        this.lead = res.data.data.member.lead
      })
    },
    setgetMemberPackagesOrMemberServices (type = 'package') {
      this.packageOrServiceDetailsLoading = true
      this.$store.dispatch('getMemberPackagesOrMemberServices', { id: this.$route.params.id, type: type }).then(() => {
        this.packageOrServiceDetailsLoading = false
      })
    },
    getVisitReport () {
      this.activityTitle = 'Check In'
      this.inviteLoading = true
      this.$store.dispatch('getAllVisits', {
        pageNumber: this.visiteCurrentPage,
        memberId: this.$route.params.id
      }).then(res => {
        this.AllVisits = res.data.data
        this.visiteCurrentPage = res.data.meta.current_page
        this.visiteper_page = res.data.meta.per_page
        this.visitetotal = res.data.meta.total
        this.visiteLoading = false
      })
    },
    getAllPayments () {
      this.financialLoading = true
      this.$store.dispatch('getAllPayments', {
        pageNumber: this.financialCurrentPage,
        memberId: this.$route.params.id
      }).then(res => {
        this.financialList = res.data.data
        this.financialCurrentPage = res.data.meta.current_page
        this.financialper_page = res.data.meta.per_page
        this.financialtotal = res.data.meta.total
        this.financialLoading = false
      })
    },
    getRefundReport () {
      this.$store.dispatch('getAllRefund', { pageNumber: this.currentPage, memberId: this.$route.params.id }).then(res => {
        this.allRefunds = res.data.data
        this.currentPage = res.data.meta.current_page
        this.per_page = res.data.meta.per_page
        this.total = res.data.meta.total
        this.loadTable = false
      })
    },
    getFreezeReport () {
      this.$store.dispatch('getAllFreeze', { pageNumber: this.currentPage, memberId: this.$route.params.id }).then(res => {
        this.allFreeze = res.data.data
        this.currentPage = res.data.meta.current_page
        this.per_page = res.data.meta.per_page
        this.total = res.data.meta.total
        this.loadTable = false
      })
    },
    changeContentActivities () {
      this.getVisitReport()
    },
    changeContentFinancial () {
      this.getAllPayments()
    },
    changeTitle (title) {
      this.activityTitle = title
    },
    previewImage: function (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
      const fd = new FormData()
      fd.append('file', files[0], files[0].name)
      fd.append('folder', 'member_profile_photo')
      fd.append('access', 'public')
      this.commonUploadFiles(fd).then(res => {
        /*
        console.log(res.data.data.media_id)
*/
        memberShipService.uploadMemberImage(this.$route.params.id, { media_id: res.data.data.media_id }).then(response => {
          core.showSnackbar('success', response.data.message)
        })
      })
      /*      this.$store.dispatch('uploadMemberImage', { userId: this.user.id, image: fd }).then(res => {
        core.showSnackbar('success', res.data.message)
      }) */
    },
    createImage (file) {
      var reader = new FileReader()
      reader.onload = (e) => {
        this.userImage = e.target.result
      }
      reader.readAsDataURL(file)
    }
  },
  mounted () {
    core.index()
    eventBus.$on('checkIn_event', () => {
      this.getVisitReport()
    })
  },
  beforeDestroy () {
    eventBus.$off('checkIn_event')
  },
  created () {
    this.getInfoAboutMember()
    this.setgetMemberPackagesOrMemberServices()
    this.getVisitReport()
    this.getAllPayments()
    this.getRefundReport()
    this.getFreezeReport()
  }
}
</script>
<style scoped>
.profile-img{
  margin-top: 0 !important;
}
</style>
