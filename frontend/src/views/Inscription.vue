<template>
  <div class="inscription">
    <h1>s'inscrire</h1>
    <div>
      <div class="info_input">pseudo <input v-model="pseudo" v-on:keyup="nameValidity()"/></div>
      <div class="info_input">
        password <input type="password" v-model="password" />
        <span class="error">{{ errorPw }}</span>
      </div>
      <button v-on:click="checkInfo()">S'inscrire</button>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default;
//import User from '../../../backend/models/user.model.js'
export default {
  name: "Inscription",
  props: {
    msg: String,
  },
  data: function () {
    return {
      pseudo: "",
      password: "",
      errorPw: "",
      errorPseudo: "",
    }
  },

  methods: {
    checkInfo: function () {
      this.errorPw = checkPw(this.password)
      this.errorPseudo = checkPseudo(this.pseudo)

      if (this.errorPw.length === 0 && this.errorPseudo.length === 0) {
        console.log('lancer la fonction d\'ajout du compte')
      }

    },

    nameValidity: function (pseudo) {
        let res = axios.get('http://localhost:3000/api/auth/name_validity/' + pseudo)
        console.log(res.data)
    }
  },
}

function checkPw(pw) {
  if (pw.length < 5) {
    return "Mot de passe trop court"
  } else {
    return ""
  }
}

function checkPseudo(pseudo) {
  if (pseudo.length < 5) {
    return "Le pseudo doit faire 5 caractère minimum"
  } else {
    return ""
  }
}
</script>


<style scoped>
a {
  color: #42b983;
}
.info_input {
  margin-top: 10px;
  margin-bottom: 10px;
}
.error {
  color: red;
  font-size: 10px;
}
</style>
