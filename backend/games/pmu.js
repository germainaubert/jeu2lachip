const PLAYERSNUMBER = 4
const Player = require('../gameClasses/pmu/player.js')
const prompt = require('prompt-sync')({
    sigint: true
})
const players = []
for (let i = 0; i < PLAYERSNUMBER; i++) {
    console.log('J' + (i + 1), ': ')
    const name = prompt('Quel est ton nom? ')
    players.push(new Player(name))
}

const Game = require('../gameClasses/pmu/game.js')
const game = new Game(players)
while (game.playerAlive) {
    console.log("NOUVELLE MANCHE: ")
    game.players.forEach(player => {
        console.log(player.name, ' : ')
        let bet = prompt('Combien de points de vie mises-tu sur ton cheval ?')
        player.bet = Number(bet)
    });
    
    game.play()
    game.checkDeadPlayers()
    game.players.forEach(player => {
        while (player.bullets > 0) {
            console.log(player.name)

            const shoot = prompt('Sur qui veux tu tirer? ')
            const bullets = prompt('Combien de balles veux-tu tirer? ')
            game.shootAction(shoot, bullets)
            player.bullets -= bullets
        }
    });
    game.checkDeadPlayers()
    game.resetPlayers()
    game.resetDeck()
    
} 

//console.log(game.deck)