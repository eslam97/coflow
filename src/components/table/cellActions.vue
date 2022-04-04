<!-- Docs

Props:
1- Design Cell
  title => String
  icon => (class of line awesome)

2- showIf => condition must be a true to show cell

3- Routes
  ifNavigate => Boolean
  routerName => String
  routerPath => String
  routerParams => String

4- takeAction ($emit)
   takeActionParams => (get value of key in row)

5- change Status (with api)
-->
<template>
  <div>
    <!-- modal -->
    <deletePopup id="modalId"></deletePopup>
    <div v-if="cellActions.actions.length"  class="d-flex justify-content-around w-full">
      <template v-for="(i, key) in cellActions.actions">
        <span
          v-if="i.showIf ? i.showIf(dataItem) : true"
          :key="key"
          @click="fireAction(i)"
        >
          <i v-b-tooltip.top="`${i.text}`" :class="[i.icon, `text-${i.color}`]" />
        </span>
      </template>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    cellActions: {
      type: Object
    },
    dataItem: {
      type: Object
    }
  },
  data () {
    return {
      modalTitle: '',
      modalColor: 'danger'
    }
  },
  methods: {
    fireAction (action) {
      if (action.ifNavigate) {
        let params = {}
        let path = action.routePath || null

        const actionParams = action.routeName || null
        if (action.getParams) {
          params = action.getParams(this.dataItem)
        } else if (action.routePath) {
          const pathParams = action.routePath.split('/').filter(e => e.includes(':')).map(e => e.replace(':', ''))
          pathParams.forEach(e => {
            params[e] = this.dataItem[e]
            path = path.replace(`:${e}`, this.dataItem[e])
          })
        } else if (Array.isArray(actionParams)) {
          actionParams.forEach(e => {
            params[e] = this.dataItem[e]
          })
        } else params[actionParams || 'id'] = this.dataItem[actionParams || 'id']
        this.$router.push(
          path || {
            name: action.routeName,
            params
          }
        )
      } else if (action.actionName) {
        const objData = {}
        if (action.actionParams) {
          action.actionParams.forEach(params => {
            if (this.dataItem[params]) {
              objData[params] = this.dataItem[params]
            }
          })
        }
        this.$root.$emit(action.actionName, objData)
      } else {
        this.$root.$emit('bv::show::modal', 'modalId')
      }
    }
  }
}
</script>
