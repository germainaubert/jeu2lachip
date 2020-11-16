<template>
  <v-app>
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
