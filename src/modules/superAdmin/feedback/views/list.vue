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
        <b-col lg="12" class="mb-2">
            <iq-card class="filter-card">
                <b-row>
                    <b-col md="3" sm="6">
                        <span>Filter by Type:</span>
                        <main-select v-model="filter.type" @change="reloadTable=true"
                                     :options="['provider', 'user']" label="key"
                                     placeholder="--Select--">
                        </main-select>
                    </b-col>
                </b-row>
            </iq-card>
        </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            @sortChanged="sortChanged"
            class="mb-0 table-borderless"
            :list_url="'feedbacks'"
            :reloadData="reloadTable"
            :custom-filter="filter"
        >
            <template v-slot:type="{data}">
                {{data.provider ? 'Provider' : 'User'}}
            </template>
            <template v-slot:user="{data}">
                {{data.provider ? data.provider.name : data.user.name}}
            </template>
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
      reloadTable: false,
      filter: {
        type: '',
        sort: '',
        sort_type: ''
      },
      columns: [
        '#',
        { label: 'User', key: 'user', class: 'text-left', type: 'custom' },
        // { label: 'Provider', key: 'provider.name', class: 'text-left' },
        { label: 'Type', key: 'type', class: 'text-left', type: 'custom' },
        { label: 'description', key: 'desc', class: 'text-left' },
        { label: 'Image', key: 'image', class: 'text-left', type: 'image' },
        { label: 'created date', key: 'created_at', class: 'text-left', sortable: true },
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
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Feedback',
              textContent: 'user.name',
              url: 'feedbacks'
            }
          ]
        }
      ]
    }
  },
  methods: {
    sortChanged (key) {
      this.reloadTable = false
      this.filter.sort = key.sortBy
      this.filter.sort_type = key.sortDesc ? 'desc' : 'asc'
      this.reloadTable = true
    },
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
