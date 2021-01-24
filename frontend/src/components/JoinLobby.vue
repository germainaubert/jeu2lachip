<template>
  <v-card dark width="500" class="mx-auto mt-10">
    <v-card-title>
      <h1 class="display-1">Rejoindre un lobby</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Id du lobby"
          prepend-icon="mdi-account-group"
          v-model="idLobby"
        />
      </v-form>
      <span class="mx-auto">{{ error }}</span>
    </v-card-text>

    <v-card-actions>
      <v-btn color="success" v-on:click="joinLobbyReq"
        >Rejoindre le lobby</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: function () {
    return {
      idLobby: "",
      error: "",
    };
  },
  methods: {
    joinLobbyReq: function async() {
      console.log(this.idLobby);
      this.$socket.emit("joinByCode", this.idLobby);
    },
  },
  sockets: {
    validJoin(flag) {
      if (flag) {
        this.$store.state.lobbyId = flag
        this.$router.push("/Lobby")
      } else {
        this.error = "You can't join that lobby"
      }
    }
  }
};
</script>