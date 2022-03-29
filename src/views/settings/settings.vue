<template>
  <b-container fluid>
    <div class="iq-card p-2">
      <ul class="m-0 p-0 nav nav-tabs justify-content-start">
        <li  class="nav-item text-center" v-if="hasPer('enterprise.list')">
          <router-link class="nav-link" :to="{name:'settingsenterprises'}" exact>All Projects</router-link>
        </li>
        <li  class="nav-item text-center" v-if="hasPer('project.list')">
          <router-link class="nav-link" :to="{name:'settingsprojects'}">Branches</router-link>
        </li>
        <li  class="nav-item text-center"  v-if="hasPer('department.list')">
          <router-link class="nav-link" :to="{name:'settingsdepartments'}">Departments</router-link>
        </li>

        <li  class="nav-item text-center" v-if="hasPer('lead.setting.list')">
          <router-link class="nav-link" :to="{name:'settingsinputs'}">Lead</router-link>
        </li>
        <li  class="nav-item text-center"  v-if="hasPer('lead.setting.list')">
          <router-link class="nav-link" :to="{name:'settingspackages'}">Packages</router-link>
        </li>

        <li  class="nav-item text-center"  v-if="hasPer('lead.setting.list')">
          <router-link class="nav-link" :to="{name:'settingsfinance'}">Finance</router-link>
        </li>

        <li  class="nav-item text-center" v-if="hasPer('project.setting.whatsapp.list')">
          <router-link class="nav-link" :to="{name:'settingswhatsapp'}">Whatsapp</router-link>
        </li>
        <li  class="nav-item text-center"  v-if="hasPer('notification.setting.list')">
          <router-link class="nav-link" :to="{name:'settingsnotifications'}">Notifications</router-link>
        </li>

        <li  class="nav-item text-center" v-if="hasPer('permission.list')">
          <router-link class="nav-link" :to="{name:'settingsgroups'}">Groups</router-link>
        </li>
        <li  class="nav-item text-center"  v-if="hasPer('restore.list')">
        <router-link class="nav-link" :to="{name:'settingsrestore'}">Restore</router-link>
        </li>
        <li  class="nav-item text-center"  v-if="hasPer('task.list')">
          <router-link class="nav-link" :to="{name:'settingstask'}">Tasks Categories</router-link>
        </li>
        <li  class="nav-item text-center"  v-if="hasPer('task.list')">
          <router-link class="nav-link" :to="{name:'settingsystem'}">System</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
export default {
  name: 'settings',
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
