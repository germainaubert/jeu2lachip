<template>
  <v-container>
    <v-card width="500" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Utilisateurs</h1>
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

          <template v-slot:item.is_admin="props">
            <v-btn v-on:click="invite(props.item.pseudo)">inviter</v-btn>
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
  name: "InvitationAmi",
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
          text: "inviter un ami",
          align: "end",
          sortable: false,
          value: "is_admin",
        },
      ],
      users: [],
      newamiId: Number,
      researchPseudo: null,
      showInvitePopup: false,
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
    async invite(pseudo) {
      //this.showInvitePopup = true
      console.log(pseudo);
      const amiInviteId = await this.findUsersId(pseudo);
      console.log(amiInviteId.id);
      const amiInvitedId = amiInviteId.id;
      //const amitie = this.userId + amiInviteId
      //console.log(amitie)
      const res = await this.$axios.post(
        "http://localhost:3000/api/amis/" + amiInvitedId
      );
      if (res.data.invite === true) {
        this.$router.push("/Amis");
      }
    },

    /* getAmis : async function(){
      const res = await this.$axios.get('http://localhost:3000/api/amis/liste/'+ this.userId)
      console.log(res.data)
      //this.persons.push(res.data) 
      this.persons = res.data
    },*/

    async getUsers() {
      const res = await this.$axios.get(
        "http://localhost:3000/api/users/liste"
      );
      console.log(res.data);
      this.users = res.data;
      console.log(this.users);
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

    async research() {
      const res = await this.$axios.get(
        "http://localhost:3000/api/users/" + this.researchPseudo
      );

      this.users = res.data;
    },

    /*async research(researchPseudo){
      const res = await this.$axios.get(
        "http://localhost:3000/api/users/research" + researchPseudo
      );
      console.log(res.data);
      this.users = res.data;
      console.log(this.users);
    }*/
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
