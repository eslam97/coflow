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
                        <b-form-input v-model="inquiries.title" type="text" placeholder="Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group
                        label-for="exampleInputcolor"
                        label="color"
                        class="col-md-6">
                      <ValidationProvider name="color" ref="color" rules="required" v-slot="{ errors }">
                        <b-form-input type="color" id="exampleInputcolor"  v-model="inquiries.color" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox :true-value="1" v-model="inquiries.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit inquiries</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New inquiries</b-button>
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
  name: 'addinquiries',
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getSpacificinquiries'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.inquiries = {
        title: this.getSpacificinquiries.title,
        color: this.getSpacificinquiries.color,
        // eslint-disable-next-line eqeqeq
        is_active: this.getSpacificinquiries.is_active == 1
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      inquiries: {
        title: '',
        color: '#3291a8',
        is_active: true
      },
      errors: []
    }
  },
  methods: {
    resetData () {
      this.inquiries = {
        title: '',
        color: '#3291a8',
        is_active: 1
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        this.$store.dispatch('editinquiries', {
          inquiriesId: this.getSpacificinquiries.id,
          newData: this.inquiries
        }).then(() => {
          core.showSnackbar('success', 'inquiries has been Edit successfully.')
          this.$bvModal.hide('modal-inquiries')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      } else {
        this.$store.dispatch('createNewinquiries', this.inquiries).then(data => {
          core.showSnackbar('success', 'inquiries has been create successfully.')
          this.$bvModal.hide('modal-inquiries')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
          /*
          this.$refs.title.setErrors(err.response.data.errors.title)
*/
        })
      }
    }
  }
}
</script>
