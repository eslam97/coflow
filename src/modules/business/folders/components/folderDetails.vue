<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveFolder)">
        <b-row>
          <b-col md="12" class="mb-3">
            <input-form
              v-model="folder.name"
              placeholder="Folder name"
              :validate="'required|max:50'"
              name="Folder name"
              label="Folder name"
              :limit="50"
            />
          </b-col>

        <template v-if="typeOfModal != 'view'">
          <b-col md="12" class="mt-4">
            <div v-if="typeOfModal == 'add'" class="d-flex justify-content-center" >
              <b-button v-if="!requestLoading" class="button-orange-modal" type="submit">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
            <div v-if="typeOfModal == 'edit'" class="d-flex justify-content-center">
              <b-button v-if="!requestLoading" class="button-blue-modal" type="submit">
                <i class="las la-pen"></i>
              </b-button>
              <b-button class="button-blue-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </template>
        </b-row>
      </b-form>
    </validationObserver>
  </div>
</template>

<script>
export default {
  props: {
    requestLoading: { type: Boolean, default: false },
    typeOfModal: { type: String, default: 'add' },
    folderDetails: { type: Object, default: () => {} }
  },
  data () {
    return {
      folder: { id: '', name: '' }
    }
  },
  components: {},
  methods: {
    saveFolder () {
      if (this.typeOfModal === 'add') {
        this.$emit('addFolder', { ...this.folder })
      } else {
        this.$emit('editFolder', { ...this.folder, _method: 'put' })
      }
    }
  },
  watch: {},
  computed: {},
  created () {
    if (this.folderDetails) {
      this.folder = {
        id: this.folderDetails.id,
        name: this.folderDetails.name
      }
    }
  }
}

</script>
