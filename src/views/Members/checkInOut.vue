<template>
  <div>
    <member-menu/>
      <b-row>
        <b-col lg="12">
          <iq-card>
            <template v-slot:body>
              <div class="new-user-info">
                <b-row>
                  <b-form-group class="col-md-12" label="User ID:" label-for="Member ID:">
                    <b-form-input autofocus ref="inputUserId" @blur="autoFocus" @update="searchPhoneNumber"  v-model="memberId" type="text" placeholder="Scan Barcode"></b-form-input>
                  </b-form-group>
                  <div v-if="!finishSearch" class="text-center col-md-12">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                  </div>
                  <div v-else-if="notFound && finishSearch" class="text-center col-md-12">
                    {{notFound}}
                  </div>
                  <!-- start Modal -->
                  <b-modal id="checkInModal" size="lg" title="Check In" hide-footer no-close-on-backdrop>
                    <check-in-modal :member="member" :member_package="member_package" :member_Service="member_Service" :memberId="memberId"/>
                  </b-modal>
                  <!-- end Modal -->
                </b-row>
              </div>
            </template>
          </iq-card>
        </b-col>
        <b-col lg='12'>
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Check In</h4>
            </template>
            <template v-slot:body>
              <div v-if="loadTableVisits" class="text-center">
                <b-spinner small type="grow"></b-spinner>
                Loading...
              </div>
              <b-table v-else striped responsive :fields="columns" :items="AllVisits" class="mb-0 table-borderless">
                <template v-slot:cell(member_name)="data">
                  {{data.item.member.name}}
                </template>
                <template v-slot:cell(check_in)="data">
                  {{timeConvertBackEnd(data.item.check_in)}}
                </template>
                <template v-slot:cell(check_out)="data">
                  {{data.item.check_out ? timeConvertBackEnd(data.item.check_out) : '--'}}
                </template>
                <template v-slot:cell(member_id)="data">
                  {{data.item.member.membership_id}}
                </template>
              </b-table>
              <b-pagination v-model="currentPageVisits"
                            class="mt-3"
                            :total-rows="totalVisits"
                            align="right"
                            :per-page="per_pageVisits"
                            aria-controls="my-table"
                            @input="changeContentVisit"
              ></b-pagination>
            </template>
          </iq-card>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import { core } from '../../config/pluginInit'
import checkInModal from '../../components/members/checkInModal'
export default {
  name: 'checkInOut',
  components: {
    checkInModal
  },
  data () {
    return {
      currentPageVisits: 1,
      per_pageVisits: 10,
      totalVisits: 6,
      loadTableVisits: true,
      AllVisits: [],
      member: {},
      profile: require('../../assets/images/user/default.png'),
      finishSearch: true,
      memberId: '',
      notFound: '',
      showPopup: false,
      member_package: [],
      member_Service: [],
      ids: [],
      pIds: [],
      openPackageId: '',
      allDetailsServicePackage: [],
      services_ids: [],
      packages_ids: [],
      columns: [
        { label: 'Member Name', key: 'member_name', class: 'text-left' },
        { label: 'Member ID', key: 'member_id', class: 'text-left' },
        { label: 'Check in Time', key: 'check_in', class: 'text-left' },
        { label: 'Check out time', key: 'check_out', class: 'text-left' }
      ]
    }
  },
  methods: {
    autoFocus () {
      this.$refs.inputUserId.focus()
    },
    searchPhoneNumber () {
      this.finishSearch = false
      this.$store.dispatch('searchByMemberID', this.memberId).then(res => {
        this.member = res.data.data.member
        // element[0].map(v => ({ ...v, active: false }))
        var newArray = []
        // res.data.data.all.forEach(element => // console.log(newArray.push(element[0])))
        newArray.map(v => ({ ...v, active: false }))
        this.member_package = newArray.filter(function (itm) {
          return itm.type === 'package'
        })
        this.openPackageId = this.member_package[0].id
        this.member_Service = newArray.filter(function (itm) {
          return itm.type === 'service'
        })
        this.finishSearch = true
        this.$bvModal.show('checkInModal')
        this.notFound = false
        // this.minimizeServicesInPackages()
      }).catch(err => {
        this.finishSearch = true
        this.notFound = err.response.data.error
      })
    },
    minimizeServicesInPackages () {
      // eslint-disable-next-line no-unused-vars
      var allServicesInSpacificPackage = []
      this.member_package.forEach(hallObject => {
        hallObject.service.forEach(allService => {
          const index = allServicesInSpacificPackage.findIndex(serviceIndex => serviceIndex.service_id === allService.service_id)
          if (index <= -1) {
            // console.log('m4 mogod')
            allServicesInSpacificPackage.push({ ...allService, count: 1 })
          } else {
            // console.log('mogod')
            allServicesInSpacificPackage[index].count += 1
          }
        })
        hallObject.service = allServicesInSpacificPackage
        allServicesInSpacificPackage = []
      })
      // console.log('this.member_package', this.member_package)
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
      }).catch(err => {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          // console.log(key)
          core.showSnackbar('error', value)
          // test
        }
      })
    },
    checkInPackages () {
      this.$store.dispatch('checkInPackages', { id: this.member.id, data: this.allDetailsServicePackage }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('checkInModal')
        this.packages_ids = []
        this.allDetailsServicePackage = []
      }).catch(err => {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          // console.log(key)
          core.showSnackbar('error', value)
        }
      })
    },
    getVisitReport () {
      this.loadTablegetAllVisits = true
      this.$store.dispatch('getAllVisits', {
        pageNumber: this.visiteCurrentPage,
        memberId: this.$route.params.id
      }).then(res => {
        this.AllVisits = res.data.data
        this.visiteCurrentPage = res.data.meta.current_page
        this.visiteper_page = res.data.meta.per_page
        this.visitetotal = res.data.meta.total
        this.loadTableVisits = false
      })
    },
    changeContentVisit () {
      this.getVisitReport()
    }
  },
  mounted () {
    this.autoFocus()
  },
  created () {
    this.getVisitReport()
  }
}
</script>
<style>

</style>
