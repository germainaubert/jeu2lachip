<template>
  <h1>Le jeu de la chips</h1>
</template>

<script>
export default {
  name: "Accueil",
  props: {
    //msg: String,
    //connectIsClicked : Boolean,
    //registerIsClicked : Boolean
  },
  data: function () {
    return {
      connectIsClicked: Boolean,
      registerIsClicked: Boolean,
    };
  },
  // mounted: function () {
  //   this.truc = 'w3-button w3-round-large w3-indigo w3-hover-blue w3-animate-left w3-center-align'
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
  margin-top: 100px;
}
</style>
