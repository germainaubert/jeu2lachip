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
    <v-card dark width="500" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Inscription</h1>
      </v-card-title>
      <v-card-text>
        <span class="errPseudo">{{validityPseudo}}</span>
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
      </v-card-text>
      <v-card-actions v-if="validButton">
        <v-btn rounded color="green" v-on:click="checkInfo">S'inscrire</v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-btn rounded color="green" disabled v-on:click="checkInfo">S'inscrire</v-btn>
      </v-card-actions>
    </v-card>
    <v-card dark width="400" class="mx-auto mt-5">
      Le mot de passe doit contenir au moins:
      <v-row v-for="label in validPassword" :key="label.name" class="ml-2">
        <v-icon v-if="label.state" color="green">
          {{label.icon}}
        </v-icon>
        <v-icon v-else color="red">
          {{label.icon}}
        </v-icon>
        {{ label.name }}
      </v-row>
    </v-card>
  </v-container>
  
</template>

<script>
import { ModelGltf } from "vue-3d-model";
//import User from '../../../backend/models/user.model.js'
export default {
  name: "Inscription",
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
      validityPseudo: "",
      inputError: "",
      showPassword: false,
      validPassword: [
        { name: "6 caractères minimum", icon:"clear", state: false },
        { name: "Une majuscule", icon:"clear", state: false },
        { name: "Un caractère spécial: ! @ # $ % ^ & * ?", icon:"clear", state: false },
        { name: "Un chiffre", icon:"clear", state: false },
      ],
      validButton: true
    };
  },
  watch: {
    pseudo: "lookAtPseudo",
    password: "passwordValidation"
  },

  methods: {
    onLoad() {
      this.rotate();
    },
    rotate() {
      this.rotation1.z += 0.01;
      this.rotation2.x += 0.01;
      this.rotation3.y += 0.01;
      requestAnimationFrame(this.rotate);
    },
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
          const res2 = await this.$axios.get(
          "http://localhost:3000/api/auth/getSession"
        );
        console.log(res2)
          // self.$session.start(res.id)
          // console.log(self.$sessions.getAll())
          this.$router.push("/PreLobby");
          // this.$socket.emit("login");
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
      console.log(this.validityPseudo)
    },

    // errCleaner: function () {
    //   if (this.pseudo.length === 0) {
    //     this.validityPseudo = "";
    //   }
    // },
    // lookAtPseudo: async function () {
    //   if (this.pseudo) {
    //     await this.pseudoValidity();
    //   } else {
    //     this.validityPseudo = "";
    //   }
    // },
    // passwordValidation: function () {
    //   let flag = true
    //   // 6 caracatères min
    //   if (this.password.length > 5) {
    //     this.validPassword[0].state = true
    //     this.validPassword[0].icon = "done"
    //   } else {
    //     this.validPassword[0].state = false
    //     this.validPassword[0].icon = "clear"
    //     flag = false
    //   }
      
    //   // Majuscule
    //   const majRegex = new RegExp('(?=.*[A-Z])')

    //   if (majRegex.test(this.password)) {
    //     this.validPassword[1].state = true
    //     this.validPassword[1].icon = "done"
    //   } else {
    //     this.validPassword[1].state = false
    //     this.validPassword[1].icon = "clear"
    //     flag = false
    //   }

    //   // Caractère spécial
    //   const specialRegex = new RegExp('(?=.*[!@#$%^&*?])')
      
    //   if (specialRegex.test(this.password)) {
    //     this.validPassword[2].state = true
    //     this.validPassword[2].icon = "done"
    //   } else {
    //     this.validPassword[2].state = false
    //     this.validPassword[2].icon = "clear"
    //     flag = false
    //   }

    //   // Chiffre
    //   const digitRegex = new RegExp('(?=.*[0-9])')
      
    //   if (digitRegex.test(this.password)) {
    //     this.validPassword[3].state = true
    //     this.validPassword[3].icon = "done"
    //   } else {
    //     this.validPassword[3].state = false
    //     this.validPassword[3].icon = "clear"
    //     flag = false
    //   }

    //   this.validButton = flag

    // }
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
.errPseudo {
  color: red;
}
</style>
