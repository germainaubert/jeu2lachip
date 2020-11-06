<template>
  <div id="app">
    <div id="nav">
      
      <template v-if='$route.name === "Accueil" || $route.name === "Connexion" || $route.name === "Inscription" || $route.name === "Default"'>
        <router-link to="/Accueil">Accueil</router-link>
        <router-link to="/Connexion">Connexion</router-link>
        <router-link to="/Inscription">Inscription</router-link>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color:white;
  background-color: #4CAF50;
}
#nav {
  font-size: 19px;
  background-color: #333;
}
</style>
