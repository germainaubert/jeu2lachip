import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        lobbyId: null,
        playerList: null,
        gameLeader: false,
        localPlayer: null
    }
})