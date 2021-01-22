<template>
  <v-card>
    <v-toolbar
      class="application"
      dark
      prominent
    >
     <v-img
        max-height="110"
        max-width="250"
          src="../assets/chip_textured.png">
        </v-img>
    <v-spacer></v-spacer>
      <v-toolbar-title>
       
        <router-link class="white--text" to="/" tag="span" style="cursor: pointer"
          ><h1 style="font-size: 80px"> Le Jeu de la Chips</h1></router-link
        >
      </v-toolbar-title>  
      <v-spacer></v-spacer>
       <v-img
        max-height="110"
        max-width="250"
          src="../assets/chip_textured.png">
        </v-img>
      <v-toolbar-items>
        <v-btn v-for="item in menuItems" :key="item.title" :to="item.link">
          <div style="margin:15px; font-size: 40px">
          {{ item.title }}
          </div>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { icon: "Connexion", title: "Connexion", link: "/Connexion" },
        { icon: "Inscription", title: "Inscription", link: "/Inscription" },
      ],
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Questrial");

.v-toolbar {
  font-family: "Deluce Free";
  font-size: 1.5em;
}

</style>