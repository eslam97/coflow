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
        :close-on-select="!multiple"
        :clearable="clearable_v"
        :placeholder="placeholder"
        :name="name"
        :options="options"
        :label="label"
        :reduce="reduce"
        :disabled="disabled"
        :value="selected"
        :loading="showLoadingIcon"
        :taggable="taggable"
        :append-to-body="inBody"
        :calculate-position="withPopper"
        @input="onChange"
        @keydown.native="isTextVerify"
        @search:focus="onFocus"
        @search:blur="onBlur"
        :no-drop="taggable"
        :class="[{ 'is-invalid': errors.length > 0 || showAlert }]"
        :selectable="() =>numberOfSelect ?  selected.length < numberOfSelect : true"
        >
          <template #open-indicator="{ attributes }" v-if="!taggable">
            <span v-bind="attributes"><span data-icon="T" class="icon"></span></span>
          </template>
          <template
            v-if="showSelectAll"
            #list-header
          >
            <li class="cursor-pointer text-white pl-3 bg-warning" @click="checkAll = !checkAll; checkAllOptions()">Select All</li>
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
      <div class="d-flex justify-content-between">
        <small class="text-danger">{{ errors[0] }}</small>
        <small v-if="showAlert" class="text-danger">number of text not valid</small>
        <small v-if="taggable">Add tag then press enter</small>
      </div>
    </validation-provider>
  </b-form-group>
</template>
<script>
import VueSelect from 'vue-select'
import { createPopper } from '@popperjs/core'

export default {
  name: 'VSelect',
  components: { VueSelect },
  props: {
    inBody: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    numberOfSelect: {
      type: Number
    },
    inputLength: {
      type: Number
    },
    taggable: {
      type: Boolean,
      default: false
    },
    closeOnSelect: {
      type: Boolean,
      default: true
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
      selected: null,
      showAlert: false,
      text: '',
      placement: 'bottom'
    }
  },
  computed: {
    closeOnSelect_v () {
      return !this.multiple
    },
    clearable_v () {
      return this.clearable || this.multiple
    },
    showSelectAll () {
      return !this.hideSelectAll && (!this.taggable && this.options.length && this.multiple && this.selected &&
          this.options.length !==
          this.selected.length)
    }
  },
  watch: {
    selected (val) {
      if (!this.taggable && val && this.selected && this.selected.length !== this.options.length) this.checkAll = false
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
    withPopper (dropdownList, component, { width }) {
      console.log(component)
      dropdownList.style.width = width
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1]
            }
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn ({ state }) {
              component.$el.classList.toggle(
                'drop-up',
                state.placement === 'top'
              )
            }
          }
        ]
      })

      /**
       * To prevent memory leaks Popper needs to be destroyed.
       * If you return function, it will be called just before dropdown is removed from DOM.
       */
      return () => popper.destroy()
    },
    isTextVerify (e) {
      this.text = e.target.value
      if (this.inputLength && (e.target.value.length > this.inputLength)) {
        this.showAlert = true
      } else {
        this.showAlert = false
      }
    },
    onChange (e) {
      if (this.text.length > this.inputLength) {
        this.selected.splice(this.selected.length - 1, 1)
      } else {
        this.$emit('input', this.selected)
        this.$emit('change', this.selected)
      }
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
  },
  mounted () {
    /* if (this.options.length === 1) {
      this.selected = this.options[0]
    } */
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
    z-index: 1000!important;
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
.vs--multiple {
  .vs__selected-options{
    .vs__selected{
      height: 30px;
      min-width: 90px !important;
      display: flex;
      justify-content: space-around;
      background: none !important;
      margin: 7px 5px 0px 2px !important;
    }
  }
}
.vs__selected-options {
  min-height: 43px !important;
}
</style>
