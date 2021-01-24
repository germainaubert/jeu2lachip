const Card = require('./card.js')
const Deck = require('./deck.js')

class Game {
    //  -- Cette liste contiendra nécessairement quatre joueurs --
    players
    deck
    questions
    constructor(players) {
        if (players.length != 3) {
            throw new Error('Le jeu doit se jouer a trois joueurs. Nombre de joueurs actuels : ' + players.length)
        }
        this.playerAlive = true
        this.players = players
        this.currentPlayer = null
        this.gameIsOn = true
        this.questions = [{ value: 'Rouge', active: true },
        { value: 'Noir', active: true },
        { value: 'Purple', active: true },
        { value: 'Superieur', active: false },
        { value: 'Inferieur', active: false },
        { value: 'Passer', active: false }]
        this.turns = 0
        this.deck = new Deck()
        this.playerAlive = true
    }
    play() {

        while (this.gameIsOn) {

            this.drawPhase()
            this.checkEndGame()
            this.turns += 1
        }
    }
    drawPhase() {
        const card = this.deck.drawCard()
        console.log(card)
    }
    checkStateOfQuestions() {
        if (this.deck.bomb.length == 0) {
            this.questions[3].active = false
            this.questions[4].active = false
        }
        else {
            this.questions[3].active = true
            this.questions[4].active = true
        }
        if (this.currentPlayer.goodAnswers < 2) {
            this.questions[5].active = false
        }
        else {
            this.questions[5].active = true
        }
    }
    bombExplosion() {
        this.deck.bomb.forEach(card => {
            this.deck.discards.push(card)
            this.currentPlayer.hp -= 1
        });
        this.currentPlayer.goodAnswers = 0
        this.deck.bomb = []
    }
    nextPlayer() {
        this.currentPlayer.goodAnswers = 0
        // recherche du joueur actuel
        let found = this.players.findIndex(player => player == this.currentPlayer)
        // si c'est le troisième joueur qui joue, on setup le placement a -1
        if(found == 2) {
            found = -1
        }
        console.log("position", found)
        // le nouveau joueur actuel est celui a la postion précédente +1
        found += 1 
        this.currentPlayer = this.players[found]
        console.log("nouveau joueur actuel : ", this.currentPlayer)
    }
    checkAnswer(answer) {
        if(answer == 'Passer') {
            this.nextPlayer()
            return
        }
        let card = this.deck.drawCard()
        let lastCard = null
        console.log('Joueur : ', this.currentPlayer)
        console.log('la réponse est : ', answer)
        console.log('la carte piochée est : ', card)
        switch (answer) {
            case 'Rouge':
                if (card.color.group == 'Rouge') {
                    this.currentPlayer.goodAnswers += 1
                }
                else {
                    this.bombExplosion()
                }
                break
            case 'Noir':
                if (card.color.group == 'Noir') {
                    this.currentPlayer.goodAnswers += 1
                }
                else {
                    this.bombExplosion()
                }
                break
            case 'Purple':
                let anotherCard = this.deck.drawCard()
                console.log("La deuxième carte piochée est :", anotherCard)

                if (card.color.group != anotherCard.color.group) {
                    this.currentPlayer.goodAnswers += 2
                }
                else {
                    this.bombExplosion()
                }
                break
            case 'Superieur':
                lastCard = this.deck.bomb[this.deck.bomb.length - 2]
                if (card.value > lastCard.value) {
                    this.currentPlayer.goodAnswers += 1
                }
                else {
                    this.bombExplosion()
                }

                break
            case 'Inferieur':
                lastCard = this.deck.bomb[this.deck.bomb.length - 2]
                if (card.value < lastCard.value) {
                    this.currentPlayer.goodAnswers += 1
                }
                else {
                    this.bombExplosion()
                }
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