<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
            <b-table  :fields="columns" :items="callData" class="mb-0 table-borderless"
                     ref="selectableTable" sort-icon-left primary-key="id"  id="table-transition-example"
                     :tbody-transition-props="transProps"
                     @sort-changed="sortChanged"
                     :no-sort-reset="true"
            >
            </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  data () {
    return {
      transProps: {
        name: 'flip-list'
      },
      columns: [
        { label: '##', key: 'id', class: 'text-left', sortable: true },
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Phone', key: 'phone', class: 'text-left' },
        { label: 'Test', key: 'test', class: 'text-left' },
        { label: 'Category', key: 'category', class: 'text-left' },
        { label: 'Actions', key: 'actions', class: 'text-left' }
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
