<template>
  <div>
    <div class="border-bottom my-5">
      <b-container>
        <h4 class="py-4">General Admin Information: Contacts</h4>
      </b-container>
    </div>
    <b-container>
      <div class="w-75">
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(saveGeneralAdminInformation)">
            <b-row v-for="(info, key) in adminInformation" :key="key">
              <b-col md="4" class="mb-3" >
                <input-form
                    v-model="info.name"
                    placeholder="Ex: Eslam Ashraf"
                    :validate="'required'"
                    :name="`Full Name ${key + 1}`"
                    :label="'Full Name'"
                />
              </b-col>
              <b-col md="4" class="mb-3" >
                <input-form
                    v-model="info.job"
                    placeholder="Ex: Owner"
                    :validate="'required'"
                    :name="`Role or Job ${key + 1}`"
                    :label="'Role or Job'"
                />
              </b-col>
              <b-col md="4" class="mb-3 position-relative" >
                <input-form
                    v-model="info.phone"
                    placeholder="Ex: 01095097908"
                    :validate="'required|numeric'"
                    :name="`Phone Number ${key + 1}`"
                    :label="'Phone Number'"
                />
                <span class="text-danger deleteLabelButtonAdmin cursor-pointer" v-if="key != 0"
                      @click="deleteGeneralAdminInformation(key)">Delete Contact
              </span>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
              <span class="text-warning cursor-pointer" @click="addNewGeneralAdminInformation">+ Add another
                Contact</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="mt-3 d-flex justify-content-end">
                <spinner-loading class="container_button_blue" text="Saving" v-if="loadingGeneralAdminInformation"/>
                <b-button class="container_button_blue slideNextArrow" type="submit" v-else>
                <span class="d-flex align-items-center">Next
                  <i class="ml-2 las la-arrow-right font-size-18"></i></span>
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </ValidationObserver>
      </div>
    </b-container>
  </div>
</template>
<script>
import registrationServices from '../../../services/registration.services'
import { core } from '@/config/pluginInit'
export default {
  data () {
    return {
      // loading Steps
      loadingGeneralAdminInformation: false,

      // forms
      adminInformation: [
        {
          name: '',
          job: '',
          phone: ''
        }
      ]
    }
  },
  props: {
    providerInfo: {
      required: false
    }
  },
  methods: {
    addNewGeneralAdminInformation () {
      this.adminInformation.push({
        name: '',
        job: '',
        phone: ''
      })
    },
    deleteGeneralAdminInformation (key) {
      this.adminInformation.splice(key, 1)
    },
    saveGeneralAdminInformation () {
      this.loadingGeneralAdminInformation = true
      registrationServices.saveStepAdmin({ contact: this.adminInformation }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$store.commit('formSteps/setActiveStepForm', 2)
        localStorage.setItem('formStep', 2)
      }).catch((err) => {
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        }
      }).finally(() => {
        this.loadingGeneralAdminInformation = false
      })
    }
  },
  created () {
    if (this.providerInfo && this.providerInfo.contacts) {
      this.adminInformation = this.providerInfo.contacts
    }
  }
}
</script>
