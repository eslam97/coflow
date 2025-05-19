<template>
  <div>
    <validation-observer v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addBranch)">

        <!-- Basic Info -->
        <b-row class="mt-3">
          <b-col lg="4">
            <input-form
              placeholder="Facility Title"
              :validate="'required|max:50'"
              name="title"
              label="Title"
              :limit="50"
              v-model="branch.title"
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
          <b-col lg="4">
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

        <!-- Reservation Contacts -->
        <b-row
          v-for="(contact, i) in branch.reservation_contact"
          :key="'contact-'+i"
          class="mt-3"
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
          class="mt-3"
        >
          <b-col lg="6">
            <input-form
              placeholder="0121232323"
              :name="`phones[${i}][phone]`"
              label="Phone"
              v-model="phone.phone"
            />
          </b-col>
          <b-col lg="6">
            <input-form
              placeholder="Label"
              :name="`phones[${i}][name]`"
              label="Phone Label"
              v-model="phone.name"
            />
          </b-col>
        </b-row>
        <b-button size="sm" variant="outline-primary" class="mt-2" @click.prevent="addPhone">
          Add Phone
        </b-button>

        <!-- Links with dropdown & delete -->
        <b-row class="mt-3">
          <b-col
            md="6"
            class="mb-1"
            v-for="(link, i) in branch.links"
            :key="'link-'+i"
          >
            <b-form-group
              :label="`URL Link #${i+1}`"
              class="position-relative"
            >
              <span
                class="text-danger deleteLabelButton cursor-pointer"
                v-if="i !== 0"
                @click="deleteLink(i)"
              >Delete</span>
              <b-input-group>
                <validation-provider
                  v-slot="{ errors }"
                  :name="`URL Link ${i+1}`"
                  rules="required"
                >
                  <b-form-input
                    v-model="link.url"
                    :class="{ 'is-invalid': errors.length }"
                    placeholder="Ex: https://www.example.com"
                    :disabled="!link.name"
                  />
                </validation-provider>
                <template #prepend>
                  <b-dropdown
                    :text="link.name || 'Choose'"
                    class="selectWithInput"
                  >
                    <b-dropdown-item
                      v-for="(opt, idx) in filterLinks"
                      :key="idx"
                      @click="link.name = opt.name"
                    >
                      {{ opt.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="12" class="mb-3">
            <span class="text-warning cursor-pointer" @click="addLink">
              + Add another Link
            </span>
          </b-col>
        </b-row>

        <!-- Team Languages -->
        <b-row class="mt-4">
          <b-col md="6">
            <main-select
              labelTitle="Team Languages"
              :validate="'required'"
              :multiple="true"
              name="languages"
              placeholder="Choose"
              :options="allLanguages"
              label="name"
              :reduce="d => d.id"
              v-model="branch.languages"
            />
          </b-col>
        </b-row>

        <!-- Amenities -->
        <b-row class="mt-4">
          <label class="w-100 pl-3 mb-2">Amenities</label>
          <b-col
            md="4" lg="2"
            class="mb-3"
            v-for="amen in allAmenities"
            :key="amen.id"
          >
            <b-form-checkbox
              class="custom-checkbox-color-check"
              color="warning"
              v-model="branch.amenities"
              :value="amen.id"
            >
              <span class="text-primary font-size-12">{{ amen.name }}</span>
            </b-form-checkbox>
          </b-col>
        </b-row>

        <!-- Facility Operation Days and Hours -->
        <div class="mb-5">
          <div class="border-bottom mb-2">
            <h5 class="pb-2">Facility Operation Days and Hours</h5>
          </div>
          <b-row class="mb-5">
            <b-col md="12">
              <label class="mb-3">Operation</label>
              <div>
                <b-form-radio
                  class="custom-radio-color-checked mr-5"
                  inline
                  v-model="branch.operation_type"
                  color="warning"
                  name="operationType"
                  value="24 hours"
                >
                  <span class="text-primary font-size-12">Open 24 Hours</span>
                </b-form-radio>
                <b-form-radio
                  class="custom-radio-color-checked"
                  inline
                  v-model="branch.operation_type"
                  color="warning"
                  name="operationType"
                  value="specify days"
                >
                  <span class="text-primary font-size-12">Specify Days(s) and Hours</span>
                </b-form-radio>
              </div>
            </b-col>
          </b-row>

          <b-row v-if="branch.operation_type !== '24 hours'">
            <b-col
              md="12"
              v-for="(op, idx) in branch.operation"
              :key="'op-'+idx"
              class="position-relative mb-3"
            >
              <b-row class="d-flex align-items-center">
                <b-col md="4" class="mb-3">
                  <main-select
                    labelTitle="Operation Day(s)"
                    :validate="'required'"
                    :name="`operation[${idx}][days]`"
                    placeholder="Choose days"
                    :options="weekDays"
                    :multiple="true"
                    label="value"
                    :reduce="d => d.key"
                    v-model="op.days"
                  />
                </b-col>
                <b-col md="4" class="mb-3">
                  <input-form
                    placeholder="From (HH:mm)"
                    :validate="'required'"
                    :name="`operation[${idx}][from]`"
                    label="From"
                    type="time"
                    v-model="op.from"
                  />
                </b-col>
                <b-col md="4" class="mb-3">
                  <input-form
                    placeholder="To (HH:mm)"
                    :validate="'required'"
                    :name="`operation[${idx}][to]`"
                    label="To"
                    type="time"
                    v-model="op.to"
                  />
                </b-col>
              </b-row>
              <span
                class="text-danger deleteLabelButton cursor-pointer"
                @click="deleteOperation(idx)"
              >Delete</span>
            </b-col>
            <b-col md="12" class="mb-3">
              <span
                class="text-warning cursor-pointer"
                @click="addOperation"
              >+ Add another Operation Day(s)</span>
            </b-col>
            <b-col md="12">
              <p class="text-gray">
                Note: Any day unspecified will automatically be “closed”.
              </p>
            </b-col>
          </b-row>
        </div>

        <!-- Final Name & Email -->
        <b-row class="mt-4">
          <b-col lg="6">
            <input-form
              placeholder="Name"
              name="name"
              label="Name"
              v-model="branch.name"
            />
          </b-col>
          <b-col lg="6">
            <input-form
              placeholder="email@example.com"
              name="email"
              label="Email"
              v-model="branch.email"
            />
          </b-col>
        </b-row>

        <!-- Submit -->
        <b-row class="mt-4" v-if="typeOfModal !== 'view'">
          <b-col class="text-center">
            <b-button
              :class="typeOfModal==='add'?'button-orange-modal':'button-blue-modal'"
              type="submit"
              :disabled="requestLoading"
            >
              <spinner-loading v-if="requestLoading" />
              <i v-else :class="typeOfModal==='add'?'las la-plus':'las la-pen'" />
            </b-button>
          </b-col>
        </b-row>

      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import InputForm from '@/components/formElements/InputForm.vue'
import VSelect from '@/components/formElements/VSelect.vue'
import { ValidationObserver } from 'vee-validate'
import branchesServices from '../services/branches.services'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
import { core } from '@/config/pluginInit'

export default {
  components: {
    InputForm,
    MainSelect: VSelect,
    ValidationObserver
  },

  data () {
    return {
      branch: {
        title: '',
        year: '',
        bio: '',
        reservation_contact: [{ name: '', email: '' }],
        phones: [{ name: '', phone: '' }],
        links: [{ name: '', url: '' }],
        languages: [],
        amenities: [],
        operation_type: '24 hours',
        operation: [{ days: [], from: '', to: '' }],
        name: '',
        email: ''
      },
      allLanguages: [],
      allAmenities: [],
      allLinks: [],
      typeOfModal: 'add',
      requestLoading: false,
      weekDays: [
        { key: 'Sat', value: 'Saturday' },
        { key: 'Sun', value: 'Sunday' },
        { key: 'Mon', value: 'Monday' },
        { key: 'Tue', value: 'Tuesday' },
        { key: 'Wed', value: 'Wednesday' },
        { key: 'Thu', value: 'Thursday' },
        { key: 'Fri', value: 'Friday' }
      ]
    }
  },

  async created () {
    const [langsRes, amRes, linksRes] = await Promise.all([
      settingsService.getAllLanguages(),
      settingsService.getAllAmenities(),
      settingsService.getAllLinks()
    ])
    this.allLanguages = langsRes.data.data
    this.allAmenities = amRes.data.data
    this.allLinks = linksRes.data.data
  },

  computed: {
    filterLinks () {
      return this.allLinks.filter(opt =>
        !this.branch.links.some(l => l.name === opt.name)
      )
    }
  },

  methods: {
    addContact () { this.branch.reservation_contact.push({ name: '', email: '' }) },
    addPhone () { this.branch.phones.push({ name: '', phone: '' }) },
    addLink () { this.branch.links.push({ name: '', url: '' }) },
    deleteLink (i) { this.branch.links.splice(i, 1) },
    addOperation () { this.branch.operation.push({ days: [], from: '', to: '' }) },
    deleteOperation (i) { this.branch.operation.splice(i, 1) },

    async addBranch () {
      this.requestLoading = true
      const fd = new FormData()

      // Basic fields
      fd.append('title', this.branch.title)
      fd.append('year', this.branch.year)
      fd.append('bio', this.branch.bio)

      // Reservation contacts
      this.branch.reservation_contact.forEach((c, i) => {
        fd.append(`reservation_contact[${i}][name]`, c.name)
        fd.append(`reservation_contact[${i}][email]`, c.email)
      })

      // Phones & Links
      this.branch.phones.forEach((p, i) => {
        fd.append(`phones[${i}][phone]`, p.phone)
        fd.append(`phones[${i}][name]`, p.name)
      })
      this.branch.links.forEach((l, i) => {
        fd.append(`links[${i}][url]`, l.url)
        fd.append(`links[${i}][name]`, l.name)
      })

      // Languages
      this.branch.languages.forEach((lang, i) =>
        fd.append(`languages[${i}]`, lang)
      )

      // Amenities
      this.branch.amenities.forEach((am, i) =>
        fd.append(`amenities[${i}]`, am)
      )

      // Operation
      fd.append('operation_type', this.branch.operation_type)
      this.branch.operation.forEach((op, i) => {
        op.days.forEach((d, j) =>
          fd.append(`operation[${i}][days][${j}]`, d)
        )
        fd.append(`operation[${i}][from]`, op.from)
        fd.append(`operation[${i}][to]`, op.to)
      })

      // Final name & email
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
  }
}
</script>

<style lang="scss" scoped>
.custom-checkbox-color-check .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #ffc107;
}
</style>
