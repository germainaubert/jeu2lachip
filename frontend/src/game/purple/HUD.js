import { AdvancedDynamicTexture, Button, TextBlock } from '@babylonjs/gui';

export class HUDPurple {

    constructor(localPlayer, scene, socket, lobbyId) {
        this.localPlayer = localPlayer
        this.scene = scene
        this.socket = socket
        this.lobbyId = lobbyId
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene)
        // this.buttons = [
        //     { bouton: Button.CreateSimpleButton("Rouge", "Rouge"), value: "Rouge" },
        //     { bouton: Button.CreateSimpleButton("Noir", "Noir"), value: "Noir" },
        //     { bouton: Button.CreateSimpleButton("Purple", "Purple"), value: "Purple" },
        //     { bouton: Button.CreateSimpleButton("Inferieur", "Inferieur"), value: "Inferieur" },
        //     { bouton: Button.CreateSimpleButton("Superieur", "Superieur"), value: "Superieur" },
        //     { bouton: Button.CreateSimpleButton("Passer", "Passer"), value: "Passer" },
        // ]
        this.button = {
            Rouge: Button.CreateSimpleButton("Rouge", "Rouge"),
            Noir: Button.CreateSimpleButton("Noir", "Noir"),
            
        }
    }

    initQuestions() {
        this.button.Rouge.top = "0px";
        this.button.Rouge.left = "0px";
        this.button.Rouge.width = "150px";
        this.button.Rouge.height = "50px";
        this.button.Rouge.cornerRadius = 20;
        this.button.Rouge.thickness = 4;
        this.button.Rouge.children[0].color = "#DFF9FB";
        this.button.Rouge.children[0].fontSize = 24;
        this.button.Rouge.color = "#FF7979";
        this.button.Rouge.background = "#EB4D4B";
        this.button.Rouge.onPointerClickObservable.add(() => {
            console.log("ououiuiuouiouoi")
            this.button.Rouge.isEnabled = false
            this.button.Rouge.isVisible = false
            this.socket.emit("purplePlayTurn", this.lobbyId, 'Rouge')

        })
        this.button.Rouge.isEnabled = true
        this.button.Rouge.isVisible = true
        this.advancedTexture.addControl(this.button.Rouge)

        this.button.Noir.top = "300px";
        this.button.Noir.left = "200px";
        this.button.Noir.width = "250px";
        this.button.Noir.height = "50px";
        this.button.Noir.cornerRadius = 20;
        this.button.Noir.thickness = 4;
        this.button.Noir.children[0].color = "#DFF9FB";
        this.button.Noir.children[0].fontSize = 24;
        this.button.Noir.color = "#FF7979";
        this.button.Noir.background = "#EB4D4B";
        this.button.Noir.onPointerClickObservable.add(() => {
            console.log("NONONNONONON")
            this.button.Noir.isEnabled = false
            this.button.Noir.isVisible = false
            this.socket.emit("purplePlayTurn", this.lobbyId, 'Noir')

        })
        this.button.Noir.isEnabled = true
        this.button.Noir.isVisible = true
        this.advancedTexture.addControl(this.button.Noir)


        // let left = -200
        // let top = -350
        // console.log("HUD LOCAL PLAYER", this.localPlayer)
        // this.buttons.forEach(button => {    
        //     console.log(button.bouton)
        //     console.log(button.bouton)
        //     button.bouton.top = top;
        //     button.bouton.left = left;
        //     console.log(button.bouton.left)
        //     button.bouton.width = "150px";
        //     button.bouton.height = "50px";
        //     button.bouton.cornerRadius = 20;
        //     button.bouton.thickness = 4;
        //     button.bouton.children[0].color = "#DFF9FB";
        //     button.bouton.children[0].fontSize = 24;
        //     button.bouton.color = "#FF7979";
        //     button.bouton.background = "#EB4D4B";
        //     button.bouton.onPointerClickObservable.add(() => {
        //         console.log("bonjour")
        //         this.hideButtons()
        //         this.socket.emit("purplePlayTurn", this.lobbyId, button.value)
        //     })
            
        //     left += 200
       // });

}

// askQuestion(questions) {

// }
displayInfos(infos) {
    let top = -350
    let left = 650
    for (const info in infos) {
        console.log(info)
        let message = new TextBlock()
        switch (info) {
            case ('name'):
                message.text = `Nom: ${infos[info]}`
                break
            case ('hp'):
                message.text = `Points de vies  ${infos[info]}`;
                break
            case ('goodAnswers'):
                message.text = `Bonnes reponses :   ${infos[info]}`;
                break

        }

        message.color = "white";
        message.top = top;
        message.left = left;
        message.fontSize = 24;
        this.advancedTexture.addControl(message);
        top += 50

    }
}
hideButtons() {
    for (const button in this.buttons) {
        this.buttons[button].button.isEnabled = false
        this.buttons[button].button.isVisible = false
    }
}
currentPlayer(players) {
    return players.find(player => player.name == this.localPlayer)
}

}

