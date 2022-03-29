<template>
  <div>
    <b-modal id="modal-delete" size="md" title="Remove" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">Are you sure you want to delete this data? </p>
      <div class="d-flex justify-content-end">
        <b-button variant="danger" @click="deletePackageSettings">Delete</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-delete-shift" size="md" title="Remove shift" hide-footer>
      <p class="font-size-18 text-black">Are you sure you want to delete this shift? </p>
      <div class="d-flex justify-content-end">
        <b-button variant="danger" @click="deleteShift">Delete</b-button>
      </div>
    </b-modal>
    <div class="iq-card p-1">
      <b-tabs content-class="mt-1" align="left" v-if="allTabs">
        <b-tab v-for="(tab, key) in allTabs" :key="key" :title="tab.title.charAt(0).toUpperCase()+ tab.title.slice(1)" :active="key==0" @click="changeContentPage(tab.id, tab.title)">
        </b-tab>
      </b-tabs>
    </div>
      <b-row v-if="!shifts">
        <b-col lg="7">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">{{tableTitle.charAt(0).toUpperCase() + tableTitle.slice(1)}}</h4>
            </template>
            <template v-slot:body>
              <div v-if="loadTable" class="text-center">
                <b-spinner small type="grow"></b-spinner>
                Loading...
              </div>
              <b-table v-else striped :fields="columns" :items="tableData" class="mb-0 table-borderless">
                <template v-slot:cell(is_active)="data3">
                  <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                    <div class="custom-switch-inner">
                      <input type="checkbox" class="custom-control-input bg-primary" v-model="data3.item.is_active" :id="'customSwitch-11'+data3.item.id"   @change="switchStatus(data3.item.id)" >
                      <label class="custom-control-label" :for="'customSwitch-11'+data3.item.id" data-on-label="on" data-off-label="off">
                      </label>
                    </div>
                  </div>
                </template>
                <template v-slot:cell(actions)="data1">
                  <b-button @click="editData(data1.item)" variant=" iq-bg-success mr-1 mb-1" size="sm" :class="'input_'+data1.item.id">
                    <i class="ri-ball-pen-fill m-0"></i>
                  </b-button>
                  <b-button variant=" iq-bg-danger" size="sm" @click="setDeletedId(data1.item.id)"><i class="ri-delete-bin-line m-0"></i></b-button>
                </template>
              </b-table>
            </template>
          </iq-card>
        </b-col>
        <b-col lg="5">
          <iq-card v-if="!ifEdit" >
            <template v-slot:headerTitle>
              <h4 class="card-title">Add {{tableTitle}}</h4>
            </template>
