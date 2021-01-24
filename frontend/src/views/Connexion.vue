<template>
  <v-container>
   <v-row>
      <v-col cols="3">
        <model-gltf
          :rotation="this.rotation1"
          @on-load="onLoad"
          backgroundAlpha="0"
          width="150"
          height="150"
          src="http://localhost:3000/static/421/dice.gltf"
        ></model-gltf>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <model-gltf
          :rotation="this.rotation2"
          @on-load="onLoad"
          backgroundAlpha="0"
          width="150"
          height="150"
          src="http://localhost:3000/static/421/dice.gltf"
        ></model-gltf>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <model-gltf
         :rotation="this.rotation3"
          @on-load="onLoad"
          backgroundAlpha="0"
          width="150"
          height="150"
          src="http://localhost:3000/static/421/dice.gltf"
        ></model-gltf>
      </v-col>
     </v-row>
    <v-card width="500" dark class="mx-auto mt-10">
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
        <v-btn rounded color="success" v-on:click="connexionRequest">Connexion</v-btn>
      </v-card-actions>
    </v-card>

    
  </v-container>
</template>

<script>

import { ModelGltf } from "vue-3d-model";
export default {
  name: "Connexion",
  props: {
    msg: String,
  },
  components: {
    ModelGltf,
  },
  data: function () {
    return {
      rotation1: {
        x: -Math.PI / 2,
        y: 0,
        z: 0,
      },
      rotation2: {
        x: -Math.PI / 2,
        y: 0,
        z: 0,
      },rotation3: {
        x: -Math.PI / 2,
        y: 0,
        z: 0,
      },
      pseudo: "",
      password: "",
      error: "",
      showPassword: false,
    };
  },
  methods: {
    onLoad() {
      this.rotate();
    },
    rotate() {
      this.rotation1.z += 0.01;
      this.rotation2.x += 0.01;
      this.rotation3.z -= 0.01;
      requestAnimationFrame(this.rotate);
    },
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
          // this.$socket.emit("login");
          this.$router.push("/PreLobby");
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
