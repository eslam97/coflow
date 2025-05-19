<template>
  <div>
    <validation-observer v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addBranch)">
        <!-- Basic Info -->
        <b-row>
          <b-col lg="4">
            <input-form
              placeholder="Name"
              :validate="'required|max:50'"
              name="name"
              label="Name"
              :limit="50"
              v-model="branch.name"
            />
          </b-col>
          <b-col lg="4">
            <input-form
              placeholder="Email"
              :validate="'required|email|max:100'"
              name="email"
              label="Email"
              :limit="100"
              v-model="branch.email"
            />
          </b-col>
          <b-col lg="4">
            <input-form
              placeholder="Title"
              :validate="'required|max:50'"
              name="title"
              label="Title"
              :limit="50"
              v-model="branch.title"
            />
          </b-col>
        </b-row>

        <!-- Facility & Activity Line & Year -->
        <b-row>
          <b-col lg="4">
            <input-form
              :disabled="true"
              name="facilityName"
              label="Facility Name"
              :limit="12"
              v-model="facilityName"
            />
          </b-col>
          <b-col lg="4">
            <input-form
              :disabled="true"
              name="activityLine"
              label="Activity Line"
              v-model="activityLine.name"
            />
          </b-col>
          <b-col lg="4">
            <input-form
              placeholder="2017"
              :validate="'required|numeric|min:4|max:4'"
              name="year"
              label="Year"
              :limit="4"
              v-model="branch.year"
            />
          </b-col>
        </b-row>

        <!-- Bio -->
        <b-row class="mt-3">
          <b-col lg="12">
            <input-form
              placeholder="Bio text"
              :validate="'required|max:500'"
              name="bio"
              label="Bio"
              :limit="500"
              type="textarea"
              v-model="branch.bio"
            />
          </b-col>
        </b-row>
        <!-- Phones -->
        <b-row
          v-for="(phone, i) in branch.phones"
          :key="'phone-' + i"
          class="mt-2"
        >
          <b-col lg="6">
            <input-form
              placeholder="phone"
              :name="`phones[${i}][phone]`"
              label="Phone Number"
              v-model="phone.phone"
            />
          </b-col>
          <b-col lg="6">
            <input-form
              placeholder="phone label"
              :name="`phones[${i}][name]`"
              label="Phone Label"
              v-model="phone.name"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addPhone">
          Add Phone
        </b-button>

        <!-- Links -->
        <b-row
          v-for="(link, i) in branch.links"
          :key="'link-' + i"
          class="mt-2"
        >
          <b-col lg="6">
            <input-form
              placeholder="website"
              :name="`links[${i}][url]`"
              label="Link URL"
              v-model="link.url"
            />
          </b-col>
          <b-col lg="6">
            <input-form
              placeholder="website label"
              :name="`links[${i}][name]`"
              label="Link Name"
              v-model="link.name"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addLink">
          Add Link
        </b-button>

        <!-- Languages -->
        <b-row class="mt-2">
          <b-col lg="4" v-for="(lang, i) in branch.languages" :key="'lang-'+i">
            <input-form
              placeholder="1"
              :name="`languages[${i}]`"
              label="Language ID"
              v-model="branch.languages[i]"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addLanguage">
          Add Language
        </b-button>

        <!-- Amenities -->
        <b-row class="mt-2">
          <b-col lg="4" v-for="(am, i) in branch.amenities" :key="'amenity-'+i">
            <input-form
              placeholder="1"
              :name="`amenities[${i}]`"
              label="Amenity ID"
              v-model="branch.amenities[i]"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addAmenity">
          Add Amenity
        </b-button>

        <!-- Operation Type -->
        <b-row class="mt-3">
          <b-col lg="4">
            <input-form
              placeholder="specify days"
              name="operation_type"
              label="Operation Type"
              v-model="branch.operation_type"
            />
          </b-col>
        </b-row>

        <!-- Operation Days/Hours -->
        <b-row
          v-for="(op, i) in branch.operation"
          :key="'op-'+i"
          class="mt-2"
        >
          <b-col lg="3">
            <main-select
              :labelTitle="`operation[${i}][days]`"
              :name="`operation[${i}][days]`"
              placeholder="Sat, Sun…"
              :options="weekDays"
              :multiple="true"
              label="value"
              :reduce="d => d.key"
              v-model="op.days"
            />
          </b-col>
          <b-col lg="3">
            <input-form
              placeholder="09:26"
              :name="`operation[${i}][from]`"
              label="operation from"
              v-model="op.from"
            />
          </b-col>
          <b-col lg="3">
            <input-form
              placeholder="19:26"
              :name="`operation[${i}][to]`"
              label="operation to"
              v-model="op.to"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addOperation">
          Add Operation Block
        </b-button>
        <!-- Submit -->
        <b-row v-if="typeOfModal !== 'view'">
          <b-col md="12" class="mt-4 text-center">
            <b-button
              :class="typeOfModal === 'add' ? 'button-orange-modal' : 'button-blue-modal'"
              type="submit"
              :disabled="requestLoading"
            >
              <spinner-loading v-if="requestLoading" />
              <i
                v-else
                :class="typeOfModal === 'add' ? 'las la-plus' : 'las la-pen'"
              />
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
// import InputForm from '@/components/formElements/InputForm.vue'
// import SpinnerLoading from '@/components/ui/SpinnerLoading.vue'
// import { ValidationObserver } from 'vee-validate'

