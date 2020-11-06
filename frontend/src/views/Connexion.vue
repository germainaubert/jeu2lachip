<template> 
  <div>
    <h1>Connexion</h1>
    
    <div>
      <div>
        <input v-model="pseudo" required/>
        <label>Pseudo</label>
      </div>

      <div>
        <input type="password" v-model="password" required/>
        <label>Mot de passe</label>
      </div>

    </div>

    <div>
      <button v-on:click="connexionRequest()">Connexion</button>
    </div>

    <div>
      {{error}}
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
        this.error = "Pseudo ou mot de passe invalide(s)"
      } else {
        try {
          const res = (await this.$axios({
            method: "post",
            url: "http://localhost:3000/api/auth/login",
            data: {
              pseudo: this.pseudo,
              password: this.password
            }
          })).data
          console.log(res)
          this.$socket.emit('login')
          this.$router.push('/Lobby');

        } catch(err) {
          console.log('Cannot log user, check pseudo or password validity')
          this.error = "Pseudo ou mot de passe invalide(s)"
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
