<template>
  <div v-if="renderComponent">
    <b-modal centered id="packageDetails" title="Details" hide-footer no-close-on-backdrop>
      <package-info :packageInfo="popupPackageInfo"></package-info>
    </b-modal>
    <member-menu/>
        <ValidationObserver v-slot="{ handleSubmit }">
      <form v-if="choosePackageOrService || $route.query.member_id" @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col sm="12">
            <iq-card body-class=" profile-page p-0">
              <template v-slot:body>
                <div class="profile-header">
                  <div class="profile-info p-2">
                    <b-row>
                      <b-col md="6" sm="12">
                        <div class="user-detail pl-5">
                          <div class="d-flex flex-wrap align-items-center">
                            <div class="profile-img pr-4">
<!--                              <span>
                              <b-img v-bind:src="user.profile" @click="openFile" ref="file" alt="profile-img" fluid class="avatar-80 cursor-pointer" />
                              </span>
                              <input type="file" id="file" capture="camera"  @change="previewImage" class="d-none position-absolute" accept="image/*" style="opacity: 0;" />-->
                              <div class="camera-button">
                                  <span @click="toggleCamera">
                                    <b-img v-bind:src="user.profile" ref="file" alt="profile-img" fluid class="avatar-80 cursor-pointer" />
                                  </span>
                              </div>
                              <b-modal id="camera" title="Member Image" hide-footer>
                                <div v-show="isCameraOpen && isLoading" class="camera-loading">
                                  <ul class="loader-circle">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                  </ul>
                                </div>
                                <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ 'flash' : isShotPhoto }">

                                  <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div>

                                  <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>

                                  <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
                                </div>
                                <div v-if="isCameraOpen && !isLoading" class="camera-shoot d-flex justify-content-center my-2">
                                    <b-button variant="primary" class="w-100" type="submit" @click="takePhoto">Take Photo</b-button>
                                </div>
<!--                                <div v-if="isPhotoTaken && isCameraOpen" class="camera-download d-flex justify-content-center">
                                  <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
                                    Download
                                  </a>
                                </div>-->
                              </b-modal>
                            </div>
                            <div class="profile-detail d-flex align-items-center">
                              <h4 class="text-capitalize">{{user.name}}</h4>
                              <h5 class="m-0 pl-3 text-secondary"> {{user.phone}} </h5>
                            </div>
                          </div>
                        </div>
                      </b-col>
                      <b-col md="6" sm="12" class="d-flex align-items-center justify-content-end">
                        <img :src="qrCodeImage"  alt="qr-img" fluid class="cursor-pointer avatar-60 mr-5">
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col lg="8">
            <iq-card>
              <template v-slot:body>
                <h4 class="mb-4 text-primary">Add Package</h4>
                <div class="new-user-info">
                  <b-row>
                    <b-form-group class="col-md-6"
                                  label="Select Packages:"
                                  label-for="project"
                    >
                      <div>
                        <v-select :options="allPackages" multiple v-model="memberShipPackages" label="title"
                                  :selectable="option => !memberShipPackages.includes(option.id)"
                                  :reduce="service => service.id" @option:deselected="removePackage" @option:selecting="addPackages">
                        </v-select>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Payment Type:" label-for="period">
                      <div class="periodNumbers">

                        <span :class="[{ 'shadow selectedNumber' : isSelected('cash')}]" @click="memberShip.payment_method = 'cash'">
                          Cash
                        </span>
                        <span :class="[{ 'shadow selectedNumber' : isSelected('visa')}]" @click="memberShip.payment_method = 'visa'">
                          Visa
                        </span>
                        <span :class="[{ 'shadow selectedNumber' : isSelected('vodafone_cash')}]" @click="memberShip.payment_method = 'vodafone_cash'">
                          Vodafone Cash
                        </span>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Paid Amount:" label-for="amount" v-if="memberShipPackages.length > 0">
                      <div class="projectsPrice">
                        <div class="content-price" v-for="(memberShipData, key) in selectedPackages" :key="key">
                          <p class="d-flex justify-content-around"><span class="cursor-pointer  font-weight-bold text-decoration-underline" @click="showPackageInfo(memberShipData)">{{ memberShipData.title }}</span> - <span class="text-primary">{{memberShipData.project[0].pivot.price -  memberShip.package_discount}} L.E</span></p>
                          <ValidationProvider :name="memberShipData.title+' Price'" :rules="'required|max_value:'+parseInt(memberShipData.project[0].pivot.price - memberShip.package_discount) + '|min_value:'+ parseInt(memberShipData.project[0].pivot.price - memberShip.package_discount) *  (memberShipData.down_payment / 100)" v-slot="{ errors }">
                            <b-form-input v-model="memberShipData.price" type="number" placeholder="Ex: 100" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </div>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Package Discount:" label-for="discount" v-if="hasPer('membership.discount.tab')">
                      <ValidationProvider name="discount" ref="discount" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="memberShip.package_discount" type="text" placeholder="discount" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Currency:" label-for="currency">
                      <div class="periodNumbers">

                        <span :class="[{ 'shadow selectedNumber' : isSelectedCurrency('EGP')}]" @click="memberShip.currency = 'EGP'">
                          EGP
                        </span>
