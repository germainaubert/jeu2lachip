<template>
  <div class="div">
    <input type="text" placeholder="entrer l'id du lobby" v-model="lobbyId" v-on:keyup.enter="searchLobby()">
    <button v-on:click="createLobby()">Créer un lobby </button>
    <button v-on:click="joinLobby()"> Partie rapide</button>
  </div>
</template>

<script>

export default {
  async mounted() {
    this.$socket.open();
  },
  data: function() {
    return {
      lobbyId: ""
    }
  },
  methods: {
    createLobby() {
      this.$socket.emit("login", "createLobby");
    },
    searchLobby() {
      console.log(this.lobbyId)
      this.$socket.emit("login", "joinByCode", this.lobbyId);
      this.lobbyId = "";
    },
    joinLobby() {
      this.$socket.emit("login", "joinRandom");
    }
  }
};
</script>