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
      this.localPlayer
    );
    if (this.gameLeader) {
     this.$socket.emit("pmuInit", this.lobbyId);
    }
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
    chasseInitiated(players) {
      console.log("PLAYERS", players);
      this.game.getCurrentScene().players = players;
      this.game.getCurrentScene().displayPlayers();
    },
    chasseUpdate(players) {
      this.game.getCurrentScene().updatePlayers(players);
    },
    pmuInitiated(data) {
      console.log(data);
      const deck = data.deck;

      console.log(deck);
      const pseudo = this.game.getCurrentScene().localPlayer.pseudo;
      const player = data.players.find((p) => p.name === pseudo);
      console.log("console 1 1", player);
      if (!player) {
        throw new Error("joueur non trouvé");
      }
      this.game.getCurrentScene().displayPlayers(data.players);
      this.game.getCurrentScene().displayMalus(deck);
      this.game.getCurrentScene().displayCards(deck);
      
      // debugger // eslint-disable-line
      this.game.getCurrentScene().userInformations(player);
      setTimeout(() => {
        if (this.gameLeader) {
          this.$socket.emit("pmuPlay", this.lobbyId);
        }
      },15000);
      console.log("joueurs du pmu: ", data.players);
    },
    pmuPlayed(data) {
      const advancement = data.advancement; 

      const turns = data.turns // eslint-disable-line
      this.game.getCurrentScene().animationManager(turns, advancement);
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
