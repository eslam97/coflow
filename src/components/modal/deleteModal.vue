<template>
  <b-modal
      :id="id"
      v-model="shown"
      @shown="onShown"
      @hidden="onHidden"
      centered
      no-close-on-backdrop
      hide-footer
  >
    <template #modal-header="{ close }">
      <h4 class="font-weight-bold"><span class="text-danger">{{ actionHeader }}: </span> {{ titleHeader }}</h4>
      <i class="las la-times closePopupIcon" @click="close()"></i>
    </template>
    <template #default="{ close }">
      <h2 class="font-weight-bold text-danger text-center">{{ actionHeader }}</h2>
      <p class="text-black font-weight-bold text-center font-size-22 mb-0">{{ textContnet }}</p>
      <P class="text-center">{{question}}</P>
      <div class="d-flex justify-content-center mt-3">
        <span class="w-40 p-2">
          <b-button variant="danger" class="popupButton w-100">
            <span class="mr-2">{{textDeleteButton}}</span>
            <i :class="icon"></i>
          </b-button>
        </span>
        <span class="w-40 p-2">
          <b-button variant="white" class="popupButton w-100" @click="close()">
            <span>{{textCancelButton}}</span></b-button>
        </span>
      </div>
    </template>
  </b-modal>
</template>

<script>
import Bus from '@/eventBus'
export default {
  props: {
    id: {
      type: String,
      default: () => ''
    },
    actionHeader: {
      type: String,
      default: () => 'Delete'
    },
    titleHeader: {
      type: String,
      default: () => ''
    },
    textContnet: {
      type: String,
      default: () => ''
    },
    question: {
      type: String,
      default: () => 'Are You Sure You Want Delete This ?'
    },
    textDeleteButton: {
      type: String,
      default: () => 'YES, DELETE'
    },
    textCancelButton: {
      type: String,
      default: () => 'NO, CANCEL'
    },
    icon: {
      type: String,
      default: () => 'las la-trash-alt'
    }
  },

  data () {
    return {
      shown: false
    }
  },

  mounted () {
    Bus.$on('toggle_modal', (modalId) => {
      if (this.id === modalId) {
        this.shown = !this.shown
      }
    })
  },

  beforeDestroy () {
    Bus.$off('toggle_modal')
  },

  methods: {
    onShown () {
      this.$emit('opened')
    },

    onHidden () {
      this.$emit('closed')
    }
  }
}
</script>
<style scoped>
.closePopupIcon {
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  color: black;
}
.popupButton{
  border-radius: 4px !important;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  font-weight: bolder;
  padding: 15px !important;
}
.popupButton span{
  font-weight: bold;
}
.w-40 {
  width: 40%;
}
</style>
