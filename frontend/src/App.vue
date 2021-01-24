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
    
    <template
      v-if='
        this.$router.history.current.name === "Amis" ||
        this.$router.history.current.name === "AdministrationAccueil" ||
        this.$router.history.current.name === "CreationGame" ||
        this.$router.history.current.name === "GestionGames" ||
        this.$router.history.current.name === "GestionUsers" ||
        this.$router.history.current.name === "InvitationAmi" ||
        this.$router.history.current.name === "VotreCompte" ||
        this.$router.history.current.name === "ChangePseudo" ||
        this.$router.history.current.name === "ChangePassword"
      '
    >
      <NavbarConnected />
    </template>
    <router-view />
  </v-app>
</template>


<script>
import Navbar from "./components/NavBar";
import NavbarConnected from "./components/NavBarConnected";

export default {
  name: "App",
  components: { Navbar, NavbarConnected },
};
</script>
<style scoped>

</style>
