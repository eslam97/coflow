<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(updateLoginCredential)">
        <b-card class="mb-5">
          <b-card-header class="mb-4">
            <h4>Login</h4>
          </b-card-header>
          <b-card-body>
            <b-row class="mb-4">
              <b-col md="4" class="mb-3">
                <input-form
                    v-model="profile.email"
                    name="Email address"
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
      <b-form @submit.prevent="handleSubmit(updateContanctInfo)">
        <b-card>
          <b-card-header class="mb-5">
            <h4 class="pb-2">Contacts</h4>
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
                <span class="text-danger deleteLabelButtonAdmin cursor-pointer"
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
  </div>
</template>

<script>
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
      if (this.newPassword === this.confirmPassword) {
        this.profile.password = this.newPassword
        this.$emit('updateLoginCredential', { ...this.profile, _method: 'put' })
      }
    },
    updateContanctInfo () {
      this.$emit('updateContactInfo', { contacts: this.contacts, _method: 'post' })
    },
    addAdditionalContact () {
      this.contacts.push({
        name: '',
        job: '',
        phone: ''
      })
    },
    deleteAdditionalContact (ind) {
      this.contacts.splice(ind, 1)
    }
  },
  created () {
    console.log(this.oldProfile.email)
    if (this.oldProfile) {
      this.profile.email = this.oldProfile.email
      this.contacts = this.oldProfile.contacts
    }
  }
}
</script>
