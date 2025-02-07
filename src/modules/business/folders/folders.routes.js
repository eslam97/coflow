// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const List = () => import('./views/list')

// start routes
export default [
  {

    path: '/folders',
    name: 'folders',
    component: VerticalLayout,
    children: [
      {
        path: '',
        name: 'folders',
        component: List,
        meta: { name: 'Folders', userType: 'provider', serviceTypes: 'all' }
      }
    ]
  }
]
