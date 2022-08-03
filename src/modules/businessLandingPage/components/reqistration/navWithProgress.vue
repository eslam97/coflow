<template>
  <b-row class="align-items-center text-center border-bottom border-secondary border-2 m-0 p-0 flex-nowrap position-relative">
    <b-col class="py-4  border-right border-2 border-secondary no-border">
      <img :src="require('@/assets/images/whiteLogo.png')" alt="coFlow" class='brandImage'>
    </b-col>
    <b-col sm="6" class="d-none d-md-block">
      <p class="text-white m-0">{{title}}</p>
    </b-col>
    <b-col class="p-4  border-left border-2 border-secondary">
      <p class="text-white m-0"><span class="cursor-pointer" @click="logout">Exit</span></p>
    </b-col>
    <div v-if="progressBarGradient" class="progress-bar-gradient"></div>
  </b-row>
</template>
<script>
export default {
  name: 'navWithProgress',
  props: {
    title: {
      required: false
    },
    progressBarGradient: {
      default: false
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('formStep')
      this.$router.push('/business')
    }
  }
}
</script>
<style>
.progress-bar-gradient {
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: rgb(47,218,193);
  background: linear-gradient(90deg, rgba(47,218,193,1) 0%, rgba(47,154,232,1) 50%, rgba(218,48,43,1) 50%, rgba(253,158,17,1) 100%);
}
</style>
