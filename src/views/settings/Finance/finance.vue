<template>
  <div>
    <div class="iq-card p-1 pb-0">
      <b-tabs content-class="mt-1 pb-0" align="left" v-if="allTabs">
        <b-tab v-for="(tab, key) in allTabs" :key="key" :title="tab.charAt(0).toUpperCase()+ tab.slice(1)" @click="changeTablesContent(tab)" :active="key==0">
        </b-tab>
      </b-tabs>
    </div>
    <b-row>
      <!-- parent table -->
      <b-col sm="12" md="6" lg="4">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Parent {{ titleParent }}</h4>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" @click="add">Add New</b-button>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table striped responsive :fields="columns" :items="rows">
                  <template v-slot:cell(title)="data">
                    <span v-if="!data.item.editable && !data.item.change">{{ data.item.title }}</span>
                    <input type="text" v-model="data.item.title" v-else class="form-control">
                  </template>
                  <template v-slot:cell(action)="data">
                    <b-button variant=" iq-bg-primary mr-1 mb-1" size="sm" @click="showChild(data.item.id, data.item.title)" v-if="!data.item.editable"><i class="las la-eye m-0"></i></b-button>
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="edit(data.item)" v-if="!data.item.change"><i class="ri-ball-pen-fill m-0"></i></b-button>
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editData(data.item)" v-if="data.item.change">save edit</b-button>
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submitAddParent(data.item)" v-if="data.item.editable">Save</b-button>
                  </template>
                </b-table>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
      <!-- child table -->
      <b-col sm="12" md="6" lg="4">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Child {{ titleChild }}</h4>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" @click="addChild">Add New</b-button>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table striped responsive :fields="columns" :items="childRows">
                  <template v-slot:cell(title)="data">
                    <span v-if="!data.item.editable && !data.item.change">{{ data.item.title }}</span>
                    <input type="text" v-model="data.item.title" v-else class="form-control">
                  </template>
                  <template v-slot:cell(action)="data">
                    <b-button variant=" iq-bg-primary mr-1 mb-1" size="sm" @click="showChildOfChild(data.item.id, data.item.title)" v-if="!data.item.editable"><i class="las la-eye m-0"></i></b-button>
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="edit(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submitAddChild(data.item)" v-else>Save</b-button>
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editData(data.item)" v-if="data.item.change">save edit</b-button>
                  </template>
                </b-table>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
      <!-- child Of Child table -->
      <b-col sm="12" md="6" lg="4">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Child {{ titleChildOfChild }}</h4>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" @click="addChildOfChild">Add New</b-button>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table striped responsive :fields="columns" :items="childRowsOfChild">
                  <template v-slot:cell(title)="data">
                    <span v-if="!data.item.editable && !data.item.change">{{ data.item.title }}</span>
                    <input type="text" v-model="data.item.title" v-else class="form-control">
                  </template>
                  <template v-slot:cell(action)="data">
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="edit(data.item)" v-if="!data.item.editable"><i class="ri-ball-pen-fill m-0"></i></b-button>
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="submitAddChildOfChild(data.item)" v-else>Save</b-button>
                    <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="editData(data.item)" v-if="data.item.change">save edit</b-button>
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
import { core } from '../../../config/pluginInit'

export default {
  mounted () {
    core.index()
  },

  data () {
    return {
      allTabs: '',
      columns: [
        { label: 'Title', key: 'title', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-center' }
      ],
      rows: [],
      childRows: [],
      childRowsOfChild: [],
      titleParent: '',
      titleChild: '',
      titleChildOfChild: '',
      parentId: ''
    }
  },
  methods: {
    changeTablesContent (type) {
      this.rows = []
      this.childRows = []
      this.childRowsOfChild = []
      this.titleChild = ''
      this.titleParent = type
      this.$store.dispatch('getAllParentsDependsOnType', type).then(res => {
        if (res.data.data.categories.length > 0) {
          res.data.data.categories.forEach(function (itm) {
            itm.editable = false
            itm.change = false
          })
          this.rows = res.data.data.categories
        } else {
          this.rows = []
        }
      })
    },
    showChild (data, titleChild) {
      this.parentId = data
      this.titleChild = titleChild
      this.titleChildOfChild = ''
      this.childRowsOfChild = []
      this.$store.dispatch('getAllchildDependsOnParent', data).then(response => {
        if (response.data.data.child.length > 0) {
          response.data.data.child.forEach(function (itm) {
            itm.editable = false
            itm.change = false
          })
          this.childRows = response.data.data.child
        } else {
          this.childRows = []
        }
      })
    },
    showChildOfChild  (data, titleChild) {
      this.parentId = data
      // console.log(data)
      this.titleChildOfChild = titleChild
      this.$store.dispatch('getAllchildDependsOnParent', data).then(response => {
        if (response.data.data.child.length > 0) {
          response.data.data.child.forEach(function (itm) {
            itm.editable = false
            itm.change = false
          })
          this.childRowsOfChild = response.data.data.child
        } else {
          this.childRowsOfChild = []
        }
      })
    },
    add () {
      const obj = this.default()
      this.rows.push(obj)
    },
    addChild () {
      const obj = this.default()
      this.childRows.push(obj)
    },
    addChildOfChild () {
      const obj = this.default()
      this.childRowsOfChild.push(obj)
    },
    default () {
      return {
        title: '',
        editable: true,
        change: false
      }
    },
    edit (item) {
      item.change = true
    },
    editData (item) {
      this.$store.dispatch('editCategories', item).then(res => {
        item.editable = false
        item.change = false
        core.showSnackbar('success', res.data.message)
      })
    },
    submitAddParent (item) {
      this.$store.dispatch('addCategories', { ...item, type: this.titleParent, is_active: 1 }).then(res => {
        item.editable = false
        this.changeTablesContent(this.titleParent)
        core.showSnackbar('success', res.data.message)
      }).catch(err => core.showSnackbar('error', err.response.data.message))
    },
    submitAddChild (item) {
      this.$store.dispatch('addCategories', { ...item, parent: this.parentId, is_active: 1 }).then(res => {
        item.editable = false
        this.$store.dispatch('getAllchildDependsOnParent', this.parentId).then(response => {
          if (response.data.data.child.length > 0) {
            response.data.data.child.forEach(function (itm) {
              itm.editable = false
              itm.change = false
            })
            this.childRows = response.data.data.child
          } else {
            this.childRows = []
          }
        })
        core.showSnackbar('success', res.data.message)
      }).catch(err => core.showSnackbar('error', err.response.data.message))
    },
    submitAddChildOfChild (item) {
      this.$store.dispatch('addCategories', { ...item, parent: this.parentId, is_active: 1 }).then(res => {
        item.editable = false
        core.showSnackbar('success', res.data.message)
      }).catch(err => core.showSnackbar('error', err.response.data.message))
    },
    remove (item) {
      const index = this.rows.indexOf(item)
      this.rows.splice(index, 1)
    }
  },
  created () {
    this.$store.dispatch('getAllCategories').then(res => {
      this.allTabs = res.data.data.type
      this.changeTablesContent(res.data.data.type[0])
    })
  }
}
</script>
