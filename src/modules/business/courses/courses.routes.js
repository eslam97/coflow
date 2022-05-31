// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const coursesList = () => import('./views/list')

// start routes
export default [
  {
    path: '/courses',
    name: 'courses',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'courses',
      meta: { auth: true, name: 'courses' },
      component: coursesList
    }]
  }
]
