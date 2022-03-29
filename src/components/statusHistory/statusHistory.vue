<template>
    <div>
      <div v-if="loadTable" class="text-center">
        <b-spinner small type="grow"></b-spinner>
        Loading...
      </div>
      <b-table v-else striped responsive :fields="columns" :items="allHistory" class="mb-0 table-borderless">
        <template v-slot:cell(call_status)="data3">
          {{data3.item.call_status? data3.item.call_status.title:'ــــــــ'}}
        </template>
        <template v-slot:cell(user)="data3">
          {{data3.item.user.name}}
        </template>
        <template v-slot:cell(date)="data3">
          {{timeConvert(data3.item.date)}}
        </template>
        <template v-slot:cell(period)="data3">
          {{data3.item.period?data3.item.period.substr(0,10):'ــــــــ'}}
        </template>
        <template v-slot:cell(source)="data3">
          {{data3.item.source?data3.item.source.title:'ــــــــ'}}
        </template>
        <template v-slot:cell(inquiry)="data3">
          {{data3.item.inquiry?data3.item.inquiry.title:'ــــــــ'}}
        </template>
        <template v-slot:cell(project)="data3">
          {{data3.item.project?data3.item.project.en_title:'ــــــــ'}}
        </template>
        <template v-slot:cell(comment)="data3">
          {{data3.item.comment?data3.item.comment:'ــــــــ'}}
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
    </div>
</template>

<script>
export default {
  name: 'statusHistory',
  props: {
    allHistory: {
      type: Array
    },
    historyId: {
      type: Number
    }
  },
  data () {
    return {
      columns: [
        { label: 'Status', key: 'call_status', class: 'text-left' },
        { label: 'Comment', key: 'comment', class: 'text-left' },
        { label: 'User Name', key: 'user', class: 'text-left' },
        { label: 'Date', key: 'date', class: 'text-left' },
        { label: 'End_Period', key: 'period', class: 'text-left' },
        { label: 'Inquiry', key: 'inquiry', class: 'text-left' },
        { label: 'Project', key: 'project', class: 'text-left' },
        { label: 'Source', key: 'source', class: 'text-left' }
      ],
      currentPage: 1,
      per_page: 10,
      total: 6,
      loadTable: false
    }
  },
  methods: {
    changeContent () {
      this.loadTable = true
      this.$store.dispatch('gitHistory', { id: this.historyId, pageNumber: this.currentPage }).then((data) => {
        this.loadTable = false
      })
    }
  }
}
</script>

<style>
tr th div {
  width: max-content !important;
}
tr td {
  white-space: pre !important;
}
</style>
