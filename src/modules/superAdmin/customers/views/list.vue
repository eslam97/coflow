<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12"
             class="mb-2 align-items-start">
        <h3>Customers</h3>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            :list_url="'users'"
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
      columns: [
        { label: '#', key: 'id', class: 'text-left', sortable: true },
        { label: 'Image', key: 'image', class: 'text-left', type: 'image' },
        { label: 'User Name', key: 'name', class: 'text-left' },
        { label: 'Verified', key: 'verified', class: 'text-left' },
        { label: 'Birthdate', key: 'birthdate', class: 'text-left', type: 'birthDate' },
        { label: 'Gender', key: 'gender', class: 'text-left' },
        { label: 'Nationality', key: 'nationality', class: 'text-left' },
        { label: 'Views', key: 'views', class: 'text-left' },
        { label: 'Saves', key: 'saves', class: 'text-left' },
        { label: 'Tracks', key: 'tracks', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Customer',
              textContent: 'name',
              url: 'users'
            }
          ]
        }
      ]
    }
  },
  components: {
  },
  methods: {
  },
  created () {
  },
  beforeDestroy () {
  },
  mounted () {
    core.index()
  }
}
</script>
