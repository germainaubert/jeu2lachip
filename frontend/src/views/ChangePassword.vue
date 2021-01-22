<template>
  <v-container>
    <v-card width="500" class="mx-auto mt-10">
      <v-card-title>
        <h1 class="display-1">Modifier votre Password</h1>
      </v-card-title>
      <div>
        <v-form>
          <v-text-field
            label="Votre password actuel"
            v-model="password"
          />
          <v-text-field
            label="Votre nouveau password"
            v-model="newpassword1"
          />
          <v-text-field
            label="confirmer votre nouveau password"
            v-model="newpassword2"
          />
        </v-form>
        <v-card-actions>
          <v-btn v-on:click="modifPassword">valider</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-container>
</template> 
  

<script>
//import ConnexionVue from './Connexion.vue';
//const axios = require('axios')
export default {
  name: "ChangePassword",
  props: {},
  data: function () {
    return {
      currentUser: "",
      password: null,
      newpassword1: null,
      newpassword2: null,
      currentUserId: " ",
      currentUserPseudo: " ",
    };
  },

  mounted: async function () {
    const res = await this.$axios.get(
      "http://localhost:3000/api/auth/getSession"
    );
    let user = res.data.user;
    this.currentUser = user;
    console.log(user)
    this.currentUserId = user.id;
    this.currentUserPseudo = user.pseudo;
    console.log(user.pseudo)
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

    async modifPassword() {
      //this.showSuppressionPopup = true;
      console.log(this.currentUserPseudo)
      const res = (
        await this.$axios({
          method: "put",
          url: "http://localhost:3000/api/users/changePassword",
          data: {
            currentUserPseudo : this.currentUserPseudo,
            password : this.password,
            newpassword1 : this.newpassword1, 
            newpassword2 : this.newpassword2
          },
        })
      )
      .data;
      console.log(res);
      this.$router.push("/Connexion");
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
