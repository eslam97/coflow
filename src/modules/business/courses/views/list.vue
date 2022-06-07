<template>
  <b-container fluid>
    <main-modal id="coursesDetailsModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Course</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Course</h4>
      </template>
      <template v-slot:body>
        <courses-details @addCourses="addCourses"
                                @editCourses="editCourses"
                                :requestLoading="requestLoading"
                                :coursesDetails="coursesDetails"
                                :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
    <!--  View Modal  -->
    <main-modal id="coursesDetailsViewModal" size="lg" border="true">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-success-light">View: </span> Course</h4>
      </template>
      <template v-slot:borderHeader class="flex-nowrap">
        <p class="p-4 borderHeaderModal m-0">
          {{coursesDetails.name}}
          <button class="ml-4 p-2 btn radio-btn" :class="`radio-btn-cyan`" active>
            {{ coursesDetails.duration }} {{ coursesDetails.duration_list.name }}
          </button>
          <button v-if="optionInd > -1"
                  class="ml-4 p-2 btn radio-btn" active
                  :class="`radio-btn-${options[optionInd].color} radio-btn-selected-${options[optionInd].color}`">
            {{ options[optionInd].text }}
          </button>
        </p>
      </template>
      <template v-slot:body>
        <courses-view :coursesDetails="coursesDetails"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Courses</h3>
        <div>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
            Add courses<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'courses'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import coursesDetails from '@/modules/business/courses/components/coursesDetails'
import coursesView from '@/modules/business/courses/components/coursesView'
import coursesServices from '@/modules/business/courses/services/courses.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Courses Name', key: 'name', class: 'text-left' },
        { label: 'Level', key: 'level', class: 'text-left' },
        { label: 'Price EGP/EUR', key: 'price_egp,price_euro', class: 'text-left', type: 'multi-value', pre: 'EGP,EUR' },
        { label: 'Discounted Price', key: 'discount_price_egp,discount_price_euro', class: 'text-left', type: 'multi-value' },
        { label: 'Description', key: 'description', class: 'text-left' },
        { label: 'Duration', key: 'duration,duration_list.name', class: 'text-left', type: 'multi-text' },
        { label: 'Requirements', key: 'requirements', class: 'text-left' },
        { label: 'Conditions', key: 'conditions', class: 'text-left' },
        { label: 'Location', key: 'location', class: 'text-left', type: 'array' },
        { label: 'Photos', key: 'images', class: 'text-left', type: 'multi_image' },
        {
          label: 'Change Status',
          key: 'change_status',
          type: 'switch',
          tableType: 'course',
          idKey: 'course_id',
          class: 'text-left'
        },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-eye',
              color: 'success-light',
              text: 'View',
              actionName: 'showCourses',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showCoursesToEdit',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Courses',
              textContent: 'name',
              url: 'courses'
            }
          ]
        }
      ],
      options: [
        { text: 'ALL LEVELS', value: 'all', color: 'blue' },
        { text: 'BEGINNER', value: 'beginner', color: 'cyan' },
        { text: 'INTERMEDIATE', value: 'intermediate', color: 'orange' },
        { text: 'ADVANCED', value: 'advanced', color: 'red' }
      ],
      optionInd: '',
      typeOfModal: 'add',
      coursesDetails: {},
      coursesId: ''
    }
  },
  components: {
    coursesDetails,
    coursesView
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.coursesId = ''
      this.typeOfModal = 'add'
      this.coursesDetails = false
      this.$bvModal.show('coursesDetailsModal')
    },
    addCourses (courses) {
      this.requestLoading = true
      this.reloadTable = false
      coursesServices.addNewCourses(courses).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('coursesDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editCourses (courses) {
      this.requestLoading = true
      this.reloadTable = false
      coursesServices.editCourses(this.coursesId, courses).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('coursesDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.coursesId = ''
      this.typeOfModal = 'view'
      this.optionInd = this.options.findIndex(ele => ele.value === obj.level)
      this.coursesDetails = obj
      this.$bvModal.show('coursesDetailsViewModal')
    },
    showCoursesToEdit (obj) {
      this.typeOfModal = 'edit'
      this.coursesId = obj.id
      this.coursesDetails = obj
      this.$bvModal.show('coursesDetailsModal')
    }
  },
  created () {
    this.$root.$on('showCourses', this.showDetails)
    this.$root.$on('showCoursesToEdit', this.showCoursesToEdit)
  },
  beforeDestroy () {
    this.$root.$off('showCourses')
    this.$root.$off('showCoursesToEdit')
  },
  mounted () {
    core.index()
  }
}
</script>
