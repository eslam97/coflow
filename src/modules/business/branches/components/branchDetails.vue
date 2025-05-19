<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addBranch)">
        <!-- Basic Info -->
        <b-row>
          <b-col lg="4">
            <input-form
              placeholder="Name"
              :validate="'required|max:50'"
              name="name"
              :label="'Name'"
              :limit="50"
              v-model="branch.name"
            />
          </b-col>
          <b-col lg="4">
            <input-form
              placeholder="Email"
              :validate="'required|email|max:100'"
              name="email"
              :label="'Email'"
              :limit="100"
              v-model="branch.email"
            />
          </b-col>
          <b-col lg="4">
            <input-form
              placeholder="Title"
              :validate="'required|max:50'"
              name="title"
              :label="'Title'"
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
              :label="'Facility Name'"
              :limit="12"
              v-model="facilityName"
            />
          </b-col>
          <b-col lg="4">
            <input-form
              :disabled="true"
              name="activityLine"
              :label="'Activity Line'"
              v-model="activityLine.name"
            />
          </b-col>
          <b-col lg="4">
            <input-form
              placeholder="Launch Year"
              :validate="'required|numeric|min:4|max:4'"
              name="year"
              :label="'Launch Year'"
              :limit="4"
              v-model="branch.year"
            />
          </b-col>
        </b-row>
        <!-- Bio -->
        <b-row class="mt-3">
          <b-col lg="12">
            <input-form
              placeholder="Bio"
              :validate="'required|max:500'"
              name="bio"
              :label="'Bio'"
              :limit="500"
              type="textarea"
              v-model="branch.bio"
            />
          </b-col>
        </b-row>
        <!-- Reservation Contacts -->
        <b-row
          v-for="(contact, i) in branch.reservation_contact"
          :key="'contact-'+i"
          class="mt-2"
        >
          <b-col lg="6">
            <input-form
              placeholder="Contact Name"
              :validate="'required|max:100'"
              :name="`reservation_contact[${i}][name]`"
              :label="`Contact Name #${i+1}`"
              :limit="100"
              v-model="contact.name"
            />
          </b-col>
          <b-col lg="6">
            <input-form
              placeholder="Contact Email"
              :validate="'required|email|max:100'"
              :name="`reservation_contact[${i}][email]`"
              :label="`Contact Email #${i+1}`"
              :limit="100"
              v-model="contact.email"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addContact">
          Add Contact
        </b-button>
        <!-- Phones -->
        <b-row
          v-for="(phone, i) in branch.phones"
          :key="'phone-'+i"
          class="mt-2"
        >
          <b-col lg="6">
            <input-form
              placeholder="Phone Label"
              :name="`phones[${i}][name]`"
              :label="`Phone Label #${i+1}`"
              v-model="phone.name"
            />
          </b-col>
          <b-col lg="6">
            <input-form
              placeholder="Phone Number"
              :name="`phones[${i}][phone]`"
              :label="`Phone Number #${i+1}`"
              v-model="phone.phone"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addPhone">
          Add Phone
        </b-button>
        <!-- Links -->
        <b-row
          v-for="(link, i) in branch.links"
          :key="'link-'+i"
          class="mt-2"
        >
          <b-col lg="6">
            <input-form
              placeholder="Link Name"
              :name="`links[${i}][name]`"
              :label="`Link Name #${i+1}`"
              v-model="link.name"
            />
          </b-col>
          <b-col lg="6">
            <input-form
              placeholder="Link URL"
              :name="`links[${i}][url]`"
              :label="`Link URL #${i+1}`"
              v-model="link.url"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addLink">
          Add Link
        </b-button>
        <!-- Languages -->
        <b-row
          v-for="(lang, i) in branch.languages"
          :key="'lang-'+i"
          class="mt-2"
        >
          <b-col lg="4">
            <input-form
              placeholder="Language ID"
              :name="`languages[${i}]`"
              :label="`Language #${i+1}`"
              v-model="branch.languages[i]"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addLanguage">
          Add Language
        </b-button>
        <!-- Amenities -->
        <b-row
          v-for="(am, i) in branch.amenities"
          :key="'amenity-'+i"
          class="mt-2"
        >
          <b-col lg="4">
            <input-form
              placeholder="Amenity ID"
              :name="`amenities[${i}]`"
              :label="`Amenity #${i+1}`"
              v-model="branch.amenities[i]"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addAmenity">
          Add Amenity
        </b-button>
        <!-- Operation Hours -->
        <b-row
  v-for="(op, i) in branch.operation"
  :key="'op-'+i"
  class="mt-2"
