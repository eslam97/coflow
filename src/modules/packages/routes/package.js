// Layout
const VerticleLayout = () => import('../../../layouts/VerticleLayout')

const mainPackage = () => import('../views/main')
const listsPackage = () => import('../views/list')
const addPackage = () => import('../views/addPackage')
const addService = () => import('../views/addService')

// start Routes
export default [
  {
    path: '/package',
    name: 'package',
    component: VerticleLayout,
    children: [
      {
        path: '',
        name: 'package',
        meta: { auth: true, name: 'package' },
        component: mainPackage,
        children: [
          {
            path: 'show-package',
            name: 'package',
            meta: { auth: true, name: 'package' },
            component: listsPackage
          },
          {
            path: 'add-package',
            name: 'addPackage',
            meta: { auth: true, name: 'addPackage' },
            component: addPackage
          },
          {
            path: 'add-service',
            name: 'addServices',
            meta: { auth: true, name: 'addServices' },
            component: addService
          }
        ]
      }
    ]
  }
]
