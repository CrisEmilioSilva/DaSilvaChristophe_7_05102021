import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import CompanyEmployees from '../views/CompanyEmployees.vue'
import ProfileEmployee from '../views/ProfileEmployee.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },

  {
    path: '/search-users',
    name: 'CompanyEmployees',
    component: CompanyEmployees
  },

  {
    path: '/profile-employee',
    name: 'ProfileEmployee',
    component: ProfileEmployee
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
