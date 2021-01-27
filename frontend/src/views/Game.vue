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
      this.game.getCurrentScene().hud.displayInfos(player);
      // 15 secondes d'attentes le temps que toutes les textures et les modeles soient chargés
      setTimeout(() => {
        if (this.gameLeader) {
          // Envoie de la socket pour jouer une partie
          this.$socket.emit("pmuPlay", this.lobbyId);
        }
      }, 10000);
    },
    pmuPlayed(data) {
      // Récuperation des données de la partie simulée
      const advancement = data.advancement;
      const turns = data.turns;
      // Lancement des animations a partir des résultats récupérés
      this.game.getCurrentScene().animationManager(turns, advancement);
    },
    purpleInitiated(data) {
      this.game.getCurrentScene().scene.dispose();
      this.game._currentSceneIndex++;
      this.game.getCurrentScene().basicInit();
      console.log(data);
      setTimeout(() => {
        const deck = data.deck;
        this.game.getCurrentScene().displayPlayers(data.players);
        this.game.getCurrentScene().displayCards(deck);

        const name = this.game.getCurrentScene().localPlayer.pseudo;
        const player = data.players.find((p) => p.name === name);
        console.log(player);
        this.game.getCurrentScene().hud.displayInfos(player);
        this.game
          .getCurrentScene()
          .hud.displayCurrentPlayer(data.currentPlayer);
        if (player.name === data.currentPlayer.name) {
          console.log("display QUESIOTN GMAEVUE");
          this.game.getCurrentScene().displayQuestions(data.questions);
        }
      }, 2000);
    },
    purplePlayTurn(data) {
      let cardName = [];
      for (let i = 0; i < data.cardDrawed.length; i++) {
        cardName.push(
          data.cardDrawed[i].name + "_de_" + data.cardDrawed[i].color.color
        );
      }
      // let j = 0;
      // let id = setInterval(() => {
      //   this.game.getCurrentScene().drawCard(cardName[j], data.turns);
      //   j++;
      // }, 400);
      setTimeout(() => {
        this.game.getCurrentScene().drawCard(cardName[0], data.turns);
      }, 400);
      setTimeout(() => {
        this.game.getCurrentScene().drawCard(cardName[1], data.turns);
      }, 1200);
      // j++;
      // if (j >= 2) {
      //   clearInterval(id);
      // }
      const name = this.game.getCurrentScene().localPlayer.pseudo;
      const player = data.players.find((p) => p.name === name);
      this.game.getCurrentScene().hud.displayInfos(player);
      this.game.getCurrentScene().hud.displayCurrentPlayer(data.currentPlayer);
      if (player.name === data.currentPlayer.name) {
        this.game.getCurrentScene().displayQuestions(data.questions);
      }
    },
    endPmu(data) {
      this.game.getCurrentScene().hud.pmuEnd(data[3].name);
      console.log;
      if (this.gameLeader) {
        setTimeout(() => {
          this.$socket.emit("purpleInit", this.lobbyId, data);
        }, 2000);
      }
    },

    purpleEnd(data) {
      console.log("salut depuis game.vue");
      this.game.getCurrentScene().hud.endMessage(data.currentPlayer.name);
      this.game.getCurrentScene().scene.dispose();
      setTimeout(() => {
        console.log(this.game._currentSceneIndex);
        if (this.gameLeader) {
          this.$socket.emit("init421", this.lobbyId);
        }
      }, 3000);
    },

    initAll(gameData) {
      this.game._currentSceneIndex++;
      this.game.getCurrentScene().basicInit();
      this.game.getCurrentScene().gameData = gameData;
      this.game.getCurrentScene().players = gameData.players;
      this.game.getCurrentScene().init421();
    },
    glowMesh(gameData) {
      this.game.getCurrentScene().gameData = gameData;
      this.game.getCurrentScene().glowMesh();
    },
    throwDices(gameData) {
      this.game.getCurrentScene().gameData = gameData;
      this.game.getCurrentScene().throwDices();
    },
    result(gameData) {
      this.game.getCurrentScene().gameData = gameData;
      this.game.getCurrentScene().result();
    },
    resetPick(gameData) {
      this.game.getCurrentScene().gameData = gameData;
      console.log(gameData);
      this.game.getCurrentScene().resetPick();
    },
    nextTurn(gameData) {
      this.game.getCurrentScene().gameData = gameData;
      this.game.getCurrentScene().players = gameData.players;
      this.game.getCurrentScene().nextTurn();
    },
    endPick(gameData) {
      this.game.getCurrentScene().players = gameData.players;
      this.game.getCurrentScene().endPick();
    },
    freeDice(idDice) {
      this.game.getCurrentScene().freeDice(idDice);
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
