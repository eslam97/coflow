<template>
  <b-container fluid>
    <main-modal id="leadDetalilsModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold">Business Request</h4>
      </template>
      <template v-slot:body>
        <lead-details :leadDetails="leadDetails" :requestLoading="requestLoading"
                      @makeBusinessRequest="acceptOrReject"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12" class="mb-2">
        <h3>Leads</h3>
      </b-col>
      <b-col lg="12" class="mb-2">
        <iq-card class="filter-card">
          <b-row>
            <b-col md="3">
              <span>Filter by name:</span>
              <b-form-input v-model="filter.name" @keyup="reloadTable=true"
                  placeholder="Search">
              </b-form-input>
            </b-col>
            <b-col md="3">
              <span>Filter by status:</span>
              <main-select v-model="filter.status" @change="reloadTable=true"
                           :options="statusFilterOptions"
                           label="key"
                           :reduce="data => data.value"
                            placeholder="--Select--">
              </main-select>
            </b-col>
          </b-row>
        </iq-card>
      </b-col>
      <b-col lg="12">
            <main-table
                :fields="columns"
                class="mb-0 table-borderless"
                @sortChanged="sortChanged"
                :list_url="'leads'"
                :reloadData="reloadTable"
                :custom-filter="filter"
            >
            </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import leadsServices from '../services/leads.services'
import leadDetails from '../components/leadDetails'
export default {
  components: { leadDetails },
  data () {
    return {
      columns: [
        '#',
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Date', key: 'date', class: 'text-left', sortable: true },
        { label: 'Status', key: 'status', class: 'text-left', type: 'status' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [{
            icon: 'las la-eye',
            color: 'success-light',
            text: 'View',
            actionName: 'viewLead',
            showIf: () => this.hasPer('lead.view'),
            actionParams: ['id']
          }
          /* {
            icon: 'las la-pen',
            color: 'cobalt-blue',
            text: 'Edit'
          },
          {
            icon: 'las la-trash-alt',
            color: 'danger',
            text: 'Delete',
            showAlert: true,
            actionHeader: 'Delete',
            titleHeader: 'Lead',
            textContent: 'name'
          } */
          ]
        }
      ],
      leadDetails: {},
      requestLoading: false,
      selectedLead: '',
      reloadTable: false,
      filter: { name: '', status: '', sort_type: '' },
      statusFilterOptions: [
        { key: 'Pending acceptance', value: 'pending acceptance' },
        { key: 'Accepted', value: 'accepted' },
        { key: 'Rejected', value: 'rejected' },
        { key: 'Active Lead', value: 'active lead' },
        { key: 'None', value: '' }
      ]
    }
  },
  methods: {
    sortChanged (key) {
      this.reloadTable = false
      this.filter.sort_type = key.sortDesc ? 'desc' : 'asc'
      this.reloadTable = true
    },
    viewLead (obj) {
      this.selectedLead = obj.id
      /* core.startLoader() */
      leadsServices.showLeadData(obj.id).then(res => {
        this.leadDetails = res.data.data
        this.$bvModal.show('leadDetalilsModal')
        /* core.endLoader() */
      })
    },
    acceptOrReject (data) {
      this.requestLoading = true
      this.reloadTable = false
      leadsServices.changeStatusLead(this.selectedLead, data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('leadDetalilsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    }
  },
  mounted () {
    core.index()
  },
  beforeDestroy () {
    this.$root.$off('viewLead', this.viewLead)
  },
  created () {
    this.$root.$on('viewLead', this.viewLead)
  }
}
</script>
