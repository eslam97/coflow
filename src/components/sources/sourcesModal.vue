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
                    <b-form-group class="col-md-6" label="Title:" label-for="title">
                      <ValidationProvider name="title" ref="title" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="sources.title" type="text" placeholder="Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Icon:" label-for="arabic_title">
                      <ValidationProvider name="icon" ref="icon" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="sources.icon" type="text" placeholder="Icon" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="sources.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit sources</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New sources</b-button>
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
/*
import { db } from '../../config/firebase'
*/
import { mapGetters } from 'vuex'

export default {
  name: 'addsources',
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getSpacificsources'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.sources = {
        title: this.getSpacificsources.title,
        icon: this.getSpacificsources.icon,
        // eslint-disable-next-line eqeqeq
        is_active: this.getSpacificsources.is_active == 1
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      sources: {
        title: '',
        icon: '',
        is_active: true
      },
      errors: []
    }
  },
  methods: {
    resetData () {
      this.sources = {
        title: '',
        icon: '',
        is_active: true
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        this.$store.dispatch('editsources', {
          sourcesId: this.getSpacificsources.id,
          newData: this.sources
        }).then(() => {
          core.showSnackbar('success', 'sources has been Edit successfully.')
          this.$bvModal.hide('modal-source')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          }
        })
      } else {
        this.$store.dispatch('createNewsources', this.sources).then(data => {
          core.showSnackbar('success', 'sources has been create successfully.')
          this.$bvModal.hide('modal-source')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          }
        })
      }
    }
  }
}
</script>