<!--            <template v-slot:headerAction>
              <b-dropdown id="dropdownMenuButton5" right variant="none" data-toggle="dropdown">
                <template v-slot:button-content>
                  <span class="text-primary"><i class="ri-more-2-fill"></i></span>
                </template>
                <b-dropdown-item><i class="ri-eye-fill mr-2"></i>{{ $t('dropdown.view') }}</b-dropdown-item>
                <b-dropdown-item><i class="ri-delete-bin-6-fill mr-2"></i>{{ $t('dropdown.delete') }}</b-dropdown-item>
                <b-dropdown-item><i class="ri-pencil-fill mr-2"></i>{{ $t('dropdown.edit') }}</b-dropdown-item>
                <b-dropdown-item><i class="ri-printer-fill mr-2"></i>{{ $t('dropdown.print') }}</b-dropdown-item>
                <b-dropdown-item><i class="ri-file-download-fill mr-2"></i>{{ $t('dropdown.download') }}</b-dropdown-item>
              </b-dropdown>
            </template>-->
            <template v-slot:body>
              <div
                  v-for="(input, key) in values"
                  :key='key'
                  class="row align-items-center input wrapper flex items-center"
              >
                <b-form-group class="col-10 mb-0 mt-1">
                  <ValidationProvider name="value" rules="required" v-slot="{ errors }">
                    <b-form-input v-model="input.value" type="number" placeholder="Value" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                    <div class="invalid-feedback">
                      <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </b-form-group>
                <div class="col-2">
                  <!--          Add Svg Icon-->
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      class="ml-0 cursor-pointer"
                      @click="addField(input, values)"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        fill="green"
                        d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                    />
                  </svg>

                  <!--          Remove Svg Icon-->
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      class="ml-1 cursor-pointer"
                      v-show="values.length > 1"
                      @click="removeField(key, values)"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        fill="#EC4899"
                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
                    />
                  </svg>
                </div>
              </div>
              <div class=" justify-content-end d-flex">
              <b-button variant="primary" class="mt-2 mr-2" @click.prevent="saveValues()">Save</b-button>
              </div>
            </template>
          </iq-card>
          <iq-card v-else>
            <template v-slot:headerTitle>
              <h4 class="card-title">Edit {{tableTitle}}</h4>
            </template>
            <template v-slot:body>
                <b-form-group class="col-12 mb-0 mt-1">
                  <ValidationProvider name="value" rules="required" v-slot="{ errors }">
                    <b-form-input v-model="editValueData" type="number" placeholder="Value" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                    <div class="invalid-feedback">
                      <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              <div class=" justify-content-end d-flex">
                <b-button variant="primary" class="mt-2 mr-2" @click.prevent="saveEditPackage()">Save Edit</b-button>
              </div>
            </template>
          </iq-card>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col lg="12">

          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Shifts</h4>
            </template>
            <template v-slot:headerAction>
              <b-button variant="primary" @click="openShiftsPopup">Add Shifts</b-button>
              <b-modal id="modal-shifts" size="lg" :title="modelTitle" hide-footer no-close-on-backdrop>
                <shiftModel :edit="ifEdit"/>
              </b-modal>
            </template>
            <template v-slot:body>
              <div v-if="loadTable" class="text-center">
                <b-spinner small type="grow"></b-spinner>
                Loading...
              </div>

              <b-table v-else striped responsive :fields="columnsShift" :items="GetAllshift_times" class="mb-0 table-borderless">
                <template v-slot:cell(is_active)="data3">
                  <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                    <div class="custom-switch-inner">
                      <input type="checkbox" class="custom-control-input bg-primary" v-model="data3.item.is_active" :id="'customSwitch-11'+data3.item.id"  @change="switchShiftStatus(data3.item.id)" >
                      <label class="custom-control-label" :for="'customSwitch-11'+data3.item.id" data-on-label="on" data-off-label="off">
                      </label>
                    </div>
                  </div>
                </template>
                <template v-slot:cell(time)="data2">
                  <span>{{tConvert(data2.item.start)}}</span> to <span>{{tConvert(data2.item.end)}}</span>
                </template>
                <template v-slot:cell(actions)="data1">
                  <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="gitDataToEdit(data1.item.id)" :class="'input_'+data1.item.id" ><i class="ri-ball-pen-fill m-0"></i></b-button>
                  <b-button variant=" iq-bg-danger" size="sm" @click="setDeleteShiftId(data1.item.id)"><i class="ri-delete-bin-line m-0"  ></i></b-button>
                </template>
              </b-table>
            </template>
          </iq-card>
        </b-col>
      </b-row>
  </div>
