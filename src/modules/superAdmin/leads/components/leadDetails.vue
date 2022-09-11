<template>
  <div>
    <div v-if="leadDetails">
      <b-alert show variant="warning">
        <span class="text-bold">Password : </span> {{leadDetails.password_text}}
      </b-alert>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(makeBusinessRequest)">
        <b-row>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="businessRequest.email"
                placeholder="Ex: name@coflow.com"
                :validate="'required|email'"
                name="Facility Email Address"
                :label="'Facility Email Address'"
            />
          </b-col>
          <b-col md="8" class="mb-3">
            <input-form
                v-model="businessRequest.name"
                placeholder="Ex: The Yoga Studio"
                :validate="'required'"
                name="Facility Name"
                :label="'Facility Name'"
            />
          </b-col>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="businessRequest.contact.job"
                placeholder="Ex: Owner"
                :validate="'required'"
                name="Contact’s Role or Job"
                :label="'Contact’s Role or Job'"
            />
          </b-col>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="businessRequest.contact.name"
                placeholder="Ex: Eslam Ashraf"
                :validate="'required'"
                name="Contact’s Full Name"
                :label="'Contact’s Full Name'"
            />
          </b-col>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="businessRequest.contact.phone"
                placeholder="Ex: 0123456789"
                :validate="'required|numeric'"
                name="Contact’s Phone Number"
                :label="'Contact’s Phone Number'"
            />
          </b-col>
          <b-col md="6" class="mb-3" v-for="(item, key) in businessRequest.links" :key="key">
            <b-form-group
                :label="'URL Links'"
                :label-for="'URL Links'"
                class="position-relative"
            >
              <span class="text-danger deleteLabelButton cursor-pointer" v-if="key != 0" @click="deleteLink(key)">Delete
              </span>
              <b-input-group>
                <validation-provider
                    #default="{ errors }"
                    :name="`URL Link ${key + 1}`"
                    :rules="'required'"
                    class="flex-grow-1"
                >
                  <b-form-input
                      id="mm"
                      v-model="item.link"
                      :class="[{ 'is-invalid': errors.length > 0 }]"
                      :placeholder="'Ex: https://www.google.com'"
                      :disabled="!item.selectSocial"
                  />
                </validation-provider>
                <template #prepend>
                  <b-dropdown
                      :text="item.selectSocial ? item.selectSocial : 'Choose'"
                      class="selectWithInput"
                  >
                    <b-dropdown-item v-for="(i, keyLink) in filterLinks" :key="keyLink" @click="item.selectSocial = i">
                      {{i}}
                    </b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="12" v-if="allLinks.length !== businessRequest.links.length"
          ><span class="text-warning cursor-pointer" @click="addNewLink">+ Add another Link</span></b-col>
        </b-row>
        <b-row  v-if="status === 'pending acceptance'">
          <b-col md="12" class="mt-4">
            <p v-if="requestLoading" class="text-center">
              <spinner-loading  text="Loading" />
            </p>
            <div class="d-flex justify-content-center gap_10" v-else>
              <b-button class="container_button_blue ml-2" @click="selectedStatus = 'accepted'" type="submit">
                <span>ACCEPT</span>
              </b-button>
              <b-button class="gradient-orange-button box_orange_shadow" @click="selectedStatus = 'rejected'"
                        type="submit">
                <span>REJECT</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    },
    leadDetails: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      allLinks: [
        'Website',
        'Facebook',
        'Instagram'
      ],
      businessRequest: {
        email: '',
        name: '',
        contact: {
          name: '',
          job: '',
          phone: ''
        },
        links: [
          {
            selectSocial: '',
            link: ''
          }
        ]
      },
      selectedStatus: '',
      status: ''
    }
  },
  methods: {
    addNewLink () {
      this.businessRequest.links.push({
        selectSocial: '',
        link: ''
      })
    },
    deleteLink (key) {
      this.businessRequest.links.splice(key, 1)
    },
    makeBusinessRequest () {
      this.$emit('makeBusinessRequest', { ...this.businessRequest, _method: 'put', status: this.selectedStatus })
    }
  },
  watch: {
  },
  computed: {
    filterLinks () {
      var newLinksArr = [...this.allLinks]
      this.businessRequest.links.forEach(e => {
        if (newLinksArr.includes(e.selectSocial)) {
          var socialIndex = newLinksArr.findIndex(social => social === e.selectSocial)
          console.log(socialIndex)
          newLinksArr.splice(socialIndex, 1)
        }
      })
      return newLinksArr
    }
  },
  created () {
    if (this.leadDetails) {
      this.businessRequest = {
        email: this.leadDetails.email,
        name: this.leadDetails.name,
        contact: this.leadDetails.contacts[0],
        links: this.leadDetails.links
      }
      this.status = this.leadDetails.status
    }
  }
}
</script>
