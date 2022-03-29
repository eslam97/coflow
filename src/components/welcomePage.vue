<template>
  <div class="text-center">
    <img :src="require('../../src/assets/images/error/Welcome-amico.png')" class="w-welcome">
    <p class="font-size-22">{{welcomeMessage}}</p>
  </div>
</template>
<script>
export default {
  props: ['welcomeMessage']
}
</script>
<style>
.w-welcome{
  width: 420px;
}
</style>
