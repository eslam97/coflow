<template>
  <div>
    <main-modal id="amenities" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>Amenity</h4>
      </template>
      <template v-slot:body>
        <amenity-form :requestLoading="requestLoading" @addAmenity="addAmenity"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:amenities class="add_button text-white"> Add Amenity<i
          class="las la-plus ml-3"></i></b-button>
    </div>
    <main-table
        :fields="columns"
        class="mb-0 table-borderless"
        :list_url="'amenities'"
        :reloadData="reloadTable"
    >
    </main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import settingsService from '../services/settings.services'
import amenityForm from '@/modules/superAdmin/settings/components/amenityForm'
export default {
  name: 'profileSetting',
  components: {
    amenityForm
  },
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: 'Icon', key: 'icon', class: 'text-center', type: 'image' },
        { label: 'Name', key: 'name', class: 'text-center' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-center',
          type: 'actions',
          actions: [
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'amenity',
              textContent: 'name',
              url: 'amenities'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addAmenity (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addAmenity(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('amenities')
      }).finally(() => {
        this.requestLoading = false
      })
    }
  },
  mounted () {
    core.index()
  },
  created () {
  }
}
</script>
