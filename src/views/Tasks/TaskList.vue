<template>
  <b-row>
    <b-modal id="show_users_task" centered title="Users" hide-footer no-close-on-backdrop>
      <b-list-group>
        <b-list-group-item v-for="(i, key) in userInTask" :key="key">{{ i.name }}</b-list-group-item>
      </b-list-group>
    </b-modal>
    <TaskEdit :taskData="taskData"/>
    <b-col sm="12">
      <iq-card>
        <template v-slot:body>
          <div class="d-flex justify-content-between align-items-center">
            <div class="todo-date d-flex mr-3">
              <i :class="`ri-calendar-2-line mr-2`" :style="[{'color':category.color}]"></i>
              <span>{{ project.en_title }}</span>
            </div>
            <div class="todo-notification d-flex align-items-center">
              <b-button variant=" iq-bg-primary iq-waves-effect" v-b-modal.add_task size="lg" @click="getCreateTask()">Add Task</b-button>
              <TaskForm :users="users" />
            </div>
          </div>
        </template>
      </iq-card>
      <iq-card>
        <b-form class="d-flex justify-content-between align-items-center">
          <b-form-group class="mb-0 w-50" label-for="search">
            <b-form-input class="todo-search bg-white" placeholder="Search" v-model="search" />
          </b-form-group>
          <b-form-group
              class="form-group mb-0 w-50"
          >
            <v-select v-model="priority" name="priorities" id="priorities" :options="priorities"/>
          </b-form-group>
          <b-form-group
              class="form-group mb-0 w-50"
          >
            <select class="form-control" v-model="authTask" name="priorities" id="auth">
              <option value="1">By Me</option>
              <option value="2">To Me</option>
              <option value="3">All</option>
            </select>
          </b-form-group>
        </b-form>
      </iq-card>
    </b-col>
    <b-col md="12">
      <iq-card body-class="p-0" v-if="taskList.length > 0">
        <template v-slot:body>
          <ul class="todo-task-lists m-0 p-0">
              <template v-for="(item,index) in taskList">
                <li class="d-flex align-items-center p-3" v-if="(category.isHidden || item.category_id === category.id) && item.project_id === project.id" :key="index">
                  <div class="user-img img-fluid">
                    <img :src="checkUser(item.user_id,'image')" alt="story-img" class="rounded-circle avatar-40">
                  </div>
                  <div class="media-support-info ml-3">
                    <h6 class="d-inline-block">
                      <!--
                        <del v-if="item.task_status">
                          {{ item.task_title }} for {{ project.project_name }}
                        </del>
                        -->
                      <template>
                        {{ item.task }}
                      </template>
                    </h6>
                    <span class="badge badge-danger ml-3 text-white" v-if="item.priority === 'high'">{{ item.priority }}</span>
                    <span class="badge badge-primary ml-3 text-white" v-if="item.priority === 'normal'">{{ item.priority }}</span>
                    <span class="badge badge-info ml-3 text-white" v-if="item.status === 'Urgent'">{{ item.status }}</span>
                    <p class="mb-0">from {{ item.user.name }} to <span class="text-primary cursor-pointer" style="text-decoration: underline" @click="showUsersInTask(item.users)">users</span></p>
                  </div>
                  <div class="iq-card-header-toolbar d-flex align-items-center">
                    <div class="custom-control custom-checkbox">
                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="getTask(item.id)" v-if="item.edit"><i class="ri-ball-pen-fill m-0"></i></b-button>
                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="approveTask(item.id)" v-if="item.done"><i class="las la-check"></i></b-button>
                    </div>
                  </div>
                </li>
              </template>
          </ul>
        </template>
      </iq-card>
      <template v-else>
        <div class="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="138"
            height="138"
            class="hits-empty-state-image"
          >
            <defs>
              <linearGradient id="c" x1="50%" x2="50%" y1="100%" y2="0%">
                <stop offset="0%" stop-color="#F5F5FA" />
                <stop offset="100%" stop-color="#FFF" />
              </linearGradient>
              <path
                id="b"
                d="M68.71 114.25a45.54 45.54 0 1 1 0-91.08 45.54 45.54 0 0 1 0 91.08z"
              />
              <filter
                id="a"
                width="140.6%"
                height="140.6%"
                x="-20.3%"
                y="-15.9%"
                filterUnits="objectBoundingBox"
              >
                <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur
                  in="shadowOffsetOuter1"
                  result="shadowBlurOuter1"
                  stdDeviation="5.5"
                />
                <feColorMatrix
                  in="shadowBlurOuter1"
                  result="shadowMatrixOuter1"
                  values="0 0 0 0 0.145098039 0 0 0 0 0.17254902 0 0 0 0 0.380392157 0 0 0 0.15 0"
                />
                <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter2" />
                <feGaussianBlur
                  in="shadowOffsetOuter2"
                  result="shadowBlurOuter2"
                  stdDeviation="1.5"
                />
                <feColorMatrix
                  in="shadowBlurOuter2"
                  result="shadowMatrixOuter2"
                  values="0 0 0 0 0.364705882 0 0 0 0 0.392156863 0 0 0 0 0.580392157 0 0 0 0.2 0"
                />
                <feMerge>
                  <feMergeNode in="shadowMatrixOuter1" />
                  <feMergeNode in="shadowMatrixOuter2" />
                </feMerge>
              </filter>
            </defs>
            <g fill="none" fill-rule="evenodd">
              <circle
                cx="68.85"
                cy="68.85"
                r="68.85"
                fill="#5468FF"
                opacity=".07"
              />
              <circle
                cx="68.85"
                cy="68.85"
                r="52.95"
                fill="#5468FF"
                opacity=".08"
              />
              <use fill="#000" filter="url(#a)" xlink:href="#b" />
              <use fill="url(#c)" xlink:href="#b" />
              <path
                d="M76.01 75.44c5-5 5.03-13.06.07-18.01a12.73 12.73 0 0 0-18 .07c-5 4.99-5.03 13.05-.07 18a12.73 12.73 0 0 0 18-.06zm2.5 2.5a16.28 16.28 0 0 1-23.02.09A16.29 16.29 0 0 1 55.57 55a16.28 16.28 0 0 1 23.03-.1 16.28 16.28 0 0 1-.08 23.04zm1.08-1.08l-2.15 2.16 8.6 8.6 2.16-2.15-8.6-8.6z"
                fill="#5369FF"
              />
            </g>
          </svg>
          <p class="mt-2">Sorry, we can't find any matches to your query!</p>
          <p>Please try another query.</p>
        </div>
      </template>
    </b-col>
  </b-row>
