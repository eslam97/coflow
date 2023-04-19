// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const profileList = () => import('./views/list')

// start routes
export default [
  {
    path: '/profile',
    name: 'profile',
    component: VerticalLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'profile',
      component: profileList,
      meta: { name: 'profile', userType: 'provider', serviceTypes: 'all' }
    }]
  }
]
