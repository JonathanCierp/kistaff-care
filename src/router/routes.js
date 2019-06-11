
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta: { auth: true } },
      { path: '/profile', component: () => import('pages/account/Profile.vue'), meta: { auth: true } },
      { path: '/missions', component: () => import('pages/workspace/Missions.vue'), meta: { auth: true } },
      { path: '/posts', component: () => import('pages/community/Posts.vue'), meta: { auth: true } },
      { path: '/discussions', component: () => import('pages/community/Discussions.vue'), meta: { auth: true } },
      { path: '/tools', component: () => import('pages/tooling/Tools.vue'), meta: { auth: true } },
      { path: '/logout', component: () => import('pages/account/Logout.vue'), meta: { auth: true } }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      { path: '', component: () => import('pages/account/Login.vue') },
      { path: '/verify', component: () => import('pages/account/Verification.vue') },
      {
        path: '/password',
        component: { render: h => h('router-view') },
        children: [
          { path: 'forgot', component: () => import('pages/account/Forgot.vue') }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
