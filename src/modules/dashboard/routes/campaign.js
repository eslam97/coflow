// Layout
const VerticleLayout = () => import('../../../layouts/VerticleLayout')

const mainCampaign = () => import('../views/index')
const whatsappCampaign = () => import('../views/whatsapp')

// start Routes
export default [
  {
    path: '/campaign',
    name: 'campaign',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'campaign',
      meta: { auth: true, name: 'campaign' },
      component: mainCampaign,
      children: [{
        path: '',
        name: 'campaign',
        meta: { auth: true, name: 'campaign' },
        component: whatsappCampaign
      }]
    }]
  }
]
