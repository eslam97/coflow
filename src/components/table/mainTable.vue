<template>
  <div>
    <b-table
      id="table-transition-example"
      class="vgt-table bordered"
      :head-variant="headVariant"
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
            :src="$_.get(data.item, field.key) ? $_.get(data.item, field.key) : require('@/assets/images/user/default-user-image.png')"
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

          <!-- Array handler -->
          <div v-else-if="field.type == 'array'">
            <span v-if="field.array_keys" >
              <ul class="p-0">
                <li v-for="(arr, key) in $_.get(data.item, field.key)" :key="key">
                    <span v-for="(ind, key1) in field.array_keys" :key="key1">{{ arr[ind] }} </span>
                </li>
              </ul>
            </span>
            <span v-else>
              <span v-for="(arr, key) in $_.get(data.item, field.key)" :key="key">
                {{ arr }}
                <span v-if="(key < $_.get(data.item, field.key).length-1)">,</span>
              </span>
            </span>
          </div>

          <!-- Multi-image handler -->
          <div class="min-width-image-cell" v-else-if="field.type == 'multi_image'">
            <div class="iq-media-group position-relative">
              <b-link href="#" class="iq-media" v-for="(image, counter) in $_.get(data.item, field.key).slice(0,3)" :key="counter">
                <b-img class="avatar-40" rounded="circle" fluid :src="image.image" :alt="image.name" />
                <div v-if="($_.get(data.item, field.key).length > 3) && counter === 2" class="more-images text-white">{{ $_.get(data.item, field.key).length-3 }}+</div>
              </b-link>
            </div>
          </div>

          <!-- Multi-text handler -->
          <div v-else-if="field.type == 'multi-text'">
            <span v-for="(arrKey, key) in field.key.split(',')" :key="key">
              <span v-if="$_.get(data.item, arrKey)">
                {{ $_.get(data.item, arrKey) }}
              </span>
            </span>
          </div>

          <!-- Multi-currency handler -->
          <div v-else-if="field.type == 'multi-currency'">
            <ul class="p-0">
              <li v-for="(arrKey, key) in field.key.split(',')" :key="key">
<!--                <span v-if="$_.get(data.item, arrKey) > 0">-->
                  <span v-if="arrKey.includes('egp')">
                    <span v-if="$_.get(data.item, arrKey)">EGP {{ $_.get(data.item, arrKey) }}</span>
                    <span v-else>N/A</span>
                  </span>
                  <span v-else-if="arrKey.includes('euro')">
                    <span v-if="$_.get(data.item, 'price_euro')">
                      <span v-if="arrKey.includes('discount')&& !$_.get(data.item, arrKey)">
                        N/A
                      </span>
                      <span v-else>€ {{ $_.get(data.item, arrKey) }}</span>
                    </span>
                  </span>
                <span v-else-if="arrKey.includes('dollar')">
                    <span v-if="$_.get(data.item, 'price_dollar')">
                      <span v-if="arrKey.includes('discount')&& !$_.get(data.item, arrKey)">
                        N/A
                      </span>
                      <span v-else>$ {{ $_.get(data.item, arrKey) }}</span>
                    </span>
                  </span>
<!--                </span>-->
              </li>
            </ul>
          </div>

          <!--    Calculate age      -->
          <div v-else-if="field.type == 'birthDate'">
            {{ calculateAge($_.get(data.item, field.key)) }}
          </div>

          <!-- handle Text -->
          <p
            v-else
            class="text-nowrap m-0"
          >
            <span v-if="$_.get(data.item, field.key)">
              {{ $_.get(data.item, field.key).length > 30 ? $_.get(data.item, field.key).substring(0,30) + '...' : $_.get(data.item, field.key) }}
            </span>
            <span v-else>
              ---
            </span>
          </p>
        </div>

      </template>
      <template v-slot:cell(change_status)="data">
        <changeStatus
            :allData = data
            :id="data.item.id"
            :type="data.field.tableType"
            :status="data.item.status"
            :statusKeyId="data.field.idKey"
            @changeStatus="changeStatus"
        />
      </template>
    </b-table>
    <b-pagination
      v-if="paginationFlag"
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
import Bus from '@/eventBus'
import mainstatus from './status'
import mainService from '@/services/main'
import cellActions from './cellActions'
import changeStatus from './changeStatus'
import { core } from '@/config/pluginInit'
export default {
  components: {
    mainstatus,
    cellActions,
    changeStatus
  },
  props: {
    fields: {
      type: Array,
      required: true
    },
    items: {
      type: [Array, Object],
      required: false
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
    },
    paginationFlag: {
      type: Boolean,
      default: true
    },
    headVariant: {
      type: String,
      default: ''
    },
    arrangeMode: {
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
        per_page: 10,
        total: 10
      },
      loadingTable: false,
      moreImages: 2
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
      const page = this.paginationFlag ? `?page=${this.pagination.current_page}` : ''
      if (!Array.isArray(this.items) && !this.items?.length > 0) {
        List = await
        mainService.listDataTabl(
          `${this.list_url}${page}${
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
      this.loadingTable = false
      this.reloadData = false
      this.dimInactive()
    },
    dimInactive () {
      this.listOfData.forEach(row => {
        row._rowVariant = row.status === 'inactive' ? 'secondary' : ''
      })
    },
    sortChanged (data) {
      this.$emit('sortChanged', data)
    },
    changeStatus (data) {
      mainService.changeStatus(data.payload).then(res => {
        core.showSnackbar('success', res.data.message)
        const IndexRow = this.listOfData.findIndex(row => row.id === data.data.item.id)
        if (this.listOfData[IndexRow].status === 'active') {
          this.listOfData[IndexRow].status = 'inactive'
          this.listOfData[IndexRow]._rowVariant = 'secondary'
        } else if (this.listOfData[IndexRow].status === 'inactive') {
          this.listOfData[IndexRow].status = 'active'
          this.listOfData[IndexRow]._rowVariant = ''
        }
      })
    },
    calculateAge (date) {
      const today = new Date()
      const birthDate = new Date(date)
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      console.log(age)
      return age
    }
  },
  /* computed: {
    listOfData () {
      return this.items.map((item) => {
        this.item._rowVariant = item.status === 'active' ? 'secondary' : ''
      })
    }
  }, */
  mounted () {
    Bus.$on('reloadTableAfterDelete', ifReload => { this.reloadData = true })
  }
}
</script>
<style>
table#table-transition-example .flip-list-move {
  transition: transform 0.5s;
}
.table-container {
}
</style>
