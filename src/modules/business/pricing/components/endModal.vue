<template>
  <b-modal
      :id="'endModal'"
      v-model="shown"
      centered
      no-close-on-backdrop
      hide-footer
  >
    <template #modal-header="{ close }">
      <h4 class="font-weight-bold"><span class="text-danger">{{ actionHeader }}: </span> {{ titleHeader }}</h4>
      <i class="las la-times closePopupIcon" @click="close()"></i>
    </template>
    <template #default="{ close }">
      <h2 class="font-weight-bold text-danger text-center pt-3">{{ actionHeader }}</h2>
      <p class="text-black font-weight-bold text-center font-size-22 mb-0">{{ textContent }}</p>
      <P class="text-center">{{question}}</P>
      <div class="d-flex justify-content-center mt-3 pb-4">
        <span class="w-40 p-2">
          <b-button v-if="type == 'end'" @click="confirm" variant="danger" class="popupButton w-100">
            <span class="mr-2">{{textDeleteButton}}</span>
            <i :class="icon"></i>
          </b-button>
        </span>
        <span class="w-40 p-2">
          <b-button variant="white" class="popupButton w-100" @click="close(); returnFalse()">
            <span>{{textCancelButton}}</span></b-button>
        </span>
      </div>
    </template>
  </b-modal>
</template>

<script>
import Bus from '@/eventBus'
import promotionsServices from '../services/promotions.services'
import { core } from '@/config/pluginInit'
import moment from 'moment'
export default {
  props: {
    modalInfo: {
      type: Object
    }
  },
  data () {
    return {
      shown: false,
      id: '',
      actionHeader: '',
      titleHeader: '',
      textContent: '',
      question: '',
      textDeleteButton: '',
      textCancelButton: '',
      icon: '',
      url: '',
      rowId: '',
      type: 'end',
      actionOnAlert: '',
      data: {}
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
    show (opts = {}) {
      this.actionHeader = opts.actionHeader
      this.titleHeader = opts.titleHeader
      this.textContent = opts.textContent
      this.question = opts.question
      this.textDeleteButton = opts.textDeleteButton
      this.textCancelButton = opts.textCancelButton
      this.icon = opts.icon
      this.url = opts.url
      this.rowId = opts.rowId
      this.type = opts.type
      this.data = opts.data
      this.actionOnAlert = opts.actionOnAlert
      this.$bvModal.show('endModal')
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },
    confirm () {
      this.data.end_date = moment(new Date()).add(-1, 'd').format('YYYY-MM-DD')
      this.data._method = 'put'
      promotionsServices.editPromotion(this.rowId, this.data).then(res => {
        core.showSnackbar('success', res.data.message)
        Bus.$emit('reloadTableAfterDelete', true)
        this.$bvModal.hide('endModal')
        this.resolvePromise(true)
      })
    },
    returnFalse () {
      this.rejectPromise(false)
    },
    closePopup () {
      this.$bvModal.hide('endModal')
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
