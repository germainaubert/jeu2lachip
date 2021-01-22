<template>
  <v-container>
    <v-card width="500" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Modifier votre Pseudo</h1>
      </v-card-title>
      <div>
        <template>
          <span>Votre pseudo est: {{ currentUser.pseudo }}</span>
        </template>
        <v-form>
          <v-text-field
            label="Votre nouveau Pseudo"
            v-model="newPseudo"
          />
        </v-form>
        <v-card-actions>
          <v-btn v-on:click="modifPseudo">valider</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-container>
</template> 
  

<script>
//import ConnexionVue from './Connexion.vue';
//const axios = require('axios')
export default {
  name: "ChangePseudo",
  props: {},
  data: function () {
    return {
      currentUser: "",
      newPseudo: null,
      currentUserPseudo: "",
      currentUserId: "",
    };
  },

  mounted: async function () {
    const res = await this.$axios.get(
      "http://localhost:3000/api/auth/getSession"
    );
    let user = res.data.user;
    console.log(user)
    this.currentUser = user;
    this.currentUserPseudo = this.currentUser.pseudo;
    this.currentUserId = this.currentUser.id;
  },

  methods: {

    async modifPseudo() {
      //this.showSuppressionPopup = true;
      const res = await this.$axios.put(
        "http://localhost:3000/api/users/changePseudo/" + this.currentUserId + "/" + this.newPseudo
      );
      if (res.data.isChanged === true) {
        this.$router.push("/Connexion");
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
