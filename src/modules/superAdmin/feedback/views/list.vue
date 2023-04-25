<template>
  <b-container fluid>
    <main-modal id="bugDetails" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-success-light" >view: </span>Feedback</h4>
      </template>
      <template v-slot:body>
        <p class="text-black font-size-22 font-weight-bold m-0">{{bugDetails.user ? bugDetails.user.name: 'User'}}</p>
        <p class="font-size-16 font-weight-bold m-0">{{bugDetails.desc}}</p>

        <img :src="bugDetails.image" class="max-w-100 mt-4">
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12" class="mb-2">
        <h3>Feedback</h3>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            :list_url="'feedbacks'"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  data () {
    return {
      bugDetails: {},
      columns: [
        '#',
        { label: 'User', key: 'user.name', class: 'text-left' },
        { label: 'description', key: 'desc', class: 'text-left', sortable: true },
        { label: 'Image', key: 'image', class: 'text-left', type: 'image' },
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
              actionName: 'showBug',
              actionParams: 'fullObj'
            }
          ]
        }
      ]
    }
  },
  methods: {
    showDetails (data) {
      this.bugDetails = data
      this.$bvModal.show('bugDetails')
    }
  },
  mounted () {
    core.index()
  },
  created () {
    this.$root.$on('showBug', this.showDetails)
  }
}
</script>
<style>
.max-w-100 {
  max-width: 100%;
}
</style>
