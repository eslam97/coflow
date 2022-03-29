<template>
  <div>
    <div class="iq-card p-1">
      <div class="row">
        <div class="col-md-12 my-1">
          <input type="text" v-model="filter.search" placeholder="search by name or phone" class="form-control" @input="getInvitationsMemberReport">
        </div>
        <div class="col-md-12 my-1">
          <date-range-picker
              class="w-100"
              ref="picker"
              opens=false
              :timePicker=false
              :timePicker24Hour=false
              :showWeekNumbers=true
              :showDropdowns=true
              format='mm/dd/yyyy'
              direction="center"
              :autoApply=true
              v-model="dateRange"
              :linkedCalendars=true
              customRangeLabel= 'Custom Range'
              @update="getInvitationsMemberReport"
          >
          </date-range-picker>
        </div>
        <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.search || dateRange.startDate || dateRange.endDate">
          <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
        </div>
      </div>
    </div>
    <iq-card>
      <template v-slot:headerTitle>
        <h4 class="card-title">Invitations</h4>
      </template>
      <template v-slot:headerAction>
        <h5>Total : {{total}}</h5>
      </template>
      <template v-slot:body>
        <div v-if="loadTable" class="text-center">
          <b-spinner small type="grow"></b-spinner>
          Loading...
        </div>
        <b-table v-else striped responsive :fields="columns" :items="memberReport" class="mb-0 table-borderless">
<!--          <template v-slot:cell(member.profile)>
            &lt;!&ndash;            <img v-if="data1.item.image" :src="data1.item.profile" class="avatar-50 rounded-circle"/>&ndash;&gt;
            <img src="../../../assets/images/user/user.jpg" class="avatar-50 rounded-circle"/>
          </template>
          <template v-slot:cell(packages)="data">
            <ul class="m-0 p-0">
              <li v-for="(i, key) in data.item.activity" :key="key">
                <span v-if="i.member_package.available" class="text-success"><i class="las la-check-circle"></i></span>
                <span v-else class="text-danger"><i class="las la-times-circle"></i></span>
                {{i.member_package.package_title}}
              </li>
            </ul>
          </template>
          <template v-slot:cell(services)="data">
            <ul class="m-0 p-0">
              <li v-for="(i, key) in data.item.activity" :key="key">
                <span v-for="(service, key) in i.services" :key="key"> {{service.service_title}} <span v-if="i.services.length != key+1">,</span>
                </span>
              </li>
            </ul>
          </template>
          <template v-slot:cell(check_in)="data">
            {{data.item.check_in.substring(0,10)}} <span class="text-success">{{tConvert(data.item.check_in.substring(11))}}</span>
          </template>
          <template v-slot:cell(check_out)="data">
            {{data.item.check_out.substring(0,10)}} <span class="text-danger">{{tConvert(data.item.check_out.substring(11))}}</span>
          </template>-->
          <template v-slot:cell(member.name)="data">
            <router-link class="linkedReport" :to="{name: 'profile', params:{ id : data.item.member.id }}">
              <b-badge variant="primary">{{ data.item.member.name }}</b-badge>
            </router-link>
          </template>
          <template v-slot:cell(created_at)="data">
            {{data.item.created_at.substring(0,10)}}
          </template>
        </b-table>
        <b-pagination v-model="currentPage"
                      class="mt-3"
                      :total-rows="total"
                      align="right"
                      :per-page="per_page"
                      aria-controls="my-table"
                      @input="getInvitationsMemberReport()"
        ></b-pagination>
      </template>
    </iq-card>
  </div>
</template>
<script>
import { core } from '../../../config/pluginInit'
import { mapGetters } from 'vuex'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
export default {
  name: 'salesReportAchived',
  components: {
    DateRangePicker
  },
  data () {
    return {
      projects: [],
      memberReport: [],
      loadTable: true,
      currentPage: 1,
      per_page: 10,
      total: '',
      dateRange: {
        startDate: '',
        endDate: ''
      },
      filter: {
        search: ''
      },
      columns: [
        { label: 'Member Name', key: 'member.name' },
        { label: 'Invite', key: 'invited.name' },
        { label: 'User', key: 'user.name' },
        { label: 'Packages', key: 'member_package.package_title' },
        { label: 'Created At', key: 'created_at' }
      ]
    }
  },
  methods: {
    resetFilter () {
      this.filter = {
        search: ''
      }
      this.dateRange = {
        startDate: '',
        endDate: ''
      }
      this.getInvitationsMemberReport()
    },
    tConvert (time) {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)
      if (time.length > 1) {
        time = time.slice(1)
        time[5] = +time[0] < 12 ? 'AM' : 'PM'
        time[0] = +time[0] % 12 || 12
      }
      time.splice(3, 1, ' ')
      return time.join('')// return adjusted time or original string
    },
    getInvitationsMemberReport () {
      this.loadTable = true
      this.$store.dispatch('getAllInvitations', { pageNumber: this.currentPage, userName: this.filter.search, dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '', dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '' }).then(res => {
        this.memberReport = res.data.data
        this.currentPage = res.data.meta.current_page
        this.per_page = res.data.meta.per_page
        this.total = res.data.meta.total
        this.loadTable = false
      })
    }
  },
  computed: {
    ...mapGetters(['getUserProjects'])
  },
  mounted () {
    core.index()
  },
  created () {
    this.$store.dispatch('getInfoToCreateLead').then((res) => {
      this.projects = res.data.data.projects
    })
    this.getInvitationsMemberReport()
  }
}
</script>
<style>
.nav-link.router-link-exact-active.router-link-active{
  background: var(--iq-primary) !important;
  color: #fff !important;
}
th{
  white-space: pre !important;
  vertical-align: middle !important;
}
td{
  white-space: pre !important;
  vertical-align: middle !important;
}
</style>
