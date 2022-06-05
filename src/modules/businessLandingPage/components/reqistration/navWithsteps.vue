<template>
  <b-row
      class="align-items-center text-center border-bottom border-secondary border-2 m-0 p-0 flex-nowrap position-relative bg-primary">
    <b-col md="2" class="py-4 border-right border-2 border-secondary no-border position-relative">
      <img :src="require('@/assets/images/whiteLogo.png')" alt="coFlow" class='brandImage'>
    </b-col>
    <b-col v-for="(step , key) in steps" :key="key" md="2"  :class="['py-4 d-none d-md-block text-bold font-size-12',
    step.class]">
      <span :class="colorText(key)">{{ step.name }}</span>
      <div  v-if="$store.getters['formSteps/getActiveStepForm'] < key + 1"
            :ref="`step-${key}`" :class="['progress-bar-gradient-solid' ,
      step.classProgress]"></div>
    </b-col>
    <b-col md="2" class="p-4  border-left border-2 border-secondary position-relative text-bold text-white font-size-12">
      <span class="cursor-pointer" @click="logout">Exit</span>
      <div v-if="$store.getters['formSteps/getActiveStepForm'] != 4" class="progress-bar-gradient-solid"></div>
    </b-col>
    <div  class="progress-bar-gradient"></div>
  </b-row>
</template>
<script>
export default {
  name: 'navWithProgress',
  data () {
    return {
      steps: [
        {
          name: 'Step 1: Admin',
          class: 'text-white',
          classProgress: 'animate-minimize-width',
          active: true
        },
        {
          name: 'Step 2: Facility',
          class: 'text-secondary',
          classProgress: '',
          active: false
        },
        {
          name: 'Step 3: Location',
          class: 'text-secondary',
          classProgress: '',
          active: false
        },
        {
          name: 'Step 4: Operation',
          class: 'text-secondary',
          classProgress: '',
          active: false
        }
      ]
    }
  },
  methods: {
    colorText (index) {
      var color = ''
      if (this.$store.getters['formSteps/getActiveStepForm'] === index + 1) {
        color = 'text-white'
      } else if (this.$store.getters['formSteps/getActiveStepForm'] > index + 1) {
        if (index === 2 || index === 3) {
          color = 'orangeText'
        } else color = 'blueText'
      } else {
        color = 'text-secondary'
      }
      return color
    },
    logout () {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('formStep')
      this.$router.push('/')
    },
    clickStep (step) {
      if (step !== 5) {
        this.$refs[`step-${step}`].classList.add('animate-minimize-width')
      } else {
        this.$refs[`step-${step}`].classList.add('animate-minimize-last-width')
      }
    }
  }
}
</script>
<style>
.progress-bar-gradient {
  position: absolute;
  bottom: -3px;
  width: 100%;
  height: 5px;
  background: rgb(47,218,193);
  background: linear-gradient(90deg, rgba(47,218,193,1) 0%, rgba(47,154,232,1) 50%, rgba(218,48,43,1) 50%, rgba(253,158,17,1) 100%);
  z-index: 1;
}
.progress-bar-gradient-solid {
  position: absolute;
  bottom: -6px;
  width: 101%;
  height: 7px;
  background: #fff;
  z-index: 2;
  right: 0;
}
@keyframes minimize-width {
  0%    { width: 101% }
  100%  { width: 0px }
}

.animate-minimize-width {
  animation: minimize-width 0.5s linear;
  animation-fill-mode: forwards;
}
.animate-minimize-last-width {
  animation: minimize-width 0.5s linear;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}
</style>
