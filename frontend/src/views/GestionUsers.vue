<template>
  <div class="gestionUsers">
    <h1>Gestion des utilisateurs</h1>
    <div>
      <label for="researchInput">Pseudo:</label>
      <input type="text" id="researchInput" v-model="researchPseudo" />
      <button v-on:click="research(researchPseudo)">Rechercher</button>
    </div>
    <table>
      <tbody>
        <tr v-for="user in users" v-bind:key="user.id">
          <td>{{ user.pseudo }}</td>
          <td class="editLabel">
            <div class="popup" v-on:click="deleteUser(user.pseudo)">
              SUPPRIMER
              <span class="popuptext" id="suppressionPopup"
                >Cet utilisateur a été supprimé</span
              >
            </div>
          </td>
          <td class="editLabel">
            <div class="popup" v-on:click="becomeAdmin(user.pseudo)">
              BECOMEADMIN
              <span class="popuptext" id="adminPopup"
                >Cet utilisateur est devenu administrateur</span
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
  </div>
</template>

<script>
//import ConnexionVue from './Connexion.vue';
//const axios = require('axios')
export default {
  name: "GestionUsers",
  props: {},
  data: function () {
    return {
      users: [],
      researchPseudo: null,
    };
  },

  mounted: async function () {
    const res = await this.$axios.get(
      "http://localhost:3000/api/auth/getSession"
    );
    let user = res.data.user;
    this.currentUser = user;
    console.log(user);
    this.userId = user.id;
    console.log(this.userId);
    //this.getAmis(this.userId)
    this.getUsers();
  },

  methods: {
    async deleteUser(pseudo) {
      var popup = document.getElementById("suppressionPopup");
      popup.classList.toggle("show");

      console.log(pseudo);
      const deletedUserId = await this.findUsersId(pseudo);
      console.log(deletedUserId.id);
      const deleteUserId = deletedUserId.id;
      const res = await this.$axios.delete(
        "http://localhost:3000/api/users/suppression/" + deleteUserId
      );
      if (res.data.delete === true) {
        this.$router.push("/GestionUsers");
      }
    },

    async becomeAdmin(pseudo){
      var popup = document.getElementById("adminPopup");
      popup.classList.toggle("show");
      console.log(pseudo);
      const newAdminUserId = await this.findUsersId(pseudo);
      console.log(newAdminUserId.id);
      const newAdminId = newAdminUserId.id;
      const res = await this.$axios.put(
        "http://localhost:3000/api/users/becomeAdmin/" + newAdminId
      );
      if (res.data.isAdmin === true) {
        this.$router.push("/GestionUsers");
      }
    },
    

    async findUsersId(pseudo) {
      const res = await this.$axios.get(
        "http://localhost:3000/api/users/id/" + pseudo
      );
      console.log(res.data);
      this.newamiId = res.data;
      console.log(this.newamiId);
      return this.newamiId;
    },

    async getUsers() {
      const res = await this.$axios.get(
        "http://localhost:3000/api/users/liste"
      );
      console.log(res.data);
      this.users = res.data;
      console.log(this.users);
    },

     async research() {
      const res = await this.$axios.get(
        "http://localhost:3000/api/users/research/" + this.researchPseudo
      );
      this.users = res.data; 
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
