import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('../views/Accueil.vue')
  },
  {
    path: '/Accueil',
    name: 'Accueil',
    component: () => import('../views/Accueil.vue')
  },
  {
    path: '/Inscription',
    name: 'Inscription',
    component: () => import('../views/Inscription.vue')
  },
  {
    path: '/Connexion',
    name: 'Connexion',
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/Amis',
    name: 'Amis',
    component: () => import('../views/Amis.vue')
  },
  {
    path: '/InvitationAmi',
    name: 'InvitationAmi',
    component: () => import('../views/InvitationAmi.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
