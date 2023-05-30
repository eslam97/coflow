<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveProduct)">
        <b-row>
          <b-col md="6">
            <b-row>
              <b-col md="6" class="mb-3">
                <input-form
                    v-model="product.name"
                    placeholder="Type Product name..."
                    :validate="'required|max:25'"
                    name="name"
                    :label="'Product Name'"
                    :limit="25"
                />
              </b-col>
              <b-col md="6" class="mb-3">
                <input-form
                    v-model="product.title"
                    placeholder="Type title..."
                    :validate="'required|max:20'"
                    name="title"
                    :label="'Title'"
                    :limit="20"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4" class="mb-3" >
                <b-form-group
                    :label="`Price`"
                    :label-for="`Price`"
                    class="position-relative"
                >
                  <validation-provider
                      #default="{ errors }"
                      :name="`Price`"
                      :rules="'required'"
                      class="flex-grow-1"
                  >
                    <b-input-group append="EGP">
                      <b-form-input
                          v-model="product.price_egp"
                          :class="[{ 'is-invalid': errors.length > 0 }]"
                          :placeholder="'000.00'"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4" class="mb-3 d-flex justify-content-center align-items-center pt-2" >
                <b-form-checkbox
                    type="checkbox"
                    v-model="selectedEGP"
                    class="custom-checkbox-color-check" color="warning">
                  <span class="text-secondary font-size-12">Discounted Price</span>
                </b-form-checkbox>
              </b-col>
              <b-col md="4" class="mb-3" >
                <b-form-group
                    :label="`Discounted price`"
                    :label-for="`Discounted price`"
                    class="position-relative"
                >
                  <validation-provider
                      #default="{ errors }"
                      :name="`price_egp`"
                      :rules="`${selectedEGP ? 'required': ''}|numeric|between:0,${product.price_egp}`"
                      class="flex-grow-1"
                  >
                    <b-input-group append="EGP">
                      <b-form-input
                          id="mm"
                          v-model="product.discount_price_egp"
                          :disabled="!selectedEGP"
                          :class="[{ 'is-invalid': errors.length > 0 }]"
                          :placeholder="'000.0'"
                      />
                    </b-input-group>
                    <small class="text-danger" v-if="!product.discount_price_egp">{{ errors[0] }}</small>
                    <small class="text-danger" v-if="Number(product.discount_price_egp) > Number(product.price_egp)">
                      More than price
                    </small>
                  </validation-provider>
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
          </b-col>
          <b-col md="6">
            <b-row>
              <b-col>
                <cropper-images
                    label="Upload Product Photos"
                    @cropper-save="saveGalleryImage"
                    @remove-image="removeGalleryImage"
                    :progressLoading="loadingGallery"
                    :removeLoadingUi="removeLoadingUi"
                    :images="allImages"
                    type="product_image"
                ></cropper-images>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center" v-if="typeOfModal == 'add'">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading ></spinner-loading>
              </b-button>
            </div>
            <div class="d-flex justify-content-center" v-else>
              <b-button class="button-blue-modal" type="submit" v-if="!requestLoading">
                <i class="las la-pen"></i>
              </b-button>
              <b-button class="button-blue-modal" v-else>
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
    },
    typeOfModal: {
      type: String,
      default: 'add'
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
        price_euro: 0,
        price_dollar: 0,
        discount_price_egp: '',
        discount_price_dollar: 0,
        discount_price_euro: 0,
        status: 'active',
        available: 1,
        description: '',
        images: []
      },
      allImages: [],
      selectedEGP: ''
    }
  },
  methods: {
    saveGalleryImage (data) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', data.image)
      formData.append('name', data.imageInfo.name)
      formData.append('type', 'product')
      formData.append('status', this.productDetails ? 'exist' : 'new')
      if (this.productDetails) {
        formData.append('product_id', this.productDetails.id)
      }
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
        console.log(this.product.images)
        this.allImages.push(res.data.data)
        this.removeLoadingUi = true
        this.requestLoading = false
      })
    },
    removeGalleryImage (id) {
      mainService.removeImage(id, 'product').then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.allImages.findIndex(image => image.id === id)
        // this.images.splice(ind, 1)
        this.allImages.splice(ind, 1)
        this.product.images.splice(ind, 1)
      })
    },
    saveProduct () {
      // this.product.status = this.product.status ? 'active' : 'inactive'
      this.product.available = +this.product.available
      // this.product.discount_price_egp = this.product.discount_price_egp ? this.product.discount_price_egp : 0
      if (this.product.images.length > 0) {
        // delete this.product.images
        this.product.discount_price_egp = this.selectedEGP ? this.product.discount_price_egp : 0
        if (this.productDetails) {
          this.product.status = this.productDetails.status
          this.$emit('editProduct', { ...this.product, _method: 'put' })
        } else {
          this.$emit('saveProduct', this.product)
        }
      } else {
        core.showSnackbar('error', 'You Should Upload At Least One Image')
      }
    }
  },
  computed: {
  },
  created () {
    // this.getAllLinks()
    if (Object.entries(this.productDetails).length !== 0) {
      if (this.productDetails.discount_price_egp) {
        this.selectedEGP = true
      }
      const allImagesIds = this.productDetails.images.map(item => item.id)
      this.product = {
        name: this.productDetails.name,
        title: this.productDetails.title,
        price_egp: this.productDetails.price_egp,
        price_euro: this.productDetails.price_euro,
        price_dollar: this.productDetails.price_dollar,
        discount_price_egp: this.productDetails.discount_price_egp || '',
        discount_price_dollar: this.productDetails.discount_price_dollar || '',
        discount_price_euro: this.productDetails.discount_price_euro || '',
        status: this.productDetails.status,
        available: this.productDetails.available,
        description: this.productDetails.description,
        images: allImagesIds
      }
      this.allImages = this.productDetails.images
    }
  }
}
</script>
<style lang="scss" scoped>
.input-group .input-group-text {
  background: transparent !important;
  border: 1px solid #d7dbda !important;
}
</style>
