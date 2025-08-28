<template>
  <div>
    <b-row><b-col md="12">
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(updateLoginCredential)">
        <b-card class="mb-5">
          <b-card-header class="mb-4 py-2">
            <p class="font-size-12"><span class="text-dark font-weight-bold font-size-18 mr-3">Login Credentials</span>
               Use this section to update your login credentials.</p>
          </b-card-header>
          <b-card-body>
            <b-row class="mb-4">
              <b-col md="4" class="mb-3">
                <input-form
                    disabled="true"
                    class="email-disabled"
                    v-model="profile.email"
                    name="Email address"
                    :validate="'required|email'"
                    :label="'Facility email address'"
                />
              </b-col>
              <b-col md="4" class="mb-3">
                <input-form
                    v-model="newPassword"
                    name="New password"
                    :label="'New password'"
                />
              </b-col>
              <b-col md="4" class="mb-3">
                <input-form
                    v-model="confirmPassword"
                    name="Confirm password"
                    :label="'Confirm password'"
                />
              </b-col>
            </b-row>
            <button
                class="btn radio-btn radio-btn-orange save-changes-btn"
            >
              Save changes
            </button>
          </b-card-body>
        </b-card>
      </b-form>
    </validationObserver>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(updateContactInfo)">
        <b-card class="mb-5">
          <b-card-header class="mb-3 py-2">
            <p class="font-size-12"><span class="text-dark font-weight-bold font-size-18 mr-3">Contacts</span>
              Use this section to update your contact information for internal communication with coflow.</p>
          </b-card-header>
          <b-card-body>
            <b-row class="mb-3" v-for="(contact, key) in contacts" :key="key">
              <b-col md="4">
                <input-form
                    v-model="contact.name"
                    placeholder="Ex: Eslam Ashraf"
                    :validate="'required'"
                    :name="`Full Name ${key + 1}`"
                    :label="'Full Name'"
                />
              </b-col>
              <b-col md="4">
                <input-form
                    v-model="contact.title"
                    placeholder="Ex: Owner"
                    :validate="'required'"
                    :name="`title ${key + 1}`"
                    :label="'title'"
                />
              </b-col>
              <b-col md="4" class="position-relative" >
                <input-form
                    v-model="contact.phone"
                    placeholder="Ex: 01095097908"
                    :validate="'required|numeric'"
                    :name="`Phone Number ${key + 1}`"
                    :label="'Phone Number'"
                />
              </b-col>
            </b-row>
            <button
                class="btn radio-btn radio-btn-orange save-changes-btn"
            >
              Save changes
            </button>
          </b-card-body>
        </b-card>
      </b-form>
    </validationObserver>
  </b-col></b-row>
  </div>
</template>

<script>
import { core } from '@/config/pluginInit'
import profileServices from '@/modules/business/profile/services/profile.services.js'
import facilityInfoService from '@/modules/businessLandingPage/services/registration.services'

export default {
  props: {
    oldProfile: {
      type: Object
    }
  },
  data () {
    return {
      newPassword: '',
      confirmPassword: '',
      profile: {
        email: '',
        password: ''
      },
      contacts: [{
        name: JSON.parse(localStorage.getItem('userInfo'))?.name || '',
        title: JSON.parse(localStorage.getItem('userInfo'))?.title || '',
        phone: JSON.parse(localStorage.getItem('userInfo'))?.phone || ''
      }]
    }
  },
  methods: {
    updateLoginCredential () {
      if (this.newPassword && this.confirmPassword) {
        profileServices.changePassword({
          password: this.confirmPassword
        }).then(res => {
          core.showSnackbar('success', res.data.message)
        })
      } else {
        core.showSnackbar('error', 'New password and Confirm password can\'t be empty')
      }
    },
    updateContactInfo () {
      if (this.contacts.length > 0) {
        facilityInfoService.saveStepAdmin(this.contacts).then(res => {
          core.showSnackbar('success', res.data.message)
        })
      } else {
        console.log('You should have at least 1 contact info')
      }
    },
    addAdditionalContact () {
      this.contacts.push({
        name: '',
        title: '',
        phone: ''
      })
    },
    clearFirstContact (ind) {
      this.contacts[ind].name = ''
      this.contacts[ind].title = ''
      this.contacts[ind].phone = ''
    },
    deleteAdditionalContact (ind) {
      this.contacts.splice(ind, 1)
    }
  },
  watch: {
    oldProfile: {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.profile.email = newVal.email
          // this.contacts = newVal.contact || [{
          //   name: '',
          //   title: '',
          //   phone: ''
          // }]
        }
      }
    }
  },
  created () {
  }
}
</script>
<style>
.email-disabled input:disabled {
  background-color: #fff !important;
}
</style>
