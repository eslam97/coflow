<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addFaqs)">
        <b-row>
          <b-col md="12" class="mb-3">
            <validation-provider
                #default="{ errors }"
                :name="`Description`"
                :rules="'required'"
                class="flex-grow-1"
            >
              <b-form-group label="Something doesn't look right? Let us know and we'll fix it!">
                <b-form-textarea
                    v-model="report.description"
                    placeholder="Description"
                    rows="3"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                ></b-form-textarea>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="12" class="mb-3">
            <cropper-images
                label="Upload Image"
                nameOfImage="image.jpg"
                @cropper-save="saveBugImage"
                :multi="false"
                :show-progress="false"
                :uploadWithForm="true"
            ></cropper-images>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center">
              <b-button class="gradient-orange-button" type="submit" v-if="!requestLoading">
               Send
              </b-button>
              <b-button class="gradient-orange-button" v-else>
                <spinner-loading text="sending"></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validationObserver>
  </div>
</template>
<script>
const formData = new FormData()
export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      report: {
        description: ''
      }
    }
  },
  methods: {
    addFaqs () {
      formData.append('desc', this.report.description)
      this.$emit('addReport', formData)
    },
    saveBugImage (data) {
      formData.append('image', data.image)
    }
  },
  watch: {},
  computed: {},
  created () {}
}
</script>
