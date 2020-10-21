<template> 
  <div class="lobby">
    <h1>Bienvenue sur le jeu de la Chips</h1>
    <div>
      <button v-on:click="invite()">
        <router-link to="/Invitation">Inviter des amis</router-link>
      </button>
      <br>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Lobby',
  props: {
    //msg: String,
    //connectIsClicked : Boolean,
    //registerIsClicked : Boolean
  },
  data: function (){
    return { 
    }
  },
  methods : {
    connect : function (){
      this.connectIsClicked = true
      this.$emit('toLink')

      console.log("test")      
    },
    inscrire : function(){
      this.registerIsClicked = true
      this.$emit('toLink')
      console.log("test") 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
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
