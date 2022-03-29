<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-form-group class="col-md-12" :label="'freeze: ' +  ' ( '+freeze.length +' weeks )' + ' Available: '+freezeNumber " label-for="freeze">
            <div class="periodNumbers flex-wrap">
                        <span v-for="(i, key) in freezeNumber" :class="[{ 'shadow selectedNumber' : isSelectedFreeze(key)}, 'd-flex justify-content-center align-items-center py-2 my-1']"  :key="key" @click="selectFreeze(i , key)">
                          <i class="lar la-snowflake"></i>
                        </span>
            </div>
          </b-form-group>
          <b-form-group class="col-md-12" label="Start Time" label-for="date">
            <ValidationProvider name="icon" ref="start" rules="required" v-slot="{ errors }">
              <b-form-input id="start" type="date" v-model="startDate"></b-form-input>
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </b-form-group>
        </b-row>
        <div class="d-flex align-items-center justify-content-end">
          <b-button variant="primary" type="submit" >freeze</b-button>
        </div>
      </form>
    </ValidationObserver>
  </b-container>
</template>

<script>
import { core } from '../../../../config/pluginInit'

export default {
  name: 'freeze',
  props: ['freezeNumber'],
  data () {
    return {
      startDate: '',
      /* weeks: this.freeze[this.freeze.length - 1], */
      freeze: []
    }
  },
  mounted () {
    core.index()
  },
  methods: {
    onSubmit () {
      this.$emit('freeze', { start: this.startDate, weeks: this.freeze.length })
    },
    isSelectedFreeze (i) {
      // eslint-disable-next-line eqeqeq
      if (this.freeze.includes(i)) {
        return true
      } else {
        return false
      }
    },
    selectFreeze (data, index) {
      this.freeze = []
      for (var x = 0; x <= index; x++) {
        this.freeze.push(x)
      }
    }
  }
}
</script>

<style scoped>

</style>
