<template>
  <div>
    <div class="d-flex align-items-center">
      <div class="avatar mr-3">
        <!--  {{item}}-->
        <img :src="item.member? item.member.profile ? item.member.profile :
        require('@/assets/images/user/default_image.jpg') : require('@/assets/images/user/default_image.jpg')" :alt="item.profile" class="avatar-50 ">
        <span class="avatar-status">
        <i class="ri-checkbox-blank-circle-fill" :class="item.is_active ? 'text-success' :'text-warning'"/>
      </span>
      </div>
      <div class="chat-sidebar-name">
        <h6 class="mb-0">{{ item.name.length > 13 ? item.name.substring(0 , 13) + '...':  item.name }}</h6>
        <div v-if="item.last_message.chat_type == 'image'">
          <p class="m-0 text-success"><i class="las la-image "></i> Image</p>
          <p>{{item.last_message.caption ? item.last_message.caption : '' }}</p>
        </div>
        <div v-else-if="item.last_message.chat_type == 'ptt'" class="m-0">
          <p class="m-0 text-success"><i class="las la-microphone-alt "></i> Voice</p>
          <p>{{item.last_message.caption ? item.last_message.caption : '' }}</p>
        </div>
        <div v-else-if="item.last_message.chat_type == 'video'">
          <p class="m-0 text-success"><i class="las la-video"></i> Video</p>
          <p>{{item.last_message.caption ? item.last_message.caption : '' }}</p>
        </div>
        <div v-else-if="item.last_message.chat_type == 'location'">
          <p class="font-size-16 m-0 text-danger"><i class="las la-map-marked-alt"></i> Location</p>
        </div>
        <div v-else-if="item.last_message.chat_type == 'call_log'">
          <p v-if="item.last_message.message == '[Call - miss]'" class="font-size-16 m-0"><i
              class="las la-phone-slash text-danger"></i> Missed Call</p>
          <p v-else-if="item.last_message.message == '[Call - miss_video]'" class="font-size-16 m-0"><i
              class="las la-video text-danger"></i> Missed Video Call</p>
        </div>
        <div v-else-if="item.last_message.chat_type == 'vcard'">
          <p class="font-size-16 m-0 text-success"><i class="las la-id-card"></i> Card</p>
        </div>
        <p v-else class="m-0">{{ item.last_message.message.length > 20 ?
            item.last_message.message.substring(0 , 20) + '...':  item.last_message.message }}</p>
        <p class="font-size-12 font-weight-light text-gray text-right mb-0">{{timeConvertWhatsapp(item.last_message.created_at)}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChatItem',
  props: {
    item: { type: Object }
  }
}
</script>
