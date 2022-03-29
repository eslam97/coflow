<template>
  <div>
    <member-menu/>
    <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <b-row>
      <b-col lg="12">
        <iq-card>
          <template v-slot:body>
            <div class="new-user-info">
              <b-row>
                <b-col lg="12">
                  <b-form-group class="col-md-12" label="Member ID:" label-for="member_id:">
                    <ValidationProvider name="member_id" ref="member_id" rules="required" v-slot="{ errors }">
                      <b-form-input  @update="searchFrezzeByMemberID" v-model="memberID" type="text" placeholder="Scan Barcode" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                  <div v-if="loadingData" class="text-center col-md-12">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                  </div>
                </b-col>
                <b-col lg="6" v-if="finishSearch && !loadingData">
                <b-form-group class="col-md-12"
                              label="Select Packages:"
                              label-for="project"
                >
                  <div>
                    <v-select :options="allDetailsPackage" v-model="selectPackage" label="package_title" required
                              :selectable="option => !allDetailsPackage.includes(option.id)"
                              @option:selecting="selectFreezePackage"
                              >
                    </v-select>
                  </div>
                </b-form-group >
                  <b-form-group class="col-md-12" label="Frezze: ( weeks )" label-for="Frezze" v-if="selectPackage">
                    <div class="periodNumbers flex-wrap">
                        <span v-for="(i, key) in frezzeNumber" :class="[{ 'shadow selectedNumber' : isSelectedFreeze(key)}, 'd-flex justify-content-center align-items-center py-2 my-1']"  :key="key" @click="selectFreeze(i , key)">
                          <i class="lar la-snowflake"></i>
                        </span>
                    </div>
                  </b-form-group>
                  <b-form-group class="col-md-12" label="Start Time" label-for="date">
                    <ValidationProvider name="icon" ref="start" rules="required" v-slot="{ errors }">
                      <b-form-input id="start" type="date" v-model="startDate"></b-form-input>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col lg="6" v-if="finishSearch && !loadingData" class="d-flex justify-content-center align-items-center">
                  <span class="d-flex align-items-center justify-content-center flex-column">
                     <h4 class="text-center mb-2 cap">{{userInfo.name}}</h4>
                      <b-img rounded  :src="profile" class="avatar-130" alt="user Image"></b-img>
                  </span>
                </b-col>
                <b-col  v-if="finishSearch && !loadingData" class="d-flex justify-content-center mt-3">
                  <b-button variant="primary" type="submit" class="w-25">Confirm Frezze</b-button>
                </b-col>
                </b-row>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { core } from '../../config/pluginInit'
export default {
  name: 'freeze',
  data () {
    return {
      profile: require('../../assets/images/user/user-07.jpg'),
      frezze: [],
      frezzeNumber: [],
      memberID: '',
      finishSearch: false,
      loadingData: false,
      notFound: '',
      userInfo: {
        name: '',
        profile: '',
        image: '',
        id: ''
      },
      startDate: '',
      allDetailsPackage: [],
      selectedPackage: {},
      selectPackage: ''
    }
  },
  methods: {
    onSubmit () {
      /* console.log({
        member_package: this.selectedPackage.id,
        start: this.startDate,
        weeks: this.frezze[this.frezze.length - 1]
      }) */
      this.$store.dispatch('storeFrezze', {
        userId: this.userInfo.id,
        data: {
          member_package: this.selectedPackage.id,
          start: this.startDate,
          weeks: this.frezze[this.frezze.length - 1]
        }
      }).then((res) => {
        core.showSnackbar('success', res.data.message)
        this.$router.go(0)
      }).catch(err => {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          core.showSnackbar('error', `${key}: ${value}`)
        }
      })
    },
    selectFreezePackage (i) {
      this.frezzeNumber = []
      this.selectedPackage = this.allDetailsPackage.find(x => x.id === i.id)
      for (var x = 1; x <= this.selectedPackage.freezing_weeks; x++) {
        this.frezzeNumber.push(x)
      }
    },
    isSelectedFreeze (i) {
      // eslint-disable-next-line eqeqeq
      if (this.frezze.includes(i)) {
        return true
      } else {
        return false
      }
    },

    selectFreeze (data, index) {
      this.frezze = []
      for (var x = 0; x <= index; x++) {
        this.frezze.push(x)
      }
    },
    searchFrezzeByMemberID () {
      this.loadingData = true
      this.$store.dispatch('searchFrezzeByMemberID', this.memberID).then(res => {
        // console.log(res)
        this.userInfo.name = res.data.data.name
        this.userInfo.profile = res.data.data.profile
        this.userInfo.id = res.data.data.id
        this.userInfo.image = res.data.data.image
        this.$store.dispatch('createFrezze', res.data.data.id).then(response => {
          // console.log('response', response)
          this.allDetailsPackage = response.data.data
        })
        this.finishSearch = true
        this.loadingData = false
      }).catch(err => {
        this.finishSearch = true
        this.notFound = err.response.data.error
      })
    }
  }
}
</script>

<style scoped>
.periodNumbers i{
  font-size: 20px;
}
</style>
