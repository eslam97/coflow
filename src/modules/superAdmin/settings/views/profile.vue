<template>
  <b-card>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveSettings)">
        <b-row>
            <b-col class="mb-3" md="4">
              <input-form
                  placeholder="Ex: 105 name st."
                  :validate="'required'"
                  :name="`Address`"
                  :label="'Address'"
                  v-model="settings.address"
              />
            </b-col>
            <b-col class="mb-3" md="4">
              <input-form
                  placeholder="Ex: user@coflow.com"
                  :validate="'required|email'"
                  :name="`Email`"
                  :label="'Email'"
                  v-model="settings.email"
              />
            </b-col>
            <b-col class="mb-3" md="4">
              <input-form
                  placeholder="Ex: 01012345678"
                  :validate="'required|numeric'"
                  :name="`Phone`"
                  :label="'Phone'"
                  v-model="settings.phone"
              />
            </b-col>
            <b-col class="mb-3" md="12">
              <b-form-group
                  label="Terms"
                  label-for="Terms"
              >
                <ValidationProvider name="Terms" ref="Terms" rules="required" v-slot="{ errors }">
                  <b-form-textarea
                      placeholder="Terms..."
                      rows="2"
                      v-model="settings.terms"
                      :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                  ></b-form-textarea>
                  <div class="invalid-feedback">
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </b-form-group>
            </b-col>
          </b-row>
        <b-row>
          <b-col md="12" class="mt-3 d-flex justify-content-end">
            <span>
                <spinner-loading class="gradient-orange-button text-white" text="Saving" v-if="loadingSaveSettings"/>
                <b-button class="gradient-orange-button slideNextArrow" type="submit" v-else>
                <span class="d-flex align-items-center">Save</span>
              </b-button>
              </span>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </b-card>
</template>
<script>
import { core } from '@/config/pluginInit'
import settingsService from '../services/settings.services'
export default {
  name: 'profileSetting',
  data () {
    return {
      loadingSaveSettings: false,
      settings: {
        terms: '',
        address: '',
        phone: '',
        email: ''
      }
    }
  },
  methods: {
    saveSettings () {
      this.loadingSaveSettings = true
      settingsService.updateProfileSettings(this.settings).then(res => {
        core.showSnackbar('success', res.data.message)
      }).finally(() => {
        this.loadingSaveSettings = false
      })
    },
    getSettingData () {
      settingsService.getProfileSettings().then(res => {
        this.settings = res.data.data
      })
    }
  },
  mounted () {
    core.index()
  },
  created () {
    this.getSettingData()
  }
}
</script>
