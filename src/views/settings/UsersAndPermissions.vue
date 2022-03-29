<template>
  <div>
    <b-alert v-if="this.$store.state.newPassword" :show="true" variant="primary">
      <div class="iq-alert-text">{{ this.$store.state.newPassword}}</div>
    </b-alert>
    <b-modal id="modalDeleteUser" size="md" title="Remove User" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">Are you sure you want to delete this User? </p>
      <div class="d-flex justify-content-end">
        <b-button variant="danger" @click="deleteUser">Delete User</b-button>
      </div>
    </b-modal>
    <b-modal id="resetPass" size="md" title="Reset User" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">Are you sure you want to reset password for this User? </p>
      <div class="d-flex justify-content-end">
        <b-button variant="danger" @click="resetPassword()">Reset Password</b-button>
      </div>
    </b-modal>
    <b-row>
      <b-container fluid class="filter">
        <div class="iq-card p-1">
          <div class="row">
            <div class="col-md-3 my-1">
              <input type="text" placeholder="search by user name" class="form-control" v-model="filter.title" @input="filterTable" >
            </div>
            <div class="col-md-3 my-1">
              <select class="form-control" v-model="filter.status" @change="filterTable">
                <option selected disabled value="">select Status...</option>
                <option value="active">active</option>
                <option value="0">disapled</option>
              </select>
            </div>
            <div class="col-md-3 my-1">
              <select class="form-control" v-model="filter.role" @change="filterTable">
                <option selected disabled value="">select Role...</option>
              </select>
            </div>
            <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.title || filter.status || filter.role">
              <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
            </div>
          </div>
        </div>
      </b-container>
      <b-col lg="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">All Users <span class="ml-2 font-weight-bold cursor-pointer" @click="reload"><i class="las la-sync text-primary"></i></span></h4>
          </template>
          <template v-slot:headerAction>
            <span v-if="hasPer('user.create')">
            <b-button v-if='loadingOpenAdd'  variant="primary" disabled>
              <b-spinner small type="grow"></b-spinner>
              openning...
            </b-button>
            <b-button v-else v-b-modal.userModel variant="primary" @click="loadData" >Add User</b-button>
            </span>
            <b-modal id="userModel" size="lg" :title="modelTitle" hide-footer no-close-on-backdrop>
              <add-new-user :edit="editFlag" />
            </b-modal>
          </template>
         <template v-slot:body>
           <div v-if="loadTable" class="text-center">
             <b-spinner small type="grow"></b-spinner>
             Loading...
           </div>
           <b-table sort-icon-left primary-key="name" v-else striped :per-page="per_page" responsive :fields="columns"  id="table-transition-example" :items="getAllUser" class="mb-0 table-borderless" :tbody-transition-props="transProps">
<!--             <template slot="top-row" slot-scope="{ fields }">
               <td v-for="field in fields" :key="field.key">
                 <input v-model="filters[field.key]" :placeholder="field.label">
               </td>
             </template>-->
             <template v-slot:cell(is_online)="data">
            <b-badge pill :variant="data.item.is_online?'success':'secondary'">{{ data.item.is_online?'online':'offline' }}</b-badge>
             </template>
             <template v-slot:cell(phone)="data1">
               <p class="holdSelection" v-if="data1.item.id==showPhone">{{data1.item.phone}}</p>
               <b-button v-else variant=" iq-bg-success mr-1 mb-1" size="sm" :id="data1.item.id" @click="showPhone = data1.item.id" ><i class="las la-mobile"></i>Show Phone</b-button>
             </template>
             <template v-slot:cell(is_active)="data3">
               <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                 <div class="custom-switch-inner">
                   <input type="checkbox" class="custom-control-input bg-primary" v-model="data3.item.is_active" :id="'customSwitch-11'+data3.item.id"  @change="switchStatus(data3.item.id)" >
                   <label class="custom-control-label" :for="'customSwitch-11'+data3.item.id" data-on-label="on" data-off-label="off">
                   </label>
                 </div>
               </div>
             </template>
             <template v-slot:cell(actions)="data1">
               <b-button variant=" iq-bg-success mr-1 mb-1" v-if="hasPer('user.update')" size="sm" @click="gitDataToEdit(data1.item.id)" :class="'input_'+data1.item.id"><i class="ri-ball-pen-fill m-0"></i></b-button>
               <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm"  v-if="hasPer('user.delete')" @click="setDeleteId(data1.item.id)"><i class="ri-delete-bin-line m-0"  ></i></b-button>
               <b-button variant=" iq-bg-primary" size="sm"  v-if="hasPer('user.delete')" @click="resetPasswordId = data1.item.id" v-b-modal.resetPass ><i class="las la-key m-0"></i></b-button>
             </template>
           </b-table>
           <div class="d-flex justify-content-end align-items-end">
           <b-pagination v-model="currentPage"
                         class="mt-3"
                         :total-rows="total"
                         align="right"
                         :per-page="per_page"
                         aria-controls="my-table"
                         @input="changeContent"
           ></b-pagination>
           </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'
