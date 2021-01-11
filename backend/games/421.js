const Dice = require('../gameClasses/421/dice.js')
const dices = [new Dice(1),new Dice(2),new Dice(3)]
 dices.forEach(dice => {
     dice.roll()
 });
console.log("le resultat est : ",dices[0].value,dices[1].value,dices[2].value)