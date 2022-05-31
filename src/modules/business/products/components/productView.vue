<template>
  <div>
    <swipperThumbs />
    <div class="row align-items-center justify-content-center">
      <div class="col-md-5 iq-item-product-left ">
        <Swiper id="post-slider" :options="swiperOptions" :pagination="true" class="w-100">
          <swiperSlide v-for="(image, key1) in images" :key="key1">
            <img :src="image" class="w-100" alt="image"/>
          </swiperSlide>
        </Swiper>
      </div>
      <div class="col-md-7 iq-item-product-right">
        <div class="product-additional-details">
          <div class="product-price">
            <div class="regular-price">
              <b class="mr-5"> $ 200</b>
              <span class="offer-price ml-2 text-danger">$ 500</span>
            </div>
          </div>
          <div class="product-descriptio">
            <p>dsadasldmsd jsfksjf  v h jg  gjajhjla ajh adjh dfj adj fdjhadf hdf ajd fhda jg dgh ajgd ldj</p>
          </div>
          <div class="stock">
            <p>Stock: <span class="text-success">Available</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swipperThumbs from '@/components/swipperThumbs'
export default {
  name: 'productView',
  components: {
    swipperThumbs
  },
  data () {
    return {
      images: [require('@/assets/images/products/1.jpg'), require('@/assets/images/products/3.jpg')],
      /* allProducts: [{
        name: 'Xiaomi Mi Bluetooth 4.0',
        images: [require('@/assets/images/products/1.jpg'), require('@/assets/images/products/3.jpg')],
        description: 'Forced reflow while executing JavaScript took 45ms',
        price: 500,
        discount: 800
      }
      ], */
      swiperOptions: {
        spaceBetween: 30,
        autoplay: false,
        pagination: {
          clickable: true,
          el: '.swiper-pagination',
          type: 'bullets'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
