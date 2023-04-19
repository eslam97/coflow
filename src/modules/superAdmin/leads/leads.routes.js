// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const leadslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/leads',
    name: 'leads',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'leads',
      component: leadslist,
      meta: { name: 'leads', userType: 'admin', permission: 'lead.list' }
    }
    ]
  }
]
