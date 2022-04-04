<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12"
             class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Landmarks</h3>
        <div>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">Create
            Landmark<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            :items="callData"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
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
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Governorate', key: 'governorate', class: 'text-left' },
        { label: 'Area', key: 'area', class: 'text-left' },
        { label: 'Landmark Name', key: 'Landmark_name', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left' },
        { label: 'Views', key: 'views', class: 'text-left' },
        { label: 'Unique Views', key: 'unique_views', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-eye',
              color: 'success',
              text: 'Show'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete'
            }
          ]
        }
      ],
      callData: [
        {
          id: '01',
          governorate: 'Cairo',
          area: 'Giza',
          Landmark_name: 'Greate Pyrmaids',
          status: 'Active',
          views: '200',
          unique_views: '20'
        },
        {
          id: '02',
          governorate: 'Cairo',
          area: 'Giza',
          Landmark_name: 'Greate Pyrmaids',
          status: 'Active',
          views: '200',
          unique_views: '20'
        },
        {
          id: '03',
          governorate: 'Cairo',
          area: 'Giza',
          Landmark_name: 'Greate Pyrmaids',
          status: 'Active',
          views: '200',
          unique_views: '20'
        },
        {
          id: '04',
          governorate: 'Cairo',
          area: 'Giza',
          Landmark_name: 'Greate Pyrmaids',
          status: 'Active',
          views: '200',
          unique_views: '20'
        },
        {
          id: '05',
          governorate: 'Cairo',
          area: 'Giza',
          Landmark_name: 'Greate Pyrmaids',
          status: 'Active',
          views: '200',
          unique_views: '20'
        }
      ]
    }
  },
  components: {
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.$root.$emit('bv::show::modal', 'modalId')
    }
  },
  mounted () {
    core.index()
  }
}
</script>
