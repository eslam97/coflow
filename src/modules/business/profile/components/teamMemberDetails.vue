<template>
  <div>
    <validationObserver v-slot="{}">
      <b-form>
        <b-row class="">
          <b-col lg="6" class="">
            <input-form
              placeholder="Full Name"
              :validate="'required|max:50'"
              name="Full Name"
              :label="'Full Name'"
              :limit="50"
              v-model="member.fullName"
            />
          </b-col>
          <b-col lg="6">
            <input-form
              placeholder="Title"
              :validate="'required|max:50'"
              name="Title"
              :label="'Title'"
              :limit="50"
              v-model="member.title"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="12">
            <validation-provider
                #default="{ errors }"
                :name="`Bio`"
                :rules="'required'"
                class="flex-grow-1"
            >
              <b-form-group label="Bio">
                <b-form-textarea
                    v-model="member.bio"
                    :label="'Bio'"
                    placeholder="Add Bio"
                    rows="2"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                ></b-form-textarea>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12">
            <cropper-images
                label="Member Photo"
                :images="member.image"
                type="member_image"
            ></cropper-images>
          </b-col>
        </b-row>

        <b-row v-if="typeOfModal != 'view'">
          <b-col md="12" class="mt-4">
            <div
              class="d-flex justify-content-center"
              v-if="typeOfModal == 'add'"
            >
              <b-button
                class="button-orange-modal"
                type="submit"
                v-if="!requestLoading"
              >
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
            <div
              class="d-flex justify-content-center"
              v-if="typeOfModal == 'edit'"
            >
              <b-button
                class="button-blue-modal"
                type="submit"
                v-if="!requestLoading"
              >
                <i class="las la-pen"></i>
              </b-button>
              <b-button class="button-blue-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validationObserver>
  </div>
</template>

<script>
export default {
  data () {
    return {
      member: {
        fullName: '',
        title: '',
        bio: '',
        image: ''
      },
      typeOfModal: 'add',
      requestLoading: false,
      facilityName: '',
      allActivityLines: [],
      activityLine: { id: '', name: '' }
    }
  },
  methods: {
  }
}
</script>
