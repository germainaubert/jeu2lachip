import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Default',
    component: () => import('../views/Accueil.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  },
  {
    path: '/testChat',
    name: 'testChat',
    component: () => import('../views/testChat.vue')
  },
  {
    path: '/testspeed',
    name: 'testspeed',
    component: () => import('../views/testspeed.vue')
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
    path: '/Lobby',
    name: 'Lobby',
    component: () => import('../views/Lobby.vue')
  },
  {
    path: '/PreLobby',
    name: 'PreLobby',
    component: () => import('../views/PreLobby.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
