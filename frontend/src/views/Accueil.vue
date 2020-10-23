<template> 
  <div class="hello">
    <h1>Bienvenue sur le jeu de la Chips</h1>
    <div>
        <router-link to="/Inscription" tag="button">Inscription</router-link>
      <br>
      <br>
        <router-link to="/Connexion" tag="button">Connexion</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Accueil',
  props: {
    //msg: String,
    //connectIsClicked : Boolean,
    //registerIsClicked : Boolean
  },
  data: function (){
    return { 
      connectIsClicked : Boolean,
      registerIsClicked : Boolean
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
