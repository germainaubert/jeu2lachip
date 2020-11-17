<template>
  <v-card >
    <v-toolbar dark>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Le Jeu de la Chips</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
        {{item.title}}
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