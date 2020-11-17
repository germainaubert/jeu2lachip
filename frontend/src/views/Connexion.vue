<template>
  <v-container>
    <v-card width="500" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Connexion</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Pseudo"
            prepend-icon="mdi-account-circle"
            v-model="pseudo"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Mot de passe"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
          />
        </v-form>
        <span class="mx-auto">{{error}}</span>
      </v-card-text>
      
      <v-card-actions>
        <v-btn color="success" v-on:click="connexionRequest">Connexion</v-btn>
      </v-card-actions>
    </v-card>
    
  </v-container>
</template>

<script>
export default {
  name: "Connexion",
  props: {
    msg: String,
  },
  data: function () {
    return {
      pseudo: "",
      password: "",
      error: "",
      showPassword: false,
    };
  },
  methods: {
    connexionRequest: async function () {
      if (this.pseudo < 5 || this.password < 5) {
        this.error = "Pseudo ou mot de passe invalide(s)";
      } else {
        try {
          const res = (
            await this.$axios({
              method: "post",
              url: "http://localhost:3000/api/auth/login",
              data: {
                pseudo: this.pseudo,
                password: this.password,
              },
            })
          ).data;
          console.log(res);
          this.$socket.emit("login");
          this.$router.push("/Lobby");
        } catch (err) {
          console.log("Cannot log user, check pseudo or password validity");
          this.error = "Pseudo ou mot de passe invalide(s)";
          this.snackbar = true;
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  color: red;
}
</style>
