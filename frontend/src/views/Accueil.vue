<template>
    <v-layout align-center justify-center>
      <v-img
        src="../assets/image.png"
        max-height="800"
        max-width="1700"
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
