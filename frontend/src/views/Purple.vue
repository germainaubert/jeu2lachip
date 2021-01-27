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
    purpleInitiated(data) {
      this.game.scenes[1].basicInit();
      setTimeout(() => {
        const deck = data.deck;
        this.game.scenes[1].displayPlayers(data.players);
        this.game.scenes[1].displayCards(deck);

        const name = this.game.scenes[1].localPlayer.pseudo;
        const player = data.players.find((p) => p.name === name);
        this.game.scenes[1].hud.displayInfos(player);
        this.game
          .getCurrentScene()
          .hud.displayCurrentPlayer(data.currentPlayer);
        if (player.name === data.currentPlayer.name) {
          this.game.scenes[1].displayQuestions(data.questions);
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
      //   this.game.scenes[1].drawCard(cardName[j], data.turns);
      //   j++;
      // }, 400);
      setTimeout(() => {
        this.game.scenes[1].drawCard(cardName[0], data.turns);
      }, 400);
      setTimeout(() => {
        this.game.scenes[1].drawCard(cardName[1], data.turns);
      }, 800);
      // j++;
      // if (j >= 2) {
      //   clearInterval(id);
      // }
      const name = this.game.scenes[1].localPlayer.pseudo;
      const player = data.players.find((p) => p.name === name);
      this.game.scenes[1].hud.displayInfos(player);
      this.game.scenes[1].hud.displayCurrentPlayer(data.currentPlayer);
      if (player.name === data.currentPlayer.name) {
        this.game.scenes[1].displayQuestions(data.questions);
      }
    },

    purpleEnd(data) {
      console.log("salut depuis game.vue");
      this.game.scenes[1].hud.endMessage(data.currentPlayer.name);
    //   this.game.getCurrentScene().scene.dispose();
      if (this.gameLeader) {
        setTimeout(() => {
          console.log("INIT 421");
          this.socket.emit("init421", this.lobbyId);
        }, 3000);
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
