const VerticalLayout = () => import('@/layouts/VerticalLayout')

const customers = () => import('./views/index')
const managementlist = () => import('./views/management')
const activity = () => import('./views/activity')
const activityPurchasess = () => import('./views/activityPurchasess')
const activityGifts = () => import('./views/activityGifts')
const activityCollections = () => import('./views/activityCollections')

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
          component: activity,
          redirect: { name: 'customers.purchasess' },
          meta: { name: 'activity', userType: 'provider', serviceTypes: 'all' },
          children: [
            {
              path: 'purchasess',
              name: 'customers.purchasess',
              component: activityPurchasess,
              meta: { name: 'purchasess', userType: 'provider', serviceTypes: 'all' }
            },
            {
              path: 'gifts',
              name: 'customers.gifts',
              component: activityGifts,
              meta: { name: 'gifts', userType: 'provider', serviceTypes: 'all' }
            },
            {
              path: 'collections',
              name: 'customers.collections',
              component: activityCollections,
              meta: { name: 'collections', userType: 'provider', serviceTypes: 'all' }
            }
          ]
        }
      ]
    }]
  }
]
