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
        this.initQuestions()
    }

    initQuestions() {
            // this.button.rouge.top = "0px";
            // this.button.rouge.left = "0px";
            // this.button.rouge.width = "150px";
            // this.button.rouge.height = "50px";
            // this.button.rouge.cornerRadius = 20;
            // this.button.rouge.thickness = 4;
            // this.button.rouge.children[0].color = "#DFF9FB";
            // this.button.rouge.children[0].fontSize = 24;
            // this.button.rouge.color = "#FF7979";
            // this.button.rouge.background = "#EB4D4B";
            // this.button.rouge.onPointerClickObservable.add(() => {
            //     console.log("ououiuiuouiouoi")
            //     this.button.rouge.isEnabled = false
            //     this.button.rouge.isVisible = false
            //     this.socket.emit("purplePlayTurn", this.lobbyId, 'Rouge')

            // })
            // this.button.rouge.isEnabled = true
            // this.button.rouge.isVisible = true
            // this.advancedTexture.addControl(this.button.rouge)

            // this.button.noir.top = "300px";
            // this.button.noir.left = "200px";
            // this.button.noir.width = "250px";
            // this.button.noir.height = "50px";
            // this.button.noir.cornerRadius = 20;
            // this.button.noir.thickness = 4;
            // this.button.noir.children[0].color = "#DFF9FB";
            // this.button.noir.children[0].fontSize = 24;
            // this.button.noir.color = "#FF7979";
            // this.button.noir.background = "#EB4D4B";
        //     this.button.noir.onPointerClickObservable.add(() => {
        //         console.log("NONONNONONON")
        //         this.button.noir.isEnabled = false
        //         this.button.noir.isVisible = false
        //         this.socket.emit("purplePlayTurn", this.lobbyId, 'Noir')

        //     })
        //     this.button.noir.isEnabled = true
        //     this.button.noir.isVisible = true
        //     this.advancedTexture.addControl(this.button.noir)


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

    // askQuestion(questions) {

    // }
    // initQuestions() {
    //     var selectBox = new SelectionPanel("sp");
    //     selectBox.width = 0.25;
    //     selectBox.height = 0.48;
    //     selectBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    //     selectBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
         
    //     this.advancedTexture.addControl(selectBox);
    
    //     var transformGroup = new CheckboxGroup("Transformation");
    //     transformGroup.addCheckbox("Small", null);
    //     transformGroup.addCheckbox("High", null);

    //     selectBox.addGroup(transformGroup);
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
            console.log()
            this.advancedTexture.addControl(message);
            top += 50

        }
    }
    hideButtons() {
        console.log("hide")
        this.buttons.forEach(button => {
            console.log("hideButtons", button)
            button.bouton.isEnabled = false
            button.bouton.isVisible = false
        })
        //     for (const button in this.buttons) {
        //     this.buttons.button.isEnabled = false
        //     this.buttons[button].button.isVisible = false
        // }
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

