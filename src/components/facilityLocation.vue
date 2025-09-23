<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <legend>Locations</legend>
      <div class="d-flex align-items-center w-100 justify-content-end">
        <div class="d-flex justify-content-between text-left">
          <span class="font-weight-bold font-size-12 mr-3" style="flex:1">Facility Location</span>
          <div
            class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0">
            <div class="custom-switch-inner">
              <input
                type="checkbox"
                class="custom-control-input bg-info"
                id="status"
                v-model="showLocations"
              >
              <label class="custom-control-label" for="status"></label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form يظهر لو showLocations = false -->
    <div v-if="!showLocations" class="m-0">
      <div
        class="d-flex gap-2 position-relative mb-2"
        v-for="(location, key) in locations"
        :key="key"
      >
        <input-form
          style="flex: 1;"
          v-model="location.name"
          placeholder="Location Name"
          :validate="'required|max:50'"
          name="name"
          :limit="50"
        />
        <input-form
          style="flex: 1;"
          v-model="location.link"
          placeholder="Location Link"
          :validate="'required|max:50'"
          name="link"
          :limit="50"
        />
        <span
          class="text-danger deleteLabelButton cursor-pointer"
          style="top:-20px"
          v-if="key !== 0"
          @click="deleteLocation(key)"
        >
          Delete
        </span>
      </div>
      <p class="d-flex justify-content-end m-0">
        <span class="text-warning cursor-pointer" @click="addNewLocation">
          + Add new location
        </span>
      </p>
    </div>

    <!-- رسالة تظهر لو showLocations = true -->
    <p v-else class="font-weight-bold text-black italic font-size-20">
      We will take your facility location *
    </p>
  </div>
</template>

<script>
export default {
  name: 'Location',
  props: {
    allLocations: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showLocations: true,
      locations: [],
      isInitializing: false
    }
  },
  mounted () {
    this.initFromServer()
  },
  watch: {
    allLocations: {
      handler () {
        this.initFromServer()
      },
      deep: true,
      immediate: true
    },
    showLocations (val) {
      if (this.isInitializing) return

      this.$emit('facility_location', +val)

      if (val) {
        this.locations = []
      } else if (!this.locations.length) {
        this.locations = [{ name: '', link: '' }]
      }
    },
    locations: {
      handler (val) {
        if (this.isInitializing) return
        this.$emit('locations', val)
      },
      deep: true
    }
  },
  methods: {
    initFromServer () {
      this.isInitializing = true

      if (this.allLocations && this.allLocations.length > 0) {
        this.locations = [...this.allLocations]
        this.showLocations = false // يعرض الفورم
      } else {
        this.locations = []
        this.showLocations = true // يعرض الرسالة
      }

      this.$nextTick(() => {
        this.isInitializing = false
      })
    },
    addNewLocation () {
      this.locations.push({ name: '', link: '' })
    },
    deleteLocation (key) {
      this.locations.splice(key, 1)
    }
  }
}
</script>