>
  <b-col lg="3" class="mb-3">
    <main-select
      :labelTitle="`Operation Day(s) #${i+1}`"
      :validate="'required'"
      :name="`operation[${i}][days]`"
      placeholder="Choose days"
      :options="weekDays"
      :multiple="true"
      label="text"
      :reduce="day => day.value"
      v-model="op.days"
    />
  </b-col>

  <b-col lg="3">
    <input-form
      placeholder="From (HH:mm)"
      :name="`operation[${i}][from]`"
      :label="`From #${i+1}`"
      v-model="op.from"
    />
  </b-col>

  <b-col lg="3">
    <input-form
      placeholder="To (HH:mm)"
      :name="`operation[${i}][to]`"
      :label="`To #${i+1}`"
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
    </validationObserver>
  </div>
</template>

<script>
import profileServices from '@/modules/business/profile/services/profile.services'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
import branchesServices from '../services/branches.services'
import { core } from '@/config/pluginInit'

export default {
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
        operation_type: '24 hours',
        operation: [{ days: [], from: '', to: '' }]
      },
      facilityName: '',
      allActivityLines: [],
      activityLine: { id: '', name: '' },
      typeOfModal: 'add',
      requestLoading: false,
      weekDays: [
        { text: 'Sat', value: 'Sat' },
        { text: 'Sun', value: 'Sun' },
        { text: 'Mon', value: 'Mon' },
        { text: 'Tue', value: 'Tue' },
        { text: 'Wed', value: 'Wed' },
        { text: 'Thu', value: 'Thu' },
        { text: 'Fri', value: 'Fri' }
      ]
    }
  },
  methods: {
    getAllActivityLine () {
      settingsService.getAllActivityLine().then(res => {
        this.allActivityLines = res.data.data
      })
    },
    getOldAdminInfo () {
      const id = JSON.parse(localStorage.getItem('userInfo')).id
      profileServices.getProfileData(id).then(res => {
        this.activityLine.id = res.data.data.activity_line_id
        this.activityLine.name = this.allActivityLines.find(
          item => item.id === this.activityLine.id
        ).name
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

      // flat fields
      fd.append('title', this.branch.title)
      fd.append('year', this.branch.year)
      fd.append('bio', this.branch.bio)

      // reservation_contact
      this.branch.reservation_contact.forEach((c, i) => {
        fd.append(`reservation_contact[${i}][name]`, c.name)
        fd.append(`reservation_contact[${i}][email]`, c.email)
      })

      // phones
      this.branch.phones.forEach((p, i) => {
        fd.append(`phones[${i}][name]`, p.name)
        fd.append(`phones[${i}][phone]`, p.phone)
      })

      // links
      this.branch.links.forEach((l, i) => {
        fd.append(`links[${i}][name]`, l.name)
        fd.append(`links[${i}][url]`, l.url)
      })

      // languages & amenities
      this.branch.languages.forEach((lang, i) =>
        fd.append(`languages[${i}]`, lang)
      )
      this.branch.amenities.forEach((am, i) =>
        fd.append(`amenities[${i}]`, am)
      )

      // operation
      fd.append('operation_type', this.branch.operation_type)
      this.branch.operation.forEach((op, i) => {
        op.days.forEach((d, j) =>
          fd.append(`operation[${i}][days][${j}]`, d)
        )
        fd.append(`operation[${i}][from]`, op.from)
        fd.append(`operation[${i}][to]`, op.to)
      })

      // name & email
      fd.append('name', this.branch.name)
      fd.append('email', this.branch.email)

      try {
        const res = await branchesServices.addNewBranch(fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        core.showSnackbar('success', res.data.message)
        this.$emit('finished')
      } catch (err) {
        console.error(err)
        core.showSnackbar(
          'error',
          err.response?.data?.message || err.message
        )
      } finally {
        this.requestLoading = false
      }
    }
  },
  created () {
    this.getAllActivityLine()
    this.getOldAdminInfo()
  }
}
</script>

<style lang="scss" scoped>
/* your existing styles (if any) */
</style>
