<template>
  <div id="app">
    <div id="nav">
      <router-link to="/Accueil">Accueil</router-link> | 
      <router-link to="/Connexion">Connexion</router-link> |
      <router-link to="/Inscription">Inscription</router-link>
      <component v-bind:is="currentPage" v-on:toLink="toLink"></component>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Accueil from './views/Accueil.vue'
/*import Connexion from './views/Connexion.vue'
import Inscription from './views/Inscription.vue'*/

export default {
  name: 'App',
  data: function(){
    return {
      currentPage : "Accueil",
    }
  },
  components: {
    /*Accueil,
    Connexion,
    Inscription*/
  },
  methods:{
    toLink: function(){
      if(Accueil.connectIsClicked === true){
        this.currentPage = "Connexion"
      }
      if(Accueil.registerIsClicked === true){
        this.currentPage = "Inscription"
      } 
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
