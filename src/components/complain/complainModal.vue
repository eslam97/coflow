<template>
  <b-modal id="add_Complain" centered title="Add Complaint" no-close-on-backdrop>
    <b-form>
      <b-form-group
        class="form-group"
        label="Phone Number"
        label-for="phone"
        v-if="!editFlag"
      >
          <ValidationProvider name="phone" ref="phone" rules="digits:11" v-slot="{ errors }">
            <b-form-input v-model="newComplain.phone" type="number" placeholder="" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </b-form-group>
      <b-form-group
        class="form-group"
        label="Name"
        label-for="name"
        v-if="!editFlag"
      >
        <b-form-input name="name" v-model="newComplain.name" id="name" placeholder="" type="text"></b-form-input>
      </b-form-group>
      <b-form-group
        class="form-group"
        label="Branch"
        label-for="category_id"
        v-if="!editFlag"
      >
        <v-select v-model="newComplain.project" name="project" id="project" :options="getUserProjects"
                  label="en_title" :reduce="option => option.id"/>
      </b-form-group>
      <b-form-group
          class="form-group"
          label="Complaints"
          label-for="task_tile"
      >
        <b-form-textarea name="date" v-model="newComplain.description" id="complain" placeholder=""></b-form-textarea>
      </b-form-group>
      <b-form-group
          class="form-group"
          label="Assigned to"
          label-for="assigned_to"
          v-if="!editFlag"
      >
        <v-select v-model="newComplain.users" multiple label="users" :filterable="false" :options="allUsers" @search="onSearch"
                  :reduce="option => option.id">
          <template slot="no-options">
            type to search about users...
          </template>
          <template slot="option" slot-scope="option">
            <div class="d-center">
              {{ option.name }}
            </div>
          </template>
          <template slot="selected-option" slot-scope="option">
            <div class="selected d-center">
              {{ option.name }}
            </div>
          </template>
        </v-select>
      </b-form-group>
      <b-form-group
        class="form-group"
        label="Priority"
        label-for="priority"
      >
        <b-form-radio inline v-model="newComplain.priority" name="priority" :value="item" v-for="(item,index) in priorities" :key="index">{{ item }}</b-form-radio>
      </b-form-group>
    </b-form>
    <template v-slot:modal-footer>
      <b-button v-if="!view" variant="none" class="iq-bg-primary"  @click="$bvModal.hide('add_Complain')">Cancel</b-button>
      <b-button v-if="!view" variant="primary" @click="addnewComplain()">Save</b-button>
    </template>
  </b-modal>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplaintForm',
  props: ['users', 'view', 'editFlag'],
  data () {
    return {
      priorities: ['normal', 'high', 'urgent'],
      newComplain: {},
      allUsers: []
    }
  },
  computed: {
    ...mapGetters(['getAllTaskCategories', 'getUserProjects', 'getSpacificComplain'])
  },
  watch: {
    'newComplain.phone' (value) {
      if (value.length > 10) {
        this.$store.dispatch('serachByPhone', value).then(res => {
          this.newComplain.name = res.data.data.name
        })
      }
    }
  },
  methods: {
    default () {
      return {
        phone: '',
        name: '',
        project: '',
        priority: 'normal',
        users: [],
        description: '',
        is_active: 1
      }
    },
    addnewComplain () {
      this.$store.dispatch('addnewComplain', this.newComplain).then(res => {
        core.showSnackbar('success', res.data.message)
        this.default()
        this.$store.dispatch('getAllComplains', { pageNumber: this.currentPage })
        this.$bvModal.hide('add_Complain')
      })
    },
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.$store.dispatch('getAllUser', { filterTitle: search }).then(res => {
          this.allUsers = res.data.data
          loading(false)
        }).catch(() => {
          loading(false)
        })
      }
    }
  },
  created () {
    if (this.editFlag) {
      this.newComplain = this.getSpacificComplain
    } else {
      this.newComplain = this.default()
    }
  }
}
</script>
<style>
.d-center {
  display: flex;
  align-items: center;
}

.selected img {
  width: auto;
  max-height: 23px;
  margin-right: 0.5rem;
}

.v-select .dropdown li {
  border-bottom: 1px solid rgba(112, 128, 144, 0.1);
}

.v-select .dropdown li:last-child {
  border-bottom: none;
}

.v-select .dropdown li a {
  padding: 10px 20px;
  width: 100%;
  font-size: 1.25em;
  color: #3c3c3c;
}

.v-select .dropdown-menu .active > a {
  color: #fff;
}
.vs__spinner{
  border-radius: 50% !important;
}
.vs--searchable div {
   min-height: auto !important;
  /* border-radius: 10px; */
}
</style>
