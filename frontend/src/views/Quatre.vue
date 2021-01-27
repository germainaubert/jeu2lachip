<template>
  <canvas ref="renderCanvas"></canvas>
</template>

<script>
import { Game } from "../game/gameMain.js";

export default {
  data: function () {
    return {
      game: null,
    };
  },

  mounted: function () {
    this.game = new Game(
      this.$refs.renderCanvas,
      this.$socket,
      this.playerList,
      this.lobbyId,
      this.localPlayer,
      this.gameLeader
    );
  },
  computed: {
    playerList() {
      return this.$store.state.playerList;
    },
    lobbyId() {
      return this.$store.state.lobbyId;
    },
    localPlayer() {
      return this.$store.state.localPlayer;
    },
    gameLeader() {
      return this.$store.state.gameLeader;
    },
  },
  sockets: {
    initAll(gameData) {
      this.game.scenes[2].gameData = gameData;
      this.game.scenes[2].players = gameData.players;
      this.game.scenes[2].init421();
    },
    glowMesh(gameData) {
      this.game.scenes[2].gameData = gameData;
      this.game.scenes[2].glowMesh();
    },
    throwDices(gameData) {
      this.game.scenes[2].gameData = gameData;
      this.game.scenes[2].throwDices();
    },
    result(gameData) {
      this.game.scenes[2].gameData = gameData;
      this.game.scenes[2].result();
    },
    resetPick(gameData) {
      this.game.scenes[2].gameData = gameData;
      console.log(gameData);
      this.game.scenes[2].resetPick();
    },
    nextTurn(gameData) {
      this.game.scenes[2].gameData = gameData;
      this.game.scenes[2].players = gameData.players;
      this.game.scenes[2].nextTurn();
    },
    endPick(gameData) {
      this.game.scenes[2].players = gameData.players;
      this.game.scenes[2].endPick();
    },
    freeDice(idDice) {
      this.game.scenes[2].freeDice(idDice);
    },
  },
  methods: {},
};
</script>

<style>
style {
  overflow: "hidden";
  width: "100%";
  height: "100%";
  margin: "0";
  padding: "0";
}
body {
  overflow: "hidden";
  width: "100%";
  height: "100%";
  margin: "0";
  padding: "0";
}

canvas {
  width: "100%";
  height: "100%";
}
</style>
