<template>
  <div>
    <b-modal id="modal-delete" size="md" title="Remove" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">Are you sure you want to restore this data? </p>
      <div class="d-flex justify-content-end">
        <b-button variant="success" @click="restoreData">Restore</b-button>
      </div>
    </b-modal>
    <div class="iq-card p-1">

      <b-tabs content-class="mt-1" align="left" v-if="allTabs">
        <b-tab v-for="(tab, key) in allTabs" :key="key" :title="tab.charAt(0).toUpperCase()+ tab.slice(1)" :active="key==0"  @click="changeContentPage(tab)">
        </b-tab>
      </b-tabs>
    </div>
    <b-row>
      <b-col lg="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">{{tableTitle.charAt(0).toUpperCase() + tableTitle.slice(1)}}</h4>
          </template>
          <template v-slot:body>
            <div v-if="loadTable" class="text-center">
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </div>
            <b-table v-else striped :items="tableData" class="mb-0 table-borderless">
              <template v-slot:cell(restore)="data1">
                <b-button v-if="hasPer('restore.back')" variant=" iq-bg-success" size="sm" @click="setRestoreId(data1.item.id)"><i class="fas fa-trash-restore m-0"></i></b-button>
              </template>
            </b-table>
            <b-pagination v-model="currentPage"
                          class="mt-3"
                          :total-rows="total"
                          align="right"
                          :per-page="per_page"
                          aria-controls="my-table"
                          @input="changeContent"
            ></b-pagination>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { core } from '../../../config/pluginInit'
export default {
  name: 'settingrestore',
  data () {
    return {
      allTabs: [],
      tableData: '',
      tableTitle: '',
      loadTable: false,
      selectedID: '',
      currentPage: 1,
      total: ''
    }
  },
  methods: {
    setRestoreId (id) {
      this.selectedID = id
      this.$bvModal.show('modal-delete')
    },
    fillTableRestore (name) {
      this.$store.dispatch('getDataToRestore', { model: name, pageNumber: this.currentPage }).then(response => {
        this.tableData = response.data.data.data.map(v => ({ ...v, restore: '' }))
        this.loadTable = false
        this.total = response.data.total
        this.currentPage = response.data.current_page
      })
    },
    changeContentPage (title) {
      if (this.tableTitle !== title) {
        this.loadTable = true
        this.tableTitle = title
        this.fillTableRestore(title)
      }
    },
    restoreData () {
      this.$store.dispatch('restoreRow', { model: this.tableTitle, rowId: this.selectedID }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.fillTableRestore(this.tableTitle)
      })
    },
    changeContent () {
      this.fillTableRestore(this.tableTitle)
    }
  },
  computed: {
  },
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    this.$store.dispatch('getAllHeaderRestore').then(res => {
      this.allTabs = res.data.data
      this.tableTitle = res.data.data[0]
      this.fillTableRestore(res.data.data[0])
    })
  }
}
</script>
<style scoped>
table{
  min-width: 100%;
  display: block;
  overflow-x: auto;
}
</style>
