<template>
  <div>
    <b-table
      id="table-transition-example"
      class="vgt-table bordered"
      :items="listOfData"
      name="id"
      :fields="fields"
      responsive
      show-empty
      :tbody-transition-props="transProps"
      primary-key="id"
      :busy="loadingTable"
      @sort-changed="sortChanged"
      :no-sort-reset="true"
    >
      <!--      <template #cell(show_details)="row">
        <b-form-checkbox
          v-model="row.detailsShowing"
          plain
          class="vs-checkbox-con"
          @change="row.toggleDetails"
        >
          <span class="vs-checkbox">
            <span class="vs-checkbox&#45;&#45;check">
              <i class="vs-icon feather icon-check" />
            </span>
          </span>
          <span class="vs-label">{{ row.detailsShowing ? 'Hide' : 'Show' }}</span>
        </b-form-checkbox>
      </template>-->
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner
            type="grow"
            label="Loading..."
            variant="primary"
          />
        </div>
      </template>
      <template
        v-for="(field,key) in fields"
        v-slot:[`cell(${field.key})`]="data"
      >
        <div :key="key">
          <!-- handle Image -->
          <b-avatar
            v-if="field.type=='image'"
            :src="$_.get(data.item, field.key)"
          />

          <!-- handle status -->
          <strong v-else-if="field.type == 'status'">
            <mainstatus :status="$_.get(data.item, field.key)" />
          </strong>

          <!-- actions -->
          <div v-else-if="field.type == 'actions'">
            <cell-actions
              :cell-actions="field"
              :data-item="data.item"
            />
          </div>
          <!-- handle Text -->
          <p
            v-else
            class="text-nowrap m-0"
          >
            {{ $_.get(data.item, field.key) }}
          </p>
        </div>

      </template>
    </b-table>
    <b-pagination
      v-if="pagination.total !==0"
      v-model="pagination.current_page"
      :total-rows="pagination.total"
      :per-page="pagination.per_page"
      first-number
      last-number
      class="mb-3 mt-1 mt-sm-0"
      prev-class="prev-item"
      next-class="next-item"
      align="right"
      @input="getListData"
    >
    </b-pagination>
  </div>
</template>

<script>
import mainstatus from './status'
import mainService from '@/services/main'
import cellActions from './cellActions'

export default {
  components: {
    mainstatus,
    cellActions
  },
  props: {
    fields: {
      type: Array,
      required: true
    },
    items: {
      type: [Array, Object]
    },
    list_url: {
      type: String
    },
    additionalUrl: {
      type: String
    },
    params: {
      type: [Object, Array]
    },
    reloadData: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      transProps: {
        name: 'flip-list'
      },
      listOfData: [],
      pagination: {
        current_page: 1,
        per_page: 0,
        total: 0
      },
      loadingTable: false
    }
  },
  watch: {
    params (a) {
      this.getListData()
    },
    reloadData (val) {
      if (val) {
        this.listOfData = []
        this.getListData()
      }
    }
  },
  created () {
    this.getListData()
  },
  methods: {
    async getListData () {
      this.listOfData = []
      const filters = {}
      if (this.params) {
        this.params.map(data => {
          filters[data.name] = data.checked
        })
      }
      this.loadingTable = true
      let List = []
      if (!Array.isArray(this.items) && !this.items?.length > 0) {
        List = await
        mainService.listDataTabl(
          `${this.list_url}?page=${this.pagination.current_page}${
            this.additionalUrl ? this.additionalUrl : ''}`,
          filters
        )
        // List = await mainService.listDataTabl(`${this.list_url}`, filters)
        console.log('List', List)
        if (List.data?.data?.data) {
          this.listOfData = List.data?.data?.data
          this.pagination = {
            current_page: List.data?.data?.current_page,
            per_page: List.data?.data?.per_page,
            total: List.data?.data?.total
          }
        } else {
          this.listOfData = List.data?.data
        }
      } else {
        List = this.items
      }
      // this.listOfData = List
      /* this.pagination = {
        current_page: List.data.current_page,
        per_page: List.data.per_page,
        total: List.data.total
      } */
      this.loadingTable = false
    },
    sortChanged (data) {
      this.$emit('sortChanged', data)
    }
  }
}
</script>
<style>

</style>
