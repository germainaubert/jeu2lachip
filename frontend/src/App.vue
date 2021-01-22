<template>
  <v-app style="background-image:url('http://localhost:3000/static/Table.jpg');">
    <template
      v-if='
        this.$router.history.current.name === "Default" ||
        this.$router.history.current.name === "Inscription" ||
        this.$router.history.current.name === "Connexion"
      '
    >
      <Navbar />
    </template>
    <router-view />
  </v-app>
</template>


<script>
import Navbar from "./components/NavBar";

export default {
  name: "App",
  components: { Navbar },
};
</script>
<style scoped>

</style>
