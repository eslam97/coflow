<template>
  <div>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">System</h4>
          </template>
<!--          <template v-slot:headerAction>
            <b-button variant="primary" @click="add">Edit</b-button>
          </template>-->
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table striped responsive :items="allsettings" :fields="columns">
                  <template v-slot:cell(value)="data">
                    <span v-if="data.item.validate_type == 'array'">
                      <span v-for="(i, key) in JSON.parse(data.item.value)" :key="key">{{i}} <span v-if="JSON.parse(data.item.value).length > 1"></span></span>
                    </span>
                    <span v-else>
                      <input v-if="editRow == data.item.id" type="number" v-model="settingValue" class="form-control">
                      <span v-else :id="data.item.id">{{ data.item.value }}</span>
                    </span>
                  </template>
                  <template v-slot:cell(action)="data">
                    <b-button v-if="editRow == data.item.id" variant=" iq-bg-success mr-1 mb-1" size="sm" @click="saveChange(data.item.key, data.item.id)">Save</b-button>
                    <b-button v-else variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editRowColumn(data.item.id, data.item.value)"><i class="ri-ball-pen-fill m-0"></i></b-button>

                    <!--                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submitAddParent(data.item)" v-if="data.item.editable">Save</b-button>-->
                  </template>
                </b-table>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'

export default {
  mounted () {
    core.index()
  },

  data () {
    return {
      settingValue: '',
      editRow: '',
      allsettings: [],
      columns: [{ label: 'Id', key: 'id', class: 'text-left' },
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Key', key: 'key', class: 'text-left' },
        { label: ' Validate Type', key: 'validate_type', class: 'text-left' },
        { label: 'Is Active', key: 'is_active', class: 'text-left' },
        { label: 'Value', key: 'value', class: 'text-left' },
        { label: 'Description', key: 'description', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-left' }
      ]
    }
  },
  methods: {
    editRowColumn (id, value) {
      this.editRow = id
      this.settingValue = value
    },
    saveChange (type, id) {
      this.$store.dispatch('saveChangeSettings', { type: type, value: this.settingValue }).then(res => {
        core.showSnackbar('success', res.data.message)
        // document.getElementById('"' + type + '"').textContent = this.settingValue
        this.editRow = ''
      }).then(() => {
        document.getElementById(id).innerHTML = this.settingValue
        this.settingValue = ''
      }).catch(err => {
        core.showSnackbar('error', err.response.data.errors)
      })
    }
  },
  created () {
    this.$store.dispatch('getSettings').then(data => {
      this.allsettings = data.data.data
    })
  }
}
</script>
