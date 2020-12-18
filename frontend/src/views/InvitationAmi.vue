<template>
  <div class="invitationAmi">
    <h1>Utilisateur</h1>
    <div>
      <div>
        <label for="researchInput">Pseudo:</label>
        <input type="text" id="researchInput" v-model="researchPseudo" />
        <button v-on:click="research()">Rechercher</button>
      </div>
      <table>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
            <td>{{ user.pseudo }}</td>
            <td class="editLabel">
              <div class="popup" v-on:click="invite(user.pseudo)">
                INVITE
                <span class="popuptext" id="invitePopup" v-bind:class="{show:showInvitePopup}"
                  >Cet ami a été invité</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
//import ConnexionVue from './Connexion.vue';
//const axios = require('axios')
export default {
  name: "InvitationAmi",
  props: {},
  data: function () {
    return {
      users: [],
      newamiId: Number,
      researchPseudo: null,
      showInvitePopup : false
    }
  },

  mounted: async function () {
    const res = await this.$axios.get(
      "http://localhost:3000/api/auth/getSession"
    )
    let user = res.data.user
    this.currentUser = user
    console.log(user)
    this.userId = user.id
    console.log(this.userId)
    //this.getAmis(this.userId)
    this.getUsers()
  },

  methods: {
    async invite(pseudo) {
      //this.showInvitePopup = true
      console.log(pseudo)
      const amiInviteId = await this.findUsersId(pseudo)
      console.log(amiInviteId.id)
      const amiInvitedId = amiInviteId.id
      //const amitie = this.userId + amiInviteId
      //console.log(amitie)
      const res = await this.$axios.post(
        "http://localhost:3000/api/amis/" +
          amiInvitedId
      )
      if (res.data.invite === true) {
        this.$router.push("/Amis")
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
      )
      console.log(res.data)
      this.users = res.data
      console.log(this.users)
    },

    async findUsersId(pseudo) {
      const res = await this.$axios.get(
        "http://localhost:3000/api/users/id/" + pseudo
      )
      console.log(res.data)
      this.newamiId = res.data
      console.log(this.newamiId)
      return this.newamiId
    },

    async research() {
      
      const res = await this.$axios.get(
        "http://localhost:3000/api/users/" + this.researchPseudo
      );
      
      this.users = res.data 
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
