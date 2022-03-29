<template>
  <div class="iq-card p-2">
    <ul class="m-0 p-0 nav nav-tabs justify-content-start">
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'checkInOut'}" exact>Check in/out</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'allmembers'}">All Members</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'newMember'}">New Guest/Member</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'freeze'}">Freeze</router-link>
      </li>
    </ul>
  </div>
</template>
