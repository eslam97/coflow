<template>
  <b-row>
      <b-col sm="12">
        <iq-card body-class="profile-page p-0" class="mb-1">
          <template v-slot:body>
            <div class="profile-header">
              <div class="profile-info p-2">
                <b-row class="">
                  <b-col lg="6"  class="user-detail pl-md-1">
                    <div class="d-flex justify-content-sm-center align-items-center">
                      <div class="pr-md-4">
                        <b-img v-if="member.image" v-bind:src="member.profile" ref="file" alt="profile-img" fluid class="avatar-90" />
                        <b-img v-else :src="profile" ref="file" alt="profile-img" fluid class="avatar-100"  />
                        <input type="file" id="file" class="d-none position-absolute" accept="image/*" style="opacity: 0;" />
                      </div>
                      <div class=" d-flex align-items-center">
                                            <span>
                                           <h4>{{ member.name }}</h4>
                                            <h5 class="text-secondary"> {{memberId}} </h5>
                                              </span>
                      </div>
                    </div>
                  </b-col>
                  <b-col lg="6" xs="12" class="d-flex align-items-center justify-content-center mt-lg-0 mt-xs-3">
                    <tab-nav :pills="true" id="pills-tab" class="profile-feed-items d-flex justify-content-center">
                      <tab-nav-items :active="true" id="pills-packages" href="#packages" ariaControls="pills-packages" role="tab" :ariaSelected="true" title="Packages" />
                      <tab-nav-items :active="false" id="pills-services" href="#services" ariaControls="pills-services" role="tab" :ariaSelected="false" title="Services" />
                    </tab-nav>
                  </b-col>
                  <b-col lg="12" class="profile-center mt-4">
                    <tab-content id="pills-tabContent-2">
                      <tab-content-item :active="true" id="packages" aria-labelled-by="pills-feed-tab">
                        <div class="iq-accordion career-style faq-style">
                          <iq-card :class="`iq-card iq-accordion-block mb-2 ${index == 0 ? 'accordion-active' : ''}`" :id="item.id" v-for="(item,index) in member_package" :key="index" style="background-color: var(--iq-bg-light-color)">
                            <div class="clearfix">
                              <div class="container">
                                <b-row class="py-1 cursor-crosshair" @click="onCollapse" :id="item.id" v-b-toggle="`accordian-${index}`">
                                  <b-col sm="12"><a class="accordion-title"><span> {{ item.package_title }} ( {{item.count_available}} ) </span></a></b-col>
                                </b-row>
                              </div>
                            </div>
                            <b-collapse :id="`accordian-${index}`" :visible="index == 0 ? true : false" accordion="my-accordion" role="tabpanel" class="accordion-details">
                              <b-container>
                                <b-list-group class="lists">
                                                <span v-for="(i, key2) in item.service" :key="key2">
                                                  <span v-if="isNumber(item.reason)">
                                                    <span v-if="i.id == item.reason">
                                                      <b-list-group-item v-if="i.service_available == 0" class='border-1 border-danger my-1 d-flex cursor-not-allowed'>
                                                        <span class="d-flex w-100 justify-content-between text-danger">
                                                          <span> {{ i.service_title }} ({{i.service_available}})</span>
                                                          <span>finished</span>
                                                          <span><span class="text-success">Active till</span> {{item.period_expire_at}}</span>
                                                        </span>
                                                     </b-list-group-item>
                                                      <b-list-group-item v-else class='border-1 border-danger my-1 d-flex cursor-not-allowed'>
                                                        <span class="d-flex w-100 justify-content-between text-danger">
                                                          <span> {{ i.service_title }} ({{i.service_available}})</span>
                                                          <span>one per day</span>
                                                          <span><span class="text-success">Active till</span> {{item.period_expire_at}}</span>
                                                        </span>
                                                     </b-list-group-item>
                                                    </span>
                                                    <span v-else>
                                                        <b-list-group-item v-if="i.service_available == 0" class='border-1 border-danger my-1 d-flex cursor-not-allowed'>
                                                      <span class="d-flex w-100 justify-content-between text-danger">
                                                        <span> {{ i.service_title }} ({{i.service_available}})</span>
                                                        <span> finished</span>
                                                        <span><span class="text-success">Active till</span> {{item.period_expire_at}}</span>
                                                      </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item  v-else :class="[{ 'active' : isSelectedPackages(i.id)},'border-0 my-1 d-flex cursor-pointer']"  @click="checkPackages(i.id)">
                                                      <b-checkbox name="check-button" inline :value="i.id" v-model="packages_ids" @change="checkPackages(i.id)"></b-checkbox>
                                                      <span class="d-flex w-100 justify-content-between">
                                                        <span> {{ i.service_title }} ({{i.service_available}})</span>
                                                        <span><span class="text-success">Active till</span> {{item.period_expire_at}}</span>
                                                      </span>
                                                    </b-list-group-item>
                                                    </span>
                                                  </span>
                                                  <span v-else-if="item.reason =='valid'">
                                                    <b-list-group-item v-if="i.service_available == 0" class='border-1 border-danger my-1 d-flex cursor-not-allowed'>
                                                        <span class="d-flex w-100 justify-content-between text-danger">
                                                          <span> {{ i.service_title }} ({{i.service_available}})</span>
                                                          <span>finished</span>
                                                          <span><span class="text-success">Active till</span> {{item.period_expire_at}}</span>
                                                        </span>
                                                     </b-list-group-item>
                                                     <b-list-group-item  v-else :class="[{ 'active' : isSelectedPackages(i.id)},'border-0 my-1 d-flex cursor-pointer']"  @click="checkPackages(i.id)">
                                                      <b-checkbox name="check-button" inline :value="i.id" v-model="packages_ids" @change="checkPackages(i.id)"></b-checkbox>
                                                      <span class="d-flex w-100 justify-content-between">
                                                        <span> {{ i.service_title }} ({{i.service_available}})</span>
                                                        <span><span class="text-success">Active till</span> {{item.period_expire_at}}</span>
                                                      </span>
                                                    </b-list-group-item>
                                                  </span>
                                                  <span v-else-if="item.reason =='freezing'">
                                                    <b-list-group-item class='border-1 border-danger my-1 d-flex cursor-not-allowed'>
                                                        <span class="d-flex w-100 justify-content-between text-danger">
                                                          <span> {{ i.service_title }} ({{i.service_available}})</span>
                                                          <span>freezing</span>
                                                          <span><span class="text-success">Active till</span> {{item.period_expire_at}}</span>
                                                        </span>
                                                     </b-list-group-item>
                                                  </span>
                                                   <span v-else-if="item.reason =='shift'">
                                                    <b-list-group-item class='border-1 border-danger my-1 d-flex cursor-not-allowed'>
                                                        <span class="d-flex w-100 justify-content-between text-danger">
                                                          <span> {{ i.service_title }} ({{i.service_available}})</span>
                                                          <span>shift</span>
                                                          <span><span class="text-success">Active till</span> {{item.period_expire_at}}</span>
                                                        </span>
                                                     </b-list-group-item>
                                                  </span>
                                                </span>
                                </b-list-group>
                              </b-container>
                            </b-collapse>
                          </iq-card>
                        </div>
                        <div class="d-flex justify-content-center">
                          <b-button variant="primary" class="w-25" @click="checkInPackages">Confirm Packages</b-button>
                        </div>
                      </tab-content-item>
                      <tab-content-item :active="false" id="services" aria-labelled-by="pills-activity-tab">
                        <div class="accordion-details py-2 mb-2" style="background-color:var(--iq-bg-light-color)">
                          <b-container>
                            <b-list-group class="lists">
                                                 <span v-for="(i, key2) in member_Service" :key="key2">
                                                    <b-list-group-item v-if="i.reason!='valid' || i.count_available == 0" class='border-1 border-danger my-1 d-flex cursor-not-allowed'>
                                                     <span class="d-flex w-100 justify-content-between text-danger">
                                                        <span> {{ i.package_title }} ({{i.count_available}})</span>
                                                        <span v-if="i.reason!='valid' && i.count_available == 0"> {{ i.reason }} - finished</span>
                                                        <span v-else-if="i.reason!='valid'"> {{ i.reason }}</span>
                                                        <span v-else-if="i.count_available == 0">finished</span>
                                                        <span><span class="text-success">Active till</span> {{i.period_expire_at}}</span>
                                                     </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item  v-else :class="[{ 'active' : isSelected(i.id)},'border-0 my-1 d-flex cursor-pointer']"  @click="check(i.id)">
                                                      <b-checkbox name="check-button" inline :value="i.id" v-model="services_ids" @change="check(i.id)"></b-checkbox>
                                                      <span class="d-flex w-100 justify-content-between">
                                                       <span> {{ i.package_title }} ({{i.count_available}})</span>
                                                       <span><span class="text-success">Active till</span> {{i.period_expire_at}}</span>
                                                     </span>
                                                  </b-list-group-item>
                                                  </span>
                            </b-list-group>
                          </b-container>
                        </div>
                        <div class="d-flex justify-content-center">
                          <b-button variant="primary" class="w-25" @click="checkInServices">Confirm Service</b-button>
                        </div>
                      </tab-content-item>
                    </tab-content>
                  </b-col>
                </b-row>
              </div>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
