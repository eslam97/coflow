// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const goActivitiesList = () => import('./views/list')

// start routes
export default [
  {
    path: '/pro-activities',
    name: 'proActivities',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'proActivities',
      component: goActivitiesList,
      meta: { name: 'proActivities', userType: 'provider', serviceTypes: 'Pro' }
    }
    ]
  }
]
