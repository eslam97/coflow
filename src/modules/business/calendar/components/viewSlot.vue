<template>
    <div>

      <!-- Reservation -->
      <div>
        <h5 class="calender-label">Reservations</h5>
        <ul class="m-0 p-0">
          <li class="all-user-list d-flex p-0"  v-for="(user, key) in details.reserved" :key="key">
            <span class="number-row">{{ key + 1 }}</span>
            <div class="d-flex flex-grow-1 flex align-items-center gap-1 p-2" style="height: 56px;">
              <img src="@/assets/images/user/user.jpg" class="img-user" />
              <span class="calender-username">Ahmed Mohamed</span>
            </div>
            <div class="calender-list-action">
              <span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.833252 9.99998C0.833252 9.99998 4.16659 3.33331 9.99992 3.33331C15.8333 3.33331 19.1666 9.99998 19.1666 9.99998C19.1666 9.99998 15.8333 16.6666 9.99992 16.6666C4.16659 16.6666 0.833252 9.99998 0.833252 9.99998Z" stroke="#2FDAC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#2FDAC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15" stroke="#DA302B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5 5L15 15" stroke="#DA302B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </li>
          <li class="all-user-list d-flex p-0 !border-t-0">
            <span class="number-row">2</span>
            <div class="d-flex flex-grow-1 flex align-items-center gap-1 p-2" style="height: 56px;">
              <span class="calender-addCustomer">Add Customer</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.16663V15.8333" stroke="#FE9E12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.16675 10H15.8334" stroke="#FE9E12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </li>
        </ul>
      </div>
      <!-- end Reservation-->

      <!-- Waiting -->
      <div class="mt-4">
        <h5 class="calender-label">Waiting</h5>
        <ul class="m-0 p-0">
          <li class="all-user-list d-flex p-0">
            <span class="number-row">1</span>
            <div class="d-flex flex-grow-1 flex align-items-center gap-1 p-2">
              <img src="@/assets/images/user/user.jpg" class="img-user" />
              <span class="calender-username">Ahmed Mohamed</span>
            </div>
            <div class="calender-list-action">
              <span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.833252 9.99998C0.833252 9.99998 4.16659 3.33331 9.99992 3.33331C15.8333 3.33331 19.1666 9.99998 19.1666 9.99998C19.1666 9.99998 15.8333 16.6666 9.99992 16.6666C4.16659 16.6666 0.833252 9.99998 0.833252 9.99998Z" stroke="#2FDAC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#2FDAC2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15" stroke="#DA302B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5 5L15 15" stroke="#DA302B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <!-- end waiting-->

    </div>
</template>

<script>

export default {
  name: 'ViewSlot',
  props: {
    details: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.img-user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.number-row {
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #434253;
  border-right: 1px solid #F0F0F0;
}
.calender-username {
  color: #19182A;
  font-size: 14px;
  font-weight: 500;
}
.all-user-list {
  border: 1px solid #F0F0F0;
}
.calender-list-action {
  border-left: 1px solid #F0F0F0;
  display: flex;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
}
.calender-addCustomer {
  font-size: 16px;
  font-weight: 500;
  color: #FE9E12;
}
.calender-label {
  color: #19182A;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px !important;
}
</style>
