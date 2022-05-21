<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" class="mb-2">
        <h3>Promotions</h3>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            :list_url="'allPromotions'"
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
        { label: 'Provider Name', key: 'provider.name', class: 'text-left' },
        { label: 'Profile Type', key: 'provider.profile_type', class: 'text-left' },
        { label: 'Offer Title', key: 'offer_title', class: 'text-left' },
        { label: 'Promotion Type', key: 'promotion_type', class: 'text-left' },
        { label: 'Start Date', key: 'start_date', class: 'text-left' },
        { label: 'End Date', key: 'end_date', class: 'text-left' },
        { label: 'Views', key: 'views', class: 'text-left' },
        { label: 'Likes', key: 'likes', class: 'text-left' }
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
