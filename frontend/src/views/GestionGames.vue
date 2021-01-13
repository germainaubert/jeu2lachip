<template>
  <v-container>
    <v-card width="500" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Gestion des jeux</h1>
      </v-card-title>
      <v-card-actions>
        <v-btn  v-on:click="goCreationGame">Ajouter un jeu</v-btn>
      </v-card-actions>
      <div>
        <v-data-table
          :headers="headers"
          :items="games"
          item-key="game.id"
          class="elevation-1"
        >
          <template v-slot:item.is_admin="props">
            <v-btn v-on:click="deleteGame(props.item.name)">supprimer {{props.item.name}}</v-btn>
          </template>

        </v-data-table>
      </div>
    </v-card>
  </v-container>
</template>

<script>
//import ConnexionVue from './Connexion.vue';
//const axios = require('axios')
export default {
  name: "gestionGames",
  props: {},
  data: function () {
    return {
      headers: [
        {
          text: "Jeux",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "supprimer un jeu",
          align: "end",
          sortable: false,
          value: "is_admin",
        },
      ],
      games: [],
      showSuppressionPopup : false
    };
  },

  mounted: async function () {
    this.getGames();
  },

  methods: {

    async getGames() {
      const res = await this.$axios.get(
        "http://localhost:3000/api/games/liste"
      );
      console.log(res.data);
      this.games = res.data;
      console.log(this.games);
    },

    async deleteGame(gameName) {
      //this.showSuppressionPopup = true;

      const res = await this.$axios.delete(
        "http://localhost:3000/api/games/" + gameName 
      );
      if (res.data.supprimer === true) {
        this.$router.push("/GestionGames");
      }
    },

    async goCreationGame(){
      this.$router.push("/CreationGame");
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
