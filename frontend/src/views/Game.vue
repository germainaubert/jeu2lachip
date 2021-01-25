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
    console.log("liste des joueurs",this.playerList)
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
      const pseudo = this.game.getCurrentScene().localPlayer.pseudo;
      const player = data.players.find((p) => p.name === pseudo);

      if (!player) {
        throw new Error("joueur non trouvé");
      }
      // Affichage des objets 3d 
      this.game.getCurrentScene().displayPlayers(data.players);
      this.game.getCurrentScene().displayMalus(deck);
      this.game.getCurrentScene().displayCards(deck);
      this.game.getCurrentScene().userInformations(player);
      // 15 secondes d'attentes le temps que toutes les textures et les modeles soient chargés
      setTimeout(() => {
        if (this.gameLeader) {
          // Envoie de la socket pour jouer une partie 
          this.$socket.emit("pmuPlay", this.lobbyId);
        }
      },15000);
  
    },
    pmuPlayed(data) {
      // Récuperation des données de la partie simulée
      const advancement = data.advancement; 
      const turns = data.turns 
      // Lancement des animations a partir des résultats récupérés
      this.game.getCurrentScene().animationManager(turns, advancement);
    },
    purpleInitiated(data) {
      console.log(data)
      
      this.game.getCurrentScene().displayPlayers(data.players);
      //const deck = data.deck;
      const name = this.game.getCurrentScene().localPlayer.pseudo;
      const player = data.players.find((p) => p.name === name);
      console.log(player)
      this.game.getCurrentScene().hud.displayInfos(player);
      if(player.name === data.currentPlayer.name) {
        console.log("display QUESIOTN GMAEVUE")
        this.game.getCurrentScene().displayQuestions(data.questions);
      }
      //this.game.getCurrentScene().displayCards(deck);
      

      

    },
    purplePlayTurn(data) {
      console.log(data)
  
    },
    async update421(gameData) {
      this.game.getCurrentScene().gameData = gameData;
      this.game.getCurrentScene().players = gameData.players;
      await this.game.getCurrentScene().update();
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
