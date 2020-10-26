<template> 
  <div class="connexion">
    <router-link to="/Accueil">Accueil</router-link>
    <h1>Se Connecter</h1>
    <div>
        <h2> Pseudo </h2>
        <input v-model="pseudo"/>
        <br/>
        <h2> password </h2>
        <input type="password" v-model="password"/>
        <br>
        <button v-on:click="connexionRequest()">Connexion</button>
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
        error: ""
    }
  },
  methods : {
    connexionRequest: async function () {
      if (this.pseudo < 5 || this.password < 5) {
        this.error = "Identifiants incorrects"
      } else {
        const res = (await this.$axios({
          method: "post",
          url: "http://localhost:3000/api/auth/login",
          data: {
            pseudo: this.pseudo,
            password: this.password
          }
        })).data
        console.log(res)
        if (res.flag === false) {
          console.log("Connexion impossible")
        } else {
          this.$router.push('/Lobby');
        }
        
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
