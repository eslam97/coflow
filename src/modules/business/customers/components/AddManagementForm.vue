<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addManagement)">
        <div class="d-flex justify-content-between align-items-center gap-2">
          <input-form
            class="mb-0 w-100"
            v-model="phoneNumber"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            :validate="'required|numeric'"
          />

          <b-button variant="light" class="btn light-btn" @click="showResult = true" :disabled="!phoneNumber">Search</b-button>
        </div>

        <div v-if="showResult" class="result-data">
          <div class="user-data">
            <img src="@/assets/images/user/default-user-image.png" alt="Img">
            <h4>Ahmed Mohamed</h4>
          </div>
          <div class="personal-data">
            <p>Age: <span>23</span></p>
            <p>Gender: <span>Male</span></p>
            <p>Nationality: <span>Egypt</span></p>
          </div>
        </div>

        <b-row>
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
      phoneNumber: ''
    }
  },
  methods: {
    addManagement () {
      this.$emit('addManagement', { phoneNumber: this.phoneNumber })
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
