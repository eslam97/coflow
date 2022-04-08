<template>
  <div class="landing">
    <main-nav-bar />
    <hero />
  </div>
</template>
<script>
import mainNavBar from '../components/navbar'
import hero from '../components/hero'
export default {
  components: {
    mainNavBar,
    hero
  }
}
</script>
