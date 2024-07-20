const VerticalLayout = () => import('../../../layouts/VerticalLayout.vue')

const BranchesList = () => import('./views/list.vue')

const BranchPage = () => import('./views/branchPage.vue')

export default [
  {
    path: '/branches',
    name: 'branches',
    component: VerticalLayout,
    meta: { auth: true },
    children: [
      {
        path: '/',
        name: 'branches',
        component: BranchesList,
        meta: { name: 'branches', userType: 'provider', serviceTypes: 'all' }
      },
      {
        path: '/branches/:id',
        name: 'branchPage',
        component: BranchPage,
        meta: { name: 'branchPage', userType: 'provider', serviceTypes: 'all' }
      }
    ]
  }
]
