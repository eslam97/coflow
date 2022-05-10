<template>
  <div>
    <div class="border-bottom my-5">
      <b-container>
        <h4 class="py-4">Facility Location</h4>
      </b-container>
    </div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(saveFacilityLocation)">
          <b-row class="mb-5">
            <b-col md="12">
              <label class="mb-3">Location</label>
              <div>
                <b-form-radio class="custom-radio-color-checked mr-5" inline v-model="typeOfLocation" color="warning"
                              name="color" value="based" >
                  <span class="text-primary font-size-12">Address Based</span>
                </b-form-radio>
                <b-form-radio class="custom-radio-color-checked" inline v-model="typeOfLocation" color="warning"
                              name="color" value="remote" >
                  <span class="text-primary font-size-12">Remote</span>
                </b-form-radio>
              </div>
              </b-col>
          </b-row>
          <div v-if="typeOfLocation === 'based'">
            <b-row>
              <b-col class="mb-3" md="2">
                <main-select labelTitle='Country' :validate="'required'"
                             :name="`Country`" placeholder="Choose" :options="allCountries"
                             v-model="based.country_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="2">
                <main-select labelTitle='Governorate' :validate="'required'"
                             :name="`Governorate`"  placeholder="Choose" :options="allGovernorates"
                             v-model="based.country_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="4">
                <main-select labelTitle='Area' :validate="'required'"
                             :name="`Area`"  placeholder="Choose" :options="allArea"
                             v-model="based.area_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="4">
                <input-form
                    placeholder="Ex: 105 name st."
                    :validate="'required'"
                    :name="`Address`"
                    :label="'Address'"
                    v-model="based.address"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col  md="6" class="mb-1" v-for="(item, key) in based.phones" :key="key">
                <b-form-group
                    :label="`Contact Number ${key+1}`"
                    :label-for="`Contact Number ${key+1}`"
                    class="position-relative"
                >
              <span class="text-danger deleteLabelButton cursor-pointer" v-if="key != 0"
                    @click="deleteContact(key)">Delete
              </span>
                  <b-input-group>
                    <validation-provider
                        #default="{ errors }"
                        :name="`Contact Number ${key + 1}`"
                        :rules="'required'"
                        class="flex-grow-1"
                    >
                      <b-form-input
                          id="mm"
                          v-model="item.number"
                          :class="[{ 'is-invalid': errors.length > 0 }]"
                          :placeholder="'Ex: 020454684'"
                          :disabled="!item.type"
                      />
                    </validation-provider>
                    <template #prepend>
                      <b-dropdown
                          :text="item.type ? item.type : 'Choose'"
                          class="selectWithInput"
                      >
                        <b-dropdown-item v-for="(i, keyType) in contactTypes" :key="keyType" @click="item.type = i">
                          {{i}}
                        </b-dropdown-item>
                      </b-dropdown>
                    </template>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="12" class="mb-3">
                <span class="text-warning cursor-pointer" @click="addNewContactNumber">+ Add another Contact Number</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mb-3" md="12">
                <b-form-group
                    label="Location"
                    label-for="Location"
                >
                  <ValidationProvider name="Location" ref="Location" rules="required" v-slot="{ errors }">
                    <b-form-textarea
                        placeholder="Location..."
                        rows="2"
                        v-model="based.location"
                        :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                    ></b-form-textarea>
                    <div class="invalid-feedback">
                      <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <p class="mt-2">* Note: If location is not set up on Google Maps, you can drop a proximate pin near
                    the location
                    and click on the coordinates (ex: 29.978411, 30.996448). This will provide you with a shareable link to copy and paste here.</p>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <div v-else>
            <b-row class="mb-5">
              <b-col md="12" class="d-flex mb-3">
                <label class="mr-3">Available to:</label>
                <div>
                  <p class="font-weight-bold mb-1" v-for="(country , key) in allCountries" :key="key">
                    <b-form-checkbox class="custom-checkbox-color-check" color="warning">
                      <span class="font-size-12 text-primary">{{ country }} - All</span>
                    </b-form-checkbox>
                  </p>
                </div>
              </b-col>
              <b-col md="12" class="position-relative mb-3" v-for="(location, locationKey) in remote.location"
                     :key="locationKey">
                <b-row class="d-flex align-items-center">
                  <b-col class="mb-2" md="3">
                    <main-select labelTitle='Country' :validate="'required'"
                                 :name="`Country ${locationKey + 1}`" placeholder="Choose" :options="allCountries"
                                 v-model="location.country_id"></main-select>
                  </b-col>
                  <b-col md="1">
                    <b-form-checkbox value="all city" v-model="location.availability_type" class="custom-checkbox-color-check"
                                     color="warning">
                      <span class="font-size-12 text-primary"> All </span>
                    </b-form-checkbox>
                  </b-col>
                  <b-col class="mb-2" md="3" v-if="location.availability_type !== 'all city'">
                    <main-select labelTitle='Governorate' :validate="'required'"
                                 :name="`Governorate ${locationKey + 1}`"  placeholder="Choose" :options="allGovernorates"
                                 v-model="location.city_id"></main-select>
                  </b-col>
                  <b-col md="1"  v-if="location.availability_type !== 'all city'">
                    <b-form-checkbox value="all country" v-model="location.availability_type" class="custom-checkbox-color-check" color="warning">
                      <span class="font-size-12 text-primary"> All </span>
                    </b-form-checkbox>
                  </b-col>
                  <b-col class="mb-2" md="4" v-if="location.availability_type !== 'all city'">
                    <div v-if="location.availability_type !== 'all country'">
                    <main-select labelTitle='Area' :validate="'required'"
                                 :name="`Area ${locationKey + 1}`"  placeholder="Choose" :options="allArea"
                                 :multiple="true"
                                 v-model="location.areas"></main-select>
                    </div>
                  </b-col>
                </b-row>
                <span class="text-danger deleteLabelButton cursor-pointer" @click="deletezone(locationKey)">Delete
                  Zone
              </span>
              </b-col>
              <b-col md="12">
                <span class="text-warning cursor-pointer" @click="addNewzone">+ Add new zone</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col  md="6" class="mb-1" v-for="(item, key) in remote.phones" :key="key">
                <b-form-group
                    :label="`Contact Number ${key+1}`"
                    :label-for="`Contact Number ${key+1}`"
                    class="position-relative"
                >
              <span class="text-danger deleteLabelButton cursor-pointer" v-if="key != 0"
                    @click="deleteRemoteContact(key)">Delete
              </span>
                  <b-input-group>
                    <validation-provider
                        #default="{ errors }"
                        :name="`Contact Number ${key + 1}`"
                        :rules="'required'"
                        class="flex-grow-1"
                    >
                      <b-form-input
                          id="mm"
                          v-model="item.number"
                          :class="[{ 'is-invalid': errors.length > 0 }]"
                          :placeholder="'Ex: 020454684'"
                          :disabled="!item.type"
                      />
                    </validation-provider>
                    <template #prepend>
                      <b-dropdown
                          :text="item.type ? item.type : 'Choose'"
                          class="selectWithInput"
                      >
                        <b-dropdown-item v-for="(i, keyType) in contactTypes" :key="keyType" @click="item.type = i">
                          {{i}}
                        </b-dropdown-item>
                      </b-dropdown>
                    </template>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="12" class="mb-3">
                <span class="text-warning cursor-pointer" @click="addNewRemoteContactNumber">+ Add another Contact Number</span>
              </b-col>
            </b-row>
          </div>
          <b-row>
            <b-col md="12" class="mt-3 mb-5 d-flex justify-content-between align-items-center">
              <span @click="goBack" class="cursor-pointer text-black d-flex justify-content-between align-items-center">
                 <i class="mr-2 las la-arrow-left font-size-18"></i>
                <span class="text-bold">Back</span>
              </span>
              <span>
                <spinner-loading class="gradient-orange-button" text="Saving" v-if="loadingFacilityLocation"/>
                <b-button class="gradient-orange-button slideNextArrow" type="submit" v-else>
                <span class="d-flex align-items-center">Next
                  <i class="ml-2 las la-arrow-right font-size-18"></i></span>
              </b-button>
              </span>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      typeOfLocation: 'remote',
      based: {
        country_id: '',
        city_id: '',
        area_id: '',
        address: '',
        phones: [
          {
            type: '',
            number: ''
          }
        ],
        location: ''
      },
      contactTypes: ['Landline', 'Mobile'],
      remote: {
        location: [],
        phones: [
          {
            type: '',
            number: ''
          }
        ]
      },
      allCountries: ['Egypt', 'Us'],
      allGovernorates: ['Cairo'],
      allArea: ['Garden City', 'Garden City 2', 'Garden City3'],
      // loading Steps
      loadingFacilityLocation: false
    }
  },
  methods: {
    saveFacilityLocation () {
      this.loadingFacilityLocation = true
      this.$store.commit('formSteps/setActiveStepForm', 4)
      this.loadingFacilityLocation = false
    },
    goBack () {
      this.$store.commit('formSteps/setActiveStepForm', 2)
    },
    deleteContact (key) {
      this.based.phones.splice(key, 1)
    },
    deleteRemoteContact (key) {
      this.remote.phones.splice(key, 1)
    },
    addNewContactNumber () {
      this.based.phones.push({
        type: '',
        number: ''
      })
    },
    addNewRemoteContactNumber () {
      this.remote.phones.push({
        type: '',
        number: ''
      })
    },
    addNewzone () {
      this.remote.location.push({
        availability_type: '',
        country_id: '',
        city_id: '',
        areas: []
      })
    },
    deletezone (key) {
      this.remote.location.splice(key, 1)
    }
  }
}
</script>
