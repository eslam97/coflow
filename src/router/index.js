import Vue from 'vue'
import VueRouter from 'vue-router'

import reports from '../modules/reports/routes/reports'
import leads from '../modules/leads/routes/leads'
import sales from '../modules/sales/routes/sales'
import packages from '../modules/packages/routes/package'
import franchise from '../modules/franchise/routes/franchise'
import reminder from '../modules/reminder/routes/reminder'
import financialReport from '../modules/financialReport/routes/report'
import campaign from '../modules/campaign/routes/campaign'

// Import Super Admin Routes
import activation from '@/modules/superAdmin/activation/activation.routes'
import profiles from '@/modules/superAdmin/profiles/profiles.routes'
import landmarks from '@/modules/superAdmin/landmarks/landmarks.routes'
import services from '@/modules/superAdmin/services/services.routes'
import promotions from '@/modules/superAdmin/promotions/promotions.routes'
import customers from '@/modules/superAdmin/customers/customers.routes'
/*
import settings from '@/modules/superAdmin/settings/settings.routes'
*/
import notifications from '@/modules/superAdmin/notifications/notifications.routes'
import analytics from '@/modules/superAdmin/analytics/analytics.routes'
import admin from '@/modules/superAdmin/admin/admin.routes'
/* Layouts */
const VerticleLayout = () => import('../layouts/VerticleLayout')
const Default = () => import('../layouts/BlankLayout')
const AuthLayout = () => import('../layouts/AuthLayouts/AuthLayout')
const HorizantalLayout = () => import('../layouts/HorizantalLayout')
/* Dashboards View */
const Dashboard1 = () => import('../views/Dashboards/Dashboard1.vue')
const Dashboard2 = () => import('../views/Dashboards/Dashboard2.vue')
const Dashboard3 = () => import('../views/Dashboards/Dashboard3')
const Dashboard4 = () => import('../views/Dashboards/Dashboard4')
const Dashboard5 = () => import('../views/Dashboards/Dashboard5')
const Dashboard6 = () => import('../views/Dashboards/Dashboard6')
/* UIElements View */
const UiAlerts = () => import('../views/core/UiAlerts.vue')
const UiButtons = () => import('../views/core/UiButtons.vue')
const UiBadges = () => import('../views/core/UiBadges.vue')
const UiBreadcrumb = () => import('../views/core/UiBreadcrumb.vue')
const UiColors = () => import('../views/core/UiColors.vue')
const UiTypography = () => import('../views/core/UiTypography.vue')
const UiCards = () => import('../views/core/UiCards.vue')
const UiCarousel = () => import('../views/core/UiCarousel.vue')
const UiEmbedVideo = () => import('../views/core/UiEmbedVideo.vue')
const UiGrid = () => import('../views/core/UiGrid.vue')
const UiModal = () => import('../views/core/UiModal.vue')
const UiListGroup = () => import('../views/core/UiListGroup.vue')
const UiImages = () => import('../views/core/UiImages.vue')
const UiMediaObject = () => import('../views/core/UiMediaObject.vue')
const UiTooltips = () => import('../views/core/UiTooltips.vue')
const UiPopovers = () => import('../views/core/UiPopovers.vue')
const UiNotifications = () => import('../views/core/UiNotifications.vue')
const UiTabs = () => import('../views/core/UiTabs.vue')
const UiPagination = () => import('../views/core/UiPagination.vue')
const UiProgressBars = () => import('../views/core/UiProgressBars.vue')
/* Authentic View */
const SignIn1 = () => import('../views/AuthPages/Default/SignIn1')
const SignUp1 = () => import('../views/AuthPages/Default/SignUp1')
const RecoverPassword1 = () => import('../views/AuthPages/Default/RecoverPassword1')
const LockScreen1 = () => import('../views/AuthPages/Default/LockScreen1')
const ConfirmMail1 = () => import('../views/AuthPages/Default/ConfirmMail1')
const Callback = () => import('../views/AuthPages/Default/Callback')
/* Extra Pages */
const ErrorPage = () => import('../views/Pages/ErrorPage')
const ComingSoon = () => import('../views/Pages/ComingSoon')
const Maintenance = () => import('../views/Pages/Maintenance')
const TimeLine = () => import('../views/Pages/TimeLines')
const Pricing = () => import('../views/Pages/Pricing')
const Pricing1 = () => import('../views/Pages/Pricing1')
const BlankPage = () => import('../views/Pages/BlankPage')
const FAQ = () => import('../views/Pages/FAQ')
const Invoice = () => import('../views/Pages/Invoice')
/* Apps Views */
const EmailListing = () => import('../views/Apps/Email/EmailListing')
const EmailCompose = () => import('../views/Apps/Email/EmailCompose')
const Calendar = () => import('../views/Apps/Calendar/Calendar')
const ECommerceListing = () => import('../views/Apps/Ecommerce/Listing')
const Checkout = () => import('../views/Apps/Ecommerce/Checkout')
const Wishlist = () => import('../views/Apps/Ecommerce/Wishlist')
const EcommerceDetail = () => import('../views/Apps/Ecommerce/Detail')
const ChatIndex = () => import('../views/Apps/Chat/Index')
const ProjectBoard = () => import('../views/Apps/ProjectManagement/ProjectBoard')
/* Icon Views */
const IconDripicons = () => import('../views/Icons/IconDripicons')
const IconFontawesome5 = () => import('../views/Icons/IconFontawesome5')
const IconLineAwesome = () => import('../views/Icons/IconLineAwesome')
const IconRemixicon = () => import('../views/Icons/IconRemixicon')
const IconUnicons = () => import('../views/Icons/IconUnicons')
/* Tables Views */
const TablesBasic = () => import('../views/Tables/TablesBasic')
const EditableTable = () => import('../views/Tables/EditableTable')
/* Charts View */
const ApexCharts = () => import(/* webpackPrefetch: true */ /* webpackChunkName: "ApexChart" */ '../views/Charts/ApexCharts')
const AmCharts = () => import(/* webpackPrefetch: true */ /* webpackChunkName: "AmCharts" */'../views/Charts/AmCharts')
const HighCharts = () => import(/* webpackPrefetch: true */ /* webpackChunkName: "HighCharts" */'../views/Charts/HighCharts')
/* Google Map */
const GoogleMaps = () => import('../views/Maps/GoogleMaps')
/* Form View */
const FormLayout = () => import('../views/Forms/FormLayout')
const FormValidates = () => import('../views/Forms/FormValidates')
const FormSwitches = () => import('../views/Forms/FormSwitches')
const FormRadios = () => import('../views/Forms/FormRadios')
const FormCheckboxes = () => import('../views/Forms/FormCheckboxes')
/* User View */
const Profile = () => import('../views/User/Profile')
const ProfileEdit = () => import('../views/User/ProfileEdit')
const AddUser = () => import('../views/User/AddUser')
const UserList = () => import('../views/User/UserList')
/* Apps View */
const SocialApp = () => import('../views/Apps/Social/SocialApp')
const TodoListing = () => import('../views/Apps/Todo/TodoListing')
/* Plugins Views */
const DatepickerDemo = () => import('../views/Plugins/DatepickerDemo')
const SelectDemo = () => import('../views/Plugins/SelectDemo')
const DragDropDemo = () => import('../views/Plugins/DragDropDemo')
const AppTreeView = () => import('../views/Plugins/AppTreeView')
/* Settings View */
const userAndPermissionsMain = () => import('../views/settings/user&permissions/userAndPermissionsMain')
const UserAndPermissions = () => import('../views/settings/UsersAndPermissions')
const Projects = () => import('../views/settings/Projects')
const enterprises = () => import('../views/settings/Enterprises')
const settingNotifications = () => import('../views/settings/notifications')
const settingWhatsapp = () => import('../views/settings/whatsapp')
const Roles = () => import('../views/settings/Roles')
const settings = () => import('../views/settings/settings')
const leadsFrom = () => import('../views/settings/LeadSettings')
const sources = () => import('../views/settings/sources')
const callStatus = () => import('../views/settings/callStatus')
const inquiries = () => import('../views/settings/Inquiries')
const departments = () => import('../views/settings/Departments/departments')
const inputs = () => import('../views/settings/Inputs/inputs')
const packagesSetting = () => import('../views/settings/Packages/packages')
const financeSetting = () => import('../views/settings/Finance/finance')
const showRoleSettings = () => import('../views/settings/Groups&Permissions/GroupsAndPermissions')
const groupSettings = () => import('../views/settings/Groups&Permissions/groups')
const permissionSettings = () => import('../views/settings/Groups&Permissions/permissions')
const restorePage = () => import('../views/settings/Restore/restore')
const tasksCategories = () => import('../views/settings/tasksCategories')
const settingsystem = () => import('../views/settings/system')

