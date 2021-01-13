<template>
  <v-container>
    <v-card width="500" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Ajout d'un jeu</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Nom du jeu"
            v-model="ajoutNom"
          />
          <v-text-field
            label="Logo du jeu"
            v-model="ajoutLogo"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn  v-on:click="addGame">Ajouter le jeu</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
//import ConnexionVue from './Connexion.vue';
//const axios = require('axios')
export default {
  name: "creationGames",
  props: {},
  data: function () {
    return {
      ajoutNom : null,
      ajoutLogo : null,
      showAddPopup : false
    };
  },

  mounted: async function () {
    
  },

  methods: {

    async addGame() {
      //this.showAddPopup = true
      const res = await this.$axios.post(
        "http://localhost:3000/api/games/addGames/" + this.ajoutNom + "/" + this.ajoutLogo
      );
      if (res.data.ajouter === true) {
        this.$router.push("/GestionGames");
      }
    },
  },
};
</script>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual popup */
.popup .popuptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
