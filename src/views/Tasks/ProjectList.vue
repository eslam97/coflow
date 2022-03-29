<template>
  <iq-card>
    <template v-slot:body>
      <div class="iq-todo-page">
        <b-form class="position-relative">
          <b-form-group class="mb-0" label-for="search">
            <b-form-input class="todo-search" placeholder="Search" v-model="search" />
            <b-link href="#" class="search-link"><i class="ri-search-line" /></b-link>
          </b-form-group>
        </b-form>
        <ul class="todo-task-list p-0 m-0">
          <li v-for="(item,index) in filteredList" :key="index" @click="selectProject(item)" :class="`${item.id === selectedProject ? 'active' : ''}`">
            <b-link href="#"><i class="ri-stack-fill mr-2"></i>{{ item.en_title }}</b-link>
            <ul :id="'todo-task'+index" class="sub-task mt-2 p-0" :class="`${item.id === selectedProject.id ? 'show' : ''}`">
              <li v-for="(category, index1) in categoryList" :key="index1" @click="selectCategory(category)" :class="`${category.id === selectedCategory.id ? 'active' : ''}`">
                <b-link :href="category.href"><i class="ri-checkbox-blank-circle-fill" :style="[{'color': category.color}]" /> {{ category.title }}</b-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </template>
  </iq-card>
</template>
<script>
export default {
  name: 'ProjectList',
  // props: ['projectList', 'categoryList'],
  props: [
    'selectedProject',
    'selectedCategory',
    'projectList',
    'categoryList'
  ],
  data () {
    return {
      search: '',
      project: {
        id: 0,
        project_name: ''
      }
    }
  },
  methods: {
    selectProject (project) {
      this.$store.commit('changeSelectedProject', project)
      this.search = ''
      this.$store.dispatch('getAllTasks', { pageNumber: 1, projectId: project.id, categoryId: this.$store.getters.getSelectedCategory.id })
    },
    selectCategory (category) {
      this.$store.commit('changeSelectedCategory', category)
      this.search = ''
      this.$store.dispatch('getAllTasks', { pageNumber: 1, projectId: this.$store.getters.getSelectedProject.id, categoryId: category.id })
    }
  },
  computed: {
    filteredList () {
      return this.projectList.filter(item => {
        return item.en_title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted () {
  }
}
</script>
