// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const productList = () => import('./views/list')

// start routes
export default [
  {
    path: '/products',
    name: 'productList',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'productList',
      meta: { auth: true, name: 'productList' },
      component: productList
    }]
  }
]
