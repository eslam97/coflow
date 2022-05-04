<template>
  <b-form-group
      :label="labelTitle"
      :label-for="name"
  >
    <validation-provider
        #default="{ errors }"
        :name="name"
        :rules="validate"
        class="flex-grow-1"
    >
      <vue-select
    v-model="selected"
    :multiple="multiple"
    :close-on-select="closeOnSelect_v"
    :clearable="clearable_v"
    :placeholder="placeholder"
    :name="name"
    :options="options"
    :label="label"
    :reduce="reduce"
    :disabled="disabled"
    :value="selected"
    :loading="showLoadingIcon"
    @input="onChange"
    @search:focus="onFocus"
    @search:blur="onBlur"
    :class="[{ 'is-invalid': errors.length > 0 }]"
  >
    <template #open-indicator="{ attributes }">
      <span v-bind="attributes"><span data-icon="T" class="icon"></span></span>
    </template>
    <template
      v-if="showSelectAll"
      #list-header
    >
      <vs-checkbox
        v-model="checkAll"
        class="pl-4 pr-0 mb-3 d-block w-auto"
        @change="checkAllOptions"
      >{{ $t('main.selectAll') }}
      </vs-checkbox>
    </template>
    <template
      v-if="noOptionsText"
      v-slot:no-options="{ search, searching }"
    >
      <template v-if="searching">
        {{ $t('basic.no_results_found_for') }} <em>{{ search }}</em>.
      </template>
      <em
        v-else
        style="opacity: 0.5"
      >{{ noOptionsText }}</em>
    </template>
    <slot />
  </vue-select>
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>
<script>
import VueSelect from 'vue-select'

export default {
  name: 'VSelect',
  components: { VueSelect },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    closeOnSelect: {
      type: Boolean
    },
    clearable: {
      type: Boolean

    },
    disabled: {
      type: Boolean

    },
    validate: {
      default: '',
      required: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    name: {
      type: String
    },
    options: {
      type: Array,
      require: true
    },
    label: {
      type: String
    },
    labelTitle: {
      default: '',
      type: String
    },
    reduce: {
      type: Function
    },
    noOptionsText: {
      type: String,
      default: ''
    },
    showLoadingIcon: {
      type: Boolean,
      default: false
    },
    hideSelectAll: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      checkAll: false,
      selected: null

    }
  },
  computed: {
    closeOnSelect_v () {
      return this.closeOnSelect || !this.multiple
    },
    clearable_v () {
      return this.clearable || this.multiple
    },
    showSelectAll () {
      return !this.hideSelectAll && (this.options.length && this.multiple && this.selected && this.options.length !== this.selected.length)
    }
  },
  watch: {
    selected (val) {
      if (val && this.selected && this.selected.length !== this.options.length) this.checkAll = false
      this.$attrs.value = val
    },
    '$attrs.value': function (val) {
      this.selected = val
    }
  },
  created () {
    this.selected = this.$attrs.value
  },
  methods: {
    onChange (e) {
      this.$emit('input', this.selected)
      this.$emit('change', this.selected)
    },

    onFocus () {
      this.$emit('v-select-focus')
    },
    onBlur () {
      this.$emit('v-select-blur')
    },
    checkAllOptions () {
      if (this.checkAll) {
        if (this.reduce !== undefined) this.selected = this.options.map(el => this.reduce(el))
        else this.selected = this.options
      } else this.selected = this.multiple ? [] : null
      this.onChange()
    }
  }
}

</script>

<style lang="scss">
.vs--open .vs__selected {
  top: 10px;
}
.vs--searchable div {
  min-height: 43px !important;
}

.vs__dropdown-toggle {
  border: 1px solid #d7dbda !important;
  padding-bottom: 0 !important;
}
.is-invalid .vs__dropdown-toggle {
  border: 1px solid rgb(255 0 0) !important;
}
.vs--searchable div {
  border-radius: 4px !important;
}
.vs__open-indicator {
  fill: var(--iq-black)
}
.v-select {
  .vs__dropdown-menu {
    overflow-x: hidden;
  }

  .vs__dropdown-option--selected {
    display: none;
  }
  .vs__search {

    $placeholderColor: #ccc;

    &::placeholder {
      color: $placeholderColor;
    }

    &::-webkit-input-placeholder {
      /* Edge */
      color: $placeholderColor;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: $placeholderColor;
    }
  }
}
</style>
