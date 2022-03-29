// Layout
const VerticleLayout = () => import('../../../layouts/VerticleLayout')

// Reports (sales)
const mainReports = () => import('../views/mainReport')
const packageReports = () => import('../views/Packages/packageReports')
const leadReports = () => import('../views/Leads/leadReports')
const saleReports = () => import('../views/Sales/saleReports')
const salesReportDetails = () => import('../views/Sales/details')
const salesReportHistories = () => import('../views/Sales/histories')
const salesReportLeads = () => import('../views/Sales/leads')
const salesReportAchieved = () => import('../views/Sales/achieved')
const salesReportPayable = () => import('../views/Sales/payable')
const salesReportContracts = () => import('../views/Sales/contracts')

// Reports (members)
const memberReports = () => import('../views/Members/memberReports')
const memberReportVisits = () => import('../views/Members/visits')
const memberReportInvitations = () => import('../views/Members/invititions')
const memberReportFreeze = () => import('../views/Members/freeze')
const memberReportPayments = () => import('../views/Members/payments')
const memberReportDiscounts = () => import('../views/Members/discount')
const allMemberReports = () => import('../views/Members/allMembers')
const allPackagesReport = () => import('../views/Packages/packageDetails')

// start Routes
export default [
  {
    path: '/reports',
    name: 'reports',
    component: VerticleLayout,
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'reports',
        meta: { auth: true, name: 'reports' },
        component: mainReports,
        children: [
          {
            path: 'members',
            name: 'allMemberReports',
            meta: { auth: true, name: 'allMemberReports' },
            component: memberReports,
            children: [
              {
                path: '',
                name: 'allMemberReports',
                meta: { auth: true, name: 'allMemberReports' },
                component: allMemberReports
              },
              {
                path: 'visits',
                name: 'memberReportVisits',
                meta: { auth: true, name: 'memberReportVisits' },
                component: memberReportVisits
              },
              {
                path: 'invitations',
                name: 'memberReportInvitations',
                meta: { auth: true, name: 'memberReportInvitations' },
                component: memberReportInvitations
              },
              {
                path: 'freeze',
                name: 'memberReportFreeze',
                meta: { auth: true, name: 'memberReportFreeze' },
                component: memberReportFreeze
              },
              {
                path: 'payments',
                name: 'memberReportPayments',
                meta: { auth: true, name: 'memberReportPayments' },
                component: memberReportPayments
              },
              {
                path: 'discount',
                name: 'memberReportDiscounts',
                meta: { auth: true, name: 'memberReportDiscounts' },
                component: memberReportDiscounts
              }
            ]
          },
          {
            path: 'package',
            name: 'packageReports',
            meta: { auth: true, name: 'packageReports' },
            component: packageReports,
            children: [
              {
                path: '',
                name: 'allPackages',
                meta: { auth: true, name: 'allPackages' },
                component: allPackagesReport
              }
            ]
          },
          {
            path: 'lead',
            name: 'leadReports',
            meta: { auth: true, name: 'leadReports' },
            component: leadReports
          },
          {
            path: 'sales',
            name: 'saleReports',
            meta: { auth: true, name: 'saleReports' },
            component: saleReports,
            children: [
              {
                path: '',
                name: 'salesReportDetails',
                meta: { auth: true, name: 'salesReportDetails' },
                component: salesReportDetails
              },
              {
                path: 'histories',
                name: 'salesReportHistories',
                meta: { auth: true, name: 'salesReportHistories' },
                component: salesReportHistories
              },
              {
                path: 'leads',
                name: 'salesReportLeads',
                meta: { auth: true, name: 'salesReportLeads' },
                component: salesReportLeads
              },
              {
                path: 'archived',
                name: 'salesReportAchieved',
                meta: { auth: true, name: 'salesReportAchieved' },
                component: salesReportAchieved
              },
              {
                path: 'payable',
                name: 'salesReportPayable',
                meta: { auth: true, name: 'salesReportPayable' },
                component: salesReportPayable
              },
              {
                path: 'contracts',
                name: 'contract_amount',
                meta: { auth: true, name: 'contract_amount' },
                component: salesReportContracts
              },
              {
                path: 'leads',
                name: 'salesReportLeads',
                meta: { auth: true, name: 'salesReportLeads' },
                component: salesReportLeads
              }
            ]
          }
        ]
      }
    ]
  }
]
