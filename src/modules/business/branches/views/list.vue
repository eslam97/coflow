<template>
    <b-container fluid>

        <main-modal id="addBranchModal" size="lg">

            <template v-slot:header class="p-2">

            <h4 class="font-weight-bolder">

              <span class="text-warning">Add: </span> Branch

            </h4>
</template>
<template v-slot:body>
    <branch-details @finished="getAllBranches"/>
</template>
    </main-modal>
    <b-row>
      <b-col md="12" class="mb-4">
        <h3>Branches</h3>
      </b-col>
    </b-row>
    <b-row class="d-flex mb-5">
      <b-col md="3" v-for="(branch, key) in allBranches" :key="key">
        <!-- {{  allBranches  }} -->
        <b-card class="p-2 branch-card" no-body>
          <div class="p-0 mb-5 position-relative card-img-top">
            <img
              src="https://s3-alpha-sig.figma.com/img/e54e/7574/86e471e8b7375a58a789fe733ba921e5?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B53zs0QmAAU9v63XOXxsvWUjG-2C6xdIoLtuht-9oLvVrzqtsKJmqFMvdeF1TNs5SRv55c34jgdPRbDlEPPOAuVg3xOZADdNL72EzFK8esuQDsxTe1JCcJiJEZYLdn~JbomvDqgg0z7IgD1zsNrBUq7JaqvX-UWOVmzhOBAh4Zpqj~7rI9EVPIGv5KAx2cRl5zupf3IvqvUtk47UAK3CzqV6BmKfoIjYGLHV6I02-tUqRDjjH4hyIPU07nhy3scgOiXTN45L7Kkcr10oXDm1lfbFVhFUQ5bE2j9ZjpThVnwGmKJFcc4jXrW1XKRO6ELyCA2QGjUzFBjFHIS-GhGn5Q__"
              class="img-fluid w-100 cursor-pointer"
            />
            <img
              :style="`background-image: url(${branch.logo})`"
              class="card-profile-img img-fluid"
            />
          </div>

          <div class="branch-info">
            <div class="title">
              <h4 class="font-weight-bold">{{  branch.name  }}
              </h4>
              <div class="rating"> <StarIcon />
               <span>{{  branch.rate  }} ({{branch.reviews_count}})</span></div>
            </div>

            <p class="text-co-orange font-weight-medium m-0"><span class="bg-co-orange rounded" style="width: 8px;height: 8px; border-radius: 50%;display: inline-block;"></span> {{branch.status}}</p>
          </div>

          <div class="d-flex border-top py-2 ">
            <div class="border-right pr-4 title">
              <h5 class="font-weight-bold" style="font-size: 14px;">{{ branch.subscription }} Dashboard</h5>
              <p class="text-success font-weight-medium p-0 m-0" style="font-size: 12px;">Active</p>
            </div>

            <div class="actions-icons">
                <span class="icon">
                  <PincelIcon />
                </span>
                <span class="icon" @click="$router.push({name: 'branchPage', params: {id: '1'}})">
                    <EyeIcon />
                </span>
            </div>
          </div>
        </b-card>
      </b-col>

      <b-col md="3">
        <div class="add-branch h-100 d-flex flex-column justify-content-center align-items-center" @click="addBranch">
          <span class="icon">
            <PlusIcon />
          </span>
          <p class="mt-2">Add Branch</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'
import branchDetails from '../../branches/components/branchDetails.vue'
import branchesServices from '@/modules/business/branches/services/branches.services'
import StarIcon from '../components/icons/starIcon.vue'
import PincelIcon from '../components/icons/pincelIcon.vue'
import EyeIcon from '../components/icons/eyeIcon.vue'
import PlusIcon from '../components/icons/plusIcon.vue'

export default {
  components: {
    branchDetails,
    StarIcon,
    PincelIcon,
    EyeIcon,
    PlusIcon
  },
  data: () => {
    return {
      allBranches: [],
      images: [],
      logoImage: '',
      coverImage: '',
      id: ''
    }
  },
  methods: {
    addBranch () {
      this.$bvModal.show('addBranchModal')
    },
    getAllBranches () {
      branchesServices.getAllBranches().then((res) => {
        // console.log(res.data)
        this.allBranches = res.data.data.data
      })
    }
  },
  created () {
    this.getAllBranches()
  },
  mounted () {
    core.index()
  }
}
</script>

<style>
.card .p-0 .card-body {
    padding: 0 !important;
}

.facilityImageInProfile {
    width: 60px;
    height: 60px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: black;
}

.gap-2 {
    gap: 1rem;
}

.deleteImage {
    position: absolute;
    /* width: 20px; */
    /* height: 20px; */
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    right: -8px;
    border-radius: 50%;
    top: -10px;
    padding: 3px;
    font-size: 17px;
}

/*.card-img-top {
  height: 140px !important;
}*/

.address-table {
    width: 100%;
    border: 1px solid #e1e1e1;
    margin-bottom: 23px !important;
    border-collapse: unset !important;
    border-spacing: 0 !important;
}

.address-table .border-right {
    padding: 6px;
    border-right: 1px solid #c0c0c0 !important;
}

.branch-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: 8px !important;
}

.branch-info {
    display: flex;
    flex-direction: column;
}

.branch-info .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.branch-info .title>h4 {
    color: rgba(0, 0, 0, 1);
}

.branch-info .rating {
    text-decoration: underline;
    text-underline-offset: 3px;
    color: black;
    font-weight: 450;
    display: flex;
    align-items: center;
    gap: 4px;
}

.actions-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 16px;
}

.actions-icons .icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.add-branch {
    background-color: rgba(251, 251, 251, 1);
    border-radius: 8px;
    cursor: pointer;
}
</style>
