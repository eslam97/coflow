<template>
  <div class="position-fixed top-0 left-0 bg-primary w-100 h-100 popupLogin p-5">
    <img :src="require('@/assets/images/businessLanding/header-right.png')" class="bg-hero-image top-20">
    <b-container fluid>
      <nav class="d-flex justify-content-between align-items-center">
        <img :src="require('@/assets/images/whiteLogo.png')" alt="coFlow" class='brandImage'>
      </nav>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'navWithProgress'
}
</script>
