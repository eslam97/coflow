// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const calendarList = () => import('./views/list')

// start routes
export default [
  {
    path: '/calendar',
    name: 'calendar',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'calendar',
      component: calendarList,
      meta: { name: 'calendar', userType: 'provider', serviceTypes: 'all' }
    }]
  }
]
