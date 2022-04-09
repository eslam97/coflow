<template>
    <b-navbar toggleable="lg" type="dark" variant="primary" class="p-3" id="nav-bar-business">
      <b-container fluid>
        <b-navbar-brand href="#">
          <img :src="require('@/assets/images/whiteLogo.png')" alt="coFlow" class='brandImage'>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-business"></b-navbar-toggle>
        <b-collapse id="nav-business" is-nav>
        <b-navbar-nav class="ml-auto d-flex align-items-center">
            <span class="px-3 py-2 mb-2 mb-lg-0 p-lg-0 cursor-pointer"  @click="$emit('openPopup')">Login</span>
              <span class="container_button ml-0 ml-lg-5">
                <b-button variant="primary" class="navButton">
                <span>Business Request</span>
              </b-button>
              </span>
        </b-navbar-nav>
      </b-collapse>
      </b-container>
    </b-navbar>
</template>
