<template>
  <b-form-group
    :label="label"
    :label-for="name"
  >
    <validation-provider
      #default="{ errors }"
      :name="name"
      :rules="validate"
    >
      <input
        :id="id"
        :disabled="disabled"
        :type="type"
        :class="['form-control' , { 'is-invalid': errors.length > 0 }]"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      >
      <div class="d-flex justify-content-between">
        <small class="text-danger">{{ errors[0] }}</small>
        <small v-if="limit" :class="[{ 'text-danger': value.length > limit }]">
          {{ (limit > value.length) ? limit - value.length : 0 }} characters</small>
      </div>
    </validation-provider>
  </b-form-group>
</template>
<script>
export default {
  props: {
    label: {
      default: '',
      type: String
    },
    name: {
      default: '',
      type: String
    },
    type: {
      default: 'text'
    },
    id: {
      default: '',
      type: String
    },
    validate: {
      default: '',
      required: false
    },
    value: {
      default: ''
    },
    placeholder: {
      default: '',
      type: String
    },
    disabled: {
      default: false
    },
    limit: {
      default: false
    }
  },
  methods: {
    test (t, y) {
      console.log(t, y)
    }
  }
}
</script>
<style>
.form-group label {
  text-transform: capitalize;
}
</style>
