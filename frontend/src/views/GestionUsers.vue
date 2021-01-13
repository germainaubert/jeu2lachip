<template>
  <v-container>
    <v-card width="1000" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Gestion des utilisateurs</h1>
      </v-card-title>
      <div>
        <v-data-table
          :headers="headers"
          :items="users"
          item-key="user.id"
          class="elevation-1"
          :search="researchPseudo"
        >
          <template v-slot:top>
            <v-text-field
              v-model="researchPseudo"
              label="Pseudo a rechercher"
              class="mx-4"
            ></v-text-field>
          </template>

          <template v-slot:item.supp="props">
            <v-btn v-on:click="deleteUser(props.item.pseudo)">supprimer {{props.item.pseudo}}</v-btn>
          </template>

          <template v-slot:item.is_admin="props">
            <v-btn v-on:click="becomeAdmin(props.item.pseudo)">nommer {{props.item.pseudo}} admin</v-btn>
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
  name: "GestionUsers",
  props: {},
  data: function () {
    return {
      headers: [
        {
          text: "Utilisateurs",
          align: "start",
          sortable: false,
          value: "pseudo",
        },
        {
          text: "supprimer un utilisateur",
          align: "end",
          sortable: false,
          value: "supp",
        },
        {
          text: "nommer un admin",
          align: "end",
          sortable: false,
          value: "is_admin",
        },
      ],
      showSuppressionPopup : false,
      showNewAdminPopup : false,
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
      //this.showSuppressionPopup = true;
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
      //this.showNewAdminPopup = true;
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
      console.log("test methode")
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
