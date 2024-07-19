<template>
  <b-container fluid>
    <main-modal id="scheduleDetailsModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'">
          <span class="text-warning">Add: </span> Flow Slots</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info">Edit: </span> Slot</h4>
      </template>
      <template v-slot:actions v-if="typeOfModal == 'edit'">
        <div class="d-flex">
          <div class="modal-embed-actions cursor-pointer" @click="deleteSlot">
            <i class="las la-trash-alt text-danger font-size-20"></i>
          </div>
          <div class="modal-embed-actions">
            <div class="d-flex justify-content-between">
              <span class="text-info font-weight-bold font-size-12 mr-3">Active</span>
              <div
                  class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0">
                <div class="custom-switch-inner">
                  <input type="checkbox" class="custom-control-input bg-info" :id="'status'"
                         @change="changeStatus(scheduleDetails.id, scheduleDetails.status_traker)"
                         v-model="scheduleDetails.status_traker">
                  <label class="custom-control-label" :for="'status'">
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:body>
        <calendar-details
          @addSlots="addSlots"
          @editSlot="editSlot"
          :requestLoading="requestLoading"
          :scheduleDetails="scheduleDetails"
          :allFlows="allFlows"
          :typeOfModal="typeOfModal"
        />
      </template>
    </main-modal>

    <section class="d-flex flex-column gap-2 mb-4">
        <h3>Calendar</h3>

        <b-card no-body class="d-flex flex-column align-items-center gap-1 p-3">
          <h4>December, 2023 - January, 2024</h4>
          <div class="d-flex align-items-center gap-2">
            <button class="btn border rounded-sm"><i class="fa fa-arrow-left"></i></button>
            <h5>1 - 7</h5>
            <button class="btn border rounded-sm"><i class="fa fa-arrow-right"></i></button>
          </div>
        </b-card>

        <div class="d-flex justify-content-between align-items-center flex-wrap">
          <div>
              <ul class="levels-list m-0 p-0 justify-content-center">
                  <li class="p-1" v-for="(level, key) in levels" :key="key">
                      <i class="fas fa-circle ml-3 mr-2" :class="`circle-${level.color}`"></i>
                      <span class="font-size-12">{{ level.text }}</span>
                  </li>
              </ul>
          </div>
          <div>
              <div class="d-flex justify-content-md-end justify-content-center gap-20">
                  <b-button variant="light" class="add_button text-dark" style="--iq-light:#fff">
                      <span>Settings<i class="fas fa fa-cog ml-3"></i></span>
                  </b-button>
                  <b-button @click="clearSchedule" variant="dark" class="add_button text-white">
                      <span>Clear Schedule<i class="fas fa-trash-alt ml-3"></i></span>
                  </b-button>
                  <b-button variant="light" class="add_button text-dark" style="--iq-light:#fff">
                      <span>Load Schedule<i class="fa fa-download ml-3"></i></span>
                  </b-button>
                  <b-button @click="openPopup" variant="warning" class="add_button text-white">
                      Add Calendar Slots<i class="fas fa-calendar-alt ml-3"></i></b-button>
              </div>
          </div>
        </div>
    </section>

    <b-row>
      <spinner-loading v-if="requestLoading"></spinner-loading>
      <b-col lg="12" v-if="allSlots.length > 0">
        <b-card class="overflow-auto text-center schedule-card">
          <b-row class="flex-nowrap m-0">
            <b-col class="schedule-col px-0" v-for="(day, key) in days" :key="key">
              <h6 class="py-3 calendar-header">
                <span>{{ day.day }}</span>
                <span>{{ day.value }}</span>
              </h6>
              <div
                v-for="(slot, slotKey) in allSlots.filter((ele) => { return ele.day === day.value })"
                :key="slotKey"
                class="p-2 d-flex justify-content-center align-items-center cursor-pointer slot-box calendar-slot-box"
                :class="(slot.status === 'active' || slot.status === true)?
                  `slot-box-${levels.find(l => l.value === slot.flow.level).color}` : 'slot-box-grey'"
                @click="showScheduleToEdit(slot)"
              >
                <div class="slot-box-content">
                  <ul class="">
                    <li>{{ formatTime(slot.from) }} - {{ formatTime(slot.to) }}</li>
                    <li class="font-size-18">{{ slot.flow.name }}</li>
                    <li class="d-flex align-items-center gap-1">
                      <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99027 10.0667V9.17227C9.36059 8.95854 9.67409 8.65891 9.90433 8.29862C10.1346 7.93834 10.2748 7.52797 10.3132 7.10213C10.528 7.04992 10.7212 6.93201 10.8659 6.76482C11.0105 6.59764 11.0994 6.3895 11.1202 6.1694C11.141 5.94931 11.0926 5.72821 10.9818 5.53691C10.871 5.3456 10.7033 5.19362 10.502 5.10213C10.5544 4.80411 10.5839 4.50252 10.5903 4.2V3.93333C10.5903 3.15536 10.2812 2.40926 9.73111 1.85915C9.18101 1.30905 8.4349 1 7.65693 1C6.87897 1 6.13286 1.30905 5.58275 1.85915C5.03265 2.40926 4.7236 3.15536 4.7236 3.93333V4.2C4.72994 4.50279 4.75945 4.80465 4.81187 5.10293C4.61061 5.19442 4.4429 5.34641 4.33209 5.53771C4.22129 5.72901 4.1729 5.9501 4.19368 6.1702C4.21446 6.3903 4.30336 6.59844 4.44801 6.76562C4.59266 6.93281 4.78585 7.05072 5.00067 7.10293C5.03919 7.52863 5.17948 7.93884 5.40972 8.29897C5.63995 8.65911 5.95338 8.95862 6.3236 9.17227V10.0667C5.40451 10.0677 4.52336 10.4333 3.87347 11.0832C3.22357 11.7331 2.85799 12.6142 2.85693 13.5333V15.9333C2.85693 16.2162 2.96931 16.4875 3.16935 16.6876C3.36939 16.8876 3.6407 17 3.9236 17H10.5903H11.3903C11.6732 17 10.7387 16.8926 10.9387 16.6925C11.1388 16.4925 10.8949 16.2574 10.8949 15.9745V13.5154C10.8944 13.0801 10.7955 12.2856 11.2163 11.8807C11.4397 11.6658 11.3874 11.668 11.9105 11.668C11.7764 11.4583 11.6192 11.262 11.4404 11.0832C10.7905 10.4333 9.90936 10.0677 8.99027 10.0667ZM7.65693 1.53333C8.26986 1.53409 8.85927 1.76932 9.30429 2.19079C9.74931 2.61226 10.0162 3.18802 10.0503 3.8C8.49946 3.2656 6.81441 3.2656 5.2636 3.8C5.29765 3.18802 5.56456 2.61226 6.00958 2.19079C6.4546 1.76932 7.04401 1.53409 7.65693 1.53333ZM10.0505 4.372C10.0365 4.60689 10.0084 4.84072 9.96653 5.07227C9.96002 5.10785 9.94528 5.14142 9.92349 5.1703C9.90169 5.19917 9.87345 5.22254 9.84101 5.23856C9.80857 5.25457 9.77284 5.26277 9.73666 5.26251C9.70049 5.26226 9.66487 5.25354 9.63267 5.23707C9.02156 4.91953 8.34548 4.74715 7.65693 4.73333C6.96839 4.74715 6.29231 4.91953 5.6812 5.23707C5.649 5.25348 5.61342 5.26216 5.57728 5.2624C5.54114 5.26265 5.50544 5.25446 5.47303 5.23848C5.44061 5.22251 5.41237 5.19919 5.39055 5.17038C5.36873 5.14157 5.35393 5.10807 5.34733 5.07253C5.30545 4.84072 5.2774 4.60661 5.26333 4.37147C6.80547 3.78657 8.5084 3.7871 10.0505 4.372ZM5.5236 6.86667C5.5236 6.79594 5.49551 6.72811 5.4455 6.6781C5.39549 6.6281 5.32766 6.6 5.25693 6.6C5.13413 6.60061 5.01491 6.55865 4.91955 6.48127C4.8242 6.40388 4.7586 6.29585 4.73392 6.17555C4.70925 6.05524 4.72701 5.93011 4.7842 5.82143C4.84139 5.71275 4.93447 5.62725 5.0476 5.57947C5.16081 5.69074 5.30619 5.76351 5.46311 5.78744C5.62003 5.81138 5.7805 5.78526 5.92173 5.7128C6.45825 5.43294 7.05197 5.28029 7.65693 5.26667C8.26192 5.28037 8.85564 5.43311 9.39213 5.71307C9.53304 5.78684 9.69383 5.8137 9.85106 5.78971C10.0083 5.76573 10.1538 5.69216 10.2663 5.57973C10.3792 5.62762 10.4721 5.71313 10.5292 5.82175C10.5863 5.93036 10.604 6.05538 10.5793 6.17557C10.5546 6.29576 10.4891 6.4037 10.3939 6.48107C10.2987 6.55844 10.1796 6.60046 10.0569 6.6C9.98621 6.6 9.91838 6.6281 9.86837 6.6781C9.81836 6.72811 9.79027 6.79594 9.79027 6.86667C9.79027 7.43246 9.56551 7.97508 9.16543 8.37516C8.76535 8.77524 8.22273 9 7.65693 9C7.09114 9 6.54852 8.77524 6.14844 8.37516C5.74836 7.97508 5.5236 7.43246 5.5236 6.86667ZM7.65693 9.53333C7.9284 9.53298 8.19821 9.49098 8.45693 9.4088V10.3333C8.45693 10.5455 8.37265 10.749 8.22262 10.899C8.07259 11.049 7.86911 11.1333 7.65693 11.1333C7.44476 11.1333 7.24128 11.049 7.09125 10.899C6.94122 10.749 6.85693 10.5455 6.85693 10.3333V9.4088C7.11566 9.49098 7.38547 9.53298 7.65693 9.53333ZM6.35027 10.6C6.41147 10.9014 6.57499 11.1724 6.81313 11.367C7.05127 11.5617 7.34937 11.668 7.65693 11.668C7.9645 11.668 8.2626 11.5617 8.50074 11.367C8.73887 11.1724 8.9024 10.9014 8.9636 10.6H8.99027C9.16923 10.6007 9.34775 10.6177 9.5236 10.6509V10.8667C9.52322 11.2216 9.42124 11.569 9.22972 11.8679C9.0382 12.1667 8.76514 12.4045 8.4428 12.5531C8.32545 12.4114 8.1711 12.305 7.99692 12.2458C7.82273 12.1866 7.63553 12.1768 7.45613 12.2176C7.22848 12.2614 7.0214 12.3784 6.86653 12.5509C6.54538 12.4018 6.27347 12.1641 6.08281 11.8657C5.89215 11.5674 5.79066 11.2208 5.79027 10.8667V10.6509C5.96612 10.6177 6.14464 10.6007 6.3236 10.6H6.35027ZM7.47587 13.7664C7.35437 13.7236 7.25267 13.638 7.18987 13.5256C7.12707 13.4131 7.10748 13.2816 7.1348 13.1557C7.16174 13.0263 7.23578 12.9115 7.34255 12.8336C7.44933 12.7557 7.58123 12.7202 7.71269 12.734C7.84414 12.7478 7.96579 12.81 8.05403 12.9084C8.14227 13.0068 8.19082 13.1345 8.19027 13.2667V14.8667H7.9236C7.85288 14.8667 7.78505 14.8386 7.73504 14.7886C7.68503 14.7386 7.65693 14.6707 7.65693 14.6V14.0187C7.65689 13.963 7.63944 13.9088 7.60701 13.8635C7.57459 13.8183 7.52856 13.7843 7.47587 13.7664ZM10.8949 15.9745C10.8949 16.116 10.9796 16.3666 10.8796 16.4667C10.7796 16.5667 10.465 16.515 10.3236 16.515L10.8796 16.4667L10.9521 14.1363C10.9521 14.0656 11.0352 13.8781 11.0562 13.918C11.0062 13.868 11.1269 13.7756 11.0562 13.7756C10.9855 13.7756 11.0852 13.8281 11.0352 13.8781C10.9852 13.9281 10.9521 14.1363 10.9521 14.1363L10.8796 16.4667H5.25693V14.0667C5.25693 13.9959 5.22884 13.9281 5.17883 13.8781C5.12882 13.8281 5.06099 13.8 4.99027 13.8C4.91954 13.8 4.85171 13.8281 4.80171 13.8781C4.7517 13.9281 4.7236 13.9959 4.7236 14.0667V16.4667H3.9236C3.78215 16.4667 3.6465 16.4105 3.54648 16.3105C3.44646 16.2104 3.39027 16.0748 3.39027 15.9333V13.5333C3.39122 12.9435 3.56981 12.3676 3.90277 11.8807C4.23572 11.3939 4.70761 11.0186 5.25693 10.8037V10.8667C5.25713 11.3185 5.38507 11.761 5.626 12.1432C5.86692 12.5254 6.211 12.8316 6.61853 13.0267C6.6164 13.0363 6.61267 13.0456 6.6108 13.0555C6.56554 13.2746 6.59078 13.5023 6.68289 13.7062C6.775 13.9101 6.92927 14.0796 7.1236 14.1904V14.6C7.1236 14.8122 7.20789 15.0157 7.35791 15.1657C7.50794 15.3157 7.71143 15.4 7.9236 15.4H8.19027C8.33172 15.4 8.46737 15.3438 8.56739 15.2438C8.66741 15.1438 8.7236 15.0081 8.7236 14.8667V13.2667C8.72367 13.1859 8.71473 13.1054 8.69693 13.0267C9.10419 12.8314 9.44796 12.5251 9.68859 12.1429C9.92922 11.7607 10.0569 11.3183 10.0569 10.8667V10.8037C10.6063 11.0186 11.0781 11.3939 11.4111 11.8807C11.101 11.8649 11.2901 11.6788 11.1569 11.8679C10.9041 12.2268 10.8943 13.129 10.8949 13.5154V15.9745Z" fill="currentColor"/>
                        <path d="M10.8949 15.9745C10.8949 16.2574 11.1388 16.4925 10.9387 16.6925C10.7387 16.8926 11.6732 17 11.3903 17H10.5903M10.8949 15.9745V13.5154M10.8949 15.9745C10.8949 16.116 10.9796 16.3666 10.8796 16.4667M10.8949 13.5154C10.8944 13.0801 10.7955 12.2856 11.2163 11.8807M10.8949 13.5154C10.8943 13.129 10.9041 12.2268 11.1569 11.8679C11.2901 11.6788 11.101 11.8649 11.4111 11.8807M10.8796 16.4667C10.7796 16.5667 10.465 16.515 10.3236 16.515L10.8796 16.4667ZM10.8796 16.4667L10.9521 14.1363M10.8796 16.4667H5.25693V14.0667C5.25693 13.9959 5.22884 13.9281 5.17883 13.8781C5.12882 13.8281 5.06099 13.8 4.99027 13.8C4.91954 13.8 4.85171 13.8281 4.80171 13.8781C4.7517 13.9281 4.7236 13.9959 4.7236 14.0667V16.4667H3.9236C3.78215 16.4667 3.6465 16.4105 3.54648 16.3105C3.44646 16.2104 3.39027 16.0748 3.39027 15.9333V13.5333C3.39122 12.9435 3.56981 12.3676 3.90277 11.8807C4.23572 11.3939 4.70761 11.0186 5.25693 10.8037V10.8667C5.25713 11.3185 5.38507 11.761 5.626 12.1432C5.86692 12.5254 6.211 12.8316 6.61853 13.0267C6.6164 13.0363 6.61267 13.0456 6.6108 13.0555C6.56554 13.2746 6.59078 13.5023 6.68289 13.7062C6.775 13.9101 6.92927 14.0796 7.1236 14.1904V14.6C7.1236 14.8122 7.20789 15.0157 7.35791 15.1657C7.50794 15.3157 7.71143 15.4 7.9236 15.4H8.19027C8.33172 15.4 8.46737 15.3438 8.56739 15.2438C8.66741 15.1438 8.7236 15.0081 8.7236 14.8667V13.2667C8.72367 13.1859 8.71473 13.1054 8.69693 13.0267C9.10419 12.8314 9.44796 12.5251 9.68859 12.1429C9.92922 11.7607 10.0569 11.3183 10.0569 10.8667V10.8037C10.6063 11.0186 11.0781 11.3939 11.4111 11.8807M10.8796 16.4667L10.5903 17M10.9521 14.1363C10.9521 14.0656 11.0352 13.8781 11.0562 13.918C11.0062 13.868 11.1269 13.7756 11.0562 13.7756C10.9855 13.7756 11.0852 13.8281 11.0352 13.8781C10.9852 13.9281 10.9521 14.1363 10.9521 14.1363ZM11.4111 11.8807L11.9105 11.668M11.4111 11.8807H11.2163M11.9105 11.668C11.7764 11.4583 11.6192 11.262 11.4404 11.0832C10.7905 10.4333 9.90936 10.0677 8.99027 10.0667V9.17227C9.36059 8.95854 9.67409 8.65891 9.90433 8.29862C10.1346 7.93834 10.2748 7.52797 10.3132 7.10213C10.528 7.04992 10.7212 6.93201 10.8659 6.76482C11.0105 6.59764 11.0994 6.3895 11.1202 6.1694C11.141 5.9493 11.0926 5.72821 10.9818 5.53691C10.871 5.3456 10.7033 5.19362 10.502 5.10213C10.5544 4.80411 10.5839 4.50252 10.5903 4.2V3.93333C10.5903 3.15536 10.2812 2.40926 9.73111 1.85915C9.18101 1.30905 8.4349 1 7.65693 1C6.87897 1 6.13286 1.30905 5.58275 1.85915C5.03265 2.40926 4.7236 3.15536 4.7236 3.93333V4.2C4.72994 4.50279 4.75945 4.80465 4.81187 5.10293C4.61061 5.19442 4.4429 5.3464 4.33209 5.53771C4.22129 5.72901 4.1729 5.9501 4.19368 6.1702C4.21446 6.3903 4.30336 6.59844 4.44801 6.76562C4.59266 6.93281 4.78585 7.05072 5.00067 7.10293C5.03919 7.52863 5.17948 7.93884 5.40972 8.29897C5.63995 8.65911 5.95338 8.95862 6.3236 9.17227V10.0667C5.40451 10.0677 4.52336 10.4333 3.87347 11.0832C3.22357 11.7331 2.85799 12.6142 2.85693 13.5333V15.9333C2.85693 16.2162 2.96931 16.4875 3.16935 16.6876C3.36939 16.8876 3.6407 17 3.9236 17H10.5903M11.9105 11.668C11.3874 11.668 11.4397 11.6659 11.2163 11.8807M7.65693 1.53333C8.26986 1.53409 8.85927 1.76932 9.30429 2.19079C9.74931 2.61226 10.0162 3.18802 10.0503 3.8C8.49946 3.2656 6.81441 3.2656 5.2636 3.8C5.29765 3.18802 5.56456 2.61226 6.00958 2.19079C6.4546 1.76932 7.04401 1.53409 7.65693 1.53333ZM10.0505 4.372C10.0365 4.60689 10.0084 4.84072 9.96653 5.07227C9.96002 5.10785 9.94528 5.14142 9.92349 5.1703C9.90169 5.19917 9.87345 5.22254 9.84101 5.23856C9.80857 5.25457 9.77284 5.26277 9.73666 5.26251C9.70049 5.26226 9.66487 5.25354 9.63267 5.23707C9.02156 4.91953 8.34548 4.74715 7.65693 4.73333C6.96839 4.74715 6.29231 4.91953 5.6812 5.23707C5.649 5.25348 5.61342 5.26216 5.57728 5.2624C5.54114 5.26265 5.50544 5.25446 5.47303 5.23848C5.44061 5.22251 5.41237 5.19919 5.39055 5.17038C5.36873 5.14157 5.35393 5.10807 5.34733 5.07253C5.30545 4.84072 5.2774 4.60661 5.26333 4.37147C6.80547 3.78657 8.5084 3.7871 10.0505 4.372ZM5.5236 6.86667C5.5236 6.79594 5.49551 6.72811 5.4455 6.6781C5.39549 6.6281 5.32766 6.6 5.25693 6.6C5.13413 6.60061 5.01491 6.55865 4.91955 6.48127C4.8242 6.40388 4.7586 6.29585 4.73392 6.17555C4.70925 6.05524 4.72701 5.93011 4.7842 5.82143C4.84139 5.71275 4.93447 5.62725 5.0476 5.57947C5.16081 5.69074 5.30619 5.76351 5.46311 5.78744C5.62003 5.81138 5.7805 5.78526 5.92173 5.7128C6.45825 5.43294 7.05197 5.28029 7.65693 5.26667C8.26192 5.28037 8.85564 5.43311 9.39213 5.71307C9.53304 5.78684 9.69383 5.8137 9.85106 5.78971C10.0083 5.76573 10.1538 5.69216 10.2663 5.57973C10.3792 5.62762 10.4721 5.71313 10.5292 5.82175C10.5863 5.93036 10.604 6.05538 10.5793 6.17557C10.5546 6.29576 10.4891 6.4037 10.3939 6.48107C10.2987 6.55844 10.1796 6.60046 10.0569 6.6C9.98621 6.6 9.91838 6.6281 9.86837 6.6781C9.81836 6.72811 9.79027 6.79594 9.79027 6.86667C9.79027 7.43246 9.56551 7.97508 9.16543 8.37516C8.76535 8.77524 8.22273 9 7.65693 9C7.09114 9 6.54852 8.77524 6.14844 8.37516C5.74836 7.97508 5.5236 7.43246 5.5236 6.86667ZM7.65693 9.53333C7.9284 9.53298 8.19821 9.49098 8.45693 9.4088V10.3333C8.45693 10.5455 8.37265 10.749 8.22262 10.899C8.07259 11.049 7.86911 11.1333 7.65693 11.1333C7.44476 11.1333 7.24128 11.049 7.09125 10.899C6.94122 10.749 6.85693 10.5455 6.85693 10.3333V9.4088C7.11566 9.49098 7.38547 9.53298 7.65693 9.53333ZM6.35027 10.6C6.41147 10.9014 6.57499 11.1724 6.81313 11.367C7.05127 11.5617 7.34937 11.668 7.65693 11.668C7.9645 11.668 8.2626 11.5617 8.50074 11.367C8.73887 11.1724 8.9024 10.9014 8.9636 10.6H8.99027C9.16923 10.6007 9.34775 10.6177 9.5236 10.6509V10.8667C9.52322 11.2216 9.42124 11.569 9.22972 11.8679C9.0382 12.1667 8.76514 12.4045 8.4428 12.5531C8.32545 12.4114 8.1711 12.305 7.99692 12.2458C7.82273 12.1865 7.63553 12.1768 7.45613 12.2176C7.22848 12.2614 7.0214 12.3784 6.86653 12.5509C6.54538 12.4018 6.27347 12.1641 6.08281 11.8657C5.89215 11.5674 5.79066 11.2208 5.79027 10.8667V10.6509C5.96612 10.6177 6.14464 10.6007 6.3236 10.6H6.35027ZM7.47587 13.7664C7.35437 13.7236 7.25267 13.638 7.18987 13.5256C7.12707 13.4131 7.10748 13.2816 7.1348 13.1557C7.16174 13.0263 7.23578 12.9115 7.34255 12.8336C7.44932 12.7557 7.58123 12.7202 7.71269 12.734C7.84414 12.7478 7.96579 12.81 8.05403 12.9084C8.14227 13.0068 8.19082 13.1345 8.19027 13.2667V14.8667H7.9236C7.85288 14.8667 7.78505 14.8386 7.73504 14.7886C7.68503 14.7386 7.65693 14.6707 7.65693 14.6V14.0187C7.65689 13.963 7.63944 13.9088 7.60701 13.8635C7.57459 13.8183 7.52856 13.7843 7.47587 13.7664Z" stroke="currentColor" stroke-width="0.1"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9613 17H15.2662C15.3984 17 15.5053 16.8931 15.5053 16.7609V11.7391C15.5053 11.6069 15.3984 11.5 15.2662 11.5H10.9613C10.829 11.5 10.7222 11.6069 10.7222 11.7391V16.7609C10.7222 16.8931 10.829 17 10.9613 17ZM15.0271 16.5218H11.2004V11.9782H15.0271V16.5218Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9613 17H15.2662C15.3984 17 15.5053 16.8931 15.5053 16.7609V11.7391C15.5053 11.6069 15.3984 11.5 15.2662 11.5H10.9613C10.829 11.5 10.7222 11.6069 10.7222 11.7391V16.7609C10.7222 16.8931 10.829 17 10.9613 17ZM15.0271 16.5218H11.2004V11.9782H15.0271V16.5218Z" stroke="currentColor" stroke-width="0.1"/>
                        <path d="M14.0703 12.6955H12.157C12.0539 12.6955 11.9626 12.6298 11.9303 12.532L11.6912 11.8147C11.6666 11.7417 11.679 11.6614 11.724 11.5992C11.7689 11.5368 11.8411 11.5 11.9181 11.5H14.3102C14.3869 11.5 14.4591 11.5368 14.5043 11.5995C14.5493 11.6619 14.5615 11.742 14.5371 11.8147L14.2975 12.532C14.2647 12.6298 14.1734 12.6955 14.0703 12.6955ZM12.3294 12.2173H13.8982L13.978 11.9782H12.2498L12.3294 12.2173ZM12.1567 14.3688C12.0955 14.3688 12.0343 14.3454 11.9877 14.2988L11.7483 14.0594C11.6548 13.9659 11.6548 13.8148 11.7483 13.7213C11.8418 13.6278 11.993 13.6278 12.0864 13.7213L12.3258 13.9607C12.4193 14.0542 12.4193 14.2053 12.3258 14.2988C12.2792 14.3454 12.218 14.3688 12.1567 14.3688Z" fill="currentColor"/>
                        <path d="M12.1567 14.3689C12.0955 14.3689 12.0343 14.3455 11.9877 14.2989C11.8942 14.2054 11.8942 14.0542 11.9877 13.9608L12.4657 13.4828C12.5592 13.3893 12.7103 13.3893 12.8038 13.4828C12.8973 13.5763 12.8973 13.7274 12.8038 13.8209L12.3258 14.2989C12.2792 14.3455 12.218 14.3689 12.1567 14.3689ZM14.3099 14.13H13.3544C13.2222 14.13 13.1153 14.0232 13.1153 13.8909C13.1153 13.7587 13.2222 13.6518 13.3544 13.6518H14.3099C14.4422 13.6518 14.549 13.7587 14.549 13.8909C14.549 14.0232 14.4422 14.13 14.3099 14.13ZM12.1567 15.805C12.0955 15.805 12.0343 15.7816 11.9877 15.735L11.7483 15.4956C11.6548 15.4021 11.6548 15.251 11.7483 15.1575C11.8418 15.064 11.993 15.064 12.0864 15.1575L12.3258 15.3968C12.4193 15.4903 12.4193 15.6415 12.3258 15.735C12.2792 15.7816 12.218 15.805 12.1567 15.805Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9876 15.7348C12.0342 15.7815 12.0954 15.8049 12.1567 15.8049C12.2179 15.8049 12.2791 15.7815 12.3257 15.7348L12.8037 15.2569C12.8972 15.1634 12.8972 15.0122 12.8037 14.9188C12.7102 14.8253 12.5591 14.8253 12.4656 14.9188L11.9876 15.3967C11.8941 15.4902 11.8941 15.6413 11.9876 15.7348ZM13.3544 15.566H14.3098C14.4421 15.566 14.5489 15.4591 14.5489 15.3269C14.5489 15.1947 14.4421 15.0878 14.3098 15.0878H13.3544C13.2221 15.0878 13.1152 15.1947 13.1152 15.3269C13.1152 15.4591 13.2221 15.566 13.3544 15.566Z" fill="currentColor"/>
                        </svg>

                      <span>{{ slot.instructor }}</span>
                    </li>
                    <li class="d-flex justify-content-between gap-1">
                      <span class="d-flex align-items-center">
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.57153 9.5C8.50453 9.5 10.0715 7.933 10.0715 6C10.0715 4.067 8.50453 2.5 6.57153 2.5C4.63854 2.5 3.07153 4.067 3.07153 6C3.07153 7.933 4.63854 9.5 6.57153 9.5Z" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.57153 4.5V6L7.32153 6.75" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.82652 8.67501L8.65152 10.59C8.629 10.8393 8.51377 11.0711 8.32862 11.2396C8.14347 11.4081 7.90186 11.501 7.65152 11.5H5.48652C5.23619 11.501 4.99458 11.4081 4.80943 11.2396C4.62427 11.0711 4.50905 10.8393 4.48652 10.59L4.31152 8.67501M4.31652 3.32501L4.49152 1.41001C4.51398 1.16155 4.62849 0.93045 4.81258 0.762085C4.99667 0.593719 5.23705 0.500243 5.48652 0.500008H7.66152C7.91186 0.498992 8.15347 0.591907 8.33862 0.760395C8.52377 0.928882 8.639 1.16069 8.66152 1.41001L8.83652 3.32501" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="text-decoration-underline">10 Waitting</span>
                      </span>
                      <span class="bg-white py-1 px-2 rounded-pill">AL</span>
                    </li>

                    <li>
                      <b-progress :max="10" :variant="levels.find(l => l.value === slot.flow.level).color" >
                        <b-progress-bar :value="7">
                          <span class="progress-label d-flex align-items-center justify-content-center gap-1">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.37043 7.99997C9.68264 7.99997 9.93097 7.80351 10.154 7.52876C10.6104 6.96639 9.86097 6.51697 9.57518 6.29689C9.2846 6.07314 8.96018 5.94639 8.63127 5.91664M8.2146 5.0833C8.78989 5.0833 9.25627 4.61693 9.25627 4.04164C9.25627 3.46634 8.78989 2.99997 8.2146 2.99997" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
                            <path d="M2.05883 7.99997C1.74662 7.99997 1.49829 7.80351 1.27533 7.52876C0.818884 6.96639 1.56829 6.51697 1.85412 6.29689C2.14467 6.07314 2.46909 5.94639 2.79801 5.91664M3.00635 5.0833C2.43105 5.0833 1.96468 4.61693 1.96468 4.04164C1.96468 3.46634 2.43105 2.99997 3.00635 2.99997" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
                            <path d="M4.08293 6.79631C3.65719 7.05956 2.54093 7.5971 3.2208 8.26973C3.55292 8.59831 3.92281 8.83331 4.38786 8.83331H7.04151C7.50655 8.83331 7.87643 8.59831 8.20855 8.26973C8.88843 7.5971 7.77218 7.05956 7.34643 6.79631C6.34805 6.17898 5.0813 6.17898 4.08293 6.79631Z" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7.17301 3.62496C7.17301 4.43038 6.5201 5.08329 5.71468 5.08329C4.90926 5.08329 4.25635 4.43038 4.25635 3.62496C4.25635 2.81954 4.90926 2.16663 5.71468 2.16663C6.5201 2.16663 7.17301 2.81954 7.17301 3.62496Z" stroke="currentColor" stroke-width="0.8"/>
                            </svg>
                            <strong>7/10</strong>
                          </span>
                        </b-progress-bar>
                      </b-progress>
                    </li>
                  </ul>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col v-else-if="!requestLoading" md="12" class="text-center text-black">
        <b-card> No Available slots</b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'
