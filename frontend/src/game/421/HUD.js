import { AdvancedDynamicTexture, Button, TextBlock } from '@babylonjs/gui';

export class HUD {

    constructor(localPlayer, scene, socket, lobbyId) {
        this.localPlayer = localPlayer
        this.scene = scene
        this.socket = socket
        this.lobbyId = lobbyId
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene)
        this.button = [
            Button.CreateSimpleButton("nextTurn", "Passer le tour"),
            Button.CreateSimpleButton("throw", "Lancer"),
            Button.CreateSimpleButton("endPick", "Confirmer"),
            Button.CreateSimpleButton("resetPick", "Annuler")
        ]
        this.messages = [
            new TextBlock(),
            new TextBlock(),
            new TextBlock(),
            new TextBlock(),
            new TextBlock(),
        ]
        this.initHUD()
    }
    initHUD() {
        // nextTurn
        this.button[0].top = "300px"
        this.button[0].left = "400px"
        this.button[0].width = "250px"
        this.button[0].height = "50px"
        this.button[0].cornerRadius = 20
        this.button[0].thickness = 4
        this.button[0].children[0].color = "#DFF9FB"
        this.button[0].children[0].fontSize = 24
        this.button[0].color = "#FF7979"
        this.button[0].background = "#EB4D4B"
        this.button[0].isVisible = false
        this.button[0].isEnabled = false
        this.button[0].onPointerClickObservable.add(() => {
            console.log("nextTurn click")
            this.messages[0].isVisible = false
            this.messages[1].isVisible = false
            
            this.button[0].isEnabled = false
            this.button[0].isVisible = false
            this.button[1].isEnabled = false
            this.button[1].isVisible = false
            this.button[2].isEnabled = false
            this.button[2].isVisible = false
            this.button[3].isEnabled = false
            this.button[3].isVisible = false
            
            this.socket.emit("nextTurn", this.lobbyId)
        })
        // throw
        this.button[1].top = "300px"
        this.button[1].left = "-500px"
        this.button[1].width = "200px"
        this.button[1].height = "50px"
        this.button[1].cornerRadius = 20
        this.button[1].thickness = 4
        this.button[1].children[0].color = "#DFF9FB"
        this.button[1].children[0].fontSize = 24
        this.button[1].color = "#FF7979"
        this.button[1].background = "#EB4D4B"
        this.button[1].isVisible = false
        this.button[1].isEnabled = false
        this.button[1].onPointerClickObservable.add(() => {
            console.log("throw click")
            this.button[0].isEnabled = false
            this.button[0].isVisible = false
            this.button[1].isEnabled = false
            this.button[1].isVisible = false
            this.socket.emit("throwDices", this.lobbyId)
        })
        // endPick
        this.button[2].top = "300px"
        this.button[2].left = "-400px"
        this.button[2].width = "200px"
        this.button[2].height = "50px"
        this.button[2].cornerRadius = 20
        this.button[2].thickness = 4
        this.button[2].children[0].color = "#DFF9FB"
        this.button[2].children[0].fontSize = 24
        this.button[2].color = "#FF7979"
        this.button[2].background = "#EB4D4B"
        this.button[2].isVisible = false
        this.button[2].isEnabled = false
        this.button[2].onPointerClickObservable.add(() => {
            console.log("endPick click")
            this.button[0].isEnabled = false
            this.button[0].isVisible = false
            this.button[2].isEnabled = false
            this.button[2].isVisible = false
            this.button[3].isEnabled = false
            this.button[3].isVisible = false
            
            this.socket.emit("endPick", this.lobbyId)
        })
        this.button[3].top = "300px"
        this.button[3].left = "0px"
        this.button[3].width = "200px"
        this.button[3].height = "50px"
        this.button[3].cornerRadius = 20
        this.button[3].thickness = 4
        this.button[3].children[0].color = "#DFF9FB"
        this.button[3].children[0].fontSize = 24
        this.button[3].color = "#FF7979"
        this.button[3].background = "#EB4D4B"
        this.button[3].isVisible = false
        this.button[3].isEnabled = false
        this.button[3].onPointerClickObservable.add(() => {
            console.log("resetPick click")
            this.socket.emit("resetPick", this.lobbyId)
        })
        // affichage
        for (let i = 0; i < this.button.length; i++) {
            this.button[i].zIndex = 10000
            console.log(this.button[i].name)
            this.advancedTexture.addControl(this.button[i])
        }
        //message

        this.messages[0].text = "Selectionnez les dés que vous ne voulez pas relancer"
        this.messages[0].color = "white"
        this.messages[0].top = -350
        this.messages[0].left = 0
        this.messages[0].fontSize = 24
        this.messages[0].zIndex = 0
        this.messages[0].isVisible = false

        this.messages[1].text = ""
        this.messages[1].color = "white"
        this.messages[1].top = -350
        this.messages[1].left = 0
        this.messages[1].fontSize = 24
        this.messages[1].zIndex = 0
        this.messages[1].isVisible = false

        this.messages[2].text = ""
        this.messages[2].color = "white"
        this.messages[2].top = -350
        this.messages[2].left = 650
        this.messages[2].fontSize = 24
        this.messages[2].zIndex = 0
        
        this.messages[3].text = ""
        this.messages[3].color = "white"
        this.messages[3].top = -390
        this.messages[3].left = 650
        this.messages[3].fontSize = 24
        this.messages[3].zIndex = 0

        this.messages[4].text = ""
        this.messages[4].color = "white"
        this.messages[4].top = -430
        this.messages[4].left = 650
        this.messages[4].fontSize = 24
        this.messages[4].zIndex = 0

        for (let i = 0; i < this.messages.length; i++) {
            this.advancedTexture.addControl(this.messages[i])
        }

    }

    throwPhaseHUD(roll) {//eslint-disable-line
        this.messages[0].isVisible = false
        this.messages[1].isVisible = false
        this.button[1].isEnabled = true
        this.button[1].isVisible = true
        console.log(roll, "roll")
        if (roll >= 1) {
            console.log("throw phase passer true")
            this.button[0].isVisible = true
            this.button[0].isEnabled = true
        }
    }

    gameInfo(tokenPile, players) {
        this.messages[2].text = "Jetons restants:" + tokenPile
        this.messages[3].text = players[0].name + ": " + players[0].token
        this.messages[4].text = players[1].name + ": " + players[1].token
        this.messages[2].zIndex = 300
        this.messages[3].zIndex = 300
        this.messages[4].zIndex = 300
    }

    pickPhase() {
        this.button[0].isEnabled = true
        this.button[0].isVisible = true
        this.button[2].isEnabled = true
        this.button[2].isVisible = true
        this.button[3].isEnabled = true
        this.button[3].isVisible = true
        this.messages[0].isVisible = true
    }

    waiting(localPlayer) {//eslint-disable-line
        this.messages[1].text = localPlayer + " est en train de jouer !"
        this.messages[1].isVisible = true
        // this.advancedTexture.addControl(this.messages[1])
    }

}

