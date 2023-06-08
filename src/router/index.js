import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeView_mobile from '../views/HomeView_mobile.vue'
import LearningCalender from '../views/LearningCalender.vue'
import LearningTime from '../views/LearningTime.vue'
import LearningTime_mobile from '../views/LearningTime_mobile.vue'
import Login from '../views/LogIn.vue'
import Signup from '../views/SignUp.vue'
import Review from '../views/LearningReview.vue'
import Review_mobile from '../views/LearningReview_mobile.vue'
import Log from '../views/LearningLog.vue'


// import firebase from '@/firebase/firebase'

Vue.use(VueRouter)

function isMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod|android/.test(userAgent);
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: isMobileDevice() ? HomeView_mobile : HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/learning',
    name: 'leaning',
    component: isMobileDevice() ? LearningTime_mobile : LearningTime,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/calender',
    name: 'calender',
    component: LearningCalender,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/review',
    name: 'review',
    component: isMobileDevice() ? Review_mobile : Review,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/log',
    name: 'log',
    component: Log,
    meta: {
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const currentUser = firebase.auth().currentUser

//   if (requiresAuth && !currentUser) {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
