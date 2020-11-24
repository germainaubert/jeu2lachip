<template>
  <div class="lobbyIdContainer">
    <Chat></Chat>
    <span>Vos amis peuvent vous rejoindre grâce à ce code: </span>{{lobbyId}}
  </div>
  
  
    

</template>

<script>
import Chat from "../components/Chat";
export default {
  components: {
    Chat
  },
  computed: {
    lobbyId () {
      return this.$store.state.lobbyId
    }
  },
  sockets: {
    playerList (players) {
      console.log("hello")
      console.log(players)
    }
  }
}
</script>

  
<style scoped>
.lobbyIdContainer {
  text-align: center;
}
</style>