// members
const membersMainPage = () => import('../views/Members/member')
const showAllMembersPage = () => import('../views/Members/allMembers')
const showAllchecks = () => import('../views/Members/checkInOut')
const newMemberPage = () => import('../views/Members/newMember')
const memberFreeze = () => import('../views/Members/freeze')
const memberProfile = () => import('../views/Members/profile')
// desk
const deskMainPage = () => import('../views/Desk/desk')
// accounting
const mainAccounting = () => import('../views/Accounting/accounting')
const discounts = () => import('../views/Accounting/discounts')
const accountingRefund = () => import('../views/Accounting/refund')
const accountingtransfer = () => import('../views/Accounting/transfer')
const accountingDynamic = () => import('../views/Accounting/dynamicActions')
const accountingBalance = () => import('../views/Accounting/balance')

// notificationsSetting
const notificationsSetting = () => import('../views/Notifications/notifications')

// whatsapp
const whatsappView = () => import('../views/Whatsapp/whatsapp')

// tasks
const tasksPage = () => import('../views/Tasks/TodoListing')

// tasks
const complainPage = () => import('../views/Complains/complain')

// welcome Page
const welcomeUser = () => import('../views/settings/user&permissions/welcomeUser')
const welcomeSetting = () => import('../views/settings/welcomeSettings')
const welcomeMember = () => import('../views/Members/welcomeMember')
const welcomeAccounting = () => import('../views/Accounting/welcomeAccounting')

