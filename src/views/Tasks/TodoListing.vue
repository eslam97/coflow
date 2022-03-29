<template>
  <b-container fluid>
    <b-row>
      <b-col lg="3">
        <ProjectList
          :project-list="listOfProject"
          :category-list="categoryList"
          :selected-category="selectedCategory"
          :selected-project="selectedProject"/>
      </b-col>
      <b-col lg="9">
        <TaskList :task-list="taskList" :project="selectedProject" :category="selectedCategory"/>
      </b-col>
      <b-pagination v-model="currentPage"
                    class="mt-3"
                    :total-rows="total"
                    align="right"
                    :per-page="per_page"
                    aria-controls="my-table"
                    @input="changeContent"
      ></b-pagination>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import ProjectList from './ProjectList'
import TaskList from './TaskList'
import { mapGetters } from 'vuex'
import Todo from '../../store/Todo'
export default {
  name: 'TodoListing',
  components: { ProjectList, TaskList },
  beforeMount () {
    this.$store.registerModule('Todo', Todo)
  },
  beforeDestroy () {
    this.$store.unregisterModule('Todo')
  },
  data () {
    return {
      categoryList: [],
      currentPage: 1,
      per_page: 10,
      total: 6
    }
  },
  mounted () {
    core.index()
  },
  computed: {
    ...mapGetters({
      taskList: 'getAllTasks',
      listOfProject: 'getUserProjects',
      selectedCategory: 'getSelectedCategory',
      selectedProject: 'getSelectedProject'
    })
  },
  methods: {
    changeContent () {
      this.$store.dispatch('getAllTasks', {
        pageNumber: this.currentPage,
        projectId: this.listOfProject[0].id,
        categoryId: this.selectedCategory.id
      }).then(data => {
        this.currentPage = data.data.meta.currentPage
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
      })
    }
  },
  created () {
    this.$store.commit('changeSelectedProject', this.listOfProject[0])
    this.$store.dispatch('getAllTaskCategories', { pageNumber: 1 }).then(res => {
      // al categories hna lazm mn 8er pagination
      this.categoryList = res.data.data
      this.$store.commit('changeSelectedCategory', res.data.data[0])
      if (this.$route.query.key) {
        this.$store.dispatch('getAllTasks', { objectid: this.$route.query.key })
      } else {
        this.$store.dispatch('getAllTasks', {
          pageNumber: 1,
          projectId: this.listOfProject[0].id,
          categoryId: res.data.data[0].id
        }).then(data => {
          this.currentPage = data.data.meta.currentPage
          this.per_page = data.data.meta.per_page
          this.total = data.data.meta.total
        })
      }
    })
  }
}
</script>
<style>
</style>
