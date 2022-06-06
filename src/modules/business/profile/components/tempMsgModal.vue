<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveStatus)">
        <b-row>
          <b-col md="12" class="mb-3 p-3">
            <validation-provider
                #default="{ errors }"
                :name="`Message`"
                :rules="'required'"
                class="flex-grow-1"
            >
              <b-form-group label="Leave a message to your users">
                <b-form-textarea
                    v-model="status_msg"
                    :label="'message'"
                    placeholder="Write your temporary close message . ."
                    rows="1"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                ></b-form-textarea>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center">
              <b-button
                  class="btn p-3"
                  variant="danger"
                  type="submit"
                  v-if="!requestLoading"
              >
                Temporary close
              </b-button>
              <b-button class="button-blue-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false,
      required: false
    },
    statusDetails: {
      required: false
    }
  },
  data () {
    return {
      status: 'temp_closed',
      status_msg: ''
    }
  },
  methods: {
    saveStatus () {
      this.$emit('setMsg', { status: this.status, status_msg: this.status_msg })
    }
  },
  created () {
    console.log(this.statusDetails)
    if (this.statusDetails) {
      this.status_msg = this.statusDetails.status_msg
    }
  }
}
</script>
