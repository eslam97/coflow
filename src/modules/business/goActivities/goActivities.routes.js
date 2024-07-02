// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const goActivitiesList = () => import('./views/list')
const goActivitiesFolders = () => import('./views/folders')

// start routes
export default [
  {
    path: '/go-activities',
    name: 'goActivities',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'goActivities',
      component: goActivitiesList,
      meta: { name: 'Activities', userType: 'provider', serviceTypes: 'Go' }
    }, {
      path: '/folders',
      name: 'goActivitiesFolders',
      component: goActivitiesFolders,
      meta: { name: 'Folders', userType: 'provider', serviceTypes: 'Go' }
    }]
  }
]
