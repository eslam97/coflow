<template>
  <div class="position-relative get-in-touch">
    <section class="bg-white h-400">
      <img :src="require('@/assets/images/businessLanding/getInTouch/Getintouch-right.png')" class="right-image-get-in-touch">
      <img :src="require('@/assets/images/businessLanding/getInTouch/Getintouch-right.png')" class="left-image-get-in-touch">
      <b-container>
        <div class="py-5">
          <div class="header">
            <h3 class="text-center text-primary mb-2">Get in touch</h3>
<!--            <p class="text-center text-secondary font-size-12 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Ut <br/>pretium pretium tempor .</p>-->
          </div>
        </div>
      </b-container>
    </section>
    <section class="bg-primary h-400">
      <b-container>
        <b-row class="d-flex justify-content-center">
          <b-col md="6">
            <ValidationObserver v-slot="{ handleSubmit }">
              <b-form class="position-relative form-top" @submit.prevent="handleSubmit(sendGetInTouch)">
                <div class="card form-shadow iq-border-radius-5 overflow-hidden">
                  <b-row>
                    <b-col md="6" class="m-0 pr-0">
                      <input-form
                          v-model="getInTouch.name"
                          placeholder="Your Name"
                          :validate="'required'"
                          name="Name"
                      />
                    </b-col>
                    <b-col md="6" class="m-0 pl-0">
                      <input-form
                          v-model="getInTouch.email"
                          placeholder="Your Email"
                          :validate="'required|email'"
                          name="Email"
                      />
                    </b-col>
                    <b-col md="12" class="m-0">
                      <input-form
                          v-model="getInTouch.subject"
                          placeholder="Subject"
                          :validate="'required'"
                          name="Subject"
                      />
                    </b-col>
                    <b-col md="12">
                      <ValidationProvider name="message" ref="message" rules="required" v-slot="{ errors }">
                        <b-form-textarea
                            placeholder="Message..."
                            rows="4"
                            v-model="getInTouch.message"
                            :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                        ></b-form-textarea>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-col>
                  </b-row>
                </div>
                <b-row>
                  <b-col md="12" class="mt-5 d-flex justify-content-center">
                    <spinner-loading class="gradient-orange-button" text="Sending" v-if="getInTouchLoading"/>
                    <b-button class="gradient-orange-button m-auto w-25 py-3" type="submit" v-else>
                      <span>Send</span>
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
            </ValidationObserver>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>
<script>
import registrationServices from '@/modules/businessLandingPage/services/registration.services'
export default {
  data () {
    return {
      getInTouchLoading: false,
      getInTouch: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    sendGetInTouch () {
      this.getInTouchLoading = true
      registrationServices.getInTouch(this.getInTouch).then(res => {
        // console.log('res => ', res)
      }).finally(() => {
        this.getInTouchLoading = false
      })
    }
  }
}
</script>
<style>
.left-image-get-in-touch, .right-image-get-in-touch{
  position: absolute;
  top: 30%;
  width: 200px;
  left: 0;
  z-index: 1;
}
.left-image-get-in-touch{
  transform: rotate(180deg);
}
.right-image-get-in-touch{
  left: unset;
  right: 0;
}
.form-shadow{
  box-shadow: 0 10px 40px 0 rgba(113, 130, 138, 0.2);
}
.form-shadow .form-group .form-control{
  border-radius: 0 !important;
  height: 80px !important;
  border: 1px solid #f4f4f4;
  font-family: sans-serif;
  padding-left: 30px;
}
[dir=ltr][mode=light]  .form-shadow textarea.form-control {
  border-radius: 0 !important;
  border: 1px solid #f4f4f4;
  font-family: sans-serif;
  padding-left: 30px;
}
.form-shadow .form-group {
  margin: 0 !important;
}
.h-400 {
  height: 400px;
}
.form-top {
  top: -160px;
  z-index: 5;
}
</style>
