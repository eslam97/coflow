<template>
  <div>
    <b-row><b-col md="9">
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(updateLoginCredential)">
        <b-card class="mb-5">
          <b-card-header class="mb-4">
            <p><span class="text-dark font-weight-bold font-size-20 mr-3">Login</span>
              Use this section to update your login credentials.</p>
          </b-card-header>
          <b-card-body>
            <b-row class="mb-4">
              <b-col md="4" class="mb-3">
                <input-form
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
          <b-card-header class="mb-5">
            <p><span class="text-dark font-weight-bold font-size-20 mr-3">Contacts</span>
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
                    v-model="contact.job"
                    placeholder="Ex: Owner"
                    :validate="'required'"
                    :name="`Role or Job ${key + 1}`"
                    :label="'Role or Job'"
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
                <span v-if="key == 0" class="text-danger deleteLabelButtonAdmin cursor-pointer"
                      @click="clearFirstContact(key)">Clear Contact
                </span>
                <span v-else class="text-danger deleteLabelButtonAdmin cursor-pointer"
                      @click="deleteAdditionalContact(key)">Delete Contact
                </span>
              </b-col>
            </b-row>
            <b-row class="mb-5">
              <b-col md="12">
                    <span class="text-warning cursor-pointer mb-2" @click="addAdditionalContact">+ Add another
                      Contact</span>
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
        name: '',
        job: '',
        phone: ''
      }]
    }
  },
  methods: {
    updateLoginCredential () {
      if (this.newPassword && this.confirmPassword) {
        if (this.newPassword === this.confirmPassword) {
          this.newPassword = ''
          this.confirmPassword = ''
          this.$emit('updateLoginCredential', {
            password: this.newPassword,
            _method: 'post'
          })
        }
      } else {
        core.showSnackbar('error', 'New password and Confirm password can\'t be empty')
      }
    },
    updateContactInfo () {
      if (this.contacts.length > 0) {
        this.$emit('updateContactInfo', { contact: this.contacts })
      } else {
        console.log('You should have at least 1 contact info')
      }
    },
    addAdditionalContact () {
      this.contacts.push({
        name: '',
        job: '',
        phone: ''
      })
    },
    clearFirstContact (ind) {
      this.contacts[ind].name = ''
      this.contacts[ind].job = ''
      this.contacts[ind].phone = ''
    },
    deleteAdditionalContact (ind) {
      this.contacts.splice(ind, 1)
    }
  },
  created () {
    if (this.oldProfile) {
      this.profile.email = this.oldProfile.email
      this.contacts = this.oldProfile.contacts
    }
  }
}
</script>
