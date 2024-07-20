<template>
  <div>
    <validationObserver v-slot="{}">
      <b-form @submit.prevent="">
        <b-row class="">
          <b-col lg="6" class="">
            <input-form
              placeholder="Enter Name"
              :validate="'required|max:50'"
              name="Admin name"
              :label="'Admin Name'"
              :limit="50"
              v-model="admin.name"
            />
          </b-col>
          <b-col lg="6">
            <input-form
              placeholder="Enter Title"
              :validate="'required|max:50'"
              name="Title"
              :label="'Title'"
              :limit="50"
              v-model="admin.email"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <input-form
                v-model="admin.phone"
                placeholder="012 345 6789"
                :validate="'required|numeric'"
                name="Phone Number"
                :label="'Phone Number'"
            />
          </b-col>

          <b-col lg="6">
            <input-form
              placeholder="Enter Email"
              :validate="'required|max:50'"
              name="Email"
              :label="'Email'"
              v-model="admin.email"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="12">
            <input-form
              placeholder="****"
              name="Password"
              :label="'Password'"
              type="password"
              v-model="admin.password"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="12">
            <main-select
              labelTitle="Access"
              placeholder="Choose"
              :options="['Access 1', 'Access 2', 'Access 3', 'Access 4']"
            ></main-select>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="12">
            <main-select
              labelTitle="Branches"
              placeholder="Select Branch"
              :options="[]"
            ></main-select>
          </b-col>
        </b-row>

        <b-row v-if="typeOfModal != 'view'">
          <b-col md="12" class="mt-4">
            <div
              class="d-flex justify-content-center"
              v-if="typeOfModal == 'add'"
            >
              <b-button
                class="button-orange-modal"
                type="submit"
                v-if="!requestLoading"
              >
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
            <div
              class="d-flex justify-content-center"
              v-if="typeOfModal == 'edit'"
            >
              <b-button
                class="button-blue-modal"
                type="submit"
                v-if="!requestLoading"
              >
                <i class="las la-pen"></i>
              </b-button>
              <b-button class="button-blue-modal" v-else>
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
  data () {
    return {
      typeOfModal: 'add',
      admin: {
        name: '',
        email: '',
        title: '',
        password: '',
        phone: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
