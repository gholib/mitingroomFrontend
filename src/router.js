import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

Vue.use(Router)
// function LogOut(from, to, next) {
//   store.commit('auth/UNSET_TOKEN');
//   next('/login');
// }

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Home.vue')
              },
              {
                path: '/rooms',
                name: 'rooms', 
                component: () => import('./views/room/Room.vue'),
              },
              {
                path: '/rooms/:roomId',
                name: 'roomPage',
                component: () => import('./views/room/RoomPage')
              },
            ],
        },
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        
              {
                path: '/auth/forgot-password',
                name: 'pageForgotPassword',
                component: () => import('@/views/pages/ForgetPassword.vue'),
                meta:{
                  auth: false,
                },
              },
              {
                path: '/login',
                name: 'login',
                component: () => import('@/views/pages/Login.vue')
              },
              {
                path: '/reset-password/:email/:token',
                name: 'pageResetPassword',
                component: () => import('@/views/pages/ResetPassword.vue'),
                meta:{
                  auth: false,
                },
              },
              {
                path: '/register',
                name: 'register',
                component: () => import('@/views/pages/Register.vue'),
                meta:{
                  auth: false,
                },
              },
              {
                path: '/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth === false){
    next();
  }else if (to.name !== 'login' && !store.getters['auth/getToken']) {
    next({ name: 'login' });
  }else next()
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
