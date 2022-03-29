<template>
  <div>
    <b-modal id="campaignMessage"  size="lg"  centered title="Campaign Message" hide-footer>
      <div class="mt-2">
        <p class="text-primary">{{campaignMessage}}</p>
      </div>
    </b-modal>

    <div class="iq-card p-1">
      <div class="row">
        <div class="col-md-3 my-1">
          <input type="text" v-model="filter.search" placeholder="search by name or phone" class="form-control" @input="getLeadReport">
        </div>
        <div class="col-md-3 my-1">
          <select class="form-control" v-model = "filter.category" @change="getLeadReport">
            <option selected disabled value="">select Category...</option>
            <option value="old">Old</option>
            <option value="new">New</option>
            <option value="challenge">challenge</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <div class="col-md-3 my-1">
          <select class="form-control"  v-model="filter.project" @change="getLeadReport">
            <option selected disabled value="">select Project...</option>
            <option v-for="(i, key) in projects" :key="key" :value="i.id">
              <span>{{i.en_title}}</span>
            </option>
          </select>
        </div>
        <div class="col-md-3 my-1">
          <select class="form-control"  v-model="filter.source" @change="getLeadReport">
            <option selected disabled value="">select Source...</option>
            <option v-for="(i, key) in source" :key="key" :value="i.id">
              <span>{{i.title}}</span>
            </option>
          </select>
        </div>
        <div class="col-md-3 my-1">
          <select class="form-control"  v-model="filter.from" @change="getLeadReport">
            <option selected disabled value="">select From...</option>
            <option v-for="(i, key) in from" :key="key" :value="i.id">
              <span>{{i.title}}</span>
            </option>
          </select>
        </div>
        <div class="col-md-3 my-1">
          <select class="form-control"  v-model="filter.inquiry" @change="getLeadReport">
            <option selected disabled value="">select Inquiry...</option>
            <option v-for="(i, key) in inquiry" :key="key" :value="i.id">
              <span>{{i.title}}</span>
            </option>
          </select>
        </div>
        <div class="col-md-3 my-1">
          <select class="form-control"  v-model="filter.callStatusId" @change="getLeadReport">
            <option selected disabled value="">select Call Status ...</option>
            <option v-for="(i, key) in call_Status" :key="key" :value="i.id">
              <span>{{i.title}}</span>
            </option>
          </select>
        </div>
        <div class="col-md-3 my-1">
          <v-select class="w-100" label="" :options="allUserTakenBy" v-model="filter.taken_id" :filterable="false" @search="onSearchTakenBy"
                    :reduce="option => option.id"
                    placeholder="Taken By">
            <template slot="no-options">
              type to search about users...
            </template>
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ option.name }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ option.name }}
              </div>
            </template>
          </v-select>
        </div>
        <div class="col-md-3 my-1">
          <v-select class="w-100" label="" :options="allUserCreatedBy" v-model="filter.user_id" :filterable="false" @search="onSearchCreatedBy"
                    :reduce="option => option.id"
                    placeholder="Created By">
            <template slot="no-options">
              type to search about users...
            </template>
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ option.name }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ option.name }}
              </div>
            </template>
          </v-select>
        </div>
        <div class="col-md-3 my-1">
          <b-form-checkbox v-model="filter.noHistory" @change="getLeadReport">No History</b-form-checkbox>
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
              @update="getLeadReport"
          >
          </date-range-picker>
        </div>
        <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.search || filter.inquiry || filter.project || filter.source || filter.from || filter.callStatusId || filter.userId || filter.ifNew || filter.category">
          <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
        </div>

        <!--          <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.title || filter.status">
                    <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
                  </div>-->
      </div>
    </div>
    <iq-card>
      <template v-slot:body>
        <div>
          <b-form-input v-model="inputPhones" type="text" placeholder="Ex: +201087654321, +201012345678"></b-form-input>
        </div>
      </template>
    </iq-card>
    <iq-card>
      <template v-slot:headerTitle>