import calendarDetails from '@/modules/business/calendar/components/calendarDetails'
import calendarServices from '@/modules/business/calendar/services/calendar.sevices'
import flowsServices from '@/modules/business/flows/services/flows.services'
import mainService from '@/services/main'
import EventBus from '@/eventBus'

export default {
  data () {
    return {
      requestLoading: false,
      typeOfModal: 'add',
      scheduleDetails: {},
      scheduleId: '',
      allFlows: [],
      allSlots: [],
      levels: [
        {
          text: 'ALL LEVELS',
          value: 'all',
          color: 'blue'
        },
        {
          text: 'BEGINNER',
          value: 'beginner',
          color: 'cyan'
        },
        {
          text: 'INTERMEDIATE',
          value: 'intermediate',
          color: 'orange'
        },
        {
          text: 'ADVANCED',
          value: 'advanced',
          color: 'red'
        },
        {
          text: 'LADIES ONLY',
          color: 'pink'
        }
      ],
      days: [
        {
          key: 'SUN',
          day: '1',
          value: 'sunday'
        }, {
          key: 'MON',
          day: '2',
          value: 'monday'
        }, {
          key: 'TUE',
          day: '3',
          value: 'tuesday'
        }, {
          key: 'WED',
          day: '4',
          value: 'wednesday'
        }, {
          key: 'THU',
          day: '5',
          value: 'thursday'
        }, {
          key: 'FRI',
          day: '6',
          value: 'friday'
        }, {
          key: 'SAT',
          day: '7',
          value: 'saturday'
        }
      ],
      scheduleDetailsFront: {}
    }
  },
  components: {
    calendarDetails
  },
  methods: {
    openPopup () {
      this.scheduleId = ''
      this.typeOfModal = 'add'
      this.scheduleDetails = false
      this.$bvModal.show('scheduleDetailsModal')
    },
    addSlots (schedule) {
      this.requestLoading = true
      calendarServices.setNewSlot(schedule).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getSchedule()
        this.$bvModal.hide('scheduleDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editSlot (slotId, schedule) {
      this.requestLoading = true
      calendarServices.editSchedule(slotId, schedule).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getSchedule()
        this.$bvModal.hide('scheduleDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showScheduleToEdit (obj) {
      this.typeOfModal = 'edit'
      this.scheduleDetailsFront = obj
      calendarServices.getScheduleDetails(obj.id).then(res => {
        this.scheduleDetails = res.data.data
        this.scheduleDetails.status_traker = this.scheduleDetails.status === 'active'
        this.scheduleDetails.slotId = obj.id
        this.$bvModal.show('scheduleDetailsModal')
      })
    },
    getAllFlows () {
      this.requestLoading = true
      flowsServices.getAllFlowsLimit().then(res => {
        this.allFlows = res.data.data.data
        this.requestLoading = false
      })
    },
    getSchedule () {
      this.requestLoading = true
      calendarServices.getAllSlots().then(res => {
        this.allSlots = res.data.data.data
        this.requestLoading = false
      })
    },
    deleteSlot () {
      EventBus.$emit('openDeleteModal', {
        actionHeader: 'Clear',
        titleHeader: 'Slot',
        textContent: `${this.scheduleDetailsFront.flow.name} in ${this.scheduleDetailsFront.day} `,
        question: 'Are you sure you want to delete this slot from the schedule?',
        textDeleteButton: 'YES, Clear',
        textCancelButton: 'NO, CANCEL',
        icon: 'las la-trash-alt',
        type: 'delete',
        actionOnAlert: '',
        text: 'Clear',
        url: 'schedules',
        rowId: this.scheduleDetailsFront.id
      })
    },
    clearSchedule () {
      EventBus.$emit('openDeleteModal', {
        actionHeader: 'Delete',
        titleHeader: 'Schedule',
        textContent: 'Are you sure you want to delete all slots in the schedule?',
        question: '',
        textDeleteButton: 'YES, Delete',
        textCancelButton: 'NO, CANCEL',
        icon: 'las la-trash-alt',
        type: 'delete',
        actionOnAlert: '',
        text: 'Delete',
        url: 'destroy-all-schedule',
        method: 'get',
        rowId: this.scheduleDetailsFront.id
      })
    },
    changeStatus (id, status) {
      const obj = {
        schedule_id: id,
        status: status ? 'active' : 'inactive',
        type: 'schedule'
      }
      mainService.changeStatus(obj).then(res => {
        this.scheduleDetails.status = obj.status
        this.getSchedule()
        core.showSnackbar('success', res.data.message)
      }).catch(() => {
        this.scheduleDetails.status = !status
      })
    },
    formatTime (time) {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]
      time.splice(4)
      if (time.length > 1) {
        time = time.slice(1)
        time[5] = +time[0] < 12 ? ' AM' : ' PM'
        time[0] = +time[0] % 12 || 12
      }
      return time.join('')
    }
  },
  created () {
    this.getSchedule()
    this.getAllFlows()
    EventBus.$on('reloadTableAfterDelete', ifReload => {
      this.$bvModal.hide('scheduleDetailsModal')
      this.getSchedule()
      core.showSnackbar('success', 'Data deleted successfully')
    })
  },
  beforeDestroy () {
  },
  mounted () {
    core.index()
  }
}
</script>
