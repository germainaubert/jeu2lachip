import { AdvancedDynamicTexture, Button, TextBlock } from '@babylonjs/gui';

export class HUDPurple {

    constructor(localPlayer, scene, socket, lobbyId) {
        this.localPlayer = localPlayer
        this.scene = scene
        this.socket = socket
        this.lobbyId = lobbyId
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene)
        this.button = {
            rouge: Button.CreateSimpleButton("Rouge", "Rouge"),
            noir: Button.CreateSimpleButton("Noir", "Noir"),
            purple: Button.CreateSimpleButton("Purple", "Purple"),
            inferieur: Button.CreateSimpleButton("Inferieur", "Inferieur"),
            superieur: Button.CreateSimpleButton("Superieur", "Superieur"),
            passer: Button.CreateSimpleButton("Passer", "Passer"),
        }
        this.initQuestionsgog()
    }

    initQuestionsgog() {
        this.button.rouge.top = "0px";
        this.button.rouge.left = "0px";
        this.button.rouge.width = "150px";
        this.button.rouge.height = "50px";
        this.button.rouge.cornerRadius = 20;
        this.button.rouge.thickness = 4;
        this.button.rouge.children[0].color = "#DFF9FB";
        this.button.rouge.children[0].fontSize = 24;
        this.button.rouge.color = "#FF7979";
        this.button.rouge.background = "#EB4D4B";
        this.button.rouge.onPointerClickObservable.add(() => {
            console.log("ououiuiuouiouoi")
            this.button.rouge.isEnabled = false
            this.button.rouge.isVisible = false
            this.socket.emit("purplePlayTurn", this.lobbyId, 'Rouge')

        })
        this.button.rouge.isEnabled = true
        this.button.rouge.isVisible = true
        this.advancedTexture.addControl(this.button.rouge)

        this.button.noir.top = "300px";
        this.button.noir.left = "200px";
        this.button.noir.width = "250px";
        this.button.noir.height = "50px";
        this.button.noir.cornerRadius = 20;
        this.button.noir.thickness = 4;
        this.button.noir.children[0].color = "#DFF9FB";
        this.button.noir.children[0].fontSize = 24;
        this.button.noir.color = "#FF7979";
        this.button.noir.background = "#EB4D4B";
        this.button.noir.onPointerClickObservable.add(() => {
            console.log("NONONNONONON")
            this.button.noir.isEnabled = false
            this.button.noir.isVisible = false
            this.socket.emit("purplePlayTurn", this.lobbyId, 'Noir')

        })
        this.button.noir.isEnabled = true
        this.button.noir.isVisible = true
        this.advancedTexture.addControl(this.button.noir)


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

