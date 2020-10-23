<template> 
  <div class="connexion">
    <router-link to="/Accueil">Accueil</router-link>
    <h1>Se Connecter</h1>
    <div>
        <h2> Pseudo </h2>
        <input v-model="pseudo"/>
        <br/>
        <h2> password </h2>
        <input v-model="password"/>
        <br>
        <button v-on:click="doConnection()">Se Connecter</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Connexion',
  props: {
    msg: String
  },
  data: function (){
    return { 
        pseudo : "",    
        password: "",
    }
  },
  methods : {
    check : function (){
      console.log("test")
      if (this.password === "covid" && this.pseudo === "pseudo"){
        this.$emit('pwok')
      }      
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
