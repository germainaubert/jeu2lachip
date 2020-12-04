<template>
  <div class="creationGames">
    <h1>Ajout d'un jeu</h1>
    <div>
        <label for="nameInput">Nom du jeu:</label>
        <input type="text" id="nameInput" v-model="ajoutNom" />
        <label for="logoInput">Logo du jeu:</label>
        <input type="text" id="logoInput" v-model="ajoutLogo" />
        <div class="popup" v-on:click="addGame()">
            AJOUTER LE JEU
            <span class="popuptext" id="addPopup">Ce jeu a été ajouté</span>
        </div>
    </div>
    <br />
  </div>
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
      ajoutLogo : null
    };
  },

  mounted: async function () {
    
  },

  methods: {

    async addGame() {
      var popup = document.getElementById("addPopup")
      popup.classList.toggle("show")
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
