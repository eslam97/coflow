<template>
  <div>
    <validationObserver v-slot="{}">
      <b-form>
        <b-row class="">
          <b-col lg="6" class="">
            <input-form
              placeholder="Branch Name"
              :validate="'required|max:50'"
              name="Branch name"
              :label="'Branch Name'"
              :limit="50"
              v-model="branch.name"
            />
          </b-col>
          <b-col lg="6">
            <input-form
              placeholder="Facility Email"
              :validate="'required|max:50'"
              name="Facility Email"
              :label="'Facility Email'"
              :limit="50"
              v-model="branch.email"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4">
            <input-form
              :disabled="true"
              name="Facility Name"
              :label="'Facility Name'"
              :limit="12"
              v-model="facilityName"
            />
          </b-col>

          <b-col lg="4">
            <input-form
              :disabled="true"
              name="Activity Line"
              :label="'Activity Line'"
              v-model="activityLine.name"
            />
          </b-col>
          <b-col lg="4">
            <input-form
              name="Luanch Year"
              :label="'Luanch Year'"
              :limit="4"
              :validate="'required|max:4'"
              v-model="branch.year"
            />
          </b-col>
        </b-row>

        <b-row v-if="typeOfModal != 'view'">
          <b-col md="12" class="mt-4">
            <div
              class="d-flex justify-content-center"
              v-if="typeOfModal == 'add'"
            >
              <b-button
                class="button-orange-modal"
                type="submit"
                v-if="!requestLoading"
              >
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
            <div
              class="d-flex justify-content-center"
              v-if="typeOfModal == 'edit'"
            >
              <b-button
                class="button-blue-modal"
                type="submit"
                v-if="!requestLoading"
              >
                <i class="las la-pen"></i>
              </b-button>
              <b-button class="button-blue-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validationObserver>
  </div>
</template>

<script>
import profileServices from '@/modules/business/profile/services/profile.services'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'

export default {
  data () {
    return {
      branch: {
        name: '',
        email: '',
        title: '',
        year: ''
      },
      typeOfModal: 'add',
      requestLoading: false,
      facilityName: '',
      allActivityLines: [],
      activityLine: { id: '', name: '' }
    }
  },
  methods: {
    getOldAdminInfo () {
      const id = JSON.parse(localStorage.getItem('userInfo')).id
      profileServices.getProfileData(id).then((res) => {
        this.activityLine.id = res.data.data.activity_line_id
        this.activityLine.name = this.allActivityLines.filter((item) => item.id === this.activityLine.id)[0].name
        this.facilityName = res.data.data.name
      })
    },
    getAllActivityLine () {
      settingsService.getAllActivityLine().then(res => {
        this.allActivityLines = res.data.data
      })
    }
  },
  created () {
    this.getAllActivityLine()
    this.getOldAdminInfo()
  }
}
</script>

<style lang="scss" scoped></style>
