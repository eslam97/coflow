// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const activitiesList = () => import('./views/list')

// start routes
export default [
  {
    path: '/activities',
    name: 'activities',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'activities',
      component: activitiesList,
      meta: { name: 'activities', userType: 'activities', serviceTypes: 'Pro' }
    }]
  }
]
