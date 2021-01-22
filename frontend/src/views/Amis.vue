<template>
  <v-container>
    <v-card width="500" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Amis</h1>
      </v-card-title>
      <div>
        <v-data-table
          :headers="headers"
          :items=" persons"
          item-key=" persons.id"
          class="elevation-1"
        >
          <template v-slot:item.is_admin="props">
            <v-btn v-on:click="deletefriend(props.item.pseudo)">Supprimer</v-btn>
          </template>
      </v-data-table>
      </div>
      <v-card-actions>
        <v-btn v-on:click="goInvitationAmi">Inviter un joueur a etre ami</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template> 
  

<script>
//import ConnexionVue from './Connexion.vue';
//const axios = require('axios')
export default {
  name: "Amis",
  props: {},
  data: function () {
    return {
      headers: [
        {
          text: "Vos amis",
          align: "start",
          sortable: false,
          value: "pseudo",
        },
        {
          text: "supprimer un ami",
          align: "end",
          sortable: false,
          value: "is_admin",
        },
      ],
      persons: [],
      amiId: Number,
      showInvitePopup : false,
      showDeletePopup : false
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
      this.showInvitePopup = true
    },

    getAmis : async function(){
      const res = await this.$axios.get('http://localhost:3000/api/amis/liste/'+ this.userId)
      console.log(res.data)
      //this.persons.push(res.data) 
      this.persons = res.data
      console.log(this.persons)
    },


    deletefriend: async function(pseudo){
      //this.showDeletePopup = true

      console.log(pseudo)
      const amiId =  await this.findUsersId(pseudo);
      console.log(amiId.id)
      const ami2Id = amiId.id
      const res = await this.$axios.delete('http://localhost:3000/api/amis/' + ami2Id)
      //console.log(res)
      if (res.data.delete === true) {
          this.persons = this.persons.filter(person => person.pseudo != pseudo);
          //this.$router.push('/Amis');
      }
    },

    findUsersId : async function(pseudo){
      const res = await this.$axios.get('http://localhost:3000/api/users/id/' + pseudo)
      console.log(res.data)
      this.amiId = res.data
      console.log(this.amiId)
      return this.amiId
    },

    goInvitationAmi : async function (){
      this.$router.push("/InvitationAmi");
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
