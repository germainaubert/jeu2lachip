<template>
    <v-layout align-center justify-center>
      <v-img
        src="../assets/paquet-chips.png"
        max-height="300"
        max-width="300"
      ></v-img>
    </v-layout>
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

};
</script>

<style scoped>
</style>