</template>
<script>
import { Users } from '../../FackApi/api/chat'
import TaskForm from './TaskForm'
import { mapGetters } from 'vuex'
import TaskEdit from './TaskEdit'
import { core } from '../../config/pluginInit'
export default {
  name: 'TaskList',
  components: { TaskForm, TaskEdit },
  props: [
    'taskList',
    'project',
    'category'
  ],
  mounted () {
  },
  computed: {
    ...mapGetters({
      categoryList: 'Todo/categoryState'
    })
    /*    filteredList () {
      return this.taskList.filter(item => {
        return item.task_title.toLowerCase().includes(this.search.toLowerCase())
      })
    } */
  },
  watch: {
    search (newValue) {
      // console.log(newValue)
      this.$store.dispatch('getAllTasks', {
        pageNumber: 1,
        projectId: this.$store.getters.getSelectedProject.id,
        categoryId: this.$store.getters.getSelectedCategory.id,
        task: newValue,
        priority: this.priority
      })
    },
    priority (newValue) {
      this.$store.dispatch('getAllTasks', {
        pageNumber: 1,
        projectId: this.$store.getters.getSelectedProject.id,
        categoryId: this.$store.getters.getSelectedCategory.id,
        task: this.task,
        priority: newValue
      })
    },
    authTask (newValue) {
      // eslint-disable-next-line eqeqeq
      if (newValue == 1) {
        this.$store.dispatch('getAllTasks', {
          pageNumber: 1,
          projectId: this.$store.getters.getSelectedProject.id,
          categoryId: this.$store.getters.getSelectedCategory.id,
          task: this.task,
          priority: this.priority,
          byUser: JSON.parse(localStorage.getItem('user_info')).id
        })
        // eslint-disable-next-line eqeqeq
      } else if (newValue == 2) {
        this.$store.dispatch('getAllTasks', {
          pageNumber: 1,
          projectId: this.$store.getters.getSelectedProject.id,
          categoryId: this.$store.getters.getSelectedCategory.id,
          task: this.task,
          priority: this.priority,
          toUser: JSON.parse(localStorage.getItem('user_info')).id
        })
      } else {
        this.$store.dispatch('getAllTasks', {
          pageNumber: 1,
          projectId: this.$store.getters.getSelectedProject.id,
          categoryId: this.$store.getters.getSelectedCategory.id,
          task: this.task,
          priority: this.priority
        })
      }
    }
  },
  data () {
    return {
      priority: '',
      search: '',
      users: [],
      userInTask: [],
      taskData: {},
      priorities: ['high', 'normal'],
      authTask: ''
    }
  },
  methods: {
    checkUser (item, type) {
      const user = Users.find(user => user.id === item)
      let final
      if (user !== undefined) {
        switch (type) {
          case 'name':
            final = user.name
            break
          case 'image':
            final = user.image
            break
          case 'role':
            final = user.role
            break
        }
        return final
      }
      return false
    },
    updateStatue (item) {
      this.$store.dispatch('Todo/updateStatusAction', item)
    },
    getCreateTask () {
      this.$store.dispatch('getCreateTask', this.$store.getters.getSelectedProject.id).then(res => {
        // console.log('res.data.data.users', res.data.data.users)
        this.users = res.data.data.users
      })
    },
    showUsersInTask (user) {
      // console.log(user)
      this.userInTask = user
      this.$bvModal.show('show_users_task')
    },
    getTask (id) {
      this.$store.dispatch('getSpacificTask', id).then(res => {
        this.taskData = res.data.data
        this.$bvModal.show('task_edit')
      })
    },
    approveTask (id) {
      this.$store.dispatch('chageTaskStatus', id).then(response => {
        core.showSnackbar('success', response.data.message)
      }).catch(err => {
        core.showSnackbar('error', err.response.data.error)
      })
    }
  }
}
</script>
