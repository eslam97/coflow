<template>
  <b-row>
    <b-col lg="12">
      <main-table
          :fields="columns"
          class="mb-0 table-borderless"
          :list_url="'all-courses'"
      >
      </main-table>
    </b-col>
  </b-row>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  data () {
    return {
      columns: [
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Provider Name', key: 'provider.name', class: 'text-left' },
        { label: 'Profile Type', key: 'provider.profile_type', class: 'text-left' },
        { label: 'City', key: 'provider.city.name', class: 'text-left' },
        { label: 'Area', key: 'provider.area.name', class: 'text-left' },
        { label: 'Price EGP', key: 'price_egp', class: 'text-left' },
        { label: 'Discount Price EGP', key: 'discount_price_egp', class: 'text-left' },
        { label: 'Price EURO', key: 'price_euro', class: 'text-left' },
        { label: 'Discount Price EURO', key: 'discount_price_euro', class: 'text-left' },
        { label: 'Price Dollar', key: 'price_dollar', class: 'text-left' },
        { label: 'Discount Price Dollar', key: 'discount_price_dollar', class: 'text-left' },
        { label: 'Conditions', key: 'conditions', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left', type: 'status' },
        { label: 'Views', key: 'views', class: 'text-left' },
        { label: 'Unique Views', key: 'unique_views', class: 'text-left' }
      ]
    }
  },
  mounted () {
    core.index()
  }
}
</script>
