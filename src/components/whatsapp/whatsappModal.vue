<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="12">
            <iq-card>
              <template v-slot:body>
                <div class="new-user-info">
                  <b-row>
                    <b-form-group class="col-md-12" label="Choose Project:" label-for="project">
                      <ValidationProvider name="code" ref="project" rules="required" v-slot="{ errors }">
                        <select v-model="whatsapp.project" :class="(errors.length > 0 ? ' is-invalid form-control' : 'form-control')">
                          <option selected disabled value="">Choose project...</option>
                          <option v-for="(i, key) in getUserProjects" :key="key" :value="i.id">{{i.en_title}}</option>
                        </select>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="whatsapp User:" label-for="whatsapp">
                      <ValidationProvider name="whatsapp" ref="phone" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="whatsapp.phone" type="text" placeholder="whatsapp" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Key:" label-for="key">
                      <ValidationProvider name="key" ref="key" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="whatsapp.key" type="text" placeholder="key" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="whatsapp.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New</b-button>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'

export default {
  name: 'addWhatsapp',
  props: {
    edit: {
      default: false
    }
  },
  computed: {
    ...mapGetters(['getUserProjects', 'getSpacificWatsapp'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.whatsapp = {
        project: this.getSpacificWatsapp.project_id,
        phone: this.getSpacificWatsapp.phone,
        key: this.getSpacificWatsapp.api_key,
        is_active: this.getSpacificWatsapp.is_active === 1
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      whatsapp: {
        project: '',
        phone: '',
        key: '',
        is_active: 1
      }
    }
  },
  methods: {
    resetData () {
      this.whatsapp = {
        project: '',
        phone: '',
        key: '',
        is_active: this.whatsapp.is_active === 1
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        this.$store.dispatch('editSettingWhatsapp', {
          id: this.getSpacificWatsapp.id,
          newData: this.whatsapp
        }).then((res) => {
          this.$emit('reload')
          core.showSnackbar('success', res.data.message)
          this.$bvModal.hide('modal-4')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      } else {
        this.$store.dispatch('addSettingWhatsapp', this.whatsapp).then(res => {
          this.$emit('reload')
          core.showSnackbar('success', res.data.message)
          this.$bvModal.hide('modal-4')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      }
    }
  },
  created () {
  }
}
</script>
