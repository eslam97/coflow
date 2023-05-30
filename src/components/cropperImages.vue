<template>
  <div class="example-wrapper">
    <label class="mb-2">{{label}}</label>
      <div v-if="finalImage && uploadWithForm" class="img-fluid position-relative avatar-120 rounded finalImage position-relative overflow-hidden text-white d-flex justify-content-center align-items-center" :style="{ 'background-image': 'url(' + showImage + ')' }">
          <div class="position-absolute icon-edit">
          <span class="cursor-pointer text-bold font-size-12" @click="$refs.file.click()">
              <input type="file" v-show="false" ref="file" @change="loadImage($event)" accept="image/*">
              <i class="las la-pen" />
          </span>
          </div>
      </div>
      <div class="mb-3" v-if="imageUrl && !multi && !uploadWithForm">
        <div v-if="showImage && progressLoading !== 100" class="img-fluid avatar-120 rounded finalImage position-relative overflow-hidden text-white d-flex justify-content-center align-items-center" :style="{ 'background-image': 'url(' + showImage + ')' }">
            <div class="orange-overlay position-absolute w-100 h-100 top-0 left-0">
            </div>
            <h1 class="loadingText">{{ progressLoading }} %</h1>
        </div>
        <div v-else class="img-fluid position-relative avatar-120 rounded-lg finalImage overflow-hidden" :style="{ 'background-image': 'url(' + imageUrl + ')' }">
          <div class="position-absolute icon-edit">
          <span class="cursor-pointer text-bold font-size-12" @click="$refs.file.click()">
              <input type="file" v-show="false" ref="file" @change="loadImage($event)" accept="image/*">
              <i class="las la-pen" />
          </span>
          </div>
      </div>
    </div>
      <div v-if="imageUrl && !multi && uploadWithForm" class="img-fluid position-relative avatar-120 rounded-lg finalImage overflow-hidden" :style="{ 'background-image': 'url(' + showImage + ')' }">
          <div class="position-absolute icon-edit">
            <span class="cursor-pointer text-bold font-size-12" @click="$refs.file.click()">
                <input type="file" v-show="false" ref="file" @change="loadImage($event)" accept="image/*">
                <i class="las la-pen" />
            </span>
          </div>
      </div>

      <div v-if="images" class="d-flex gap-2 flex-wrap">
          <draggable v-model="images" @change="sortImage">
              <transition-group class="d-flex gap-2 flex-wrap">
                  <div class="mb-3"  v-for="(image, key) in images" :key="key">
                      <div class="img-fluid position-relative avatar-120 rounded-lg finalImage overflow-hidden" :style="{ 'background-image': 'url(' + image.image + ')' }">
                          <div class="position-absolute top-0 left-0 w-100 h-100 bg-drag d-flex justify-content-center align-items-center">
                              <i class="las la-arrows-alt text-warning"></i>
                          </div>
                          <div class="position-absolute icon-delete"  @click="removeImage(image.id); showLoading = image.id" v-if="multi">
                          <span class="cursor-pointer text-bold" v-if="showLoading !== image.id">
                           <i class="las la-trash"></i>
                          </span>
                          <spinner-loading v-else :text="''" />
                          </div>
                      </div>
                  </div>
              </transition-group>
          </draggable>
        <div v-if="showImage && progressLoading !== 100" class="img-fluid avatar-120 rounded finalImage position-relative overflow-hidden text-white d-flex justify-content-center align-items-center" :style="{ 'background-image': 'url(' + showImage + ')' }">
            <div class="orange-overlay position-absolute w-100 h-100 top-0 left-0">
            </div>
            <h1 class="loadingText">{{ progressLoading }} %</h1>
        </div>
    </div>
      <div v-if="loadingSort" class="mb-3 text-primary">
          Please Waith ...
      </div>
      <div v-if="!(!multi && (image.src || imageUrl))"
        class="button-wrapper mb-3 d-flex flex-column justify-content-center align-items-center p-4">
      <b-button variant="warning text-white rounded-0 px-4" @click="$refs.file.click()">
        <input type="file" v-show="false" ref="file" @change="loadImage($event)" accept="image/*">
       + Add image
      </b-button>
      <p class="m-0 p-0"> <i class="las la-cloud-upload-alt font-size-18 mr-1"></i> You can also drop your files here.
      </p>
      <p>Image size limit: {{ limit }} MB</p>
    </div>

    <b-card v-show="showPopup" class="w-100 m-auto card" id="uploadImageCropper">
        <div class="actions d-flex justify-content-between align-items-center mb-3">
          <div class="left d-flex gap-2">
            <button class="square-button"  @click.prevent="zoom(2)">
              <img :src="require('@/assets/images/icons/zoom-in.svg')" />
            </button>
            <button class="square-button"  @click.prevent="zoom(0.5)">
              <img :src="require('@/assets/images/icons/zoom-out.svg')" />
            </button>
            <button class="square-button"  @click.prevent="flip(true, false)">
              <img :src="require('@/assets/images/icons/flip-horizontal.svg')" />
            </button>
            <button class="square-button"  @click.prevent="flip(false, true)">
              <img :src="require('@/assets/images/icons/flip-vertical.svg')" />
            </button>
            <button class="square-button"  @click.prevent="rotate(90)">
              <img :src="require('@/assets/images/icons/rotate-clockwise.svg')" />
            </button>
            <button class="square-button"  @click.prevent="rotate(-90)">
              <img :src="require('@/assets/images/icons/rotate-counter-clockwise.svg')" />
            </button>
          </div>
          <div class="right">
            <button class="square-button text-white px-4 font-weight-bold" @click.prevent="crop">Save</button>
          </div>
        </div>
        <div class="upload-example">
          <cropper
              ref="cropper"
              class="upload-example-cropper"
              :src="image.src"
              :resize-image="resizeImage"
              default-boundaries="fill"
              image-restriction="fit-area"
              :stencil-props="{
                handlers: {
                  westNorth: 'handler-wrapper--west-north',
                  eastNorth: 'handler-wrapper--east-north',
                  westSouth: 'handler-wrapper--west-south',
                  eastSouth: 'handler-wrapper--east-south',
                },
                movable: true,
                resizable: true,
                aspectRatio: ratio,
              }"
          />
        </div>
      </b-card>
  </div>
