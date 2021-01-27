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
    this.game.scenes[0].basicInit()
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
    pmuInitiated(data) {
      console.log(data);
      const deck = data.deck;
      const pseudo = this.game.scenes[0].localPlayer.pseudo;
      const player = data.players.find((p) => p.name === pseudo);

      if (!player) {
        throw new Error("joueur non trouvé");
      }
      // Affichage des objets 3d
      this.game.scenes[0].displayPlayers(data.players);
      this.game.scenes[0].displayMalus(deck);
      this.game.scenes[0].displayCards(deck);
      this.game.scenes[0].hud.displayInfos(player);
      // 15 secondes d'attentes le temps que toutes les textures et les modeles soient chargés
      setTimeout(() => {
        if (this.gameLeader) {
          // Envoie de la socket pour jouer une partie
          this.$socket.emit("pmuPlay", this.lobbyId);
        }
      }, 3000);
    },
    pmuPlayed(data) {
      // Récuperation des données de la partie simulée
      const advancement = data.advancement;
      const turns = data.turns;
      // Lancement des animations a partir des résultats récupérés
      this.game.scenes[0].animationManager(turns, advancement);
    },
    
    endPmu(data) {
      this.game.scenes[0].hud.pmuEnd(data[3].name);
      this.$router.push("/Purple")
      if (this.gameLeader) {
        setTimeout(() => {
          this.$socket.emit("purpleInit", this.lobbyId, data);
          
        }, 2000);
      }
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
