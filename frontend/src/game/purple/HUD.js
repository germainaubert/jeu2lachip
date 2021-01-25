import { AdvancedDynamicTexture, Button, TextBlock } from '@babylonjs/gui';

export class HUDPurple {

    constructor(localPlayer, scene, socket, lobbyId) {
        this.localPlayer = localPlayer
        this.scene = scene
        this.socket = socket
        this.lobbyId = lobbyId
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene)
        this.buttons = [
            { bouton: Button.CreateSimpleButton("button", "Rouge"), value: "Rouge" },
            { bouton: Button.CreateSimpleButton("button", "Noir"), value: "Noir" },
            { bouton: Button.CreateSimpleButton("button", "Purple"), value: "Purple" },
            { bouton: Button.CreateSimpleButton("button", "Inferieur"), value: "Inferieur" },
            { bouton: Button.CreateSimpleButton("button", "Superieur"), value: "Superieur" },
            { bouton: Button.CreateSimpleButton("button", "Passer"), value: "Passer" },
        ]
        this.messages = [
            { message: new TextBlock(), value: "currentPlayer" },
            { message: new TextBlock(), value: "name" },
            { message: new TextBlock(), value: "hp" },
            { message: new TextBlock(), value: "goodAnswers" },
        ]
        this.initQuestions()
    }

    initQuestions() {
        let left = -200
        let top = -350
        console.log("HUD LOCAL PLAYER", this.localPlayer)
        this.buttons.forEach(button => {
            console.log(button.bouton)
            console.log(button.bouton)
            button.bouton.top = top;
            button.bouton.left = left;
            console.log(button.bouton.left)
            button.bouton.width = "150px";
            button.bouton.height = "50px";
            button.bouton.cornerRadius = 20;
            button.bouton.thickness = 4;
            button.bouton.children[0].color = "#DFF9FB";
            button.bouton.children[0].fontSize = 24;
            button.bouton.color = "#FF7979";
            button.bouton.background = "#EB4D4B";
            button.bouton.zIndex = 10000
            button.bouton.onPointerClickObservable.add(() => {
                console.log("click")
                this.hideButtons()
                this.socket.emit("purplePlayTurn", this.lobbyId, button.value)
            })
            button.bouton.isVisible = false
            button.bouton.isEnabled = false
            this.advancedTexture.addControl(button.bouton)
            left += 200
        });

    }

    displayInfos(infos) {
        let top = -350
        let left = 650
        for (const info in infos) {
            console.log(info)

            switch (info) {
                case ('name'):
                    this.messages[1].message.text = `Nom: ${infos[info]}`
                    this.messages[1].message.color = "white";
                    this.messages[1].message.top = top;
                    this.messages[1].message.left = left;
                    this.messages[1].message.fontSize = 24;
                    console.log(this.messages[1].message)
                    this.advancedTexture.addControl(this.messages[1].message);
                    break
                case ('hp'):
                    this.messages[2].message.text = `Points de vies  ${infos[info]}`;
                    this.messages[2].message.color = "white";
                    this.messages[2].message.top = top;
                    this.messages[2].message.left = left;
                    this.messages[2].message.fontSize = 24;
                    console.log(this.messages[2].message)
                    this.advancedTexture.addControl(this.messages[2].message);
                    break
                case ('goodAnswers'):
                    this.messages[3].message.text = `Bonnes reponses :   ${infos[info]}`;
                    this.messages[3].message.color = "white";
                    this.messages[3].message.top = top;
                    this.messages[3].message.left = left;
                    this.messages[3].message.fontSize = 24;
                    console.log(this.messages[3].message)
                    this.advancedTexture.addControl(this.messages[3].message);
                    break

            }
            top += 50
        }
    }
    displayCurrentPlayer(currentPlayer) {
        let top = -350
        let left = -600
        this.messages[0].message.text = "C'est le tour de : " + currentPlayer.name;
        this.messages[0].message.color = "white";
        this.messages[0].message.top = top;
        this.messages[0].message.left = left;
        this.messages[0].message.fontSize = 24;
        console.log(this.messages[0].message)
        this.advancedTexture.addControl(this.messages[0].message);

    }
    hideButtons() {
        console.log("hide")
        this.buttons.forEach(button => {
            console.log("hideButtons", button)
            button.bouton.isEnabled = false
            button.bouton.isVisible = false
        })
    
    }
    displayQuestions(questions) {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].active) {
                console.log("hello", this.buttons[i].bouton)
                this.buttons[i].bouton.isEnabled = true
                this.buttons[i].bouton.isVisible = true
            }
        }
    }
    currentPlayer(players) {
        return players.find(player => player.name == this.localPlayer)
    }

}

