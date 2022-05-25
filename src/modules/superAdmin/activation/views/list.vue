<template>
  <b-container fluid>
    <main-modal id="activationDetalilsModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold">Business Request</h4>
      </template>
      <template v-slot:body>
        <activation-details :activationDetails="activationDetails" @activation-provider="activate"
                            :loadingActivation="loadingActivation"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12" class="mb-2">
        <h3>Activation</h3>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'activations'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>

import { core } from '@/config/pluginInit'
import activationsServices from '../services/activations.services'
import activationDetails from '../components/activationDetails'
export default {
  components: {
    activationDetails
  },
  data () {
    return {
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Profile Type', key: 'profile_type', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [{
            icon: 'las la-eye',
            color: 'success-light',
            text: 'View',
            actionName: 'viewProfile',
            actionParams: ['id']
          }
          ]
        }
      ],
      activationDetails: {},
      providerId: '',
      reloadTable: false,
      loadingActivation: false
    }
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    viewProfile (obj) {
      activationsServices.getActivationDetails(obj.id).then(res => {
        this.providerId = obj.id
        this.activationDetails = res.data.data
        this.$bvModal.show('activationDetalilsModal')
      })
    },
    activate (obj) {
      this.loadingActivation = true
      activationsServices.activateProvider(this.providerId, obj).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('activationDetalilsModal')
      }).finally(() => {
        this.loadingActivation = false
      })
    }
  },
  mounted () {
    core.index()
  },
  beforeDestroy () {
    this.$root.$off('viewProfile', this.viewProfile)
  },
  created () {
    this.$root.$on('viewProfile', this.viewProfile)
  }
}
</script>
