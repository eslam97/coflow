<template>
  <div class="d-flex gap-1">
    <label :for="name" class="font-weight-bold font-size-12">{{ label }}</label>
    <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0">
      <div class="custom-switch-inner">
        <input
          type="checkbox"
          class="custom-control-input bg-info"
          :id="id"
          :name="name"
          :disabled="disabled"
          :value="value"
          @input="$emit('input', !value)"
          @change="$emit('change', !value)"
          >
        <label class="custom-control-label" :for="name"></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { default: '', type: String },
    name: { default: '', type: String },
    id: { default: '', type: String },
    disabled: { default: false, type: Boolean },
    value: { default: '' }
  }
}
</script>

<style lang="scss" scoped></style>