<!--        <h4 class="card-title">Lead</h4>-->
      </template>
      <template v-slot:body>
        <div v-if="loadTable" class="text-center">
          <b-spinner small type="grow"></b-spinner>
          Loading...
        </div>
        <div v-else>
          <h4 class="text-center">Totla Of Lead : <span class="text-primary">{{total}}</span></h4>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(sendBulk)">
              <b-row>
                <b-col lg="12">
                  <iq-card>
                    <template v-slot:body>
                      <div>
                        <b-row>
                          <b-form-group class="col-md-12" label="Message:" label-for="message">
                            <ValidationProvider name="message" ref="message" rules="required" v-slot="{ errors }">
                              <b-form-textarea
                                  id="textarea-rows"
                                  placeholder="Message..."
                                  rows="3"
                                  v-model="message"
                                  :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                              ></b-form-textarea>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                        </b-row>
                        <b-button variant="primary" class="w-100 mt-3" @click="sendBulk" v-if="!loadingButton">Send</b-button>
                        <b-button variant="primary" class="w-100 mt-3" v-else><spinner-loading
                            text="Loading"/>  </b-button>
                      </div>
                    </template>
                  </iq-card>
                </b-col>
              </b-row>
            </form>
          </ValidationObserver>
<!--          {{allPhones.length}}
          {{allPhones}}-->
        </div>
        <div>
          <b-table  striped responsive :fields="columns" :items="allCampaigns" class="mb-0 table-borderless">
          <template v-slot:cell(is_active)="data3">
            <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
              <div class="custom-switch-inner">
                <input type="checkbox" class="custom-control-input bg-primary" v-model="data3.item.is_active" :id="'customSwitch-11'+data3.item.id"  @change="actionsCampaign(data3.item.id)" >
                <label class="custom-control-label" :for="'customSwitch-11'+data3.item.id" data-on-label="on" data-off-label="off">
                </label>
              </div>
            </div>
          </template>
          <template v-slot:cell(message)="data">
            <b-button v-if="data.item.message" variant=" iq-bg-primary mr-0 mb-0" size="sm" @click="showCampaignMessage(data.item.message)"><i class="las la-eye"></i></b-button>
          </template>
          <template v-slot:cell(created_at)="data1">
            <p class="holdSelection">{{timeConvert(data1.item.created_at)}}</p>
          </template>
          <template v-slot:cell(sending_at)="data1">
            <p class="holdSelection">{{timeConvert(data1.item.sending_at)}}</p>
          </template>
            <template v-slot:cell(fStart)="data1">
              <p class="holdSelection">{{ JSON.parse(data1.item.filters).startDate}}</p>
            </template>
            <template v-slot:cell(fEnd)="data1">
              <p class="holdSelection">{{JSON.parse(data1.item.filters).endDate}}</p>
            </template>
        </b-table>
          <b-pagination v-model="paginationCampaigns.currentPage"
                      class="mt-3"
                      :total-rows="paginationCampaigns.total"
                      align="right"
                      :per-page="paginationCampaigns.per_page"
                      aria-controls="my-table"
                      @input="getAllWhatsappCampaign"
        ></b-pagination>
        </div>
      </template>
    </iq-card>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import { mapGetters } from 'vuex'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import campaingService from '../services/campaing'
