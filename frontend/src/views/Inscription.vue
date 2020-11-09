<template>
  <div class="inscription">
    <router-link to="/Accueil">Accueil</router-link>
    <h1>s'inscrire</h1>
    <div>
      <div class="info_input">
        pseudo <input v-model="pseudo" v-on:keyup="nameValidity(pseudo)" />
        <span class="error">{{ errorPseudo }}</span>
        <span class="error">{{ validityPseudo }}</span>
      </div>
      <div class="info_input">
        password <input type="password" v-model="password" />
        <span class="error">{{ errorPw }}</span>
      </div>
      <button v-on:click="checkInfo()">S'inscrire</button>
    </div>
  </div>
</template>

<script>
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
      validityPseudo: "",
    };
  },

  methods: {
    checkInfo: async function () {
      this.errorPw = checkPw(this.password);
      this.errorPseudo = checkPseudo(this.pseudo);

      if (this.errorPw.length === 0 && this.errorPseudo.length === 0) {
        console.log("emit login");
        const res = (
          await this.$axios.post("http://localhost:3000/api/auth/register", {
            pseudo: this.pseudo,
            password: this.password,
          })
        ).data;
        
        
        if (res.connect === true) {
          const res2 = await this.$axios.get(
          "http://localhost:3000/api/auth/getSession"
        );
        console.log(res2)
          // self.$session.start(res.id)
          // console.log(self.$sessions.getAll())
          this.$router.push("/Lobby");
        }
      }
    },

    nameValidity: async function (pseudo) {
      let res = await this.$axios.get(
        "http://localhost:3000/api/auth/nameValidity/" + pseudo
      );
      if (res.data.nameValidity === true) {
        this.validityPseudo = "";
      } else {
        this.validityPseudo = "Ce pseudo existe déjà";
      }
    },
  },
};

function checkPw(pw) {
  if (pw.length < 5) {
    return "Mot de passe trop court";
  } else {
    return "";
  }
}

function checkPseudo(pseudo) {
  if (pseudo.length < 5) {
    return "Le pseudo doit faire 5 caractère minimum";
  } else {
    return "";
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