</template>
<script>

import 'vue-advanced-cropper/dist/style.css'
import { Cropper } from 'vue-advanced-cropper'
import { core } from '@/config/pluginInit'
import draggable from 'vuedraggable'
import mainService from '@/services/main'

// This function is used to detect the actual image type,
function getMimeType (file, fallback = null) {
  const byteArray = (new Uint8Array(file)).subarray(0, 4)
  let header = ''
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16)
  }
  switch (header) {
    case '89504e47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg'
    default:
      return fallback
  }
}
export default {
  components: {
    Cropper,
    draggable
  },
  props: {
    type: {
      default: 'gallery'
    },
    progressLoading: {
    },
    ratio: {
    },
    resizeImage: {
      default: {
        adjustStencil: true
      }
    },
    label: {
    },
    multi: {
      default: true
    },
    showProgress: {
      default: true
    },
    nameOfImage: {
      default: ''
    },
    imageUrl: {
      default: ''
    },
    images: {
      required: false
    },
    removeLoadingUi: {
      required: false
    },
    uploadWithForm: {
      default: false
    },
    limit: {
      default: 1
    }
  },
  data () {
    return {
      loadingSort: false,
      showPopup: false,
      image: {
        src: null,
        type: '',
        name: ''
      },
      showImage: '',
      finalImage: '',
      newName: '',
      showLoading: null
    }
  },
  methods: {
    sortImage (data) {
      this.loadingSort = true
      mainService.changeSort({ id: data.moved.element.id, type: this.type, sort: data.moved.newIndex + 1 }).then(res => {
        core.showSnackbar('success', res.data.message)
      }).finally(() => {
        this.loadingSort = false
      })
    },
    reset () {
      this.image = {
        src: null,
        type: null
      }
    },
    loadImage (event) {
      const { files } = event.target
      console.log(files[0].size)
      if (files && files[0]) {
        if (files[0].size < (1048576 * this.limit)) {
          if (this.image.src) {
            URL.revokeObjectURL(this.image.src)
          }
          this.newName = files[0].name
          const blob = URL.createObjectURL(files[0])
          const reader = new FileReader()
          reader.onload = (e) => {
            this.image = {
              src: blob,
              type: getMimeType(e.target.result, files[0].type),
              name: this.image.name
            }
            this.showPopup = true
            this.removeLoadingUi = false
          }
          reader.readAsArrayBuffer(files[0])
        } else {
          console.log('exceed')
          core.showSnackbar('error', `Your file size mustn't exceed ${this.limit} MB`)
        }
      }
    },
    zoom (factor) {
      this.$refs.cropper.zoom(factor)
    },
    move (direction) {
      if (direction === 'left') {
        this.$refs.cropper.move(-this.size.width / 4)
      } else if (direction === 'right') {
        this.$refs.cropper.move(this.size.width / 4)
      } else if (direction === 'top') {
        this.$refs.cropper.move(0, -this.size.height / 4)
      } else if (direction === 'bottom') {
        this.$refs.cropper.move(0, this.size.height / 4)
      }
    },
    flip (x, y) {
      this.$refs.cropper.flip(x, y)
    },
    rotate (angle) {
      this.$refs.cropper.rotate(angle)
    },
    crop () {
      this.image.name = this.newName
      const { canvas } = this.$refs.cropper.getResult()
      canvas.toBlob(blob => {
        this.finalImage = blob
        const obj = { image: blob, imageInfo: this.image }
        this.$emit('cropper-save', obj)
        this.showImage = canvas.toDataURL()
      }, this.image.type)
      this.showPopup = false
    },
    removeImage (id) {
      this.$emit('remove-image', id)
    }
  },
  destroyed () {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src)
    }
  }
}
</script>
<style lang="scss">
.finalImage {
  background-repeat: no-repeat;
  background-size: contain;
  background-color: black;
  background-position: center;
}
.example-wrapper {
  position: relative;
  user-select: none;
}
.button-wrapper {
  gap: 8px;
  border: 2px dashed #d2d2d2;
}
.rotate-image-example {
  .cropper {
    max-height: 500px;
  }
}
.actions .left{
  gap: 2px;
}
.square-button {
  background: #fe9e12;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: none;
  cursor: pointer;
  transition: background 0.5s;
  &:hover {
    background: rgba(254, 158, 18, 0.55);
  }
}
.icon-edit, .icon-delete {
  background: #fe9e12;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 2px 0px #9d150b;
}
.icon-delete {
  right: 0;
  font-size: 22px;
  background: #f14336 !important;
}
.icon-edit i {
  font-size: 16px !important;
}
.orange-overlay {
  background: linear-gradient(to right, rgba(47, 218, 193, 0.60) 0%, rgba(47, 154, 232, 0.60) 100%);
}
.loadingText {
  margin: 0;
  padding: 0;
  font-size: 35px;
  font-weight: bold;
  color: #fff;
  position: absolute;
}
.finalImage:hover .bg-drag {
  opacity: 1;
  transition: 0.3s ease-in-out;
}
.bg-drag {
  opacity: 0;
  cursor: move;
  background-color: #3f414db3 !important;
}
</style>
