<template> 
  <div class="lobby">
    <h1>Lobby</h1>
      <button v-on:click="initLobbyTest()">Initisaliser Lobby</button>
      <button v-on:click="joinLobbyTest()">Rejoindre Lobby</button>
  </div>
</template>

<script>

export default {
  name: 'Lobby',
  props: {
  
  },
  data: function (){
    return { 

    }
  },
  methods : {
    initLobbyTest: async function () {
      const res = (await this.$axios({
          method: "post",
          url: "http://localhost:3000/api/lobby/initTest",
          data: {
  
          }
        })).data
      console.log('jejejej', res)
    },
    joinLobbyTest: async function () {
      const res = (await this.$axios({
        method: "post",
        url: "http://localhost:3000/api/lobby/joinTest",
        data: {

        }
      })).data
      console.log('join data: ', res)
    }
  }
}
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
</style>
