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
  },
  {
    path: '/Game',
    name: 'Game',
    component: () => import('../views/Game.vue')
  },
  {
    path: "/Pmu",
    name: 'Pmu',
    component: () => import('../views/Pmu.vue')
  },
  {
    path: "/Purple",
    name: 'Purple',
    component: () => import('../views/Purple.vue')
  },
  {
    path: "/Quatre",
    name: 'Quatre',
    component: () => import('../views/Quatre.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
