<template>
  <b-container fluid>
    <main-modal id="faqsDetailsModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> FAQ</h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal == 'view'" ><span class="text-success-light">View: </span> FAQ</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> FAQ</h4>
      </template>
      <template v-slot:body>
        <faqs-details @addFaqs="addFaqs"
                      @editFaqs="editFaqs"
                      :requestLoading="requestLoading"
                      :faqsDetails="faqsDetails"
                      :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>FAQ's</h3>
        <div>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
          Add FAQ<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'faq'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import faqsDetails from '@/modules/business/faqs/components/faqsDetails.vue'
import faqsServices from '@/modules/business/faqs/services/faqs.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Question', key: 'question', class: 'text-left width-limit' },
        { label: 'Answer', key: 'answer', class: 'text-left width-limit' },
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
              actionName: 'showFAQs',
              actionParams: ['id']
            },
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showFAQsToEdit',
              actionParams: ['id']
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'FAQs',
              textContent: 'name',
              url: 'faq'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      faqsDetails: {},
      faqsId: ''
    }
  },
  components: {
    faqsDetails
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.faqsId = ''
      this.typeOfModal = 'add'
      this.faqsDetails = false
      this.$bvModal.show('faqsDetailsModal')
    },
    addFaqs (faqs) {
      this.requestLoading = true
      faqsServices.addNewFAQ(faqs).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('faqsDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editFaqs (faqs) {
      this.requestLoading = true
      faqsServices.editFAQ(this.faqsId, faqs).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('faqsDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.faqsId = ''
      this.typeOfModal = 'view'
      faqsServices.getFAQsDetails(obj.id).then(res => {
        this.faqsDetails = res.data.data
        this.$bvModal.show('faqsDetailsModal')
      })
    },
    showFaqsToEdit (obj) {
      this.typeOfModal = 'edit'
      this.faqsId = obj.id
      console.log(this.faqsId)
      faqsServices.getFAQsDetails(obj.id).then(res => {
        this.faqsDetails = res.data.data
        this.$bvModal.show('faqsDetailsModal')
      })
    }
  },
  created () {
    this.$root.$on('showFAQs', this.showDetails)
    this.$root.$on('showFAQsToEdit', this.showFaqsToEdit)
  },
  beforeDestroy () {
    this.$root.$off('showFAQs')
    this.$root.$off('showFAQsToEdit')
  },
  mounted () {
    core.index()
  }
}
</script>
