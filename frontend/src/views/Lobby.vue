<template>
  <div class="lobby">
    <h1>Lobby</h1>
    <div>
      <h1>
        Personnes dans le lobby :
        <div v-for="user in users" v-bind:key="user.id">{{ user.pseudo }}</div>
      </h1>

      <button>ANAS ENEMMI</button>

      <div class="chatbox">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lobby",
  props: {},
  data: function () {
    return {
      users: [],
    };
  },
  created: async function () {
    const res = await this.$axios.get(
      "http://localhost:3000/api/auth/getSession"
    );
    let user = res.data.user;
    console.log(user);
    this.$socket.emit("logged", user);
  },
  methods: {},
  sockets: {
    loggedEvent(data) {
      const lobbyUsers = data;
      console.log(lobbyUsers);
      this.users = lobbyUsers;
    },
  },
};
</script>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.lobby {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.chatbox {
  height: 250px;
  border: 1px solid black;
  overflow: auto;
}
</style>
