<template>
  <div>
    <label v-if="label" :for="name">{{ label }}</label>

    <div :class="`input-counter ${disabled ? 'disabled' : ''}`">
      <button :disabled="disabled" @click.prevent="() => $emit('input', value == 0 ? 0 : +value - 1)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33325 8H12.6666" stroke="#181935" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <input type="number" :name="name" :id="id" :disabled="disabled" :value="value" @input="$emit('input', $event.target.value)">
      <button :disabled="disabled" @click.prevent="() => $emit('input', +value + 1)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3.3335V12.6668" stroke="#181935" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.33325 8H12.6666" stroke="#181935" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
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

<style lang="scss" scoped>
.input-counter {
  button {
    background: var(--co-orange);
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 0 4px 4px 0;
    &:first-of-type {
      border-radius: 4px 0 0 4px;
    }
  }
  input {
    min-width: 40px;
    max-width: 60px;
    height: 40px;
    border: 1px solid #FFE4BE;
    text-align: center;
    font-weight: 700;

    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
.disabled {
  opacity: 0.5;
}
</style>
