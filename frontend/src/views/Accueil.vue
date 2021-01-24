<template>
    <v-layout align-center justify-center>
      <v-img
        src="../assets/image.png"
        max-height="2000"
        max-width="2500 "
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
