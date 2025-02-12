import { createWebHistory, createRouter } from 'vue-router'
import EventsList from '@/pages/EventsList.vue'
import Event from '@/pages/Event.vue'
import Book from '@/pages/Book.vue'
import Admin from '@/pages/Admin.vue'
import EditEvent from '@/pages/EditEvent.vue'
import LogIn from '@/pages/LogIn.vue'

const routes = [
  { path: '/', component: EventsList },
  { path: '/event/:id', component: Event },
  { path: '/book', component: Book },
  { path: '/admin', component: Admin },
  { path: '/admin/login', component: LogIn },
  { path: '/admin/edit/:id', component: EditEvent }
]

// Creates the router with the specified routes
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})
