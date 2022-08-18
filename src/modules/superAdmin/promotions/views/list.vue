<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" class="mb-2">
        <h3>Promotions</h3>
      </b-col>
      <b-col lg="12" class="mb-2">
        <iq-card class="filter-card">
          <b-row>
            <b-col md="3" sm="6">
              <span>Filter by provider:</span>
              <b-form-input v-model="filter.name" @keyup="reloadTable=true"
                            placeholder="Search">
              </b-form-input>
            </b-col>
            <b-col md="3" sm="6">
              <span>Filter by profile type:</span>
              <main-select v-model="filter.profile_type" @change="reloadTable=true"
                           :options="profileTypeFilterOptions" label="key" :reduce="data => data.value"
                           placeholder="--Select--">
              </main-select>
            </b-col>
            <b-col md="3" sm="6">
              <span>Filter by promotion type:</span>
              <main-select v-model="filter.promotion_type" @change="reloadTable=true"
                           :options="promotionTypeFilterOptions" label="key" :reduce="data => data.value"
                           placeholder="--Select--">
              </main-select>
            </b-col>
<!--            <b-col md="3">
              <span>Filter by status:</span>
              <main-select v-model="filter.status" @change="reloadTable=true"
                           :options="statusFilterOptions"
                           label="key"
                           :reduce="data => data.value"
                           placeholder="&#45;&#45;Select&#45;&#45;">
              </main-select>
            </b-col>-->
          </b-row>
        </iq-card>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'allPromotions'"
            :reloadData="reloadTable"
            :custom-filter="filter"
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
        { label: 'Start Date', key: 'start_date', class: 'text-left', sortable: true },
        { label: 'End Date', key: 'end_date', class: 'text-left', sortable: true },
        { label: 'Views', key: 'views', class: 'text-left', sortable: true },
        { label: 'Likes', key: 'likes', class: 'text-left', sortable: true }
      ],
      reloadTable: false,
      filter:
          {
            city_id: '',
            area_id: '',
            promotion_type: '',
            profile_type: '',
            name: '',
            status: '',
            sort: '',
            sort_type: ''
          },
      profileTypeFilterOptions: [
        { key: 'Sky', value: 'sky_' },
        { key: 'Sea', value: 'sea_' },
        { key: 'Earth', value: 'earth_' },
        { key: 'Energy', value: 'energy_' },
        { key: 'None', value: '' }
      ],
      promotionTypeFilterOptions: [
        { key: 'Package', value: 'package' },
        { key: 'Discount', value: 'discount' },
        { key: 'Buy_x get_y', value: 'buy_x get_y' },
        { key: 'None', value: '' }
      ],
      statusFilterOptions: [
        { key: 'Active', value: 'active' },
        { key: 'Inactive', value: 'inactive' },
        { key: 'None', value: '' }
      ]
    }
  },
  methods: {
    sortChanged (key) {
      this.reloadTable = false
      this.filter.sort = key.sortBy
      this.filter.sort_type = key.sortDesc ? 'desc' : 'asc'
      this.reloadTable = true
    }
  },
  mounted () {
    core.index()
  }
}
</script>
