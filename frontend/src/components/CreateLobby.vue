<template>
  <v-card dark height="210" width="500" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Créer un Lobby</h1>
      </v-card-title>
      <v-card-text>
        <span>Les options pour créer le truc (ex: privé saucisse etc...)</span>
        <span class="mx-auto">{{error}}</span>
      </v-card-text>
      
      <v-card-actions>
        <v-btn color="success" v-on:click="createLobbyReq">Créer le lobby</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  data: function () {
      return {
          error: ""
      }
  },
  methods: {
      createLobbyReq: function async () {
        this.$socket.emit("createLobby")
      }
  },
  sockets: {
    validCreation(flag) {
      this.$store.state.gameLeader = true
      if (flag) {
        this.$store.state.lobbyId = flag
        this.$router.push("/Lobby")
      } else {
        this.error = "A problem has occured during lobby creation, reconnect and try again"
      }
    }
  }
};
</script>