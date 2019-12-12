
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta: { auth: true } },
      { path: '/home', component: () => import('pages/workspace/Home.vue'), meta: { auth: true } },
      { path: '/requests', component: () => import('pages/workspace/Requests.vue'), meta: { auth: true } },
      { path: '/requests/:id', component: () => import('pages/workspace/Request.vue'), meta: { auth: true } },
      { path: '/missions', component: () => import('pages/workspace/Missions.vue'), meta: { auth: true } },
      { path: '/missions/:id', component: () => import('pages/workspace/Mission.vue'), meta: { auth: true } },
      { path: '/organizations', component: () => import('pages/workspace/Organizations.vue'), meta: { auth: true } },
      { path: '/profile', component: () => import('pages/account/Profile.vue'), meta: { auth: true } },
      { path: '/profile/password', component: () => import('pages/account/Password.vue'), meta: { auth: true } },
      { path: '/profile/leave', component: () => import('pages/workspace/Leave.vue'), meta: { auth: true } },
      { path: '/logout', component: () => import('pages/account/Logout.vue'), meta: { auth: true } }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      { path: '', component: () => import('pages/account/Login.vue') },
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
