// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const activitiesList = () => import('./views/list')
const activitiesFolders = () => import('./views/folders')

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
    }, {
      path: 'folders',
      name: 'activitiesFolders',
      component: activitiesFolders,
      meta: { name: 'Folders', userType: 'activities', serviceTypes: 'Pro' }
    }]
  }
]
