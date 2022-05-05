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
                  v-model="info.fullName"
                  placeholder="Ex: Eslam Ashraf"
                  :validate="'required'"
                  :name="`Full Name ${key + 1}`"
                  :label="'Full Name'"
              />
            </b-col>
            <b-col md="4" class="mb-3" >
              <input-form
                  v-model="info.role"
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
export default {
  data () {
    return {
      // loading Steps
      loadingGeneralAdminInformation: false,

      // forms
      adminInformation: [
        {
          fullName: '',
          role: '',
          phone: ''
        }
      ]
    }
  },
  methods: {
    addNewGeneralAdminInformation () {
      this.adminInformation.push({
        fullName: '',
        role: '',
        phone: ''
      })
    },
    deleteGeneralAdminInformation (key) {
      this.adminInformation.splice(key, 1)
    },
    saveGeneralAdminInformation () {
      this.loadingGeneralAdminInformation = true
      this.$store.commit('formSteps/setActiveStepForm', 2)
      this.loadingGeneralAdminInformation = false
    }
  }
}
</script>
