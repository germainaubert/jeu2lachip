<template>
  <div class="lobby">
    <h1>Lobby</h1>
    <div>
      <h1>Vos amis</h1>
            <tbody>
              <tr v-for="person in persons" v-bind:key="person.id">
                <td>{{ person.pseudo }}</td>
                <td class="editLabel">  
                  <div class="popup" v-on:click="invite()"> INVITE 
                    <span class="popuptext" id="invitePopup">Cet ami a été invité</span>
                  </div>
                </td>
                <td class="editLabel">
                  <div class="popup" v-on:click="deletefriend()"> DELETE
                    <span class="popuptext" id="deletePopup">Cet ami a été supprimé</span>
                  </div>
                </td>
              </tr>
            </tbody>
            <br>
        <router-link to="/NewAmi" tag="button">Inviter un joueur a etre ami</router-link>
    </div>
      <br>
  </div>
</template>

<script>
//import ConnexionVue from './Connexion.vue';
const axios = require('axios')
export default {
  name: "Lobby",
  props: {},
  data: function () {
    return {
      persons: [],
      
    };
  },

  mounted : async function () {
    const res = await this.$axios.get(
      "http://localhost:3000/api/auth/getSession"
    )
    let user = res.data.user
    this.currentUser = user
    console.log(user)
    this.userId = user.id
    console.log(this.userId)
    this.getAmis(this.userId)
  },

  methods: {
    
    /*newAmi :  async function(){
      
      const res = (await axios({
        method: "post",
        url: "http://localhost:3000/api/amis",
        data: {
          ami1: this.ami1,
          ami2: this.ami2
        }
      })).data
      console.log(res)
    },*/

    invite : function () {
      var popup = document.getElementById("invitePopup")
      popup.classList.toggle("show")
    },

    getAmis : async function(){
      const res = await this.$axios.get('http://localhost:3000/api/amis/liste/'+ this.userId)
      console.log(res.data)
      //this.persons.push(res.data) 
      this.persons = res.data
    },


    deletefriend: async function(){
      var popup = document.getElementById("deletePopup");
      popup.classList.toggle("show");

      const res = (await axios({
        method: "delete",
        url: "http://localhost:3000/api/amis",
        data: {
          amitieId: this.amitieId
        }
      })).data
      console.log(res)
    }
  }
}
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
  from {opacity: 0;} 
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}
</style>
