<template>
  <div>
      <JoinLobby></JoinLobby>
      <CreateLobby></CreateLobby>
  </div>
</template>

<script>
import JoinLobby from "../components/JoinLobby";
import CreateLobby from "../components/CreateLobby";

export default {
  components: {
    JoinLobby,
    CreateLobby,
  },
  mounted: async function () {
    this.$socket.open();
    this.$socket.emit("logged");
    const res2 = (
      await this.$axios.get("http://localhost:3000/api/auth/getUser")
    ).data.user;
    console.log(res2)
    this.$store.state.localPlayer = res2;
    // focus sur lobby display
  },
};
</script>

<style>

</style>