const userSetting = () => import('../views/ProfileSettings/settings')
const defaultProject = () => import('../views/ProfileSettings/defaultProject')
const resetPassword = () => import('../views/ProfileSettings/resetPassword')
const tree = () => import('../views/tree')

// target
const welcomeTarget = () => import('../views/Target/welcomeTarget')
const target = () => import('../views/Target/target')
const salesTarget = () => import('../views/Target/salesTarget')
const targetStructure = () => import('../views/Target/targetStructure')
const managersTarget = () => import('../views/Target/managersTarget')

const leadProfile = () => import('../views/Leads/leadProfile')

// const franchise = () => import('../views/Dashboards/franchies')

Vue.use(VueRouter)

const childRoutes = (prop) => [
  {
    path: 'home-1',
    name: prop + '.home-1',
    meta: { auth: true, name: 'Home 1', layout: 'mini-sidebar-right-fix' },
    component: Dashboard1
  },
  {
    path: 'index',
    name: prop + '.home-2',
    meta: { auth: true, name: 'Home 2' },
    component: Dashboard2
  },
  {
    path: 'home-5',
    name: prop + '.home-5',
    meta: { auth: true, name: 'Home 5', layout: 'two-sidebar' },
    component: Dashboard5
  },
  {
    path: 'home-6',
    name: prop + '.home-6',
    meta: { auth: true, name: 'Home 6', layout: 'icon-with-text' },
    component: Dashboard6
  }
]
const userRoutes = (prop) => [
  {
    path: '',
    name: 'users-and-permissions',
    meta: { auth: true, name: 'userandpermissions' },
    component: userAndPermissionsMain,
    children: [
      {
        path: '',
        name: 'welcomeUser',
        meta: { auth: true, name: 'welcomeUser' },
        component: welcomeUser

      },
      {
        path: 'users',
        name: 'userandpermissions',
        meta: { auth: true, name: 'userandpermissions' },
        component: UserAndPermissions
      },
      {
        path: 'roles',
        name: 'roles',
        meta: { auth: true, name: 'roles' },
        component: Roles
      }
    ]
  }
]
const settingChildRoutes = (prop) => [
  {
    path: '',
    name: prop,
    meta: { auth: true, name: 'settings' },
    component: settings,
    children: [
      {
        path: '',
        name: 'welcomeSetting',
        meta: { auth: true, name: 'welcomeSetting' },
        component: welcomeSetting
      },
      {
        path: 'enterprises',
        name: prop + 'enterprises',
        meta: { auth: true, name: 'settings' },
        component: enterprises
      },
      {
        path: 'projects',
        name: prop + 'projects',
        meta: { auth: true, name: 'settings' },
        component: Projects
      },
      {
        path: 'departments',
        name: prop + 'departments',
        meta: { auth: true, name: 'settings' },
        component: departments
      },
      {
        path: 'inputs',
        name: prop + 'inputs',
        meta: { auth: true, name: 'settings' },
        component: inputs,
        children: [
          {
            path: '',
            name: prop + 'inputs',
            meta: { auth: true, name: 'inputs' },
            component: leadsFrom
          },
          {
            path: 'sources',
            name: prop + 'sources',
            meta: { auth: true, name: 'settings' },
            component: sources
          },
          {
            path: 'callStatus',
            name: prop + 'callStatus',
            meta: { auth: true, name: 'settings' },
            component: callStatus
          },
          {
            path: 'inquiries',
            name: prop + 'inquiries',
            meta: { auth: true, name: 'settings' },
            component: inquiries
          }
        ]
      },
      {
        path: 'packages',
        name: prop + 'packages',
        meta: { auth: true, name: 'packages' },
        component: packagesSetting
      },
      {
        path: 'finance',
        name: prop + 'finance',
        meta: { auth: true, name: 'finance' },
        component: financeSetting
      },
      {
        path: 'notifications',
        name: prop + 'notifications',
        meta: { auth: true, name: 'notifications' },
        component: settingNotifications
      },
      {
        path: 'whatsapp',
        name: prop + 'whatsapp',
        meta: { auth: true, name: 'whatsapp' },
        component: settingWhatsapp
      },
      {
        path: 'restore',
        name: 'settingsrestore',
        meta: { auth: true, name: 'settingsrestore' },
        component: restorePage
      },
      {
        path: 'roles',
        name: prop + 'groups',
        meta: { auth: true, name: 'settingsgroups' },
        component: showRoleSettings,
        children: [
          {
            path: '',
            name: prop + 'groups',
            meta: { auth: true, name: 'groups' },
            component: groupSettings
          },
          {
            path: 'permissions',
            name: 'settingspermissions',
            meta: { auth: true, name: 'settingspermissions' },
            component: permissionSettings
          }
        ]
      },
      {
        path: 'tasks',
        name: prop + 'task',
        meta: { auth: true, name: 'settingstask' },
        component: tasksCategories
      },
      {
        path: 'system',
        name: 'settingsystem',
        meta: { auth: true, name: 'settingsystem' },
        component: settingsystem
      }
    ]
  }
]
const userSettingChildRoutes = () => [
  {
    path: '',
    name: 'userSettings',
    meta: { auth: true, name: 'userSettings' },
    component: userSetting,
    children: [
      {
        path: 'defaultProject',
        name: 'defaultProject',
        meta: { auth: true, name: 'defaultProject' },
        component: defaultProject
      },
      {
        path: 'resetPassword',
        name: 'resetPassword',
        meta: { auth: true, name: 'resetPassword' },
        component: resetPassword
      }
    ]
  }
]
const horizontalRoute = (prop) => [
  {
    path: 'home-3',
    name: prop + '.home-3',
    meta: { auth: true, name: 'Home 3', layout: 'nav-with-menu' },
    component: Dashboard3
  },
  {
    path: 'home-4',
    name: prop + '.home-4',
    meta: { auth: true, name: 'Home 4', layout: 'nav-bottom-menu' },
    component: Dashboard4
  }
]
const coreChildRoute = (prop) => [
  {
    path: 'ui-colors',
    name: prop + '.color',
    meta: { auth: true, name: 'Colors' },
    component: UiColors
  },
  {
    path: 'ui-typography',
    name: prop + '.typography',
    meta: { auth: true, name: 'Typography' },
    component: UiTypography
  },
  {
    path: 'ui-alerts',
    name: prop + '.alert',
    meta: { auth: true, name: 'Alert' },
    component: UiAlerts
  },
  {
    path: 'ui-buttons',
    name: prop + '.button',
    meta: { auth: true, name: 'Button' },
    component: UiButtons
  },
  {
    path: 'ui-breadcrumb',
    name: prop + '.breadcrumb',
    meta: { auth: true, name: 'Breadcrumb' },
    component: UiBreadcrumb
  },
  {
    path: 'ui-badges',
    name: prop + '.badges',
    meta: { auth: true, name: 'Badges' },
    component: UiBadges
  },
  {
    path: 'ui-cards',
    name: prop + '.cards',
    meta: { auth: true, name: 'Card' },
    component: UiCards
  },
  {
    path: 'ui-carousel',
    name: prop + '.carousel',
    meta: { auth: true, name: 'Carousel' },
    component: UiCarousel
  },
  {
    path: 'ui-grid',
    name: prop + '.grid',
    meta: { auth: true, name: 'Grid' },
    component: UiGrid
  },
  {
    path: 'ui-embed-video',
    name: prop + '.embed-video',
    meta: { auth: true, name: 'Embed Video' },
    component: UiEmbedVideo
  },
  {
    path: 'ui-modal',
    name: prop + '.modal',
    meta: { auth: true, name: 'Model' },
    component: UiModal
  },
  {
    path: 'ui-listgroup',
    name: prop + '.listgroup',
    meta: { auth: true, name: 'List Group' },
    component: UiListGroup
  },
  {
    path: 'ui-images',
    name: prop + '.images',
    meta: { auth: true, name: 'Image' },
    component: UiImages
  },
  {
    path: 'ui-media-object',
    name: prop + '.media-object',
    meta: { auth: true, name: 'Media Object' },
    component: UiMediaObject
  },
  {
    path: 'ui-pagination',
    name: prop + '.pagination',
    meta: { auth: true, name: 'Paginations' },
    component: UiPagination
  },
  {
    path: 'ui-progressbars',
    name: prop + '.progressbars',
    meta: { auth: true, name: 'Progressbar' },
    component: UiProgressBars
  },
  {
    path: 'ui-tooltips',
    name: prop + '.tooltips',
    meta: { auth: true, name: 'Tooltip' },
    component: UiTooltips
  },
  {
    path: 'ui-popovers',
    name: prop + '.popovers',
    meta: { auth: true, name: 'Popover' },
    component: UiPopovers
  },
  {
    path: 'ui-notifications',
    name: prop + '.notifications',
    meta: { auth: true, name: 'Notification' },
    component: UiNotifications
  },
  {
    path: 'ui-tabs',
    name: prop + '.tabs',
    meta: { auth: true, name: 'Tabs' },
    component: UiTabs
  }
]
const formChildRoute = (prop) => [
  {
    path: 'form-layout',
    name: prop + '.layout',
    meta: { auth: true, name: 'Layout' },
    component: FormLayout
  },
  {
    path: 'form-validate',
    name: prop + '.validate',
    meta: { auth: true, name: 'Validate' },
    component: FormValidates
  },
  {
    path: 'form-switches',
    name: prop + '.switch',
    meta: { auth: true, name: 'Switch' },
    component: FormSwitches
  },
  {
    path: 'form-radios',
    name: prop + '.radio',
    meta: { auth: true, name: 'Radio' },
    component: FormRadios
  },
  {
    path: 'form-checkboxes',
    name: prop + '.checkbox',
    meta: { auth: true, name: 'Checkbox' },
    component: FormCheckboxes
  }
]
const tableChildRoute = (prop) => [
  {
    path: 'tables-basic',
    name: prop + '.basic',
    meta: { auth: true, name: 'Basic' },
    component: TablesBasic
  },
  {
    path: 'editable',
    name: prop + '.editable',
    meta: { auth: true, name: 'Editable' },
    component: EditableTable
  }
]
const iconChildRoute = (prop) => [
  {
    path: 'dripicons',
    name: prop + '.dripicons',
    meta: { auth: true, name: 'Dripicons' },
    component: IconDripicons
  },
  {
    path: 'fontawesome-5',
    name: prop + '.fontawesome-5',
    meta: { auth: true, name: 'Font Awsome' },
    component: IconFontawesome5
  },
  {
    path: 'lineawesome',
    name: prop + '.lineawesome',
    meta: { auth: true, name: 'Line Awsome' },
    component: IconLineAwesome
  },
  {
    path: 'remixicon',
    name: prop + '.remixicon',
    meta: { auth: true, name: 'Remixicon' },
    component: IconRemixicon
  },
  {
    path: 'unicons',
    name: prop + '.unicons',
    meta: { auth: true, name: 'Unicon' },
    component: IconUnicons
  }
]
const chartChildRoutes = (prop) => [
  {
    path: 'apex-charts',
    name: prop + '.apex',
    meta: { auth: true, name: 'Apex Chart' },
    component: ApexCharts
  },
  {
    path: 'am-charts',
    name: prop + '.am',
    meta: { auth: true, name: 'Am Chart' },
    component: AmCharts
  },
  {
    path: 'high-charts',
    name: prop + '.high',
    meta: { auth: true, name: 'High Chart' },
    component: HighCharts
  }
]
const appChildRoute = (prop) => [
  {
    path: 'calendar',
    name: prop + '.calendar',
    meta: { auth: true, name: 'Calendar' },
    component: Calendar
  },
  {
    path: 'chat',
    name: prop + '.chat',
    meta: { auth: true, name: 'Chat' },
    component: ChatIndex
  },
  {
    path: 'email',
    name: prop + '.email',
    meta: { auth: true, name: 'Email' },
    component: EmailListing
  },
  {
    path: 'email-compose',
    name: prop + '.email.compose',
    meta: { auth: true, name: 'New Email' },
    component: EmailCompose
  },
  {
    path: 'e-commerce/listing',
    name: prop + '.e-commerce.index',
    meta: { auth: true, name: 'Product list' },
    component: ECommerceListing
  },
  {
    path: 'e-commerce/detail',
    name: prop + '.e-commerce.detail',
    meta: { auth: true, name: 'Product Detail' },
    component: EcommerceDetail
  },
  {
    path: 'e-commerce/checkout',
    name: prop + '.e-commerce.cart',
    meta: { auth: true, name: 'Checkout' },
    component: Checkout
  },
  {
    path: 'e-commerce/wish-list',
    name: prop + '.e-commerce.wishlist',
    meta: { auth: true, name: 'Wishlist' },
    component: Wishlist
  },
  {
    path: 'project-management',
    name: prop + '.project.management',
    meta: { auth: true, name: 'Project Management' },
    component: ProjectBoard
  },
  {
    path: 'todo',
    name: prop + '.todo',
    meta: { auth: true, name: 'Todo' },
    component: TodoListing
  },
  {
    path: 'treeview',
    name: prop + '.treeview',
    meta: { auth: true, name: 'Tree View' },
    component: AppTreeView
  }
]
const authChildRoutes = (prop) => [
  {
    path: 'sign-in1',
    name: prop + '.sign-in1',
    meta: { auth: true },
    component: SignIn1
  },
  {
    path: 'sign-up1',
    name: prop + '.sign-up1',
    meta: { auth: true },
    component: SignUp1
  },
  {
    path: 'password-reset1',
    name: prop + '.password-reset1',
    meta: { auth: true },
    component: RecoverPassword1
  },
  {
    path: 'lock-screen1',
    name: prop + '.lock-screen1',
    meta: { auth: true },
    component: LockScreen1
  },
  {
    path: 'confirm-mail1',
    name: prop + '.confirm-mail1',
    meta: { auth: true },
    component: ConfirmMail1
  }
]
const mapChildRoute = (prop) => [
  {
    path: 'google-maps',
    name: prop + '.google',
    meta: { auth: true, name: 'Google map' },
    component: GoogleMaps
  }
]
const defaultlayout = (prop) => [
  {
    path: 'timeline',
    name: prop + '.timeline',
    meta: { auth: true, name: 'Timeline' },
    component: TimeLine
  },
  {
    path: 'invoice',
    name: prop + '.invoice',
    meta: { auth: true, name: 'Invoice' },
    component: Invoice
  },
  {
    path: 'blank-page',
    name: prop + '.blank-page',
    meta: { auth: true, name: 'Blank Page' },
    component: BlankPage
  },
  {
    path: 'pricing',
    name: prop + '.pricing',
    meta: { auth: true, name: 'Pricing' },
    component: Pricing
  },
  {
    path: 'pricing-1',
    name: prop + '.pricing1',
    meta: { auth: true, name: 'Pricing 1' },
    component: Pricing1
  },
  {
    path: 'faq',
    name: prop + '.faq',
    meta: { auth: true, name: 'Faq' },
    component: FAQ
  }
]
const pagesChildRoutes = (prop) => [
  {
    path: 'error/:code',
    name: prop + '.error',
    meta: { auth: true },
    component: ErrorPage
  },
  {
    path: 'coming-soon',
    name: prop + '.coming-soon',
    meta: { auth: true },
    component: ComingSoon
  },
  {
    path: 'maintenance',
    name: prop + '.maintenance',
    meta: { auth: true },
    component: Maintenance
  }
]
const userChildRoute = (prop) => [
  {
    path: 'profile',
    name: prop + '.profile',
    meta: { auth: true, name: 'Profile' },
    component: Profile
  },
  {
    path: 'profile-edit/:id',
    name: prop + '.edit',
    meta: { auth: true, name: 'Edit Profile' },
    component: ProfileEdit
  },
  {
    path: 'add-user',
    name: prop + '.add',
    meta: { auth: true, name: 'Add Profile' },
    component: AddUser
  },
  {
    path: 'user-list',
    name: prop + '.list',
    meta: { auth: true, name: 'User List' },
    component: UserList
  }
]
const socialChildRoute = (prop) => [
  {
    path: 'social',
    name: prop + '.list',
    meta: { auth: true, name: 'Social App' },
    component: SocialApp
  }
]
const pluginsChildRoute = (prop) => [
  {
    path: 'datepicker',
    name: prop + '.datepicker',
    meta: { auth: true, name: 'Datepicker' },
    component: DatepickerDemo
  },
  {
    path: 'select',
    name: prop + '.select',
    meta: { auth: true, name: 'Select' },
    component: SelectDemo
  },
  {
    path: 'draggable',
    name: prop + '.draggable',
    meta: { auth: true, name: 'Draggable' },
    component: DragDropDemo
  }
]

