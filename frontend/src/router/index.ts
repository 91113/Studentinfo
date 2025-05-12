import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          component: Welcome
        },
        {
          path: 'courses',
          name: 'Courses',
          component: () => import('../views/Courses.vue')
        },
        {
          path: 'grades',
          name: 'Grades',
          component: () => import('../views/Grades.vue')
        },
        {
          path: 'admin',
          name: 'Admin',
          component: () => import('../views/Admin.vue')
        }
      ]
    }
  ]
})

export default router 