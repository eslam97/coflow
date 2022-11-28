<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submit)">
        <b-row>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="amenity.name"
                placeholder=""
                :validate="'required'"
                name="Amenity name"
                :label="'Name'"
            />
          </b-col>
          <b-col md="12" class="mb-5">
            <cropper-images
                label="Upload Icon"
                nameOfImage="image.jpg"
                @cropper-save="saveIconImage"
                :progressLoading="loadingLogo"
                :showProgress="false"
                :multi="false"
                :imageUrl="iconImage"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-4">
            <div v-if="requestLoading" class="text-center">
              <b-button class="container_button_blue ml-2">
                <spinner-loading  text="Loading" />
              </b-button>
            </div>
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

export default {
  name: 'durationListForm',
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      amenity: {
        name: '',
        icon: ''
      },
      iconImage: '',
      loadingLogo: 0
    }
  },
  methods: {
    saveIconImage (data) {
      this.amenity.logo = data.image
      this.iconImage = ''
    },
    submit () {
      const formData = new FormData()
      formData.append('icon', this.amenity.logo)
      formData.append('name', this.amenity.name)
      this.$emit('addAmenity', formData)
    }
  },
  watch: {
  },
  computed: {
  },
  created () {
  }
}
</script>
