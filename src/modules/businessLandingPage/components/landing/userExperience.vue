<template>
  <b-container class="userExp py-5">
    <div class="py-5 mt-5">
      <div class="header">
        <h3 class="text-center text-primary mb-2">User Experience, redefined</h3>
        <p class="text-center text-secondary font-size-12 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Ut <br/>pretium pretium tempor .</p>
      </div>
      <section class="experienceCard mt-4 pb-5">
       <b-row>
         <b-col md="4">
           <div class="p-4">
             <b-card class="iq-border-radius-20 text-center p-2 bg-transparent cursor-pointer hover_white">
               <img class="w-50 m-auto"
                    :src="require('@/assets/images/businessLanding/userExperience/Listings_of_your_business.png')"/>
               <h4 class="my-4">Listings of your business</h4>
               <p class="font-size-12 text-left">Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus,
                 sce-lerisque nec pharetra id, tempor a tortor.
               </p>
             </b-card>
           </div>
         </b-col>
         <b-col md="4">
           <div class="p-4">
             <b-card class="iq-border-radius-20 text-center p-2 cursor-pointer hover_transparent shadow-Card">
               <img class="w-50"
                    :src="require('@/assets/images/businessLanding/userExperience/Trackprogress.png')"/>
               <h4 class="mb-4 mt-3">Track Progress</h4>
               <p class="font-size-12 text-left">Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus,
                 sce-lerisque nec pharetra id, tempor a tortor.
               </p>
             </b-card>
           </div>
         </b-col>
         <b-col md="4">
           <div class="p-4">
             <b-card class="iq-border-radius-20 text-center p-2 bg-transparent cursor-pointer hover_white">
               <img class="w-50 m-auto"
                    :src="require('@/assets/images/businessLanding/userExperience/Oraganize_your_Services.png')"/>
               <h4 class="my-4">Oraganize your Services</h4>
               <p class="font-size-12 text-left">Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus,
                 sce-lerisque nec pharetra id, tempor a tortor.
               </p>
             </b-card>
           </div>
         </b-col>
       </b-row>
      </section>
    </div>
  </b-container>
</template>
