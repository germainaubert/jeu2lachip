<template> 
  <div class="inscription">
    <h1>s'inscrire</h1>
    <div>
        <h2> Prenom </h2>
        <input v-model="prenom"/>
        <br/>
        <h2> nom </h2>
        <input v-model="nom"/>
        <br/>
        <h2> password </h2>
        <input v-model="pseudo"/>
        <br/>
        <h2> password </h2>
        <input v-model="mail"/>
        <br/>
        <h2> password </h2>
        <input v-model="password"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Inscription',
  props: {
    msg: String
  },
  data: function (){
    return { 
      password: "",
    }
  },
  methods : {
    send : function (){
      console.log("test")
      if (this.password === "covid"){
        this.$emit('pwok')
      }      
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
