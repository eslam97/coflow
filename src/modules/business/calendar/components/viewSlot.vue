<template>
    <div>

      <!-- Reservation -->
      <div>
        <h5 class="calender-label">Reservations</h5>
        <ul class="m-0 p-0">

          <userRow v-for="(user, key) in details.reserved" :key="key" :user="user" :numberOfRow="key+1" @viewUser="viewUser" @removeUser="removeUserServer"/>

          <userRow v-for="(user, key) in allReservationUserFront" :key="key" :user="user" :numberOfRow="details.reserved.length + key + 1"  @viewUser="viewUser" @removeUser="removeUserFront" />

          <!-- add User To List -->
          <li class="all-user-list d-flex p-0 !border-t-0" v-if="details.reserved.length + allReservationUserFront.length < details.capacity">
            <span class="number-row">{{ details.reserved.length + allReservationUserFront.length + 1}}</span>
            <div v-if="!showCutomerList" class="d-flex flex-grow-1 flex align-items-center gap-1 p-2" style="height: 56px;" @click="showCutomerList = true">
              <span class="calender-addCustomer">Add Customer</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.16663V15.8333" stroke="#FE9E12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.16675 10H15.8334" stroke="#FE9E12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div v-else class="d-flex flex-grow-1 flex align-items-center p-1">
              <main-select
              class="w-100 mb-0"
              :name="`user`"
              placeholder="Select User"
              label="name"
              :options="showCutomerListWithoutRepeat"
              @change="selectUse"
              >
              <template #data="{data}">
                <span class="d-flex gap-2 m-0 p-0 justify-content-between">
                  <div class="d-flex flex-grow-1 flex align-items-center gap-1 p-2">
                    <img :src="data.image" class="img-user" />
                    <span class="calender-username">{{ data.name }}</span>
                  </div>
                </span>
              </template>
            </main-select>
            </div>
          </li>

        </ul>
      </div>
      <!-- end Reservation-->

      <!-- Waiting -->
      <div class="mt-4" v-if="details.reserved.length + allReservationUserFront.length == details.capacity">
        <h5 class="calender-label">Waiting</h5>
        <ul class="m-0 p-0">

          <userRow v-for="(user, key) in details.waiting" :key="key" :user="user" :numberOfRow="key+1" @viewUser="viewUser" @removeUser="removeUserServer" />

          <userRow v-for="(user, key) in allWaitingUserFront" :key="key" :user="user" :numberOfRow="details.reserved.length + key + 1" @removeUser="removeUserWaitingFront" @viewUser="viewUser"/>

          <!-- add User To List -->
          <li class="all-user-list d-flex p-0 !border-t-0" v-if="details.waiting.length + allWaitingUserFront.length < details.capacity">
            <span class="number-row">{{ details.waiting.length + allWaitingUserFront.length + 1}}</span>
            <div v-if="!showCutomerListInWaiting" class="d-flex flex-grow-1 flex align-items-center gap-1 p-2" style="height: 56px;" @click="showCutomerListInWaiting = true">
              <span class="calender-addCustomer">Add Customer</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.16663V15.8333" stroke="#FE9E12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.16675 10H15.8334" stroke="#FE9E12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div v-else class="d-flex flex-grow-1 flex align-items-center p-1">
              <main-select
              class="w-100 mb-0"
              :name="`user`"
              placeholder="Select User"
              label="name"
              :options="showCutomerListWithoutRepeatInWaiting"
              @change="selectUseWaiting"
              >
              <template #data="{data}">
                <span class="d-flex gap-2 m-0 p-0 justify-content-between">
                  <div class="d-flex flex-grow-1 flex align-items-center gap-1 p-2">
                    <img :src="data.image" class="img-user" />
                    <span class="calender-username">{{ data.name }}</span>
                  </div>
                </span>
              </template>
            </main-select>
            </div>
          </li>

        </ul>
      </div>
      <!-- end waiting-->
      <div class="d-flex justify-content-center mt-3" >
        <b-button class="gradient-orange-button" v-if="!requestLoading" @click="sendDataToServer">
          Save
         </b-button>

         <b-button class="gradient-orange-button" v-else>
          <spinner-loading></spinner-loading>
         </b-button>
      </div>
    </div>
</template>

<script>
import customerServices from '@/modules/superAdmin/customers/services/customers.services'
import userRow from './userRow.vue'
export default {
  name: 'ViewSlot',
  components: {
    userRow
  },
  props: {
    details: {
      type: Object,
      required: true
    },
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      allCustomers: [],
      allReservationUserFront: [],
      showCutomerList: false,

      removedItemServer: [],

      allWaitingUserFront: [],
      showCutomerListInWaiting: false

    }
  },
  computed: {
    showCutomerListWithoutRepeat () {
      const reservedIds = new Set(this.allReservationUserFront.map(user => user.id))
      return this.allCustomers.filter(customer => !reservedIds.has(customer.id))
    },
    showCutomerListWithoutRepeatInWaiting () {
      const excludedIds = new Set([
        ...this.allReservationUserFront.map(user => user.id),
        ...this.allWaitingUserFront.map(user => user.id)
      ])
      return this.allCustomers.filter(customer => !excludedIds.has(customer.id))
    }
  },
  methods: {
    selectUse (user) {
      this.allReservationUserFront.push(user)
      this.showCutomerList = false
    },
    selectUseWaiting (user) {
      this.allWaitingUserFront.push(user)
      this.showCutomerListInWaiting = false
    },
    getAllCustomer () {
      customerServices.getAllUsers().then((response) => {
        this.allCustomers = response.data.data.data.map((customer) => {
          return {
            id: customer.id,
            name: customer.name,
            image: customer.image
          }
        })
      }).catch((error) => {
        console.error('Error fetching customers:', error)
      })
    },
    removeUserServer (user) {
      this.removedItemServer.push(user.user_id)
      this.details.reserved = this.details.reserved.filter(item => item.id !== user.user_id)
      this.details.waiting = this.details.waiting.filter(item => item.id !== user.user_id)
    },
    removeUserFront (user) {
      const index = this.allReservationUserFront.findIndex(item => item.id === user.id)
      this.allReservationUserFront.splice(index, 1)
    },
    removeUserWaitingFront (user) {
      const index = this.allWaitingUserFront.findIndex(item => item.id === user.id)
      this.allWaitingUserFront.splice(index, 1)
    },
    viewUser (user) {
      window.open(window.location.origin + `/business/customers/management/purchases/${user.id}`, '_blank')
    },
    sendDataToServer () {
      const data = [
        ...this.allReservationUserFront.map(item => ({
          user_id: item.id,
          type: 'add',
          calendar_id: this.details.id
        })),
        ...this.allWaitingUserFront.map(item => ({
          user_id: item.id,
          type: 'add',
          calendar_id: this.details.id
        })),
        ...this.removedItemServer.map(item => ({
          user_id: item,
          type: 'remove',
          calendar_id: this.details.id
        }))
      ]
      this.$emit('sendDataToServer', data)
    }
  },
  created () {
    this.getAllCustomer()
  }
}
</script>
<style>
.img-user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.number-row {
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #434253;
  border-right: 1px solid #F0F0F0;
}
.calender-username {
  color: #19182A;
  font-size: 14px;
  font-weight: 500;
}
.all-user-list {
  border: 1px solid #F0F0F0;
}
.calender-list-action {
  border-left: 1px solid #F0F0F0;
  display: flex;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
}
.calender-addCustomer {
  font-size: 16px;
  font-weight: 500;
  color: #FE9E12;
}
.calender-label {
  color: #19182A;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px !important;
}
</style>
