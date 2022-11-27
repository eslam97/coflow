<template>
  <b-container fluid>
    <main-modal id="productDetailsModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Product</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Product</h4>
      </template>
      <template v-slot:actions v-if="typeOfModal == 'edit'">
        <div class="modal-embed-actions">
          <div class="d-flex justify-content-between">
            <span class="text-info font-weight-bold font-size-12 mr-3">Active</span>
            <div
                class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0" >
              <div class="custom-switch-inner">
                <input type="checkbox" class="custom-control-input bg-info" :id="'status'"
                       @change="changeStatus(productDetailsInfo.id, productDetailsInfo.statusBool)"
                       v-model="productDetailsInfo.statusBool">
                <label class="custom-control-label" :for="'status'">
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:body>
        <product-details
            :requestLoading="requestLoading"
            :productDetails="productDetailsInfo"
            :typeOfModal="typeOfModal"
            @editProduct="editProduct"
            @saveProduct="addProduct"
        />
      </template>
    </main-modal>
    <main-modal id="productDetailsViewModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-success-light">View: </span> Product</h4>
      </template>
      <template v-slot:borderHeader>
        <p class="p-4 pl-5 borderHeaderModal">
          <span class="font-size-22">{{productDetailsInfo.name}}</span><br/>{{productDetailsInfo.title}}
        </p>
      </template>
      <template v-slot:body>
        <ProductDetailsView v-if="productDetailsInfo.name" :productDetails="productDetailsInfo"/>
      </template>
    </main-modal>
    <b-row>
      <div v-if="arrangeMode" class="position-absolute arrange-overlay">
        <p class="position-absolute arrange-text text-warning">You are in arrange mode now, specify the order of the selected
          item</p></div>
      <b-col lg="12" class="mb-3 d-flex justify-content-between align-items-center">
        <h3>Products</h3>
        <div class="d-flex justify-content-between gap-20">
          <b-button @click="arrangeMode = !arrangeMode" variant="dark" class="add_button text-white">
            <span v-if="!arrangeMode">Arrange<i class="fas fa-arrow-down-arrow-up"></i></span>
            <span v-else>Save</span>
          </b-button>
          <b-button variant="warning" class="add_button text-white" @click="openProductPopup">
            Add Product<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
    </b-row>
    <div v-if="loadingPage">
      <b-row>
        <b-col md="12">
          <b-card class="text-center text-black">
            <spinner-loading text="Loading Products" />
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <b-row v-if="allProducts.length > 0">
        <b-col md="3" v-for="(item, key) in allProducts" :key="key" class="mb-3">
          <b-card class="iq-product iq-product-list iq-product-item iq-border-radius-10">
            <div class="pt-3 pr-3 pl-3">
              <div class="mb-2 w-100 h-170px iq-border-radius-10">
                <Swiper :id="`post-slider-${key}`"  :options="swiperOptions" :pagination="true">
                  <swiperSlide v-for="(image, key1) in item.images" :key="key1">
                    <section :style="{
                      'background-size': 'cover',
                      'background-image':
                      'url(' + image.image + ')' }"
                       class="w-100 h-170px pt-5 px-4 pb-2 position-relative iq-border-radius-10">
                    </section>
                  </swiperSlide>
                </Swiper>
              </div>
              <div class="mt-2">
                <div>
                  <div class="text-justify mb-2">
                    <a  href="javascript:void(0)" class="font-weight-bold" :title="item.name">
                      {{ item.name.length > 30 ? item.name.substring(0,30) + '...' : item.name }}
                    </a>
                    <p class="font-size-12 font-weight-bold text-primary">{{ item.title.length > 35 ?
                        item.title.substring(0,35)
                        + '...' : item.title }}</p>
                  </div>
                </div>
                <b-col md="12" v-if="item.discount_price_egp" class="d-flex justify-content-between align-items-start">
                  <p class="font-size-16 font-weight-bold text-primary">EGP {{ item.discount_price_egp }}</p>
                  <p class="font-size-16 text-danger text-decoration-line-through">
                    EGP {{ item.price_egp }}</p>
                </b-col>
                <b-col md="12" v-else>
                  <p class="font-size-16 font-weight-bold text-primary">EGP {{ item.price_egp }}</p>
                </b-col>
              </div>
            </div>
            <div v-if="item.status === 'inactive' || !item.status" class="inactive-overlay"></div>
            <div class="d-flex justify-content-between align-items-center border-product-price pr-3 pl-3">
              <b-row>
                <b-col md="12" class="border-actions d-flex justify-content-between font-size-20 w-50 py-3 pr-3">
                  <i class="cursor-pointer las la-eye text-success-light" @click="viewProduct(item)"></i>
                  <i class="cursor-pointer las la-pen text-info" @click="viewProductToEdit(item)"></i>
                  <i class="cursor-pointer las la-trash-alt text-danger" @click="deleteProduct(item)"></i>
                </b-col>
                <b-col md="12" class="border-actions">
                  <span v-if="!arrangeMode">Arrange: <span class="text-black">{{item.sort}}</span></span>
                  <main-select v-else :options="allProducts.map(data => data.sort)" :value="item.sort"
                               @input="changeSort(item.id, 'product', $event)">
                  </main-select>
                </b-col>
              </b-row>
              <div class="w-50 pt-3 py-3 pl-4 pr-1">
                <p class="text-primary font-weight-bold font-size-12 mb-2">Product Status:</p>
                <div class="d-flex justify-content-between align-items-top">
                  <span v-if="item.available" class="text-info font-weight-bold font-size-12 font-weight-bold">
                    Available
                  </span>
                  <span v-else class="text-danger font-weight-bold font-size-12 font-weight-bold">
                    Sold out
                  </span>
                  <div
                      class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0" >
                    <div class="custom-switch-inner">
                      <input @change="changeAvailability(item)" v-model="item.available" type="checkbox"
                             class="custom-control-input bg-info" :id="'customSwitch-11'+item.name">
                      <label class="custom-control-label" :for="'customSwitch-11'+item.name">
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col md="12" class="text-center text-black">
          <b-card> No Available Product</b-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import ProductDetails from '@/modules/business/products/components/productDetails'
