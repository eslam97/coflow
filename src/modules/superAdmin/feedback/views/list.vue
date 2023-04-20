<template>
  <b-container fluid>
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
      columns: [
        '#',
        { label: 'User', key: 'user.name', class: 'text-left' },
        { label: 'description', key: 'desc', class: 'text-left', sortable: true },
        { label: 'Image', key: 'image', class: 'text-left', type: 'image' }
      ]
    }
  },
  methods: {
  },
  mounted () {
    core.index()
  }
}
</script>
