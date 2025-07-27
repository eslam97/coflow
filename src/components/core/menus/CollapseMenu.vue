<template>
    <b-collapse tag="ul" :class="className" :visible="open" :id="idName" :accordion="accordianName">
        <li v-for="(item,index) in items"  :key="index" :class="[!hideListMenuTitle? 'p-0' : item.is_heading ?
        'iq-menu-title' :activeLink(item) && item.children ? 'active' : activeLink(item) ? 'active' : '',
        item.class_name ? item.class_name: '']">
          <template>
            <template v-if="item.userType == userType">
              <template v-if="item.requiredAdmin ? ifBranchesAccess() : true">
                <component :is="!disableRoute(item) ? 'a' : 'router-link'" :to="disableRoute(item) ? item.link : ''" v-if="item.userType == 'provider' ? checkProviderType(item.serviceTypes) : hasPer() " :class="`iq-waves-effect ${activeLink(item) && item.children ? 'active' : activeLink(item) ? 'active' : ''}`" v-b-toggle="item.name">
                  <i :class="item.icon" v-if="item.is_icon_class"/>
                  <i v-else v-html="item.icon"></i>
                  <span>{{ $t(item.name) }}</span>
                  <small class="badge badge-warning badge-pill float-right font-weight-normal ml-auto" v-if="!disableRoute(item)">Premium</small>
                </component>
              </template>
            </template>
          </template>
        </li>
    </b-collapse>
</template>
<script>
// import List from './CollapseMenu'
import { core } from '../../../config/pluginInit'
export default {
  name: 'List',
  data () {
    return {
      facilitySubscription: JSON.parse(localStorage.getItem('userInfo'))?.facility?.subscription,
      userType: JSON.parse(localStorage.getItem('userInfo'))?.facility?.facility_type ? 'provider' : 'admin',
      facilityType: JSON.parse(localStorage.getItem('userInfo'))?.facility?.facility_type
    }
  },
  props: {
    items: Array,
    className: { type: String, default: 'iq-menu' },
    open: { type: Boolean, default: false },
    idName: { type: String, default: 'sidebar' },
    accordianName: { type: String, default: 'sidebar' },
    sidebarGroupTitle: { type: Boolean, default: true }
  },
  components: {
    // List
  },
  computed: {
    hideListMenuTitle () {
      return this.sidebarGroupTitle
    }
  },
  mounted () {
  },
  methods: {
    disableRoute (item) {
      return item.class_name === '' || (item.class_name === 'premium' && this.facilitySubscription !== 'basic')
    },
    activeLink (item) {
      return core.getActiveLink(item, this.$route.name)
    }
  }
}
</script>
