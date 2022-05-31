<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveProduct)">
        <b-row>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="product.name"
                placeholder="Ex: name"
                :validate="'required'"
                name="name"
                :label="'Name'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="product.title"
                placeholder="Ex: title"
                :validate="'required'"
                name="title"
                :label="'Title'"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" class="mb-3" >
            <b-form-group
                :label="`price_egp`"
                :label-for="`price_egp`"
                class="position-relative"
            >
              <b-input-group append="EGP">
                <validation-provider
                    #default="{ errors }"
                    :name="`price_egp`"
                    :rules="'required|numeric'"
                    class="flex-grow-1"
                >
                  <b-form-input
                      id="mm"
                      v-model="product.price_egp"
                      :class="[{ 'is-invalid': errors.length > 0 }]"
                      :placeholder="'0.0'"
                  />
                </validation-provider>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="4" class="mb-3 d-flex justify-content-center align-items-center" >
            <b-form-checkbox
                type="checkbox"
                id="checkbox"
                label="Discounted Price"
                class="custom-checkbox-color-check" color="warning">
              <span class="text-secondary font-size-12">Discounted Price</span>
            </b-form-checkbox>
          </b-col>
          <b-col md="4" class="mb-3" >
            <b-form-group
                :label="`price_egp`"
                :label-for="`price_egp`"
                class="position-relative"
            >
              <b-input-group append="EGP">
                <validation-provider
                    #default="{ errors }"
                    :name="`price_egp`"
                    :rules="'required|numeric'"
                    class="flex-grow-1"
                >
                  <b-form-input
                      id="mm"
                      v-model="product.discount_price_egp"
                      :class="[{ 'is-invalid': errors.length > 0 }]"
                      :placeholder="'0.0'"
                  />
                </validation-provider>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mb-3">
            <b-form-group
                label="Description"
                label-for="Description"
            >
              <ValidationProvider name="description" ref="Description" rules="required" v-slot="{ errors }">
                <b-form-textarea
                    placeholder="Description..."
                    rows="2"
                    v-model="product.description"
                    :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                ></b-form-textarea>
                <div class="invalid-feedback">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </b-form-group>

          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <cropper-images
                label="Upload Product Photos"
                @cropper-save="saveGalleryImage"
                @remove-image="removeGalleryImage"
                :progressLoading="loadingGallery"
                :removeLoadingUi="removeLoadingUi"
                :images="allImages"
            ></cropper-images>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading ></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import mainService from '@/services/main'

export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    },
    productDetails: {
      default: false
    }
  },
  components: {
  },
  data () {
    return {
      loadingGallery: 0,
      removeLoadingUi: false,
      product: {
        name: '',
        title: '',
        price_egp: '',
        price_auro: 0,
        price_dollar: 0,
        discount_price_egp: '',
        discount_price_dollar: 0,
        discount_price_auro: 0,
        status: 'active',
        available: 1,
        description: '',
        images: []
      },
      allImages: []
    }
  },
  methods: {
    saveGalleryImage (data) {
      this.removeLoadingUi = false
      const formData = new FormData()
      formData.append('image', data.image)
      formData.append('name', data.imageInfo.name)
      formData.append('type', 'product')
      formData.append('status', this.productDetails ? 'exist' : 'new')
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.loadingGallery = percent
        }
      }
      mainService.addImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
        this.product.images.push(res.data.data.id)
        this.allImages.push(res.data.data)
        this.removeLoadingUi = true
      })
    },
    removeGalleryImage (id) {
      mainService.removeImage(id, 'product').then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.images.findIndex(image => image.id === id)
        this.images.splice(ind, 1)
      })
    },
    saveProduct () {
      this.$emit('saveProduct', this.product)
    }
  },
  computed: {
  },
  created () {
    // this.getAllLinks()
  }
}
</script>
<style lang="scss" scoped>
.input-group .input-group-text {
  background: transparent !important;
  border: 1px solid #d7dbda !important;
}
</style>
