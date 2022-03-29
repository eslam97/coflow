<template>
  <b-row>
    <b-modal id="showUserTargetDetails" title="User Target" size="lg" hide-footer no-close-on-backdrop>
      <showUserTargetDetails :targetInfo="allUserTargetDetails" :projectId="selectedProjectInfo || 0"/>
    </b-modal>
    <b-container fluid class="filter">
      <div class="iq-card p-1">
        <div class="row">
          <div class="col-md-3 my-1">
            <input type="text" placeholder="search by Sales name" class="form-control" v-model="filter.title" @input="filterTable" >
          </div>
          <div class="col-md-3 my-1">
            <select class="form-control" v-model="filter.status" @change="filterTable">
              <option selected disabled value="">select Branch...</option>
              <option value="active">active</option>
              <option value="0">disapled</option>
            </select>
          </div>
          <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.title || filter.status">
            <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
          </div>
        </div>
      </div>
    </b-container>
    <b-col lg="12">
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">Users Target</h4>
        </template>
        <template v-slot:headerAction>
          <b-button v-b-modal.agent-target variant="primary" class="mr-1">Create User Target</b-button>
          <b-button v-b-modal.clone_agent-target variant="primary">Clone User Target</b-button>
          <b-modal id="agent-target" title="Create Agent Target" size="lg" hide-footer no-close-on-backdrop>
            <agentTargetComponent />
          </b-modal>
          <b-modal id="clone_agent-target" title="Clone Agent Target" size="lg" hide-footer no-close-on-backdrop>
            <cloneAgentTargetComponent />
          </b-modal>
        </template>
        <template v-slot:body>
          <div v-if="loadTable" class="text-center">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
          <b-table v-else striped responsive :fields="columns" :items="allAgents" class="mb-0 table-borderless">
            <!--              <template v-slot:cell(status)="data">
                            <b-badge pill :variant="data.value.color">{{ data.value.name }}</b-badge>
                          </template>-->
            <template v-slot:cell(projects)="data">
              <ul class="m-0 p-0">
               <li v-for="(i, key) in getAllProjectForUser(data.item.targets)" class="cursor-pointer" :key="key" @click="openDetailsTargetForProject(data.item.user.id,i.id)" :style={color:i.color}>
                  {{i.en_title}}
                </li>
              </ul>
            </template>
<!--            <template v-slot:cell(actions)="data1">
              <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="gitDataToEdit(data1.item.id)" :class="'input_'+data1.item.id" ><i class="ri-ball-pen-fill m-0"></i></b-button>
            </template>-->
          </b-table>
          <b-pagination v-model="currentPage"
                        class="mt-3"
                        :total-rows="total"
                        align="right"
                        :per-page="per_page"
                        aria-controls="my-table"
                        @input="filterTable()"
          ></b-pagination>
        </template>
      </iq-card>
    </b-col>
  </b-row>
</template>
<script>
import { core } from '../../config/pluginInit'
import agentTargetComponent from '../../components/target/addAgent'
import cloneAgentTargetComponent from '../../components/target/cloneAgent'
import showUserTargetDetails from '../../components/target/showUserTargetDetails'
/*
const addsourcesModal = () => import('../../components/sources/sourcesModal')
*/
export default {
  name: 'managersTarget',
  data () {
    return {
      filter: {
        title: '',
        status: ''
      },
      currentPage: 1,
      per_page: 10,
      total: 6,
      loadTable: true,
      allAgents: [],
      columns: [
        { label: 'Name', key: 'user.name', class: 'text-left' },
        { label: 'Sales Type', key: 'sales_type', class: 'text-left' },
        { label: 'Projects', key: 'projects', class: 'text-left' }
      ],
      allUserTargetDetails: {},
      selectedProjectInfo: ''
    }
  },
  computed: {
  },
  methods: {
    getAllProjectForUser (allData) {
      var arr = []
      allData.map(obj => {
        if (!arr.find(f => f.id === obj.id)) {
          arr.push(obj)
        }
      })
      return arr
    },
    openDetailsTargetForProject (agentId, id) {
      this.selectedProjectInfo = id
      this.$store.dispatch('getDetailsOfTarget', { userId: agentId, projectId: id }).then(res => {
        this.allUserTargetDetails = res.data.data
        this.$bvModal.show('showUserTargetDetails')
      })
    },
    resetFilter () {
      this.filter = {
        title: '',
        status: ''
      }
      this.filterTable()
    },
    filterTable () {
      this.loadTable = true
      this.$store.dispatch('getAllAgentAndmanagesHaveTarget', { filterTitle: this.filter.title, type: 'agent', page: this.currentPage }).then(data => {
        this.allAgents = data.data.data
        this.currentPage = data.data.meta.currentPage
        this.per_page = data.data.meta.per_page
        this.total = data.data.meta.total
        this.loadTable = false
      })
    }
  },
  components: {
    agentTargetComponent,
    cloneAgentTargetComponent,
    showUserTargetDetails
  },
  mounted () {
    core.index()
  },
  created () {
    this.filterTable()
  }
}
</script>
<style scoped>
.colorSpan{
  width: 20px;
  height: 20px;
}
</style>