import profileServices from '@/modules/business/profile/services/profile.services'
// import settingsService from '@/modules/superAdmin/settings/services/settings.services'
import branchesServices from '../services/branches.services'
import { core } from '@/config/pluginInit'

export default {
  // components: {
  //   InputForm,
  //   SpinnerLoading,
  //   ValidationObserver
  // },

  data () {
    return {
      branch: {
        name: '',
        email: '',
        title: '',
        year: '',
        bio: '',
        reservation_contact: [{ name: '', email: '' }],
        phones: [{ name: '', phone: '' }],
        links: [{ name: '', url: '' }],
        languages: [],
        amenities: [],
        operation_type: '',
        operation: [{ days: [], from: '', to: '' }]
      },
      facilityName: '',
      activityLine: { id: '', name: '' },
      typeOfModal: 'add',
      requestLoading: false,
      weekDays: [
        { key: 'Sat', value: 'Sat' },
        { key: 'Sun', value: 'Sun' },
        { key: 'Mon', value: 'Mon' },
        { key: 'Tue', value: 'Tue' },
        { key: 'Wed', value: 'Wed' },
        { key: 'Thu', value: 'Thu' },
        { key: 'Fri', value: 'Fri' }
      ]
    }
  },

  methods: {
    getOldAdminInfo () {
      const id = JSON.parse(localStorage.getItem('userInfo')).id
      profileServices.getProfileData(id).then(res => {
        this.activityLine.id = res.data.data.activity_line_id
        this.facilityName = res.data.data.name
      })
    },
    addContact () {
      this.branch.reservation_contact.push({ name: '', email: '' })
    },
    addPhone () {
      this.branch.phones.push({ name: '', phone: '' })
    },
    addLink () {
      this.branch.links.push({ name: '', url: '' })
    },
    addLanguage () {
      this.branch.languages.push('')
    },
    addAmenity () {
      this.branch.amenities.push('')
    },
    addOperation () {
      this.branch.operation.push({ days: [], from: '', to: '' })
    },

    async addBranch () {
      this.requestLoading = true
      const fd = new FormData()

      // title, year, bio
      fd.append('title', this.branch.title)
      fd.append('year', this.branch.year)
      fd.append('bio', this.branch.bio)

      // reservation_contact as JSON
      fd.append('reservation_contact', JSON.stringify(this.branch.reservation_contact))

      // phones and links
      this.branch.phones.forEach((p, i) => {
        fd.append(`phones[${i}][phone]`, p.phone)
        fd.append(`phones[${i}][name]`, p.name)
      })
      this.branch.links.forEach((l, i) => {
        fd.append(`links[${i}][url]`, l.url)
        fd.append(`links[${i}][name]`, l.name)
      })

      // languages & amenities
      this.branch.languages.forEach((lang, i) =>
        fd.append(`languages[${i}]`, lang)
      )
      this.branch.amenities.forEach((am, i) =>
        fd.append(`amenities[${i}]`, am)
      )

      // operation_type + operation blocks
      fd.append('operation_type', this.branch.operation_type)
      this.branch.operation.forEach((op, i) => {
        op.days.forEach((d, j) =>
          fd.append(`operation[${i}][days][${j}]`, d)
        )
        fd.append(`operation[${i}][from]`, op.from)
        fd.append(`operation[${i}][to]`, op.to)
      })

      // final name + email
      fd.append('name', this.branch.name)
      fd.append('email', this.branch.email)

      try {
        const res = await branchesServices.addNewBranch(fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        core.showSnackbar('success', res.data.message)
        this.$emit('finished')
      } catch (err) {
        core.showSnackbar('error', err.response?.data?.message || err.message)
      } finally {
        this.requestLoading = false
      }
    }
  },

  created () {
    this.getOldAdminInfo()
  }
}
</script>

<style lang="scss" scoped>
/* your existing styles */
</style>
