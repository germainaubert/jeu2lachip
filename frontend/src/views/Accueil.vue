<template> 
  <div class="hello">
    <h1>Bienvenue sur le jeu de la Chips</h1>
    <div>
      <button v-on:click="inscrire()">
        <router-link to="/Inscription">Inscription</router-link>
      </button>
      <br>
      <br>
      <router-link to="/Connexion">
        <button>se connecter</button>
      </router-link>
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
  },
  methods : {
    connect : function (){
      this.connectIsClicked = true
      this.$emit('toLink')

      console.log("test")      
    },
    inscrire : function(){
      this.registerIsClicked = true
      this.$emit('toLink')
      console.log("test") 
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
