// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const productList = () => import('./views/list')

// start routes
export default [
  {
    path: '/products',
    name: 'productList',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'productList',
      component: productList,
      meta: { name: 'productList', userType: 'provider', serviceTypes: 'SHOP' }
    }]
  }
]
