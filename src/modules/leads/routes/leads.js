// Layout
const VerticleLayout = () => import('../../../layouts/VerticleLayout')

const Leads = () => import('../views/allLeads')

// start Routes
export default [
  {
    path: '/leads',
    name: 'leads',
    component: VerticleLayout,
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'leads',
        meta: { auth: true, name: 'leads' },
        component: Leads
      }
    ]
  }
]
