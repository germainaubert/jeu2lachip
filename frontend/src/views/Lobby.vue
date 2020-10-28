<template>
  <div class="lobby">
    <h1>Lobby</h1>
    <h3 class="connectedAs">{{ currentUser.pseudo }}</h3>
    <canvas 
      v-on:keyup.down="moveDown()"
      v-on:keyup.left="moveLeft()"
      v-on:keyup.right="moveRight()"
      v-on:keyup.up="moveUp()"
      tabindex="0"
      ref="canvas"
      id="canvas"
      class="bg"
      width="400"
      height="400"
    ></canvas>
    <div>
      <div class="chat">
        <div class="chatbox">
          <div v-if="messages.length > 0" class="messages">
            <div v-for="(message, index) in messages" v-bind:key="index">
              <div id="pseudo">{{ message.pseudo }} dit:</div>
              <div>{{ message.content }}</div>
            </div>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Ecrivez un Message"
            v-model="message"
          />
          <button v-on:click="sendMessage()">Envoyer</button>
        </div>
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
      messages: [],
      message: "",
      currentUser: {},
      players: [],
      player: null,
      vueCanvas: null,
    };
  },

  mounted: async function () {
    const res = await this.$axios.get(
      "http://localhost:3000/api/auth/getSession"
    );
    let user = res.data.user;
    this.currentUser = user;
    console.log(user);
    this.$socket.emit("logged", user);
    this.canvas = this.$refs.canvas
    const ctx = this.canvas.getContext("2d");
    this.vueCanvas = ctx;
    console.log("a")
    this.drawPlayers()
    this.update()
  },
  methods: {
    drawPlayers() {
      this.players.forEach((player) => {
        this.vueCanvas.beginPath();
        this.vueCanvas.rect(player.x, player.y, player.size, player.size);
        this.vueCanvas.fillStyle = player.c;
        this.vueCanvas.fill();
      });
    },
    update() {
      this.vueCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawPlayers();
      requestAnimationFrame(this.update);
    },
    moveDown() {
      this.$socket.emit("moveDown", {
        currentUser: this.currentUser,
      });
    },
    moveLeft() {
      this.$socket.emit("moveLeft", {
        currentUser: this.currentUser,
      });
    },
    moveRight() {
      this.$socket.emit("moveRight", {
        currentUser: this.currentUser,
      });
    },
    moveUp() {
      this.$socket.emit("moveUp", {
        currentUser: this.currentUser,
      });
    },
    sendMessage() {
      this.$socket.emit("sendMessage", {
        pseudo: this.currentUser.pseudo,
        content: this.message,
      });
      this.message = "";
    },
  },
  sockets: {
    loggedEvent(data) {
      console.log("data du log : ", data);
      const lobbyUsers = data.users;
      const chat = data.chat;
      const players = data.players;

      console.log(lobbyUsers);
      this.users = lobbyUsers;
      this.messages = chat;
      this.players = players;
    },
    sendMessageEvent(data) {
      const chat = data;
      console.log(chat);
      this.messages = chat;
    },
    moveDownEvent(data) {
      const players = data;
      this.players = players;
      this.drawPlayers();
    },
    moveLeftEvent(data) {
      const players = data;
      this.players = players;
      this.drawPlayers();
    },
    moveRightEvent(data) {
      const players = data;
      this.players = players;
      this.drawPlayers();
    },
    moveUpEvent(data) {
      const players = data;
      this.players = players;
      this.drawPlayers();
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
html { overflow-y: hidden; } 
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
.connectedAs {
  margin-left: 1500px;
  color: red;
}
.chat {
  margin-left: 1500px;
}
#pseudo {
  font: bold;
  color: red;
}
</style>
