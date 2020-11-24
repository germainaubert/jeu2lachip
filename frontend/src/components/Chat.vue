<template>

    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12" color="primary lighten-4">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>Chat</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
        <v-list ref="chat" id="logs">
          <template v-for="(item, index) in logs">
            <v-subheader v-if="item" :key="index"> <div class="messageModel"><div v-if='item.pseudo' id="pseudo">{{ item.pseudo }} dit : </div>  <div id="message"> {{ item.message }} </div></div></v-subheader>
          </template>
        </v-list>
            </v-card-text>
            <v-card-actions>
              <v-form @submit.prevent="sendMessage">
              <v-text-field v-model="msg" label="Message" single-line ></v-text-field>
              
                </v-form>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
    logs: [],
    msg: null
  }),
  created (){
      this.initChat()
  },
  computed: {
    lobbyId () {
      return this.$store.state.lobbyId
    },
    
  },
  methods: {
      initChat() {
        this.$socket.emit("initChat", this.$store.state.lobbyId)
    },
    sendMessage() {
    this.$socket.emit("sendMessage", this.msg, this.lobbyId)
    this.msg=""
    }
  },
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  },
  sockets: {
      sendMessageEvent(data) {
          this.logs = data
      },
      initChat(data) {
          this.logs = data
      }
  }
};
</script>
<style scoped>
#logs {
  height: 100px;
  overflow: auto;
}
.messageModel {
    display: flex;
    flex-direction: column;
}
#pseudo {
    color: red;
    font: bold;
}
</style>
