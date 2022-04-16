<template>
  <div class="testimonials py-5" id="testimonials">
    <b-container>
      <div class="pt-5 pb-3 mt-5">
        <div class="header">
          <h3 class="text-center text-black mb-2">What our customer’s say</h3>
          <p class="text-center text-secondary font-size-12 mb-0">Lorem ipsum dolor sit amet, consectetur
            adipiscing
            elit. Ut <br/>pretium pretium tempor .</p>
        </div>
      </div>
    </b-container>
    <div>
    <Swiper id="post-slider">
      <template v-slot:nav v-if="false">
        <SwiperNav />
      </template>
      <swiperSlide>
        <section class="pt-5 px-4 pb-2 position-relative testimonials-card">
          <img :src="require('@/assets/images/user/user-1.jpeg')" class="testimonials-image"/>
          <p class="font-size-14 text-justify text-primary my-4">Donec facilisis tortor ut augue lacinia, at viverra
            est semper.
            Sed sapien metus,
            scelerisque
            nec
            pharetra id, tempor a tortor. Tu augue lacinia, at viverra.</p>
          <div class="text-center">
            <h5 class="text-secondary">Susan Herrera</h5>
            <p class="text-primary">Dahab, Egypt</p>
          </div>
        </section>
      </swiperSlide>
      <swiperSlide>
        <section class="pt-5 px-4 pb-2 position-relative testimonials-card">
          <img :src="require('@/assets/images/user/user-01.jpg')" class="testimonials-image"/>
          <p class="font-size-14 text-justify text-primary my-4">Donec facilisis tortor ut augue lacinia, at viverra
            est semper.
            Sed sapien metus,
            scelerisque
            nec
            pharetra id, tempor a tortor. Tu augue lacinia, at viverra.</p>
          <div class="text-center">
            <h5 class="text-secondary">Susan Herrera</h5>
            <p class="text-primary">Dahab, Egypt</p>
          </div>
        </section>
      </swiperSlide>
      <swiperSlide>
        <section class="pt-5 px-4 pb-2 position-relative testimonials-card">
          <img :src="require('@/assets/images/user/user-2.jpg')" class="testimonials-image"/>
          <p class="font-size-14 text-justify text-primary my-4">Donec facilisis tortor ut augue lacinia, at viverra
            est semper.
            Sed sapien metus,
            scelerisque
            nec
            pharetra id, tempor a tortor. Tu augue lacinia, at viverra.</p>
          <div class="text-center">
            <h5 class="text-secondary">Susan Herrera</h5>
            <p class="text-primary">Dahab, Egypt</p>
          </div>
        </section>
      </swiperSlide>
      <swiperSlide>
        <section class="pt-5 px-4 pb-2 position-relative testimonials-card">
          <img :src="require('@/assets/images/user/user-4.jpg')" class="testimonials-image"/>
          <p class="font-size-14 text-justify text-primary my-4">Donec facilisis tortor ut augue lacinia, at viverra
            est semper.
            Sed sapien metus,
            scelerisque
            nec
            pharetra id, tempor a tortor. Tu augue lacinia, at viverra.</p>
          <div class="text-center">
            <h5 class="text-secondary">Susan Herrera</h5>
            <p class="text-primary">Dahab, Egypt</p>
          </div>
        </section>
      </swiperSlide>
      <swiperSlide>
        <section class="pt-5 px-4 pb-2 position-relative testimonials-card">
          <img :src="require('@/assets/images/user/user-5.jpg')" class="testimonials-image"/>
          <p class="font-size-14 text-justify text-primary my-4">Donec facilisis tortor ut augue lacinia, at viverra
            est semper.
            Sed sapien metus,
            scelerisque
            nec
            pharetra id, tempor a tortor. Tu augue lacinia, at viverra.</p>
          <div class="text-center">
            <h5 class="text-secondary">Susan Herrera</h5>
            <p class="text-primary">Dahab, Egypt</p>
          </div>
        </section>
      </swiperSlide>
      <swiperSlide>
        <section class="pt-5 px-4 pb-2 position-relative testimonials-card">
          <img :src="require('@/assets/images/user/user-6.jpg')" class="testimonials-image"/>
          <p class="font-size-14 text-justify text-primary my-4">Donec facilisis tortor ut augue lacinia, at viverra
            est semper.
            Sed sapien metus,
            scelerisque
            nec
            pharetra id, tempor a tortor. Tu augue lacinia, at viverra.</p>
          <div class="text-center">
            <h5 class="text-secondary">Susan Herrera</h5>
            <p class="text-primary">Dahab, Egypt</p>
          </div>
        </section>
      </swiperSlide>
    </Swiper>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style>
.testimonials-image{
  position: absolute;
  top: -48px;
  left: calc(50% - 45px);
  border-radius: 50%;
  width: 90px;
}
.testimonials-card {
  padding-top: 100px;
  border-radius: 25px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #fff;
  filter: opacity(0.2);
}
#testimonials .swiper-container {
  padding: 100px 0 50px 0  !important;
  cursor: grab;
}
.swiper-slide-active .testimonials-card {
  box-shadow: 0 10px 40px 0 rgba(113, 130, 138, 0.2);
  filter: opacity(1);
}
.swiper-slide-active .testimonials-image {
   box-shadow: 0 9px 14px -10px var(--iq-primary);
}
</style>
