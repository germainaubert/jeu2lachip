<template>
  <div>
    <h1>Inscription</h1>
    <div>
      <div>
        <input v-model="pseudo" required />
        <label>Pseudo</label>
        <div>{{ validityPseudo }}</div>
      </div>

      <div>
        <input type="password" v-model="password" required />
        <label>Mot de passe</label>
      </div>
      <div>
        <button v-on:click="checkInfo()">
          S'inscrire
        </button>
      </div>

      <div>
        {{ inputError }}
      </div>
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
      validityPseudo: "",
      inputError: "",
    };
  },
  watch: {
    pseudo: "lookAtPseudo",
  },

  methods: {
    checkInfo: async function () {
      const errorPw = checkPw(this.password);
      const errorPseudo = checkPseudo(this.pseudo);
      if (errorPw && errorPseudo) {
        const res = (
          await this.$axios({
            method: "post",
            url: "http://localhost:3000/api/auth/register",
            data: {
              pseudo: this.pseudo,
              password: this.password,
            },
          })
        ).data;

        if (res.connect === true) {
          // self.$session.start(res.id)
          // console.log(self.$sessions.getAll())
          this.$router.push("/Lobby");
          this.$socket.emit("login");
        }
      } else {
        this.inputError =
          "Le pseudo et le mot de passe doivent faire plus de 5 caractères";

        setTimeout(function () {
          this.inputError = "";
        }, 10);
      }
    },

    pseudoValidity: async function () {
      let res = await this.$axios.get(
        "http://localhost:3000/api/auth/nameValidity/" + this.pseudo
      );
      if (res.data.nameValidity === true) {
        this.validityPseudo = "";
      } else {
        this.validityPseudo = "Ce pseudo existe déjà";
      }
    },

    errCleaner: function () {
      if (this.pseudo.length === 0) {
        this.validityPseudo = "";
      }
    },
    lookAtPseudo: async function () {
      if (this.pseudo) {
        await this.pseudoValidity();
      } else {
        this.validityPseudo = "";
      }
    },
  },
};

function checkPw(pw) {
  if (pw.length < 5) {
    return false;
  } else {
    return true;
  }
}

function checkPseudo(pseudo) {
  if (pseudo.length < 5) {
    return false;
  } else {
    return true;
  }
}
</script>


<style scoped>

</style>
