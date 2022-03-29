<template>
  <b-modal id="add_task" centered title="Add Task" no-close-on-backdrop>
    <b-form>
      {{this.$store.getters.getSelectedProject}}
      <b-form-group
        class="form-group"
        label="Task Title"
        label-for="task_tile"
      >
        <b-form-input name="task_title" v-model="newTask.task" id="task_tile" placeholder=""></b-form-input>
      </b-form-group>
      <b-form-group
        class="form-group"
        label="Assigned By"
        label-for="user_id"
      >
        <v-select v-model="newTask.users" name="user_id" id="user_id" label="name" :options="users" multiple :selectable="user => !newTask.users.includes(user.id)"
                  :reduce="user => user.id" />
      </b-form-group>
      <b-form-group
        class="form-group"
        label="Category"
        label-for="category_id"
      >
        <v-select v-model="newTask.category" name="user_id" id="category_id" :options="getAllTaskCategories"
                  label="title" :reduce="option => option.id"/>
      </b-form-group>
      <b-form-group
          class="form-group"
          label="Date"
          label-for="task_tile"
      >
        <b-form-input name="date" v-model="newTask.date" id="task_date" placeholder="" type="date"></b-form-input>
      </b-form-group>
      <b-form-group
        class="form-group"
        label="Priority"
        label-for="priority"
      >
        <b-form-radio inline v-model="newTask.priority" name="priority" :value="item" v-for="(item,index) in priorities" :key="index">{{ item }}</b-form-radio>
      </b-form-group>
    </b-form>
    <template v-slot:modal-footer>
      <b-button variant="none" class="iq-bg-primary"  @click="$bvModal.hide('add_task')">Cancel</b-button>
      <b-button variant="primary" @click="addNewTask()">Save</b-button>
    </template>
  </b-modal>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'
export default {
  name: 'TaskForm',
  props: ['users'],
  data () {
    return {
      priorities: ['high', 'normal'],
      newTask: this.default()
    }
  },
  computed: {
    ...mapGetters(['getAllTaskCategories'])
  },
  methods: {
    default () {
      return {
        task: '',
        users: [],
        category: '',
        priority: '',
        project: this.$store.getters.getSelectedProject.id,
        date: '',
        is_active: 1
      }
    },
    addNewTask () {
      this.$store.dispatch('addNewTask', this.newTask).then(res => {
        core.showSnackbar('success', res.data.message)
        this.default()
        this.$store.dispatch('getAllTasks', { pageNumber: 1, projectId: this.$store.getters.getSelectedProject.id, categoryId: this.$store.getters.getSelectedCategory.id })
        this.$bvModal.hide('add_task')
      })
    }
  }
}
</script>