<!--                        <span :class="[{ 'shadow selectedNumber' : isSelectedCurrency('USD')}]" @click="memberShip.currency = 'USD'">
                          USD
                        </span>
                        <span :class="[{ 'shadow selectedNumber' : isSelectedCurrency('AED')}]" @click="memberShip.currency = 'AED'">
                          AED
                        </span>-->
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Medical Case:" >
                      <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                        <div class="custom-switch-inner">
                          <input type="checkbox" class="custom-control-input bg-primary" v-model="ifMedical" id="medical">
                          <label class="custom-control-label" for="medical" data-on-label="on" data-off-label="off">
                          </label>
                        </div>
                      </div>
                    </b-form-group>
                    <b-form-group v-if="ifMedical" class="col-md-12" label="Note:" >
                      <ValidationProvider name="note" ref="note" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="memberShip.medical" type="text" placeholder="note" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                </div>
              </template>
            </iq-card>
<!--            <b-form-group class="col-md-6" label="Get Services:" >
              <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                <div class="custom-switch-inner">
                  <input type="checkbox" class="custom-control-input bg-primary" v-model="ifService" id="service">
                  <label class="custom-control-label" for="service" data-on-label="on" data-off-label="off">
                  </label>
                </div>
              </div>
            </b-form-group>-->
            <b-button variant="primary" @click="ifService = true" v-if="ifService == false" class="mb-2">Extra Service</b-button>
            <b-button variant="danger" @click="ifService = false" v-else class="mb-2">Cancel</b-button>

            <iq-card v-if="ifService == true">
              <template v-slot:body>
                <h4 class="mb-4 text-primary">Add Extra Service</h4>
                <div class="new-user-info">
                  <b-row >
                    <b-form-group class="col-md-6"
                                  label="Select Services:"
                                  label-for="Services"
                    >
                      <div>
                        <v-select :options="allServices"  multiple
                                  label="title"
                                  v-model="memberShipServices"
                                  :selectable="services => !memberShipServices.includes(services.id)"
                                  :reduce="services => services.id"
                                  @option:deselected="removeService" @option:selecting="addServices"
                        >
                        </v-select>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Service Discount:" label-for="discount" v-if="hasPer('membership.discount.tab')">
                      <ValidationProvider name="discount" ref="discount" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="memberShip.service_discount" type="text" placeholder="discount" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Paid Amount:" label-for="amount" v-if="memberShipServices.length > 0">
                      <div class="projectsPrice">
                        <div class="content-price" v-for="(memberShipData, key) in selectedServices" :key="key">
                        <p class="d-flex justify-content-around"><span>{{ memberShipData.title }}</span> - <span class="text-primary">{{memberShipData.project[0].pivot.price -  memberShip.service_discount }} L.E</span></p>
                          <ValidationProvider :name="memberShipData.title+' Price'" :rules="'required|max_value:'+parseInt(memberShipData.project[0].pivot.price - memberShip.service_discount)+ '|min_value:'+ parseInt(memberShipData.project[0].pivot.price - (parseInt( memberShip.service_discount))) *  (memberShipData.down_payment / 100)" v-slot="{ errors }">
                            <b-form-input v-model="memberShipData.price"  type="number" @input="calculatePaidAmountInServices" placeholder="Ex: 100" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </div>
                      </div>
                    </b-form-group>
                  </b-row>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col lg="4">
            <div class="iq-card">
              <div class="iq-card-body">
                <h4 class="mb-2">Package Details</h4>
                <span>
                  <div class="d-flex justify-content-between">
                    <span>Package Cost</span>
                    <span><strong>{{ pricing.packageCost || 0 }} L.E</strong></span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Paid Amount</span>
                    <span><strong>{{ calculatePaidAmountInPackages() || 0 }} L.E</strong></span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Remaining Amount:</span>
                    <span><strong>{{ calculateTotalPackages -  calculatePaidAmountInPackages() || 0 }} L.E</strong></span>
                  </div>
                  <div class="d-flex justify-content-between">
                  <span>Discount</span>
                  <span class="text-success"><strong>{{memberShip.package_discount || 0 }}</strong></span>
                </div>
                  <div class="d-flex justify-content-between">
                    <span>total:</span>
                    <span><strong>{{ calculateTotalPackages || 0 }} L.E</strong></span>
                  </div>
                </span>
                <hr v-if="ifService">
                <span v-if="ifService">
                  <h4 class="mb-2">Services Details</h4>
                <span>
                  <div class="d-flex justify-content-between">
                    <span>Paid Amount</span>
                    <span><strong>{{ calculatePaidAmountInServices() || 0 }} L.E</strong></span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Remaining Amount:</span>
                    <span><strong>{{ (pricing.totalServiceCost -  memberShip.service_discount )- calculatePaidAmountInServices() || 0 }} L.E</strong></span>
                  </div>
                   <div class="d-flex justify-content-between">
                  <span>Discount</span>
                  <span class="text-success"><strong>{{memberShip.service_discount || 0 }}</strong></span>
                </div>
                  <div class="d-flex justify-content-between">
                    <span>total</span>
                    <span><strong>{{ pricing.totalServiceCost - memberShip.service_discount }} L.E</strong></span>
                  </div>
                </span>
                </span>
                <hr>
                <h4 class="mb-2">Total</h4>
                <div class="d-flex justify-content-between">
                  <span class="text-primary">Grand Total</span>
                  <span><strong>{{ calculateTotal || 0}} L.E</strong></span>
                </div>
                <div class="d-flex justify-content-between">
                  <span class="text-success">Total Paid</span>
                  <span><strong>{{ Number(calculatePaidAmountInServices() + calculatePaidAmountInPackages()) || 0}} L.E</strong></span>
                </div>
                <div class="d-flex justify-content-between">
                  <span  class="text-danger">Total Remaining</span>
                  <span><strong>{{  (calculateTotalServices - calculatePaidAmountInServices()) + (calculateTotalPackages - calculatePaidAmountInPackages()) }} L.E</strong></span>
                </div>
                <div class="mt-4">
                  <b-button v-if="loadingButton" class="btn w-100 btn-primary"  variant="primary" disabled>
                    <b-spinner small type="grow"></b-spinner>
                    loading...
                  </b-button>
                  <button type="submit" v-else class="btn w-100 btn-primary" @click.prevent="handleSubmit(cretaeMembership)">Confirm Membership</button>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </form>
      <form v-if="!choosePackageOrService && !$route.query.member_id" @submit.prevent="handleSubmit(saveUser)"  >
      <b-row>
        <b-col lg="12">
          <iq-card>
            <template v-slot:body>
              <div class="new-user-info">
                <b-row>
                  <b-form-group class="col-md-12" label="Phone Number:" label-for="phone_number:">
                    <ValidationProvider name="phone_number" ref="phone_number" rules="required|digits:11" v-slot="{ errors }">
                      <b-form-input :disabled="disabled == 1" @update="searchPhoneNumber"  v-model="userData.phone" type="number" placeholder="Phone Number" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                  <div v-if="loadingDataFromPhone" class="text-center col-md-12">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                  </div>
                </b-row>
                <b-row  v-if="finishSearch">
                  <b-form-group class="col-md-12" label="Full Name:" label-for="full_name:">
                    <ValidationProvider name="full_name" ref="name" rules="required" v-slot="{ errors }">
                      <b-form-input v-model="userData.name" type="text" placeholder="Full Name" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                  <b-form-group class="col-md-12" label="National ID or (Passport):" label-for="National ID:">
                    <ValidationProvider name="National ID" ref="national" rules="required|min:6|max:14" v-slot="{ errors }">
                      <b-form-input v-model="userData.national" type="number" placeholder="National ID" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                  <b-form-group class="col-md-12" label="Birthday::" label-for="birthday:">
                    <ValidationProvider name="birthday:" ref="birthday" v-slot="{ errors }">
                      <b-form-input type="date" v-model="userData.birthday" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                  <b-form-group class="col-md-12" label="Email:" label-for="Email:">
                      <b-form-input v-model="userData.email" type="text" placeholder="Email"></b-form-input>
                  </b-form-group>
                  <div class="col-md-12 d-flex justify-content-end">
                        <span class="mr-2">
                          <b-button v-if='loadingSaveAsGuest'  variant="primary" disabled>
                            <b-spinner small type="grow"></b-spinner>
                            loading...
                          </b-button>
                        </span>
                        <span class="mr-2">
                              <b-button v-if='loadingGetMemberShip'  variant="primary" disabled>
                                <b-spinner small type="grow"></b-spinner>
                                loading...
                              </b-button>
                              <b-button v-else variant="primary" type="submit" >Save /Get
                                Membership </b-button>
                        </span>
                  </div>
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
import packageInfo from '../../components/packageInfo'
/*
import memberShipService from '@/services/MemberShip/memberShip'
*/
import { commonDataMixin } from '@/mixins/commonMixin'
// eslint-disable-next-line no-unused-vars
function dataURLtoFile (dataurl, filename) {
  var arr = dataurl.split(','); var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export default {
  name: 'newMember',
  components: {
    packageInfo
  },
  mixins: [commonDataMixin],
  data () {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: '#',
      popupPackageInfo: {},
      choosePackageOrService: false,
      loadingSaveAsGuest: false,
      loadingGetMemberShip: false,
      loadingGetService: false,
      finishSearch: false,
      qrCodeImage: 'https://api.qrserver.com/v1/create-qr-code/?data=hello_peter',
      ifService: false,
      ifMedical: false,
      loadingDataFromPhone: false,
      user: {
        profile: require('../../assets/images/user/user-11.png'),
        name: '',
        phone: '',
        id: '',
        membership_id: '',
        national_id: ''
      },
      image: '',
      disabled: 0,
      userData: {
        phone: '',
        name: '',
        type: '',
        email: '',
        national: '',
        birthday: ''
      },
      memberShipPackages: [],
      selectedPackages: [],
      memberShipServices: [],
      selectedServices: [],
      memberShip: {
        payment_method: 'cash',
        package_discount: 0,
        service_discount: 0,
        currency: 'EGP'
      },
      pricing: {
        packageCost: 0,
        PackageRemainingAmount: 0,
        totalPackageCost: 0,
        totalServiceCost: 0,
        ServicePaidAmount: 0,
        ServiceRemainingAmount: 0,
        total: 0
      },
      allPackages: [],
      allServices: [],
      renderComponent: true,
      loadingButton: false
    }
  },
  methods: {
    toggleCamera () {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.isShotPhoto = false
        this.stopCameraStream()
      } else {
        this.$bvModal.show('camera')
        this.isCameraOpen = true
        this.createCameraElement()
      }
    },

    createCameraElement () {
      this.isLoading = true

      const constraints = (window.constraints = {
        audio: false,
        video: true
      })

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.isLoading = false
          this.$refs.camera.srcObject = stream
        })
        .catch(() => {
          this.isLoading = false
          alert("May the browser didn't support or there is some errors.")
        })
    },

    stopCameraStream () {
      const tracks = this.$refs.camera.srcObject.getTracks()

      tracks.forEach(track => {
        track.stop()
      })
    },

    takePhoto () {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true

        const FLASH_TIMEOUT = 50

        setTimeout(() => {
          this.isShotPhoto = false
        }, FLASH_TIMEOUT)
      }

      this.isPhotoTaken = !this.isPhotoTaken

      const context = this.$refs.canvas.getContext('2d')
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5)
      this.stopCameraStream()
      const fd = new FormData()
      const canvas = document.getElementById('photoTaken').toDataURL('image/jpeg')
        .replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
      /* var fileData = dataURLtoFile(canvas, 'imageName.jpg')
      console.log(fileData) */
      this.user.profile = canvas
      fd.append('file', 'image')
      fd.append('folder', 'member_profile_photo')
      fd.append('access', 'public')
      this.commonUploadFiles(fd).then(res => {
        console.log(res)
        /*
        console.log(res.data.data.media_id)
*/
        /* memberShipService.uploadMemberImage(this.$route.params.id, { media_id: res.data.data.media_id }).then(response => {
          this.$store.dispatch('uploadMemberImage', { image: fd }).then(res => {
            core.showSnackbar('success', res.data.message)
            this.$bvModal.hide('camera')
          }).catch(err => {
            if (err.response.data.errors) {
              // eslint-disable-next-line no-unused-vars
              for (const [key, value] of Object.entries(err.response.data.errors)) {
                // console.log(key)
                core.showSnackbar('error', value)
              }
            } else if (err.response.data.error) {
              core.showSnackbar('error', err.response.data.error)
            }
          })
        }) */
      })
      /*      this.$store.dispatch('uploadMemberImage', { image: fd }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('camera')
      }).catch(err => {
        if (err.response.data.errors) {
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            // console.log(key)
            core.showSnackbar('error', value)
          }
        } else if (err.response.data.error) {
          core.showSnackbar('error', err.response.data.error)
        }
      }) */
      this.stopCameraStream()
    },

    downloadImage () {
      const download = document.getElementById('downloadPhoto')
      const canvas = document.getElementById('photoTaken').toDataURL('image/jpeg')
        .replace('image/jpeg', 'image/octet-stream')
      download.setAttribute('href', canvas)
    },
    isSelected (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.memberShip.payment_method
    },
    isSelectedDiscount (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.memberShip.package_discount
    },
    isSelectedServiceDiscount (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.memberShip.service_discount
    },
    isSelectedCurrency (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.memberShip.currency
    },

    openFile () {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById('file').click()
    },
    previewImage: function (e) {
      // console.log(e.target.files)
      var files = e.target.files || e.dataTransfer.files
      // console.log('files', files[0])
      if (!files.length) return
      this.createImage(files[0])
      const fd = new FormData()
      fd.append('image', files[0], files[0].name)
      this.$store.dispatch('uploadMemberImage', { userId: this.user.id, image: fd }).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    },
    createImage (file) {
      var reader = new FileReader()
      reader.onload = (e) => {
        this.user.profile = e.target.result
      }
      reader.readAsDataURL(file)
    },
    addPackages (packageData) {
      packageData.price = 0
      this.pricing.packageCost += packageData.project[0].pivot.price
      this.selectedPackages.push(packageData)
    },
    removePackage (packageData) {
      this.pricing.packageCost -= packageData.project[0].pivot.price
      var position = this.selectedPackages.findIndex(packages => packages.id === packageData.id)
      this.selectedPackages.splice(position, 1)
    },
    addServices (serviceData) {
      serviceData.price = 0
      this.pricing.totalServiceCost += serviceData.project[0].pivot.price
      this.selectedServices.push(serviceData)
    },
    removeService (serviceData) {
      this.pricing.totalServiceCost -= serviceData.project[0].pivot.price
      var position = this.selectedServices.findIndex(service => service.id === serviceData.id)
      this.selectedServices.splice(position, 1)
    },
    // form methods
    searchPhoneNumber () {
      this.finishSearch = false
      if (this.userData.phone.length === 11) {
        this.loadingDataFromPhone = true
        this.disabled = 1
        this.$store.dispatch('serachByPhone', this.userData.phone).then(res => {
          this.loadingDataFromPhone = false
          this.disabled = 0
          // console.log(res)
          if (!res.data.data) {
            this.userData = {
              phone: this.userData.phone,
              name: '',
              type: '',
              email: '',
              national: '',
              birthday: ''
            }
          } else {
            this.userData = {
              phone: res.data.data.phone,
              name: res.data.data.name,
              email: res.data.data.member ? res.data.data.member.email : '',
              national: res.data.data.member ? res.data.data.member.national_id : '',
              birthday: res.data.data.member ? res.data.data.member.birthday : ''
            }
          }
          this.finishSearch = true
        })
      }
    },
    saveUser () {
      this.loadingGetMemberShip = true
      this.$store.dispatch('storeUser', this.userData).then(res => {
        this.loadingSaveAsGuest = false
        this.loadingGetMemberShip = false
        this.loadingGetService = false
        this.user.name = res.data.data.name
        this.user.phone = res.data.data.phone
        this.user.id = res.data.data.id
        this.user.membership_id = res.data.data.membership_id
        this.user.national_id = res.data.data.national_id
        // this.user.profile = res.data.data.profile
        this.choosePackageOrService = true
        core.showSnackbar('success', res.data.message)
      }).catch(error => {
        this.loadingGetMemberShip = false
        if (error.response.data.errors) {
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(error.response.data.errors)) {
            core.showSnackbar('error', value)
          }
        } else if (error.response.data.error) {
          core.showSnackbar('error', error.response.data.error)
        }
      })
    },
    forceRerender () {
      // Remove my-component from the DOM
      this.renderComponent = false

      this.$nextTick(() => {
        this.choosePackageOrService = false
        this.loadingSaveAsGuest = false
        this.loadingGetMemberShip = false
        this.loadingGetService = false
        this.finishSearch = false
        this.loadingDataFromPhone = false
        // Add the component back in
        this.userData.phone = ''
        this.renderComponent = true
      })
    },
    cretaeMembership () {
      console.log({
        userId: this.user.id,
        data: {
          packages: [...this.selectedPackages, ...this.selectedServices],
          ...this.memberShip,
          medical_case: this.ifMedical ? 1 : 0
        }
      })
      this.loadingButton = true
      this.$store.dispatch('cretaeMembership', {
        userId: this.user.id,
        data: {
          packages: [...this.selectedPackages, ...this.selectedServices],
          ...this.memberShip,
          medical_case: this.ifMedical ? 1 : 0
        }
      }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$router.push({ name: 'profile', params: { id: this.user.id } })
      }).catch(err => {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          core.showSnackbar('error', `${key}: ${value}`)
        }
      }).finally(() => {
        this.loadingButton = false
      })
    },
    calculatePaidAmountInPackages () {
      return this.selectedPackages.reduce((sum, { price }) => Number(sum) + Number(price), 0)
    },
    calculatePaidAmountInServices () {
      return this.selectedServices.reduce((sum, { price }) => Number(sum) + Number(price), 0)
    },
    showPackageInfo (info) {
      this.$store.dispatch('getSpacificPackages', info.id).then(data => {
        // console.log(data.data.data)
        this.popupPackageInfo = data.data.data
        this.$bvModal.show('packageDetails')
      })
    }
  },
  computed: {
    calculateTotalPackages () {
      return this.pricing.packageCost - this.memberShip.package_discount
    },
    totalRemaining () {
      return ((this.pricing.totalServiceCost) - this.memberShip.service_amount) + this.calculatePackageRemainingAmount
    },
    calculateTotalServices () {
      return this.pricing.totalServiceCost - this.memberShip.service_discount
    },
    calculateTotal () {
      return this.calculateTotalPackages + this.calculateTotalServices
    }
  },
  watch: {
    ifService (value) {
      if (!value) {
        this.selectedServices = []
        this.memberShipServices = []
        this.pricing.totalServiceCost = ''
      }
    }
  },
  mounted () {
    core.index()
  },
  created () {
    if (this.$route.query.member_id) {
      this.$store.dispatch('getMembership', this.$route.query.member_id).then(res => {
        // console.log('res', res)
        this.user.id = res.data.data.member.id
        this.user.phone = res.data.data.member.phone
        this.user.name = res.data.data.member.name
      })
    }
    this.$store.dispatch('getCreateMemberShip').then(res => {
      this.allPackages = res.data.data.packages
      this.allServices = res.data.data.services
    })
  }
}
</script>
<style scoped>
.profile-img{
  margin-top: 0 !important;
}
.periodNumbers , .projectsPrice{
  padding: 5px;
  background: transparent;
  border: 1px solid #d7dbda;
  font-size: 14px;
  color: var(--iq-secondary);
  border-radius: 10px;
  background: #92e8cb00;
  display: flex;
  align-items: center;
  justify-content: start;
}
.projectsPrice{
  background: var(--iq-bg-light-color);
}
.projectsPrice .content-price{
  background: #fff;
  padding: 5px;
  border-radius: 10px;
  margin-right: 10px;
}
.content-price p {
  margin: 1px 0;
  text-align: center;
  /* color: #202020; */
  color: var(--iq-dark);
}
.periodNumbers span {
  cursor: pointer;
  background: #ececec;
  padding: 5px 15px;
  border-radius: 10px;
  margin-right: 10px;
  color: #5b5b5b;
}
.selectedNumber{
  color: var(--iq-white) !important;
  background: linear-gradient(to right, var(--iq-primary) 0%, var(--iq-primary-light) 100%) !important;
}
.text-decoration-underline{
  text-decoration: underline;
}
</style>
