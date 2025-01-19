<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addManagement)">
        <div class="d-flex justify-content-between gap-2">
          <input-form
            class="mb-0 w-100"
            v-model="phoneNumber"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            :validate="'required|numeric'"
          />
          <b-button v-if="!searchLoading" variant="iq-bg-primary" class="btn light-btn py-2" @click="searchCustomer" :disabled="searchLoading">Search</b-button>
          <b-button v-else variant="iq-bg-primary" class="btn light-btn py-2" :disabled="true">
            <spinner-loading  text="" />
          </b-button>
        </div>

        <div v-if="showResult">
          <div v-if="userData" class="result-data">
            <div class="user-data">
              <img :src="userData.image || '@/assets/images/user/default-user-image.png'" alt="Img">
              <h4>{{userData.name}}</h4>
            </div>
            <div class="personal-data">
              <p>Birthdate: <span>{{userData.birthdate}}</span></p>
              <p>Gender: <span>{{userData.gender}}</span></p>
              <p>Nationality: <span>{{userData.nationality}}</span></p>
            </div>
          </div>
          <div v-else class="text-center mt-4"> User Not Found</div>
        </div>
        <b-row v-if="userData && !userData.in_facility && showResult">
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading" :disabled="!showResult">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validationObserver>
  </div>
</template>
<script>
import managementServices from '../services/management.services'

export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showResult: false,
      searchLoading: false,
      phoneNumber: '',
      userData: null
    }
  },
  methods: {
    searchCustomer () {
      this.searchLoading = true
      managementServices.searchCustomer(this.phoneNumber).then(res => {
        this.showResult = true
        this.userData = res.data.data
      }).finally(() => {
        this.searchLoading = false
      })
    },
    addManagement () {
      this.$emit('addManagement', { user_id: this.userData.id })
    }
  },
  watch: {},
  computed: {},
  created () {
  }
}
</script>

<style lang="scss" scoped>
.result-data {
  margin-top: 16px;
  .user-data {
    border-bottom: 1px solid #ccc;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 48px;
      height: 48px;
      border-radius: 24px;
    }
    h4 {
      font-weight: 600;
    }
  }
  .personal-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    span {
      color: #181836;
      font-weight: 600;
    }
  }
}
</style>
