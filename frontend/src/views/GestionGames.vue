<template>
  <div class="gestionGames">
    <h1>Gestion des jeux</h1>
    <div>
      <router-link to="/CreationGame" tag="button">Ajouter un jeu</router-link>
      <table>
      <tbody>
        <tr v-for="game in games" v-bind:key="game.id">
          <td>{{ game.name }}</td>
          <td class="editLabel">
            <div class="popup" v-on:click="deleteGame(game.name)">
              SUPPRIMER
              <span class="popuptext" id="suppressionPopup" v-bind:class="{show:showSuppressionPopup}">Ce jeu a été supprimé</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <br />
  </div>
</template>

<script>
//import ConnexionVue from './Connexion.vue';
//const axios = require('axios')
export default {
  name: "gestionGames",
  props: {},
  data: function () {
    return {
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
