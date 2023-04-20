<template>
  <div>
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
                :validate="'required|max:20'"
                name="Facility Name"
                :label="'Facility Name'"
                :limit="20"
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
                    :rules="{
                    regex: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                    required:true
                    }"
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
        <b-row>
          <b-col md="12" class="mt-3 d-flex justify-content-center" >
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
import settingsService from '@/modules/superAdmin/settings/services/settings.services'

export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      test: '',
      allLinks: [
        'Website',
        'Facebook',
        'Instagram',
        'Whatsapp',
        'Youtube',
        'Email',
        'Reservation Link DD_L'
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
      }
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
      this.$emit('makeBusinessRequest', this.businessRequest)
    },
    getAllLinks () {
      settingsService.getAllLinks().then(res => {
        this.allLinks = res.data.data
      })
    }
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
    // this.getAllLinks()
  }
}
</script>
