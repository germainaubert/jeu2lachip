<template>
  <v-card >
    <v-toolbar dark>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Le Jeu de la Chips</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-on:click="goVotreCompte">{{currentUser.pseudo}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      currentUser: "",
    };
  },
  mounted : async function () {
    const res = await this.$axios.get(
      "http://localhost:3000/api/auth/getSession"
    )
    let user = res.data.user
    this.currentUser = user
  },
  methods: {
     goVotreCompte : async function (){
      this.$router.push("/VotreCompte");
    }
  },
};
</script>