const PLAYERSNUMBER = 3
const Player = require('../gameClasses/purple/player.js')
const prompt = require('prompt-sync')({
    sigint: true
})
const players = []
for (let i = 0; i < PLAYERSNUMBER; i++) {
    console.log('J' + (i + 1), ': ')
    const name = prompt('Quel est ton nom? ')
    players.push(new Player(name))
}

const Game = require('../gameClasses/purple/game.js')
const game = new Game(players)
game.currentPlayer = game.players[1]

while (game.playerAlive) {

    console.log('Joueur actuel : ', game.currentPlayer)
    console.log('--- Pioche ---')
    console.log('')
    game.checkStateOfQuestions()
    game.questions.forEach(question => {
        if (question.active) {
            console.log(question.value)
        }
    });
    let answer = prompt('Choisissez une réponse : ')
    game.checkAnswer(answer)
    game.checkDeadPlayers()
    console.log(game.players)
}
//console.log(game.deck)