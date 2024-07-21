// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const flowsList = () => import('./views/list')
const flowsFolders = () => import('./views/folders')

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
    }, {
      path: 'folders',
      name: 'flowsFolders',
      component: flowsFolders,
      meta: { name: 'Folders', userType: 'provider', serviceTypes: 'Flow' }
    }]
  }
]
