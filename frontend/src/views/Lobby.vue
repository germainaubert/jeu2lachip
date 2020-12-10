<template>
  <div class="lobbyIdContainer">
    <Chat></Chat>
    <div>
      <span>Vos amis peuvent vous rejoindre grâce à ce code: </span
      >{{ lobbyId }}
    </div>

    <v-btn v-if="gameLeader" color="success" v-on:click="goToGame">Commencer</v-btn>
  </div>
</template>

<script>
import Chat from "../components/Chat";
export default {
  components: {
    Chat,
  },
  computed: {
    lobbyId() {
      return this.$store.state.lobbyId;
    },
    gameLeader () {
      return this.$store.state.gameLeader
    }
  },
  sockets: {
    // playerList(users) {
    //   this.$store.state.users = users // 
    //   console.log("list users + sockets", this.$store.state.users)
    // },
    startGame() {
      this.$router.push("/Game");
    }
  },
  methods: {
    goToGame: function () {
      this.$socket.emit("notifyInitGame", this.lobbyId);
    },
  },
};
</script>

  
<style scoped>
.lobbyIdContainer {
  text-align: center;
}
</style>