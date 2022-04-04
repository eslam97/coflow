<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" class="mb-2">
        <h3>Activation</h3>
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
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Phone', key: 'phone', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left' },
        { label: 'Category', key: 'category', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [{
            icon: 'las la-eye',
            color: 'success'
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
          status: 'active',
          actions: 'Actions'
        },
        {
          id: '02',
          name: 'mohamed Mohamed',
          phone: '01095097098',
          category: 'category',
          category1: 'category1',
          status: 'active',
          actions: 'Actions'
        },
        {
          id: '03',
          name: 'aad Mohamed',
          phone: '01095097098',
          category: 'category',
          category1: 'category1',
          status: 'active',
          actions: 'Actions'
        },
        {
          id: '04',
          name: 'ahmsed Mohamed',
          phone: '01095097098',
          category: 'category',
          category1: 'category1',
          status: 'Pending',
          actions: 'Actions'
        },
        {
          id: '05',
          name: 'ahmed Modhamed',
          phone: '01095097098',
          category: 'category',
          category1: 'category1',
          status: 'active',
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
