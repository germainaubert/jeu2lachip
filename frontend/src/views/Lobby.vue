<template>
  <div class="lobbyIdContainer">
    <Chat></Chat>
    <div>
      <span>Vos amis peuvent vous rejoindre grâce à ce code: </span
      >{{ lobbyId }}
    </div>

    <v-btn color="success" v-on:click="goToGame">Commencer</v-btn>
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
  },
  sockets: {
    playerList(players) {
      console.log("hello");
      console.log(players);
    },
  },
  methods: {
    goToGame: function () {
      this.$router.push("/Game");
    },
  },
};
</script>

  
<style scoped>
.lobbyIdContainer {
  text-align: center;
}
</style>