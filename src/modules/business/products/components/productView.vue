<template>
  <div>
   <div class="row justify-content-center">
      <div class="col-md-6">
        <slider-thumbs :images="productDetails.images"/>
      </div>
      <div class="col-md-6 iq-item-product-right">
        <div class="product-additional-details">
          <div class="product-price">
            <label class="text-gray font-size-12 mb-2">Product Price</label>
            <span v-if="productDetails.discount_price_egp">
              <div class="regular-price font-size-14">
                <b class="mr-5 font-weight-bold font-siz-14"> EGP {{productDetails.discount_price_egp}}</b>
                <span class="offer-price ml-2 text-danger font-weight-bold font-size-12">EGP {{productDetails.price_egp}}</span>
              </div>
            </span>
            <span v-else>
              <div class="regular-price font-size-14">
                <b class="mr-5 font-weight-bold font-siz-14"> EGP {{productDetails.price_egp}}</b>
              </div>
            </span>
          </div>
          <label class="text-gray font-size-12 mb-2">Product Information</label>
          <div class="product-descriptio">
            <p class="text-black font-weight-bold font-size-12 text-justify">{{productDetails.description}}</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['productDetails'],
  name: 'productView',
  created () {
  },
  methods: {
  }
}
</script>
<style>
</style>
