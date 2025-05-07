<template>
    <li class="all-user-list d-flex p-0" >
        <span class="number-row">{{ numberOfRow }}</span>
        <div class="d-flex flex-grow-1 flex align-items-center gap-1 p-2" style="height: 56px;">
          <img :src="user.image" class="img-user" />
          <span class="calender-username">{{ user.name }}</span>
        </div>
        <div class="calender-list-action">
          <span @click="$emit('viewUser', user)" class="cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.833252 9.99998C0.833252 9.99998 4.16659 3.33331 9.99992 3.33331C15.8333 3.33331 19.1666 9.99998 19.1666 9.99998C19.1666 9.99998 15.8333 16.6666 9.99992 16.6666C4.16659 16.6666 0.833252 9.99998 0.833252 9.99998Z" stroke="#2FDAC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#2FDAC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span @click="$emit('removeUser', user)" class="cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15" stroke="#DA302B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 5L15 15" stroke="#DA302B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
    </li>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    numberOfRow: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>
