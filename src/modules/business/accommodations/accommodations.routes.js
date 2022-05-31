// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const accommodationsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/accommodations',
    name: 'accommodations',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'accommodations',
      meta: { auth: true, name: 'accommodations' },
      component: accommodationsList
    }]
  }
]
