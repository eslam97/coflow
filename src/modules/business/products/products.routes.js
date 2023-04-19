// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const productList = () => import('./views/list')

// start routes
export default [
  {
    path: '/products',
    name: 'productList',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'productList',
      component: productList,
      meta: { name: 'productList', userType: 'provider', serviceTypes: 'Shop' }
    }]
  }
]