</template>
<script>
import { core } from '../../../config/pluginInit'
import shiftModel from '../../../components/member-shifts/member_shift'
import { mapGetters } from 'vuex'
export default {
  name: 'settingspackage',
  data () {
    return {
      allTabs: '',
      tableData: '',
      tableTitle: '',
      editValueData: '',
      addOrEdit: 'Add',
      shifts: false,
      columns: [
        { label: 'Time', key: 'value', class: 'text-left' },
        { label: 'Status', key: 'is_active', class: 'text-left' },
        { label: 'Actions', key: 'actions', class: 'text-left' }
      ],
      loadTable: false,
      values: [{ value: '' }],
      titleId: '',
      deleteId: '',
      ifEdit: false,
      rowId: '',
      modelTitle: 'Add Shift',
      columnsShift: [
        { label: 'Title', key: 'title', class: 'text-left' },
        { label: 'Time', key: 'time', class: 'text-left' },
        { label: 'Active', key: 'is_active', class: 'text-left' },
        { label: 'Actions', key: 'actions', class: 'text-left' }
      ],
      deleteShiftId: ''
    }
  },
  methods: {
    switchStatus (id) {
      this.$store.dispatch('changeStatusPackageSettings', { titleId: this.titleId, values: id }).then(data => {
        core.showSnackbar('success', 'value has been changed successfully.')
      })
    },
    switchShiftStatus (id) {
      this.$store.dispatch('changeStatusshift_times', id).then(data => {
        core.showSnackbar('success', 'shift been changed successfully.')
      })
    },
    editData (data) {
      this.ifEdit = true
      // console.log(data)
      this.rowId = data.id
      this.editValueData = data.value
    },
    setDeletedId (id) {
      this.deleteId = id
      this.$bvModal.show('modal-delete')
    },
    setDeleteShiftId (id) {
      this.deleteShiftId = id
      this.$bvModal.show('modal-delete-shift')
    },
    deletePackageSettings () {
      this.$store.dispatch('deletePackageSettings', { titleId: this.titleId, values: this.deleteId }).then(data => {
        core.showSnackbar('success', 'data has been deleted successfuly')
        this.$store.dispatch('getPackageSettingDataByID', this.titleId).then(tableData => {
          this.tableData = tableData.data.data
        })
        this.$bvModal.hide('modal-delete')
      })
    },
    saveValues () {
      this.loadTable = true
      // console.log({ titleId: this.titleId, values: this.values.map(a => a.value) })
      this.$store.dispatch('addPackageSetting', { titleId: this.titleId, values: this.values.map(a => a.value) }).then(() => {
        this.values = []
        this.$store.dispatch('getPackageSettingDataByID', this.titleId).then(tableData => {
          this.tableData = tableData.data.data
          this.loadTable = false
          this.values = [{ value: '' }]
        })
      }).catch(err => {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          core.showSnackbar('error', `${key}: ${value}`)
        }
        this.loadTable = false
      })
    },
    addField (value, fieldType) {
      fieldType.push({ value: '' })
    },
    removeField (index, fieldType) {
      fieldType.splice(index, 1)
    },
    changeContentPage (id, title) {
      // console.log(this.titleId, id)
      if (this.titleId !== id) {
        // eslint-disable-next-line eqeqeq
        if (id == 10) {
          this.loadTable = true
          this.$store.dispatch('getAllshift_times').then(res => {
            // console.log('res', res)
            /* this.tableData = res.data.data */
            this.loadTable = false
          })
          this.shifts = true
          this.titleId = id
        } else {
          this.shifts = false
          this.ifEdit = false
          this.loadTable = true
          this.tableTitle = title
          this.titleId = id
          this.values = [{ value: '' }]
          this.$store.dispatch('getPackageSettingDataByID', id).then(tableData => {
            this.tableData = tableData.data.data
            this.loadTable = false
          })
        }
      }
    },
    saveEditPackage () {
      this.loadTable = true
      this.$store.dispatch('editPackageSettings', { titleId: this.titleId, rowId: this.rowId, newData: this.editValueData }).then(() => {
        this.ifEdit = false
        this.$store.dispatch('getPackageSettingDataByID', this.titleId).then(tableData => {
          this.tableData = tableData.data.data
          this.loadTable = false
          core.showSnackbar('success', 'this row edit successfully')
        })
      }).catch(err => {
        this.loadTable = false
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          core.showSnackbar('error', `${value}`)
        }
      })
    },
    openShiftsPopup () {
      this.modelTitle = 'Add Shift'
      this.ifEdit = false
      this.$bvModal.show('modal-shifts')
    },
    tConvert (time) {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)
      if (time.length > 1) {
        time = time.slice(1)
        time[5] = +time[0] < 12 ? 'AM' : 'PM'
        time[0] = +time[0] % 12 || 12
      }
      time.splice(3, 1, ' ')
      return time.join('')// return adjusted time or original string
    },
    gitDataToEdit (id) {
      this.$store.dispatch('GetSpacificshift_times', id).then(() => {
        this.modelTitle = 'Edit Shift'
        this.ifEdit = true
        this.$bvModal.show('modal-shifts')
      })
    },
    deleteShift () {
      this.$store.dispatch('deleteshift_times', this.deleteShiftId).then(() => {
        this.$bvModal.hide('modal-delete-shift')
      })
    }
  },
  computed: {
    ...mapGetters(['GetAllshift_times'])
  },
  components: { shiftModel },
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    this.$store.dispatch('getAllTitlePackageSetting').then(data => {
      // console.log(data)
      this.allTabs = data.data.data['0']
      this.allTabs.push({ id: 10, title: 'Shifts' })
      this.tableTitle = data.data.data['0'][0].title
      this.titleId = data.data.data['0'][0].id
      this.$store.dispatch('getPackageSettingDataByID', data.data.data['0'][0].id).then(tableData => {
        this.tableData = tableData.data.data
        this.loadTable = false
      })
    })
  }
}
</script>
<style scoped>

.nav-link.router-link-exact-active.router-link-active{
  background: var(--iq-primary) !important;
  color: #fff !important;
}
.colorSpan{
  width: 20px;
  height: 20px;
}
[dir=ltr][mode=light] .nav-tabs {
  background: #fff !important;
  border-radius: 10px !important;
}
</style>
