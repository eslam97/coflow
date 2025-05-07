<template>
  <b-form-group :label="labelTitle" :label-for="name">
    <validation-provider
      #default="{ errors }"
      :name="name"
      :rules="validate"
      class="flex-grow-1"
    >
      <vue-select
        v-model="selected"
        :options="options"
        :label="label"
        :reduce="reduce"
        :name="name"
        :multiple="multiple"
        :clearable="clearableComputed"
        :close-on-select="!multiple"
        :disabled="disabled"
        :placeholder="placeholder"
        :loading="showLoadingIcon"
        :taggable="taggable"
        :append-to-body="inBody"
        :calculate-position="withPopper"
        :no-drop="taggable"
        :class="{ 'is-invalid': errors.length > 0 || showAlert }"
        :selectable="() => numberOfSelect ? selected.length < numberOfSelect : true"
        @input="onChange"
        @search="onSearch"
        @keydown.native="isTextVerify"
        @search:focus="onFocus"
        @search:blur="onBlur"
      >
        <template #option="data">
          <slot name="data" :data="data"></slot>
        </template>

        <template #selected-option="data">
          <slot name="selected-option" :data="data"></slot>
        </template>

        <template #open-indicator="{ attributes }" v-if="!taggable">
          <span v-bind="attributes">
            <span data-icon="T" class="icon"></span>
          </span>
        </template>

        <template v-if="showSelectAll" #list-header>
          <li class="cursor-pointer text-white pl-3 bg-warning" @click="toggleSelectAll">
            Select All
          </li>
        </template>

        <template v-if="noOptionsText" v-slot:no-options="{ search, searching }">
          <template v-if="searching">
            {{ $t('basic.no_results_found_for') }} <em>{{ search }}</em>.
          </template>
          <em v-else style="opacity: 0.5">{{ noOptionsText }}</em>
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
    inBody: Boolean,
    multiple: Boolean,
    numberOfSelect: Number,
    inputLength: Number,
    taggable: Boolean,
    closeOnSelect: Boolean,
    clearable: Boolean,
    disabled: Boolean,
    validate: [String, Object],
    placeholder: {
      type: String,
      default: ''
    },
    name: String,
    options: {
      type: Array,
      required: true
    },
    label: String,
    labelTitle: {
      type: String,
      default: ''
    },
    reduce: Function,
    noOptionsText: {
      type: String,
      default: ''
    },
    showLoadingIcon: Boolean,
    hideSelectAll: Boolean
  },
  data () {
    return {
      selected: null,
      checkAll: false,
      showAlert: false,
      text: '',
      placement: 'bottom'
    }
  },
  computed: {
    clearableComputed () {
      return this.clearable || this.multiple
    },
    showSelectAll () {
      return !this.hideSelectAll &&
        !this.taggable &&
        this.options.length &&
        this.multiple &&
        this.selected &&
        this.options.length !== this.selected.length
    }
  },
  watch: {
    selected (val) {
      if (!this.taggable && val && val.length !== this.options.length) {
        this.checkAll = false
      }
      this.$emit('input', val)
    },
    '$attrs.value' (val) {
      this.selected = val
    }
  },
  created () {
    this.selected = this.$attrs.value
  },
  methods: {
    onSearch (val) {
      this.$emit('search', val)
    },
    isTextVerify (e) {
      this.text = e.target.value
      this.showAlert = this.inputLength && (this.text.length > this.inputLength)
    },
    onChange () {
      if (this.inputLength && this.text.length > this.inputLength) {
        this.selected.splice(this.selected.length - 1, 1)
      } else {
        this.$emit('change', this.selected)
      }
    },
    onFocus () {
      this.$emit('v-select-focus')
    },
    onBlur () {
      this.$emit('v-select-blur')
    },
    toggleSelectAll () {
      this.checkAll = !this.checkAll
      if (this.checkAll) {
        this.selected = this.reduce
          ? this.options.map(this.reduce)
          : [...this.options]
      } else {
        this.selected = this.multiple ? [] : null
      }
      this.onChange()
    },
    withPopper (dropdownList, component, { width }) {
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
      return () => popper.destroy()
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
.v-select {
  .vs__dropdown-menu {
    position: absolute !important;
    z-index: 900000000 !important; // make sure it floats above modals/tooltips
  }
}
</style>
