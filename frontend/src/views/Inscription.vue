<template> 
  <div class="inscription">
    <h1>s'inscrire</h1>
    <div>
        <h2> Prenom </h2>
        <input v-model="prenom"/>
        <br/>
        <h2> nom </h2>
        <input v-model="nom"/>
        <br/>
        <h2> pseudo </h2>
        <input v-model="pseudo"/>
        <br/>
        <h2> mail </h2>
        <input v-model="mail"/>
        <br/>
        <h2> password </h2>
        <input v-model="password"/>
        <br>
        <router-link to="/Lobby">
          <button v-on:click="doRegister()">S'inscrire</button>
        </router-link>
        {{pseudo}}{{mail}}{{password}}
    </div>
  </div>
</template>

<script>
//import User from '../../../backend/models/user.model.js'
export default {
  name: 'Inscription',
  props: {
    msg: String
  },
  data: function (){
    return { 
      password: null,
      pseudo: null,
      mail: null
    }
  },
  
  methods : {
    send : function (){
      console.log("test")
      if (this.password === "covid"){
        this.$emit('pwok')
      }      
    },
    doRegister : function(){
      if (!Object.keys(this.pseudo).length === 0 && !Object.keys(this.password).length === 0){
        this.$emit("person-Added",
          'pseudo: this.pseudo',
          'password: this.password'
        )
      }
      else{
        console.log("Une erreur s'est produite. Votre pseudo est vide ou votre mot de passe est vide")
      }
    },
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
