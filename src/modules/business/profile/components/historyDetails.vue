<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
        <main-table :fields="columns" class="mb-0">
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        '#',
        { label: 'Date', key: 'date', class: 'text-left' },
        { label: 'Subscription', key: 'subscription', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left' },
        {
          label: 'Action',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-file-invoice',
              color: 'info',
              text: 'Edit'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style></style>
