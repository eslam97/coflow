<template>
  <b-container fluid>
    <b-row class="mt-4">
      <b-col md="12"
        ><b-card class="mb-5 d-flex flex-column gap-20">
          <b-card-header
            class="mb-4 p-0 pb-3 p-8 d-flex justify-content-between align-items-center"
          >
            <p
              class="font-size-12 m-0 d-flex justify-content-center align-items-center"
            >
              <span class="text-dark font-weight-bold font-size-18 mr-3">
                Login Credentials
              </span>
              Use this section to update your login credentials.
            </p>
          </b-card-header>

          <b-card-body class="p-0">
            <div>
              <b-form>

              </b-form>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'

export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    core.index()
  }
}
</script>