export default {
  name: 'whatsapp',
  data () {
    return {
      message: '',
      history: [],
      historyId: '',
      leadReport: [],
      loadTable: true,
      showPhone: '',
      currentPage: 1,
      per_page: 10,
      total: '',
      dateRange: {
        startDate: '',
        endDate: ''
      },
      loadingButton: false,
      allUserTakenBy: [],
      allUserCreatedBy: [],
      call_Status: [],
      from: [],
      inquiry: [],
      projects: [],
      source: [],
      filter: {
        search: '',
        project: '',
        userId: '',
        callStatusId: '',
        inquiry: '',
        source: '',
        from: '',
        ifNew: '',
        category: '',
        noHistory: '',
        taken_id: '',
        user_id: ''
      },
      allPhones: [],
      inputPhones: '',
      columns: [
        { label: 'Title', key: 'title', class: 'text-left' },
        { label: 'By', key: 'user.name', class: 'text-left' },
        { label: 'project', key: 'project.en_title', class: 'text-left' },
        { label: 'Count', key: 'count', class: 'text-left' },
        { label: 'Remaining', key: 'remaining', class: 'text-left' },
        { label: 'Message', key: 'message', class: 'text-left' },
        { label: 'Sending At', key: 'sending_at', class: 'text-left' },
        { label: 'Created At', key: 'created_at', class: 'text-left' },
        { label: 'filter Start', key: 'fStart', class: 'text-left' },
        { label: 'filter End', key: 'fEnd', class: 'text-left' },
        { label: 'Actions', key: 'is_active', class: 'text-left' }
      ],
      allCampaigns: [],
      paginationCampaigns: {
        currentPage: 1,
        per_page: 10,
        total: 6
      },
      campaignMessage: ''
    }
  },
  methods: {
    sendBulk () {
      this.loadingButton = true
      campaingService.sendBulkWhatsapp({
        phones: this.inputPhones ? this.inputPhones : this.allPhones.toString(),
        message: this.message,
        project_id:
        JSON.parse(localStorage.getItem('default_project')).id,
        ...this.filter,
        ...this.dateRange
      }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.message = ''
        this.getAllWhatsappCampaign()
      }).finally(() => {
        this.loadingButton = false
      })
    },
    onSearchCreatedBy (data, loading) {
      if (data.length) {
        loading(true)
        this.$store.dispatch('serachAboutUser', { user: data, permissions: ['sales.lead.create'] }).then(res => {
          this.allUserCreatedBy = res.data.data
          loading(false)
        }).catch(() => {
          loading(false)
        })
      }
    },
    onSearchTakenBy (data, loading) {
      if (data.length) {
        loading(true)
        this.$store.dispatch('serachAboutUser', { user: data, permissions: ['sales.lead.create'] }).then(res => {
          this.allUserTakenBy = res.data.data
          loading(false)
        }).catch(() => {
          loading(false)
        })
      }
    },
    resetFilter () {
      this.filter = {
        search: '',
        project: '',
        userId: '',
        callStatusId: '',
        inquiry: '',
        source: '',
        from: '',
        ifNew: '',
        category: ''
      }
      this.getLeadReport()
    },
    getLeadReport () {
      this.loadTable = true
      this.$store.dispatch('getLeadReport', {
        filter: 1,
        pageNumber: this.currentPage,
        search: this.filter.search,
        project: this.filter.project,
        userId: this.filter.userId,
        callStatusId: this.filter.callStatusId,
        inquiry: this.filter.inquiry,
        source: this.filter.source,
        from: this.filter.from,
        dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '',
        dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '',
        ifNew: this.filter.noHistory ? 1 : 0,
        category: this.filter.category,
        noHistory: this.filter.noHistory ? 1 : 0,
        userid: this.filter.user_id,
        takenId: this.filter.taken_id
      }).then(res => {
        this.total = res.data.data.phones.length
        /* console.log(res.data.data.phones) */
        this.allPhones = res.data.data.phones.map(data => '+2' + data.lead.phone)
        this.loadTable = false
      })
    },
    getAllWhatsappCampaign () {
      campaingService.allWhatsappCampaigns({ pageNumber: this.paginationCampaigns.currentPage }).then(res => {
        this.allCampaigns = res.data.data
        this.paginationCampaigns.currentPage = res.data.meta.current_page
        this.paginationCampaigns.per_page = res.data.meta.per_page
        this.paginationCampaigns.total = res.data.meta.total
      })
    },
    actionsCampaign (id) {
      campaingService.actionsCampaign(id).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    },
    showCampaignMessage (message) {
      this.campaignMessage = message
      this.$bvModal.show('campaignMessage')
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
      this.call_Status = res.data.data.call_Status
      this.from = res.data.data.from
      this.inquiry = res.data.data.inquiry
      this.projects = res.data.data.projects
      this.source = res.data.data.source
    })
    this.getLeadReport()
    this.getAllWhatsappCampaign()
  },
  watch: {
    'filter.user_id' () {
      this.getLeadReport()
    },
    'filter.taken_id' () {
      this.getLeadReport()
    }
  },
  components: {
    DateRangePicker
  }
}
</script>
<style>

</style>
