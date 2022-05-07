<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" class="mb-2">
        <h3>Leads</h3>
      </b-col>
      <b-col lg="12">
            <main-table
                :fields="columns"
                class="mb-0 table-borderless"
                @sortChanged="sortChanged"
                :list_url="'leads'"
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
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Phone', key: 'phone', class: 'text-left' },
        { label: 'Test', key: 'test', class: 'text-left' },
        { label: 'Category', key: 'category', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [{
            icon: 'las la-eye',
            color: 'success',
            text: 'View'
          },
          {
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
            textContnet: 'name'
          }
          ]
        }
      ],
      callData: [
        {
          id: '01',
          name: 'ahmed Mohamed',
          phone: '01095097098',
          category: 'category',
          category1: 'category1',
          test: 'test test',
          actions: 'Actions'
        },
        {
          id: '02',
          name: 'mohamed Mohamed',
          phone: '01095097098',
          category: 'category',
          category1: 'category1',
          test: 'test',
          actions: 'Actions'
        },
        {
          id: '03',
          name: 'aad Mohamed',
          phone: '01095097098',
          category: 'category',
          category1: 'category1',
          test: 'test',
          actions: 'Actions'
        },
        {
          id: '04',
          name: 'ahmsed Mohamed',
          phone: '01095097098',
          category: 'category',
          category1: 'category1',
          test: 'test',
          actions: 'Actions'
        },
        {
          id: '05',
          name: 'ahmed Modhamed',
          phone: '01095097098',
          category: 'category',
          category1: 'category1',
          test: 'test',
          actions: 'Actions'
        }
      ]
    }
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    }
  },
  mounted () {
    core.index()
  }
}
</script>
