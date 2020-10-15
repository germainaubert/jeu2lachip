<template> 
  <div class="hello">
    <h1>Bienvenue sur le jeu de la Chips</h1>
    <div>
      <button v-on:click="inscrire()">s'inscrire</button>
      <br>
      <br>
      <button v-on:click="connect()">se connecter</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Accueil',
  props: {
    msg: String
  },
  data: function (){
    return { 
      password: "",
    }
  },
  methods : {
    connect : function (){
      this.$emit('passConnection')
      console.log("chips")      
    },
    inscrire : function(){
      this.$emit('passInscription')
      console.log("chips") 
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
