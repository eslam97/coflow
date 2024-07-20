<template>
  <b-container fluid>
    <main-modal id="addBranchModal" size="lg">
      <template v-slot:header class="p-2">
        <h4 class="font-weight-bolder">
          <span class="text-warning">Add: </span> Branch
        </h4>
      </template>
      <template v-slot:body>
        <branch-details></branch-details>
      </template>
    </main-modal>
    <b-row>
      <b-col md="12" class="mb-4">
        <h3>Branches</h3>
      </b-col>
    </b-row>
    <b-row class="mb-5 d-flex">
      <b-col md="3">
        <b-card class="p-2 branch-card" no-body>
          <div class="p-0 mb-5 position-relative card-img-top">
            <img
              src="https://s3-alpha-sig.figma.com/img/e54e/7574/86e471e8b7375a58a789fe733ba921e5?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q4cs16FjXxRd5IMJWOOqz5I3Uoh50jXMfpLSqhVeBNeeSUGQDYXJhjnhmUCFQGuEcrgEIWED1vxaojXgAqZSf0mIgyOoE1sNtNLMH1cfgvzkaPsFZw~Jv48d1owhBEtDPi5eSfx1KLkJExDvAqbHnep6xPaqLjA2q1UjQUPve7NeKeW968RVsukzi6opCk5g5xsDBgCI8sMb1cHp5wDyieMRCZ~qoZP~0vVXAf5g0OUZm-PQOdanWuW7~PGD0XmaeB4fbvyc8iXjfAcVAbS9bAsmA8NSZb0sfp3R5hV1d29BjeKqtctIdTidtFMsDdrTjC12wLyUvN4ks-ykw0uz4w__"
              class="img-fluid w-100 cursor-pointer"
            />
            <img
              :style="`background-image: url(https://s3-alpha-sig.figma.com/img/a6e5/8a4c/82d63d776fcd6f60b9d410abc47183bc?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Enko5HcboFsrJqiGrao6pIn5JOfy6lE9y1AGXgoP-xOunLBPkANy1KucDB1peib016VpL0sOixrIYztvi2cumVkVVIsDDMISGdinwVWlXW0KFbVT~kcmCsMElPodvyXauQ-VenUgzfM8JJEW6-oBbkZu0SX0rWoQA6dLWBv-KKfvoZBjpxDTPOuYXsi-vnzcAfBgEXHBtxDH55VFiAlWLAt3QTcQRG0MsNo6UWq5pHBzV5q3esaHflznVkWtfED51QQRqQZBm2TIVo2yu2mTOXZJPz3K-WNuQOaD7u8Tr5hEmSysYYzYFnlEYF5wjtMko0juL17JhTUU15wFXTbEGw__)`"
              class="card-profile-img img-fluid"
            />
          </div>

          <div class="branch-info">
            <div class="title">
              <h4 class="font-weight-bold">Main Branch</h4>
              <div class="rating"> <StarIcon />
               <span>3.5 (20)</span></div>
            </div>

            <p class="text-success font-weight-medium m-0">Visible</p>
          </div>

          <div class="d-flex border-top py-2 ">
            <div class="border-right pr-4 title">
              <h5 class="font-weight-bold" style="font-size: 14px;">Premium Dashboard</h5>
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
        console.log(res.data)
      })
    }
  },
  created () {
    // this.getAllBranches()
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

.branch-info .title > h4 {
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

.add-branch{
  background-color: rgba(251, 251, 251, 1);
  border-radius: 8px;
  cursor: pointer;
}
</style>
