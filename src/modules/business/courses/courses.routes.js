// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const coursesList = () => import('./views/list')

// start routes
export default [
  {
    path: '/courses',
    name: 'courses',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'courses',
      component: coursesList,
      meta: { name: 'courses', userType: 'provider', serviceTypes: 'Pro' }
    }]
  }
]
