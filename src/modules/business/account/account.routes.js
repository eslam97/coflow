// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const AccountList = () => import('./views/list.vue')

// start routes
export default [
  {
    path: '/accounts',
    name: 'accounts',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'accounts',
      component: AccountList,
      meta: { name: 'accounts', userType: 'provider', serviceTypes: 'all' }
    }]
  }
]
