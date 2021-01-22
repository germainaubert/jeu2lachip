<template>
  <div>
    <v-card>
      <v-toolbar class="application" dark prominent>
        <v-img
          max-height="110"
          max-width="250"
          src="../assets/chip_textured.png"
        >
        </v-img>
        <v-spacer></v-spacer>
        <v-toolbar-title>
          <h1 style="font-size: 80px">Le Jeu de la Chips</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-img
          max-height="110"
          max-width="250"
          src="../assets/chip_textured.png"
        >
        </v-img>
      </v-toolbar>
    </v-card>
    <v-row align-content>
      <v-col cols="6">
        <JoinLobby></JoinLobby>
      </v-col>
      <v-col cols="6"><CreateLobby></CreateLobby></v-col>
      <div style="margin-left: 550px">
        <v-col cols="6">
          <model-gltf
            :rotation="this.rotation2"
            @on-load="onLoad"
            backgroundAlpha="0"
            width="600"
            height="400"
            src="http://localhost:3000/static/decorations/card.gltf"
          ></model-gltf>
        </v-col>
        
      </div>
    </v-row>
  </div>
</template>

<script>
import { ModelGltf } from "vue-3d-model";
import JoinLobby from "../components/JoinLobby";
import CreateLobby from "../components/CreateLobby";

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
    };
  },
  components: {
    JoinLobby,
    CreateLobby,
    ModelGltf,
  },
  methods: {
    onLoad() {
      this.rotate();
    },
    rotate() {
      this.rotation1.z += 0.01;
      this.rotation2.x += 0.01;
      requestAnimationFrame(this.rotate);
    },
  },
  mounted: async function () {
    this.$socket.open();
    this.$socket.emit("logged");
    const res2 = (
      await this.$axios.get("http://localhost:3000/api/auth/getUser")
    ).data.user;
    console.log(res2);
    this.$store.state.localPlayer = res2;
    // focus sur lobby display
  },
};
</script>

<style>
</style>