import ProductDetailsView from '@/modules/business/products/components/productView'
import productsServices from '@/modules/business/products/services/products.services'
import EventBus from '@/eventBus'
import mainService from '@/services/main'

export default {
  components: { ProductDetails, ProductDetailsView },
  data () {
    return {
      requestLoading: false,
      typeOfModal: 'add',
      swiperOptions: {
        spaceBetween: 30,
        autoplay: false,
        slidesPerView: 1,
        pagination: {
          clickable: true,
          el: '.swiper-pagination',
          type: 'bullets'
        }
      },
      productDetailsInfo: {},
      allProducts: [],
      loadingPage: true,
      available: '',
      arrangeMode: false
    }
  },
  methods: {
    openProductPopup () {
      this.productDetailsInfo = false
      this.typeOfModal = 'add'
      this.$bvModal.show('productDetailsModal')
    },
    addProduct (data) {
      this.productDetailsInfo = {}
      this.requestLoading = true
      productsServices.addProduct(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('productDetailsModal')
        this.getAllProducts()
      }).finally(() => {
        this.requestLoading = false
      })
    },
    getAllProducts () {
      this.loadingPage = true
      productsServices.getAllProducts().then(res => {
        this.allProducts = res.data.data.data
      }).finally(() => {
        this.loadingPage = false
      })
    },
    viewProduct (item) {
      this.productDetailsInfo = item
      this.$bvModal.show('productDetailsViewModal')
    },
    deleteProduct (item) {
      EventBus.$emit('openDeleteModal', {
        actionHeader: 'Delete',
        titleHeader: 'Product',
        textContent: item.name,
        question: 'Are You Sure You Want Delete This Product?',
        textDeleteButton: 'YES, Delete',
        textCancelButton: 'NO, CANCEL',
        icon: 'las la-trash-alt',
        type: 'delete',
        actionOnAlert: '',
        text: 'Delete',
        url: 'products',
        rowId: item.id
      })
    },
    viewProductToEdit (item) {
      this.typeOfModal = 'edit'
      this.productDetailsInfo = item
      this.productDetailsInfo.statusBool = this.productDetailsInfo.status === 'active'
      this.$bvModal.show('productDetailsModal')
    },
    editProduct (data) {
      this.requestLoading = true
      productsServices.editProduct(this.productDetailsInfo.id, data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('productDetailsModal')
        this.getAllProducts()
      }).finally(() => {
        this.requestLoading = false
      })
    },
    changeAvailability (item) {
      this.requestLoading = true
      const allImagesIds = item.images.map(item => item.id)
      item.available = item.available ? 1 : 0
      item.images = allImagesIds
      item._method = 'put'
      productsServices.editProduct(item.id, item).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getAllProducts()
      }).finally(() => {
        this.requestLoading = false
      })
    },
    changeStatus (id, status) {
      const obj = {
        product_id: id,
        status: status ? 'active' : 'inactive',
        type: 'product'
      }
      mainService.changeStatus(obj).then(res => {
        this.getAllProducts()
        core.showSnackbar('success', res.data.message)
      }).catch(() => {
        this.productDetailsInfo.status = !status
      })
    },
    changeSort (id, type, sort) {
      mainService.changeSort({ id, type, sort }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getAllProducts()
      })
    }
  },
  created () {
    this.getAllProducts()
    EventBus.$on('reloadTableAfterDelete', ifReload => {
      this.$bvModal.hide('productDetailsModal')
      this.getAllProducts()
      core.showSnackbar('success', 'Product deleted successfully')
    })
  },
  mounted () {
    core.index()
  }
}
</script>
<style lang="scss" scoped>
</style>
