// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const profileList = () => import('./views/list')

// start routes
export default [
  {
    path: '/facility',
    name: 'facility',
    component: VerticalLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'facility',
      component: profileList,
      meta: { name: 'profile', userType: 'provider', serviceTypes: 'all' }
    }]
  }
]
