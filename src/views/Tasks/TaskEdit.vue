<template>
  <b-modal id="task_edit" centered title="Edit Task" no-close-on-backdrop>
    <b-form>
      <b-form-group
        class="form-group"
        label="Category"
        label-for="category_id"
      >
        <select v-model="newTask.category" name="user_id" id="category_i" class="form-control">
          <option v-for="(i, key) in getAllTaskCategories" :key="key" :value="i.id">
            {{i.title}}
          </option>
        </select>
      </b-form-group>
      <b-form-group
          class="form-group"
          label="Date"
          label-for="task_tile"
      >
        <b-form-input name="date" v-model="newTask.target_date" id="task_date" placeholder="" type="date"></b-form-input>
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
      <b-button variant="none" class="iq-bg-primary"  @click="$bvModal.hide('task_edit')">Cancel</b-button>
      <b-button variant="primary" @click="editTask()">Save</b-button>
    </template>
  </b-modal>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'
export default {
  name: 'TaskForm',
  props: ['users', 'taskData'],
  data () {
    return {
      priorities: ['high', 'normal']
      /*      newTask: {
        category: this.taskData.category_id,
        priority: this.taskData.priority,
        date: this.taskData.target_date,
        is_active: 1
      } */
    }
  },
  computed: {
    ...mapGetters(['getAllTaskCategories']),
    newTask () {
      return {
        category: this.taskData.category_id,
        priority: this.taskData.priority,
        target_date: this.taskData.target_date,
        is_active: 1
      }
    }
  },
  created () {
    /*    this.newTask = {
      category: this.taskData.category_id,
      priority: this.taskData.priority,
      date: this.taskData.target_date,
      is_active: 1
    } */
  },
  methods: {
    default () {
      return {
        newTask: {
          category: '',
          priority: '',
          target_date: '',
          is_active: 1
        }
      }
    },
    editTask () {
      this.$store.dispatch('editTaskData', { taskId: this.$store.getters.getSpacificTask.id, newTask: this.newTask }).then(response => {
        // console.log(response.data.message)
        core.showSnackbar('success', response.data.message)
        this.default()
        this.$store.dispatch('getAllTasks', { pageNumber: 1, projectId: this.$store.getters.getSelectedProject.id, categoryId: this.$store.getters.getSelectedCategory.id })
        this.$bvModal.hide('task_edit')
      })
    }
  }
}
</script>
