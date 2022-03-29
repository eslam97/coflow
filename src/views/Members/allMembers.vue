<template>
  <div>
    <member-menu/>
    <b-row>
      <b-container fluid class="filter">
        <div class="iq-card p-1">
          <div class="row">
            <div class="col-md-3 my-1">
              <input type="text" placeholder="search by member name" class="form-control" v-model="filter.name" @input="filterTable" >
            </div>
            <div class="col-md-3 my-1">
              <select class="form-control" v-model="filter.type" @change="filterTable">
                <option selected disabled value="">select Type...</option>
                <option value="guest">guest</option>
                <option value="member">member</option>
              </select>
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
                  @update="filterTable"
              >
              </date-range-picker>
            </div>
            <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.name || filter.type || dateRange.startDate || dateRange.endDate">
              <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
            </div>
          </div>
        </div>
      </b-container>
      <b-col lg="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">list Of Members</h4>
          </template>
          <template v-slot:body>
            <div v-if="loadTable" class="text-center">
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </div>
            <b-table v-else sort-icon-left primary-key="code" striped responsive :fields="columns"
                     :items="getAllMembers" class="mb-0 table-borderless "  id="table-transition-example" :tbody-transition-props="transProps">
              <template v-slot:cell(image)="data1">
               <img v-if="data1.item.image" :src="data1.item.profile" class="avatar-50 rounded-circle"/>
                <img v-else src="../../assets/images/user/user.jpg" class="avatar-50 rounded-circle"/>
              </template>
              <template v-slot:cell(type)="data1">
                <span v-if="data1.item.type == 'guest'" class="text-black">Guest</span>
                <span v-if="data1.item.type == 'member'" class="text-success">Member</span>
                <span v-if="data1.item.type == 'expired'" class="text-danger">Expired</span>
              </template>
              <template v-slot:cell(phone)="data1">
                <p class="holdSelection m-0" v-if="data1.item.id==showPhone">{{data1.item.phone}}</p>
                <b-button v-else variant=" iq-bg-success mr-0 mb-0" size="sm" :id="data1.item.id" @click="showPhone = data1.item.id" ><i class="las la-mobile"></i>Show Phone</b-button>
              </template>
              <template v-slot:cell(active)="data">
                <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                  <div class="custom-switch-inner">
                    <input type="checkbox" class="custom-control-input bg-primary" v-model="data.item.is_active" :id="'customSwitch-11'+data.item.id"   @change="changeMemberStatus(data.item.id)" >
                    <label class="custom-control-label" :for="'customSwitch-11'+data.item.id" data-on-label="on" data-off-label="off">
                    </label>
                  </div>
                </div>
              </template>
              <template v-slot:cell(name)="data1">
                <router-link :to="{name:'profile', params:{id :data1.item.id}}">
                  <h5><b-badge variant="primary">{{data1.item.name}}</b-badge></h5>
                </router-link>
              </template>
            </b-table>
            <b-pagination v-model="currentPage"
                          class="mt-3"
                          :total-rows="total"
                          align="right"
                          :per-page="per_page"
                          aria-controls="my-table"
                          @input="changeContent"
            ></b-pagination>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

const addProjectModal = () => import('../../components/projects/projectModal')
export default {
  name: 'allMembers',
  data () {
    return {
      showPhone: '',
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      filter: {
        name: '',
        type: ''
      },
      dateRange: {
        startDate: '',
        endDate: ''
      },
      currentPage: 1,
      per_page: 10,
      total: 6,
      loadTable: true,
      columns: [
        { label: 'Image', key: 'image', class: 'text-left' },
        { label: 'Name', key: 'name', class: 'text-left', sortable: true },
        { label: 'Phone', key: 'phone', class: 'text-left', sortable: true },
        { label: 'Code', key: 'lead.id', class: 'text-left', sortable: true },
        { label: 'Membership_id', key: 'membership_id', class: 'text-left', sortable: true },
        { label: 'Email', key: 'email', class: 'text-left', sortable: true },
        { label: 'Type', key: 'type', class: 'text-left', sortable: true },
        { label: 'Active', key: 'active', class: 'text-left', sortable: true }
      ]
    }
  },
  computed: {
    ...mapGetters(['getAllMembers'])
  },
  methods: {
    changeMemberStatus (id) {
      this.$store.dispatch('changeMemberStatus', id).then(res => {
        core.showSnackbar('success', res.data.message)
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
    resetFilter () {
      this.filter = {
        name: '',
        type: ''
      }
      this.filterTable()
    },
    filterTable () {
      this.loadTable = true
      this.$store.dispatch('getAllMembers', { name: this.filter.name, type: this.filter.type, dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '', dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '' }).then(data => {
        this.currentPage = data.data.meta.currentPage
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
        this.loadTable = false
      })
    },
    changeContent () {
      this.loadTable = true
      this.$store.dispatch('getAllMembers', { pageNumber: this.currentPage, name: this.filter.name, type: this.filter.type }).then(() => {
        this.loadTable = false
      })
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    addProjectModal,
    DateRangePicker
  },
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    this.$store.dispatch('getAllMembers', { pageNumber: this.currentPage, dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '', dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '' }).then(data => {
      this.currentPage = data.data.meta.currentPage
      this.per_page = data.data.meta.per_page
      this.total = data.data.meta.total
      this.loadTable = false
    })
  }
}
</script>
<style>
.colorSpan{
  width: 20px;
  height: 20px;
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
