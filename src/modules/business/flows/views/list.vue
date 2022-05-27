<template>
  <b-container fluid>
    <main-modal id="flowsDetailsModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Flow</h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal == 'view'" ><span class="text-success-light">View: </span> Flow</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Flow</h4>
      </template>
      <template v-slot:body>
        <flows-details @addFlows="addFlows"
                      @editFlows="editFlows"
                      :requestLoading="requestLoading"
                      :flowsDetails="flowsDetails"
                      :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Flows</h3>
        <div>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
          Add Flow<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'flows'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import flowsDetails from '@/modules/business/flows/components/flowsDetails.vue'
import flowsServices from '@/modules/business/flows/services/flows.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Description', key: 'description', class: 'text-left' },
        { label: 'Requirments', key: 'requirments', class: 'text-left' },
        { label: 'Price EGP', key: 'price_egp', class: 'text-left' },
        { label: 'Discounted Price', key: 'discounted_price_egp', class: 'text-left' },
        { label: 'Level', key: 'level', class: 'text-left' },
        { label: 'Instructors', key: 'instructors', array_keys: ['first_name', 'last_name'], type: 'array', class: 'text-left' },
        { label: 'Photos', key: 'images', class: 'text-left', type: 'multi_image' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-eye',
              color: 'success-light',
              text: 'View',
              actionName: 'showflows',
              actionParams: ['id']
            },
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showFlowsToEdit',
              actionParams: ['id']
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Flows',
              textContent: 'name',
              url: 'flows'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      flowsDetails: {},
      flowsId: ''
    }
  },
  components: {
    flowsDetails
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.flowsId = ''
      this.typeOfModal = 'add'
      this.flowsDetails = false
      this.$bvModal.show('flowsDetailsModal')
    },
    addFlows (flows) {
      this.requestLoading = true
      flowsServices.addNewFlow(flows).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('flowsDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editFlows (flows) {
      this.requestLoading = true
      flowsServices.editFlow(this.flowsId, flows).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('flowsDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.flowsId = ''
      this.typeOfModal = 'view'
      flowsServices.getFlowsDetails(obj.id).then(res => {
        this.flowsDetails = res.data.data
        this.$bvModal.show('flowsDetailsModal')
      })
    },
    showFlowsToEdit (obj) {
      this.typeOfModal = 'edit'
      this.flowsId = obj.id
      flowsServices.getFlowsDetails(obj.id).then(res => {
        this.flowsDetails = res.data.data
        this.$bvModal.show('flowsDetailsModal')
      })
    }
  },
  created () {
    this.$root.$on('showflows', this.showDetails)
    this.$root.$on('showflowsToEdit', this.showFlowsToEdit)
  },
  beforeDestroy () {
    this.$root.$off('showflows')
    this.$root.$off('showflowsToEdit')
  },
  mounted () {
    core.index()
  }
}
</script>