</template>
<script>
import { core } from '../../config/pluginInit'
import eventBus from '../../eventBus'
export default {
  props: ['member', 'member_package', 'member_Service', 'memberId'],
  data () {
    return {
      profile: require('../../assets/images/user/default.png'),
      ids: [],
      pIds: [],
      allDetailsServicePackage: [],
      services_ids: [],
      packages_ids: [],
      openPackageId: this.member_package[0].id
    }
  },
  computed: {

  },
  methods: {
    isNumber (string) {
      return !isNaN(string)
    },
    onCollapse (e) {
      const activeEl = document.getElementsByClassName('accordion-active')[0]
      activeEl.classList.remove('accordion-active')
      const el = e.target.closest('.iq-accordion-block')
      el.classList.add('accordion-active')
      // console.log('el', el)
      this.openPackageId = el.id
    },
    checkPackages (id) {
      if (this.packages_ids.includes(id)) {
        // eslint-disable-next-line eqeqeq
        var position = this.packages_ids.findIndex(i => i == id)
        this.packages_ids.splice(position, 1)
        // eslint-disable-next-line eqeqeq
        var positionPackageInDetails = this.allDetailsServicePackage.findIndex(element => element.package_id == this.openPackageId)
        // console.log('pooooooooostion', positionPackageInDetails)
        // eslint-disable-next-line eqeqeq
        var isFoundService = this.allDetailsServicePackage.find(element => element.package_id == this.openPackageId)
        // eslint-disable-next-line eqeqeq
        var positionServiceIdInPackges = isFoundService.service_id.findIndex(el => el == id)
        isFoundService.service_id.splice(positionServiceIdInPackges, 1)
        // console.log('isFoundService.service_id.length', isFoundService.service_id.length)
        // eslint-disable-next-line eqeqeq
        if (isFoundService.service_id.length == 0) {
          this.allDetailsServicePackage.splice(positionPackageInDetails, 1)
        }
      } else {
        this.packages_ids.push(id)
        // eslint-disable-next-line eqeqeq
        var isFound = this.allDetailsServicePackage.find(element => element.package_id == this.openPackageId)
        if (isFound) {
          isFound.service_id.push(id)
        } else {
          this.allDetailsServicePackage.push({
            package_id: this.openPackageId,
            service_id: [id]
          })
        }
      }
    },
    isSelectedPackages (id) {
      if (this.packages_ids.includes(id)) {
        return true
      } else {
        return false
      }
    },
    check (id) {
      if (this.services_ids.includes(id)) {
        // eslint-disable-next-line eqeqeq
        var position = this.ids.findIndex(i => i == id)
        this.services_ids.splice(position, 1)
      } else {
        this.services_ids.push(id)
      }
    },
    isSelected (id) {
      if (this.services_ids.includes(id)) {
        return true
      } else {
        return false
      }
    },
    checkInServices () {
      this.$store.dispatch('checkInServices', { id: this.member.id, services_ids: this.services_ids }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('checkInModal')
        this.services_ids = []
        eventBus.$emit('checkIn_event')
      }).catch(err => {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          core.showSnackbar('error', value)
        }
      })
    },
    checkInPackages () {
      this.$store.dispatch('checkInPackages', { id: this.member.id, data: this.allDetailsServicePackage }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('checkInModal')
        this.packages_ids = []
        this.allDetailsServicePackage = []
        eventBus.$emit('checkIn_event')
      }).catch(err => {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          // console.log(key)
          core.showSnackbar('error', value)
        }
      })
    }
  }
}

</script>
