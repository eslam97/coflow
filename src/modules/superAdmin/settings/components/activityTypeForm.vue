<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submit)">
        <b-row>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="activityType.name"
                placeholder=""
                :validate="'required'"
                name="Activity Type"
                :label="'Activity Type'"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <main-select
                labelTitle='Activity Line'
                :validate="'required'"
                :name="`Activity Line`"
                label="name"
                placeholder="Choose" :options="activityLines"
                v-model="activityType.activity_line_id"
                :reduce="data=> data.id"
            ></main-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-4">
            <p v-if="requestLoading" class="text-center">
              <b-button class="container_button_blue ml-2">
                <spinner-loading  text="Loading" />
              </b-button>
            </p>
            <div class="d-flex justify-content-center" v-else>
              <b-button class="container_button_blue ml-2" type="submit">
                <span>Save</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import settingsService from '../services/settings.services'
export default {
  name: 'activityTypeForm',
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activityType: {
        name: '',
        activity_line_id: ''
      },
      activityLines: []
    }
  },
  methods: {
    submit () {
      this.$emit('addActivityType', this.activityType)
    },
    getAllActivityLine () {
      settingsService.getAllActivityLine().then(res => {
        this.activityLines = res.data.data
      })
    }
  },
  watch: {
  },
  computed: {
  },
  created () {
    this.getAllActivityLine()
  }
}
</script>
