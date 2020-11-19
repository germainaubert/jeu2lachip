<template>
  <div>
    <PreLobbyDisplay id="display"></PreLobbyDisplay>
    <JoinLobby v-if="joinLobbyComp"></JoinLobby>
    <CreateLobby v-if="createLobbyComp"></CreateLobby>
  </div>
</template>

<script>
import JoinLobby from "../components/JoinLobby";
import PreLobbyDisplay from "../components/PreLobbyDisplay";
import CreateLobby from "../components/CreateLobby"

export default {
  components: {
    JoinLobby,
    PreLobbyDisplay,
    CreateLobby,
  },
  mounted: async function () {
    this.$socket.open();
    this.$socket.emit("logged");
    const res2 = (
      await this.$axios.get("http://localhost:3000/api/auth/getUser")
    ).data.user;
    this.currentUser = res2;
    // focus sur lobby display
    document.getElementById("display").focus()
  },
  computed: {
    joinLobbyComp() {
      return this.$store.state.joinLobbyComp;
    },
    createLobbyComp() {
      return this.$store.state.createLobbyComp;
    }
  },
};
</script>

<style>
.box {
  position: absolute;
  top: 33%;
  left: 35%;
  z-index: 20;
}
</style>