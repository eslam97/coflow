const VerticalLayout = () => import('@/layouts/VerticalLayout')

const customers = () => import('./views/index')
const managementlist = () => import('./views/management')
const activityList = () => import('./views/activity')

export default [
  {
    path: '/business/customers',
    name: 'BusinessCustomers',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'BusinessCustomers',
      component: customers,
      redirect: { name: 'customers.management' },
      meta: { name: 'customers', userType: 'provider', serviceTypes: 'all' },
      children: [
        {
          path: 'management',
          name: 'customers.management',
          component: managementlist,
          meta: { name: 'management', userType: 'provider', serviceTypes: 'all' }
        },
        {
          path: 'activity',
          name: 'customers.activity',
          component: activityList,
          meta: { name: 'activity', userType: 'provider', serviceTypes: 'all' }
        }
      ]
    }]
  }
]
