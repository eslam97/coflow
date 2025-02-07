<template>
    <div>
        <legend>Instructor</legend>
        <div class="m-0">
            <div class="d-flex gap-2 position-relative mb-2" v-for="(instructor, key) in instructors" :key="key">
            <input-form
                style="flex: 1;"
                v-model="instructor.first_name"
                placeholder="Enter First Name"
                :validate="'required|max:50'"
                name="First name"
                :limit="50"
            />
            <input-form
                style="flex: 1;"
                v-model="instructor.last_name"
                placeholder="Enter Last Name"
                :validate="'required|max:50'"
                name="Last name"
                :limit="50"
            />
            <span class="text-danger deleteLabelButton cursor-pointer" style="top:-20px" v-if="key != 0" @click="deleteInstructor(key)">Delete
            </span>
            </div>
            <p class="d-flex justify-content-end m-0">
            <span class="text-warning cursor-pointer" @click="addNewInstructor">+ Add new instructor</span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Instructor',
  props: {
    allInstructors: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      instructors: [
        { first_name: '', last_name: '' }
      ]
    }
  },
  watch: {
    allInstructors: {
      handler (val) {
        this.instructors = val
      },
      deep: true,
      immediate: true
    },
    instructors: {
      handler (val) {
        this.$emit('instructors', val)
      },
      deep: true
    }
  },
  methods: {
    addNewInstructor () {
      this.instructors.push({ first_name: '', last_name: '' })
    },
    deleteInstructor (key) {
      this.instructors.splice(key, 1)
    }
  }
}
</script>
