// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const scheduleList = () => import('./views/list')

// start routes
export default [
  {
    path: '/schedule',
    name: 'schedule',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'schedule',
      component: scheduleList,
      meta: { name: 'schedule', userType: 'provider', serviceTypes: 'Flow' }
    }]
  }
]
