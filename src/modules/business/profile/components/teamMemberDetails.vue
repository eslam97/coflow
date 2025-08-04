<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveTeamMember)">
        <b-row class="">
          <b-col lg="6" class="">
            <input-form
              placeholder="Full Name"
              :validate="'required|max:50'"
              name="name"
              :label="'Full Name'"
              :limit="50"
              v-model="member.name"
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
            <!-- <cropper-images
                label="Member Photo"
                :images="member.image"
                type="member_image"
            ></cropper-images> -->
            <cropper-images
                label="Member Photo"
                nameOfImage="image.jpg"
                @cropper-save="saveImage"
                :multi="false"
                :show-progress="false"
                :uploadWithForm="true"
            ></cropper-images>
          </b-col>
        </b-row>

        {{  typeOfModal  }}
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
const formData = new FormData()
export default {
  props: {
    requestLoading: { type: Boolean, default: false },
    typeOfModal: { type: String, default: 'add' },
    memberDetails: { type: Object, default: () => {} }
  },
  data () {
    return {
      member: {
        id: '',
        name: '',
        title: '',
        bio: ''
        // image: ''
      }
    }
  },
  methods: {
    saveTeamMember () {
      console.log('this.typeOfModal', this.typeOfModal)
      if (this.typeOfModal === 'add') {
        formData.append('name', this.member.name)
        formData.append('title', this.member.title)
        formData.append('bio', this.member.bio)
        this.$emit('addTeamMember', formData)
      } else {
        formData.append('name', this.member.name)
        formData.append('title', this.member.title)
        formData.append('bio', this.member.bio)
        formData.append('_method', 'put')
        this.$emit('editTeamMember', { id: this.member.id, formData: formData })
      }
    },
    saveImage (data) {
      formData.append('image', data.image)
    }
  },
  created () {
    if (this.memberDetails) {
      this.member = {
        id: this.memberDetails.id,
        name: this.memberDetails.name,
        title: this.memberDetails.title,
        bio: this.memberDetails.bio
        // image: this.memberDetails.image
      }
    }
  }
}
</script>
