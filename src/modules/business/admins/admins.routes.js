// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const AdminsList = () => import('./views/list.vue')

// start routes
export default [
  {
    path: '/admins',
    name: 'admins',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'admins',
      component: AdminsList,
      meta: { name: 'admins', userType: 'provider', serviceTypes: 'all' }
    }]
  }
]
