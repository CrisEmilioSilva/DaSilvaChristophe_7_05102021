import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Search from '../views/Search.vue'
import ProfileOtherUsers from '../views/ProfileOtherUsers.vue'

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
    name: 'Search',
    component: Search
  },

  {
    path: '/profile-other-users',
    name: 'ProfileOtherUsers',
    component: ProfileOtherUsers
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
