<template>
  <iq-card>
    <template v-slot:headerTitle>
      <h4 class="card-title">Invitations</h4>
    </template>
    <template  v-slot:body>
      <div v-if="!inviteLoading">
      <div v-if="allInvitationsPeople.length >0">
        <ul class="suggestions-lists m-0 p-0" id="inviteList">
          <li v-for="(item,index) in allInvitationsPeople" :key="index" class="d-flex mb-4 align-items-center">
            <div class="user-img img-fluid">
              <b-img :src="require('../../../assets/images/user/user-05.jpg')" alt="story-img" rounded="circle" class="avatar-40" />
            </div>
            <div class="media-support-info ml-3">
              <h6>{{ item.invited.name }}</h6><div>{{item.member_package.package_title}}</div>
            </div>
            <div>{{ item.created_at.substring(0, 10) }}</div>
          </li>
        </ul>
        <b-pagination v-model="inviteCurrentPage"
                      class="mt-3"
                      :total-rows="invitetotal"
                      align="right"
                      :per-page="inviteper_page"
                      aria-controls="inviteList"
                      @input="changeContent"
        ></b-pagination>
      </div>
      <div class="text-center" v-else>
        <img :src="require('../../../assets/images/error/invitations.png')" class="avatar-200" />
        <p class="font-size-18 pb-2">Oops!... no people found</p>
      </div>
      </div>
      <div class="about-info m-0 p-0" v-else>
        <div class="text-center">
          <b-spinner small type="grow"></b-spinner>
          Loading...
        </div>
      </div>
  <!--      <b-link href="javascript:void(0);" class="btn btn-primary d-block"><i class="ri-add-line"></i> Load More</b-link>-->
      </template>
  </iq-card>
</template>

<script>
import eventBus from '../../../eventBus'
export default {
  name: 'invitations',
  data () {
    return {
      inviteCurrentPage: 1,
      inviteper_page: 10,
      invitetotal: 6,
      inviteLoading: true,
      allInvitationsPeople: []
    }
  },
  methods: {
    getAllInvitations () {
      this.inviteLoading = true
      this.$store.dispatch('getAllInvitations', {
        pageNumber: this.inviteCurrentPage,
        memberId: this.$route.params.id
      }).then(res => {
        this.allInvitationsPeople = res.data.data
        this.inviteCurrentPage = res.data.meta.current_page
        this.inviteper_page = res.data.meta.per_page
        this.invitetotal = res.data.meta.total
        this.inviteLoading = false
      })
    },
    changeContent () {
      this.getAllInvitations()
    }
  },
  created () {
    this.getAllInvitations()
  },
  mounted () {
    eventBus.$on('invitation_event', () => {
      this.getAllInvitations()
    })
  },
  beforeDestroy () {
    eventBus.$off('invitation_event')
  }
}
</script>

<style scoped>

</style>
