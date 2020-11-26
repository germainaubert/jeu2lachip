const Card = require('./card.js')
const Deck = require('./deck.js')

class Game {
    //  -- Cette liste contiendra nécessairement quatre joueurs --
    players
    deck
    field
    constructor(players) {
        if (players.length != 4) {
            throw new Error('Le jeu doit se jouer a quatre joueurs. Nombre de joueurs actuels : ' + players.length)
        }
        this.players = players
        this.field = {}
        this.gameIsOn = true
        this.turns = 0
        this.ranking = []
        this.deck = new Deck()
        this.playerAlive = true
        this.players.forEach((player, index) => {
            player.horse = new Card(Deck.couleurs[index], 1, Deck.noms[0])
            player.horse.pos = 0
        });
    }
    play() {

        while (this.gameIsOn) {

            this.drawPhase()
            this.checkEndGame()
            this.turns += 1
        }
    }
    shootAction(target, bullets) {
        console.log('la personne ciblée est: ', target)
        let playerShooted = this.players.find(player => player.name == target)
        if (playerShooted)  {
            playerShooted.hp -= bullets
            console.log(playerShooted.name, 'A perdu ', bullets, 'points de vie, il lui reste ', playerShooted.hp, 'points de vie.' )
        }
        else {
            return 
        }
    }
    resetPlayers() {
        this.players.forEach(player => {
            player.bet = 0
            player.horse.pos = 0
            player.arrived = false
            this.gameIsOn = true
        })
        console.log(this.players)
    }
    resetDeck() {
        delete this.deck
        this.deck = new Deck()
    }
    drawPhase() {
        const card = this.deck.drawCard()
        this.checkWinner(card)
        this.checkMalus()
        this.playerArrive()
        console.log(this.players)
    }
    checkWinner(card) {
        let winner = this.players.find(player => player.horse.color == card.color)
        //console.log('et le gagnant est : ', winner.name)
        if (winner.arrived == false) {
            winner.horse.pos += 1
        }
        //console.log(this.players)
        //console.log(this.deck.malus)
    }
    checkLooser(malus) {
        let looser = this.players.find(player => player.horse.color == malus.color)
        //console.log('et le perdant est : ', looser.name)
        if (looser.arrived == false) {
            looser.horse.pos -= 1
        }

    }
    checkMalus() {
        let firstActiveMalus = this.deck.malus.find(malus => malus.revealed == false)

        if (firstActiveMalus) {
            console.log('le premier malus actif est : ', firstActiveMalus)
            let indexMalus = firstActiveMalus.pos - 1

            const count = this.players.reduce((acc, player) => player.horse.pos >= firstActiveMalus.pos && acc, true)

            if (count) {
                this.deck.malus[indexMalus].revealed = true 
                //console.log("UN MALUS EST INTERVENU", this.deck.malus)
                this.checkLooser(firstActiveMalus)
            }
            //console.log('compteur: ', count)
        }

    }
    playerArrive() {
        this.players.forEach(player => {
            if (player.arrived == false) {
                if (player.horse.pos == 7) {
                    player.arrived = true
                    this.ranking.push(player)
                }
            }
        });

    }
    checkEndGame() {
        let count = 0
        this.players.forEach(player => {
            if (player.arrived == true) {
                count += 1
            }
        });
        console.log("competur", count)
        if (count >= 4) {
            this.players.forEach(player => {
                this.giveBullets(player)
            });
            console.log("LA MANCHE EST TERMINEE!!!!")
            console.log(" LE CLASSEMENT EST : ")
            console.log("PREMIER : ", this.ranking[0])
            console.log("DEUXIEME : ", this.ranking[1])
            console.log("TROISIEME : ", this.ranking[2])
            console.log("DERNIER : ", this.ranking[3])
            console.log("NOMBRE DE TOUS : ", this.turns)
            this.gameIsOn = false
        }
    }
    giveBullets(player) {
        let rank = this.ranking.findIndex(rankedPlayer => rankedPlayer == player)
        switch (rank) {
            case 0:
                player.bullets += player.bet * 2
                // console.log(player)
                break
            case 1:
                player.bullets += player.bet
                // console.log(player)
                break
            case 2:
                player.hp -= player.bet 
                // console.log(player)
                break
            case 3:
                player.hp -= player.bet * 2
                // console.log(player)
                break
        }
    }
    checkDeadPlayers () {
        this.players.forEach(player => {
            if(player.hp <= 0) {
                console.log("LE JOUEUR ", player.name, "EST MORT, FIN DE LA PARTIE!!!")
                this.playerAlive = false
            }
        });
    }

}

module.exports = Game