<template>
  <div>
      <scope v-model="model" v-bind="filteredProps" v-on="$listeners">
        <v-button
            :scope="scope"
            v-on="$listeners"
            v-bind="filteredProps"
            slot-scope="scope"
        >
          <!-- https://stackoverflow.com/a/50892881/4106263 -->
          <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </v-button>
      </scope>
  </div>
</template>
<script>
import { core } from '../config/pluginInit'
import Scope from './scope'
import Button from './components/button'

export default {
  name: 'facebook',
  mounted () {
    core.index()
  },
  components: { Scope, VButton: Button },
  props: {
    ...Scope.props,
    ...Button.props
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    filteredProps () {
      return Object.entries(this.$props).reduce(
        (props, [key, value]) => ({
          ...props,
          ...(value !== undefined && { [key]: value })
        }),
        {}
      )
    },
    buttonProps () {
      return getButtonProps(this.filteredProps)
    }
  }
}
function getButtonProps ($props) {
  const props = {}
  for (const prop in $props) {
    if (Button.props[prop]) {
      props[prop] = $props[prop]
    }
  }
  return props
}
</script>
