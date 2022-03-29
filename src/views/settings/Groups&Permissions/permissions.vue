<template>
  <b-row>
    <b-col lg='12'>
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">All Permissions</h4>
        </template>
        <template v-slot:headerAction  v-if="hasPer('permission.update')">
          <b-button v-if="!tableEdit" variant="primary" @click="edit">Edit</b-button>
          <b-button v-else variant="primary" @click="save">save</b-button>
        </template>
        <template v-slot:body>
          <div v-if="loadTable" class="text-center">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
          <b-table v-else striped responsive :fields="columns" :items="allPermissions" class="mb-0 table-borderless">
            <template v-slot:cell(color)="data">
              <span v-if="!tableEdit"  :style="{ backgroundColor: data.item.color ? data.item.color : '#4b4747'}" class="rounded-circle colorSpan d-inline-block">{{ data.item.title }}</span>
              <input type="color" v-model="data.item.color" v-else class="form-control">
            </template>
            <template v-slot:cell(display_name)="data">
              <span v-if="!tableEdit" >{{ data.item.display_name }}</span>
              <input type="text"  v-model="data.item.display_name" v-else class="form-control">
            </template>
          </b-table>
        </template>
      </iq-card>
    </b-col>
  </b-row>
</template>
<script>
import { core } from '../../../config/pluginInit'
export default {
  name: 'settingsenterprises',
  data () {
    return {
      loadTable: true,
      tableEdit: false,
      columns: [
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Display Name', key: 'display_name', class: 'text-left' },
        { label: 'Sort', key: 'sort', class: 'text-left' },
        { label: 'Color', key: 'color', class: 'text-left' },
        { label: 'Group', key: 'group', class: 'text-left' }
      ],
      allPermissions: []
    }
  },
  computed: {
  },
  methods: {
    edit () {
      this.tableEdit = true
    },
    save () {
      this.tableEdit = false
      this.$store.dispatch('updatePermissionName', this.allPermissions).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    }
  },
  components: {},
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    this.$store.dispatch('getAllPermissionToEditName').then(res => {
      this.allPermissions = res.data.data
      this.loadTable = false
    })
  }
}
</script>
<style scoped>
.colorSpan{
  width: 20px;
  height: 20px;
}
th{
  white-space: pre !important;
}
td{
  white-space: pre !important;
}
</style>
