<template>
  <div>
    <b-spinner small type="grow"></b-spinner>
    {{ text }}...
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String
    }
  }
}
</script>
