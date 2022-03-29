<template>
  <b-container fluid>
    <div class="iq-card p-2">
      <ul class="m-0 p-0 nav nav-tabs justify-content-start">
        <li  class="nav-item text-center">
          <router-link class="nav-link" :to="{name:'resetPassword'}" exact>Change Password</router-link>
        </li>
        <li  class="nav-item text-center" v-if="hasPer('project.list')">
          <router-link class="nav-link" :to="{name:'defaultProject'}">Defaullt Project</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
export default {
  name: 'userSettings',
  mounted () {
    core.index()
  },
  data () {
    return {
      options: {
        centeredSlides: false,
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          320: {
            slidesPerView: 1
            // spaceBetween: 10
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1
            // spaceBetween: 15
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 1
            // spaceBetween: 20
          },
          768: {
            slidesPerView: 1
            // spaceBetween: 20
          },
          1024: {
            slidesPerView: 2
            // spaceBetween: 20
          }
        },
        pagination: {
          el: '.swiper-pagination'
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },

        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar'
        }
      }
    }
  }
}
</script>
<style>
.nav-link.router-link-exact-active.router-link-active{
  background: var(--iq-primary) !important;
  color: #fff !important;
}
.colorSpan{
  width: 20px;
  height: 20px;
}
[dir=ltr][mode=light] .nav-tabs {
  background: #fff !important;
  border-radius: 10px !important;

  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
