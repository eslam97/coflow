// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const flowsList = () => import('./views/list')
const flowsFolders = () => import('./views/folder')

// start routes
export default [
  {
    path: '/flows',
    name: 'flows',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'flows',
      component: flowsList,
      meta: { name: 'flows', userType: 'provider', serviceTypes: 'Flow' }
    },
    {
      path: 'folders',
      name: 'flowFolders',
      component: flowsFolders,
      meta: { name: 'flowFolders', userType: 'provider', serviceTypes: 'all' }
    }
    ]
  }
]
