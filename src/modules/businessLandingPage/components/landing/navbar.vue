<template>
    <b-navbar toggleable="lg" type="dark" variant="primary" class="p-3 px-5" id="nav-bar-business">
      <b-container fluid>
        <b-navbar-brand>
          <router-link to="/">
            <img :src="require('@/assets/images/whiteLogo.png')" alt="coFlow" class='brandImage'>
          </router-link>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-business"></b-navbar-toggle>
        <b-collapse id="nav-business" is-nav>
        <b-navbar-nav class="ml-auto d-flex align-items-center">
            <span class="px-3 py-2 mb-2 mb-lg-0 p-lg-0 cursor-pointer"  @click="$emit('openPopup')"
                  v-if="!userToken || (typeOfUser !== 'admin' && !typeOfService)">Login
            </span>
              <span class="px-3 py-2 mb-2 mb-lg-0 p-lg-0 cursor-pointer" v-else>
               <router-link v-if="typeOfUser === 'admin'"
                            to="/leads"><span class="text-white">Dashboard</span></router-link>
               <router-link v-else :to="{name : 'dashboard'}"><span class="text-white">Dashboard</span></router-link>
              </span>
              <span class="container_button ml-0 ml-lg-5" @click="$emit('businessRequest')">
                <b-button variant="primary" class="navButton">
                <span>Business Request</span>
              </b-button>
              </span>
        </b-navbar-nav>
      </b-collapse>
      </b-container>
    </b-navbar>
</template>
<script>
export default {
  data () {
    return {
      userToken: localStorage.getItem('userToken'),
      typeOfUser: JSON.parse(localStorage.getItem('userInfo')).type,
      typeOfService: JSON.parse(localStorage.getItem('userInfo')).service_types
    }
  }
}
</script>
