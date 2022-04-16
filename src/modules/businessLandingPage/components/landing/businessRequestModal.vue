<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(makeBusinessRequest)">
        <b-row>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="businessRequest.facility_email"
                placeholder="Ex: name@coflow.com"
                :validate="'required|email'"
                name="Facility Email Address"
                :label="'Facility Email Address'"
            />
          </b-col>
          <b-col md="8" class="mb-3">
            <input-form
                v-model="businessRequest.facility_name"
                placeholder="Ex: The Yoga Studio"
                :validate="'required'"
                name="Facility Name"
                :label="'Facility Name'"
            />
          </b-col>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="businessRequest.contact_role"
                placeholder="Ex: Owner"
                :validate="'required'"
                name="Contact’s Role or Job"
                :label="'Contact’s Role or Job'"
            />
          </b-col>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="businessRequest.contact_name"
                placeholder="Ex: Eslam Ashraf"
                :validate="'required'"
                name="Contact’s Full Name"
                :label="'Contact’s Full Name'"
            />
          </b-col>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="businessRequest.contact_phone"
                placeholder="Ex: 0123456789"
                :validate="'required|numeric'"
                name="Contact’s Phone Number"
                :label="'Contact’s Phone Number'"
            />
          </b-col>
          <b-col md="6" class="mb-3" v-for="(item, key) in businessRequest.url_links" :key="key">
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
          <b-col md="12" v-if="allLinks.length !== businessRequest.url_links.length"
          ><span class="text-warning cursor-pointer" @click="addNewLink">+ Add another Link</span></b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-3 d-flex justify-content-center">
            <spinner-loading class="container_button_blue" text="Requesting" v-if="requestLoading"/>
            <b-button class="container_button_blue m-auto" type="submit" v-else>
                <span>Send Request</span>
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
export default {
  data () {
    return {
      requestLoading: false,
      test: '',
      allLinks: [
        'Website',
        'Facebook',
        'Twitter',
        'Instagram'
      ],
      businessRequest: {
        facility_email: '',
        facility_name: '',
        contact_role: '',
        contact_name: '',
        contact_phone: '',
        url_links: [
          {
            selectSocial: '',
            link: ''
          }
        ]
      }
    }
  },
  methods: {
    addNewLink () {
      this.businessRequest.url_links.push({
        selectSocial: '',
        link: ''
      })
    },
    deleteLink (key) {
      this.businessRequest.url_links.splice(key, 1)
    },
    makeBusinessRequest () {
      this.requestLoading = true
    }
  },
  computed: {
    filterLinks () {
      var newLinksArr = [...this.allLinks]
      this.businessRequest.url_links.forEach(e => {
        if (newLinksArr.includes(e.selectSocial)) {
          var socialIndex = newLinksArr.findIndex(social => social === e.selectSocial)
          console.log(socialIndex)
          newLinksArr.splice(socialIndex, 1)
        }
      })
      return newLinksArr
    }
  }
}
</script>
