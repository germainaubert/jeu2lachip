<template>
  <div class="lobbyIdContainer">
    <v-card>
      <v-toolbar class="application" dark prominent>
        <v-img
          max-height="110"
          max-width="250"
          src="http://localhost:3000/static/decorations/chip.png"
        >
        </v-img>
        <v-spacer></v-spacer>
        <v-toolbar-title>
          <h1 style="font-size: 80px">Salle d'attente du Jeu de la Chips</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-img
          max-height="110"
          max-width="250"
          src="http://localhost:3000/static/decorations/chip.png"
        >
        </v-img>
      </v-toolbar>
      </v-card>
      <v-row>
      <v-col cols="3">
        <model-gltf
          :rotation="this.rotation1"
          @on-load="onLoad"
          backgroundAlpha="0"
          width="250"
          height="250"
          src="http://localhost:3000/static/chipgltf/chip_textured.gltf"
        ></model-gltf>
      </v-col>
      <v-col cols="3">
        <model-gltf
          :rotation="this.rotation3"
          @on-load="onLoad"
          backgroundAlpha="0"
          width="250"
          height="250"
          src="http://localhost:3000/static/decorations/chip_textured2.gltf"
        ></model-gltf>
      </v-col>
      <v-col cols="3">
        <model-gltf
         :rotation="this.rotation2"
          @on-load="onLoad"
          backgroundAlpha="0"
          width="300"
          height="300"
          src="http://localhost:3000/static/chipgltf/chip_textured_moonskin.gltf"
        ></model-gltf>
      </v-col>
      <v-col cols="3">
        <model-gltf
         :rotation="this.rotation1"
          @on-load="onLoad"
          backgroundAlpha="0"
          width="300"
          height="300"
          src="http://localhost:3000/static/chipgltf/nacho_textured.gltf"
        ></model-gltf>
      </v-col>
     </v-row>

    <v-card width="800" dark class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Id de la partie : {{ lobbyId }}</h1>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded v-if="gameLeader" color="success" v-on:click="goToGame"
      >Commencer</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

import { ModelGltf } from "vue-3d-model";
export default {
  data() {
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
      },
      rotation3: {
        x: -Math.PI / 2,
        y: 0,
        z: 0,
      },
      rotation4: {
        x: -Math.PI / 2,
        y: 0,
        z: 0,
      },
    };
  },
  components: {
    ModelGltf,
  },
  computed: {
    lobbyId() {
      return this.$store.state.lobbyId;
    },
    gameLeader() {
      return this.$store.state.gameLeader;
    },
  },

  sockets: {
    // playerList(users) {
    //   this.$store.state.users = users //
    //   console.log("list users + sockets", this.$store.state.users)
    // },
    startGame() {
      this.$router.push("/Game");
    },
  },
  methods: {
    goToGame: function () {
      this.$socket.emit("notifyInitGame", this.lobbyId);
    },
    onLoad() {
      this.rotate();
    },
    rotate() {
      this.rotation1.z += 0.001;
      this.rotation2.x += 0.001;
      this.rotation3.x += 0.001;
      this.rotation3.y += 0.001;
      requestAnimationFrame(this.rotate);
    },
  },
};
</script>

  
<style scoped>
.lobbyIdContainer {
  text-align: center;
}
#canvas {
  border: 20px solid black;
}
@import url("https://fonts.googleapis.com/css?family=Questrial");

.v-toolbar {
  font-family: "Deluce Free";
  font-size: 1.5em;
}
</style>