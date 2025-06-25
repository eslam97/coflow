// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const proActivitiesList = () => import('./views/list')
const proActivitiesFolders = () => import('./views/folder.vue')

// start routes
export default [
  {
    path: '/pro-activities',
    name: 'proActivities',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'proActivities',
      component: proActivitiesList,
      meta: { name: 'proActivities', userType: 'provider', serviceTypes: 'Pro' }
    },
    {
      path: 'folders',
      name: 'proActivityFolders',
      component: proActivitiesFolders,
      meta: { name: 'proActivityFolders', userType: 'provider', serviceTypes: 'all' }
    }
    ]
  }
]