const childMembersRoutes = () => [
  {
    path: '',
    name: 'welcomeMember',
    meta: { auth: true, name: 'welcomeMember' },
    component: membersMainPage,
    children: [
      {
        path: '',
        name: 'welcomeMember',
        meta: { auth: true, name: 'welcomeMember' },
        component: welcomeMember
      },
      {
        path: 'check-in-out',
        name: 'checkInOut',
        meta: { auth: true, name: 'checkInOut' },
        component: showAllchecks
      },
      {
        path: 'all-members',
        name: 'allmembers',
        meta: { auth: true, name: 'allmembers' },
        component: showAllMembersPage
      },
      {
        path: 'add-member',
        name: 'newMember',
        meta: { auth: true, name: 'newMember' },
        component: newMemberPage
      },
      {
        path: 'freeze',
        name: 'freeze',
        meta: { auth: true, name: 'freeze' },
        component: memberFreeze
      },
      {
        path: 'profile/:id',
        name: 'profile',
        meta: { auth: true, name: 'freeze' },
        component: memberProfile
      }
    ]
  }
]
const childDeskRoutes = () => [
  {
    path: '',
    name: 'desk',
    meta: { auth: true, name: 'desk' },
    component: deskMainPage
  }
]
const childAccountingRoutes = () => [
  {
    path: '/accounting',
    name: 'accounting',
    meta: { auth: true, name: 'accounting' },
    component: mainAccounting,
    children: [
      {
        path: '',
        name: 'welcomeAccounting',
        meta: { auth: true, name: 'welcomeAccounting' },
        component: welcomeAccounting
      },
      {
        path: 'show_accounting',
        name: 'accounting',
        meta: { auth: true, name: 'accounting' },
        component: discounts
      }, {
        path: 'refund',
        name: 'accountingRefund',
        meta: { auth: true, name: 'accountingRefund' },
        component: accountingRefund
      },
      {
        path: 'transfer',
        name: 'accountingTransfer',
        meta: { auth: true, name: 'accountingTransfer' },
        component: accountingtransfer
      },
      {
        path: 'actions',
        name: 'accountingDynamic',
        meta: { auth: true, name: 'accountingDynamic' },
        component: accountingDynamic
      },
      {
        path: 'balance',
        name: 'accountingBalance',
        meta: { auth: true, name: 'accountingBalance' },
        component: accountingBalance
      }
    ]
  }
]
const childTargetRoutes = () => [
  {
    path: '',
    name: 'target',
    component: target,
    children: [
      {
        path: '',
        name: '',
        meta: { auth: true, name: '' },
        component: welcomeTarget
      },
      {
        path: 'sales-target',
        name: 'salesTarget',
        meta: { auth: true, name: 'salesTarget' },
        component: salesTarget
      },
      {
        path: 'target-structure',
        name: 'targetStructure',
        meta: { auth: true, name: 'targetStructure' },
        component: targetStructure
      },
      {
        path: 'managers-target',
        name: 'managersTarget',
        meta: { auth: true, name: 'managersTarget' },
        component: managersTarget
      }
    ]
  }
]
const routes = [
  ...leads,
  ...activation,
  ...profiles,
  ...landmarks,
  ...services,
  ...promotions,
  ...customers,
  ...notifications,
  ...analytics,
  ...admin,
  ...sales,
  ...reports,
  ...packages,
  ...franchise,
  ...reminder,
  ...financialReport,
  ...campaign,
  {
    path: '',
    name: 'dashboard',
    component: VerticleLayout,
    meta: { auth: true },
    children: childRoutes('dashboard')
  },
  /*  {
    path: 'franchise',
    component: VerticleLayout,
    children: [
      {
        path: '/franchise',
        name: 'franchise',
        component: franchise
      }
    ]
  }, */
  {
    path: '/settings',
    name: 'settings',
    component: VerticleLayout,
    meta: { auth: true },
    children: settingChildRoutes('settings')
  },
  {
    path: '/user_and_permissions',
    name: 'userandpermissions',
    component: VerticleLayout,
    meta: { auth: true },
    children: userRoutes('user')
  },
  {
    path: '/desk',
    name: 'desk',
    component: VerticleLayout,
    meta: { auth: true },
    children: childDeskRoutes()
  },
  {
    path: '/accounting',
    name: 'accounting',
    component: VerticleLayout,
    meta: { auth: true },
    children: childAccountingRoutes()
  },
  {
    path: '/member',
    name: 'members',
    component: VerticleLayout,
    meta: { auth: true },
    children: childMembersRoutes()
  },
  {
    path: '/menu-design',
    name: 'horizontal-dashboard',
    component: HorizantalLayout,
    meta: { auth: true },
    children: horizontalRoute('dashboard')
  },
  {
    path: '/core',
    name: 'core',
    component: VerticleLayout,
    meta: { auth: true },
    children: coreChildRoute('core')
  },
  {
    path: '/table',
    name: 'table',
    component: VerticleLayout,
    meta: { auth: true },
    children: tableChildRoute('table')
  },
  {
    path: '/chart',
    name: 'chart',
    component: VerticleLayout,
    meta: { auth: true },
    children: chartChildRoutes('chart')
  },
  {
    path: '/icon',
    name: 'icon',
    component: VerticleLayout,
    meta: { auth: true },
    children: iconChildRoute('icon')
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout,
    meta: { auth: true },
    children: authChildRoutes('auth1')
  },
  {
    path: '/pages',
    name: 'pages',
    component: Default,
    meta: { auth: true },
    children: pagesChildRoutes('default')
  },
  {
    path: '/extra-pages',
    name: 'extra-pages',
    component: VerticleLayout,
    meta: { auth: true },
    children: defaultlayout('extra-pages')
  },
  {
    path: '/app',
    name: 'app',
    component: VerticleLayout,
    meta: { auth: true },
    children: appChildRoute('app')
  },
  {
    path: '/user',
    name: 'user',
    component: VerticleLayout,
    meta: { auth: true },
    children: userChildRoute('user')
  },
  {
    path: '/social',
    name: 'social',
    component: VerticleLayout,
    meta: { auth: true },
    children: socialChildRoute('social')
  },
  {
    path: '/map',
    name: 'map',
    component: VerticleLayout,
    meta: { auth: true },
    children: mapChildRoute('map')
  },
  {
    path: '/form',
    name: 'form',
    component: VerticleLayout,
    meta: { auth: true },
    children: formChildRoute('form')
  },
  {
    path: '/plugins',
    name: 'plugins',
    component: VerticleLayout,
    meta: { auth: true },
    children: pluginsChildRoute('plugins')
  },
  {
    path: '/callback',
    name: 'callback',
    meta: { auth: false },
    component: Callback
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: VerticleLayout,
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'notifications',
        component: notificationsSetting
      }
    ]
  },
  {
    path: '/whatsapp',
    name: 'whatsapp',
    component: VerticleLayout,
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'whatsapp',
        component: whatsappView
      }
    ]
  },
  {
    path: '/task',
    name: 'task',
    component: VerticleLayout,
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'task',
        component: tasksPage
      }
    ]
  },
  {
    path: '/complain',
    name: 'complain',
    component: VerticleLayout,
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'complain',
        component: complainPage
      }
    ]
  },
  {
    path: '/tree',
    name: 'tree',
    component: VerticleLayout,
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'tree',
        component: tree
      }
    ]
  },
  {
    path: '/target',
    name: 'target',
    component: VerticleLayout,
    meta: { auth: true },
    children: childTargetRoutes()
  },
  {
    path: '/user_settings',
    name: 'userSettings',
    component: VerticleLayout,
    meta: { auth: true },
    children: userSettingChildRoutes()
  },
  {
    path: '/lead_profile/:id',
    name: 'leadProfile',
    component: VerticleLayout,
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'leadProfile',
        component: leadProfile
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/auth/sign-in1', '/auth/sign-up1', '/dark/auth/sign-in1', '/dark/auth/sign-up1']
  if (publicPages.includes(to.path)) {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('access_token')
  if (to.meta.auth) {
    // console.log(to.meta.auth)
    if (authRequired && loggedIn === null) {
      return next('/auth/sign-in1')
    } else if (to.name === 'dashboard' || to.name === 'mini.dashboard') {
      return next('/index')
    }
  }
  next()
})

export default router
