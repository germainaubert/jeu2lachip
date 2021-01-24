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
    path: '/Amis',
    name: 'Amis',
    component: () => import('../views/Amis.vue')
  },
  {
    path: '/InvitationAmi',
    name: 'InvitationAmi',
    component: () => import('../views/InvitationAmi.vue')
  },
  {
    path: '/GestionGames',
    name: 'GestionGames',
    component: () => import('../views/GestionGames.vue')
  },
  {
    path: '/GestionUsers',
    name: 'GestionUsers',
    component: () => import('../views/GestionUsers.vue')
  },
  {
    path: '/CreationGame',
    name: 'CreationGame',
    component: () => import('../views/CreationGame.vue')
  },
  {
    path: '/AdministrationAccueil',
    name: 'AdministrationAccueil',
    component: () => import('../views//AdministrationAccueil.vue')
  },
  {
    path: '/VotreCompte',
    name: 'VotreCompte',
    component: () => import('../views//VotreCompte.vue')
  },
  {
    path: '/ChangePseudo',
    name: 'ChangePseudo',
    component: () => import('../views//ChangePseudo.vue')
  },
  {
    path: '/ChangePassword',
    name: 'ChangePassword',
    component: () => import('../views//ChangePassword.vue')
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
]

const router = new VueRouter({
  routes
})

export default router