import addNewUser from '../User/addNewUser'
import { mapGetters } from 'vuex'
export default {
  name: 'users-and-permissions',
  data () {
    return {
      /*   filters: {
        name: '',
        username: '',
        email: ''
      }, */
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      filter: {
        title: '',
        status: '',
        role: ''
      },
      resetPasswordId: '',
      userIds: [],
      showPhone: '',
      allSelected: false,
      currentPage: 1,
      per_page: 10,
      total: 6,
      loadingOpenAdd: false,
      loadTable: true,
      deleteId: '',
      editFlag: true,
      modelTitle: 'Add User'
    }
  },
  methods: {
    resetPassword () {
      this.$store.dispatch('resetPassword', { userId: this.resetPasswordId }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('resetPass')
      }).catch(err => {
        core.showSnackbar('error', err.response.data.error)
      })
    },
    switchStatus (id) {
      // console.log(id)
      this.$store.dispatch('changeUserStatus', id).then(() => {
        core.showSnackbar('success', 'status User has been Edit successfully.')
      })
    },
    reload () {
      this.loadTable = true
      this.$store.dispatch('getAllUser', { pageNumber: this.currentPage }).then(() => {
        this.loadTable = false
      })
    },
    resetFilter () {
      this.filter = {
        title: '',
        status: '',
        role: ''
      }
      this.filterTable()
    },
    filterTable () {
      this.loadTable = true
      this.$store.dispatch('getAllUser', { filterTitle: this.filter.title, filterStatus: this.filter.status, filterRole: this.filter.role }).then(data => {
        this.currentPage = data.data.meta.currentPage
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
        this.loadTable = false
      })
    },
    changeContent () {
      this.loadTable = true
      this.$store.dispatch('getAllUser', { pageNumber: this.currentPage, filterTitle: this.filter.title, filterStatus: this.filter.status }).then(() => {
        this.loadTable = false
      })
    },
    selectAll () {
      this.userIds = []
    },
    loadData () {
      this.loadingOpenAdd = true
      this.editFlag = false
      this.modelTitle = 'Add User'
      this.$store.dispatch('create').then(() => {
        this.loadingOpenAdd = false
        this.$bvModal.show('userModel')
      })
    },
    gitDataToEdit (id) {
      document.getElementsByClassName('input_' + id)[0].innerHTML = '<span class="spinner-grow spinner-grow-sm"></span>'
      this.$store.dispatch('create').then(() => {
        this.editFlag = true
        // eslint-disable-next-line no-unused-expressions,no-sequences
        this.modelTitle = 'Edit User'
        this.$store.dispatch('getSpacificUser', id).then(() => {
          this.$bvModal.show('userModel')
          document.getElementsByClassName('input_' + id)[0].innerHTML = ' <i class="ri-ball-pen-fill m-0"></i>'
        })
      })
    },
    setDeleteId (id) {
      this.deleteId = id
      this.$bvModal.show('modalDeleteUser')
    },
    deleteUser () {
      this.$store.dispatch('deleteUser', this.deleteId).then(() => {
        this.$bvModal.hide('modalDeleteUser')
        core.showSnackbar('success', 'User has been Deleted successfully.')
      })
    }
  },
  computed: {
    ...mapGetters(['getAllUser']),
    columns () {
      const fields = [
        { label: 'Name', key: 'name', class: 'text-left', sortable: true },
        { label: 'User Name', key: 'username', class: 'text-left', sortable: true },
        { label: 'Phone', key: 'phone', class: 'text-left', sortable: true },
        { label: 'Role', key: 'roles[0].display_name', class: 'text-left', sortable: true },
        { label: 'Email', key: 'email', class: 'text-left', sortable: true },
        { label: 'Status', key: 'is_online', class: 'text-left', sortable: true }
      ]
      if (this.hasPer('user.status')) {
        fields.push({ label: 'Is active', key: 'is_active', class: 'text-left', sortable: true })
      }
      if (this.hasPer('user.update') && this.hasPer('user.delete')) {
        fields.push({ label: 'Actions', key: 'actions', class: 'text-left' })
      }
      return fields
    }
    /*    filtered () {
      const filtered = this.getAllUser.filter(item => {
        return Object.keys(this.filters).every(key => String(item[key]).includes(this.filters[key]))
      })
      return filtered.length > 0 ? filtered : [{
        name: '',
        username: '',
        email: ''
      }]
    } */
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    addNewUser
  },
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    this.$store.dispatch('getAllUser', { pageNumber: this.currentPage }).then(data => {
      this.currentPage = data.data.meta.currentPage
      this.per_page = data.data.meta.per_page
      this.total = data.data.meta.total
      this.loadTable = false
    })
  }
}
</script>

<style>

</style>
