<template>
    <b-form-group label="Pick Level">
        <div class="d-flex mb-2" style="gap: 4px">
          <span v-for="(option, counter) in levels" :key="counter" style="flex: 1">
            <button
                :style="{
                    width: '100%',
                    background: selectedLevel === option ? selectedLevel.color : '#f8f9fa',
                    border: `1px solid ${option.color}`,
                    color: selectedLevel === option ? '#fff' : option.color
                }"
                type="button"
                class="btn radio-btn" @click="selectedLevel = option; $emit('selectLevel', option.id)">
                {{ option.name }}
            </button>
          </span>
        </div>
      </b-form-group>
</template>
<script>
import settingsServices from '@/modules/superAdmin/settings/services/settings.services'
export default {
  data () {
    return {
      levels: [],
      selectedLevel: {
        name: '',
        id: '',
        color: ''
      }
    }
  },
  props: {
    level: {
      required: false
    }
  },
  watch: {
    level: {
    }
  },
  methods: {
    async getAllLevel () {
      await settingsServices.getAllLevels().then(response => {
        console.log(response.data.data)
        this.levels = response.data.data
      })
    }
  },
  async mounted () {
    await this.getAllLevel()
    if (this.level) {
      this.selectedLevel = this.levels.find(level => level.id === this.level)
    }
  }
}
</script>
