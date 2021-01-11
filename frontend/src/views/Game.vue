<template>
  <canvas ref="renderCanvas"></canvas>
</template>

<script>
import { Game } from "../game/gameMain.js"

export default {

  data: function () {
    return {
      game: null
    };
  },

  mounted: function () {
    this.game = new Game(this.$refs.renderCanvas, this.$socket, this.playerList, this.lobbyId, this.localPlayer)
    if (this.gameLeader) {
      this.$socket.emit("initChasse", this.lobbyId)
    }
  },
  computed: {
    playerList () {
      return this.$store.state.playerList
    },
    lobbyId() {
      return this.$store.state.lobbyId;
    },
    localPlayer() {
      return this.$store.state.localPlayer;
    },
    gameLeader () {
      return this.$store.state.gameLeader
    }
  },
  sockets: {
    chasseInitiated (players) {
      console.log('PLAYERS', players)
      this.game.getCurrentScene().players = players
      this.game.getCurrentScene().displayPlayers()
    },
    chasseUpdate (players) {
       this.game.getCurrentScene().updatePlayers(players)
    }
  },
  methods: {

  },
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
