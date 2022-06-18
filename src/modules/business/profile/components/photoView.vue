<template>
  <div>
    {{ photoToEdit.image }}
    <b-row>
      <b-col md="12" class="mb-5">
        <cropper-images
            label="Edit Photos"
            :images="photoToEdit.image"
        ></cropper-images>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  props: {
    photoToEdit: {
      type: Object
    }
  },
  data () {
    return {
      loadingGallery: 0,
      progressBar: 0,
      removeLoadingUi: false
    }
  },
  created () {
    console.log(this.photoToEdit)
  }
}
</script>
