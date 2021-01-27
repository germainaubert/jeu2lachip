import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';


export class UserInformations {

    constructor(localPlayer) {

        this.localPlayer = localPlayer
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene)
        this.messages = [
            new TextBlock(),
            new TextBlock(),
        ]
        
    }

    displayInfos(player) {
        let top = -350
        console.log("DISPLAY IJNFOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
        console.log(this.messages[0])
        let left = 650
        this.messages[0].text = `Nom: ${player.name}`
        this.messages[0].color = "white";
        this.messages[0].top = top;
        this.messages[0].left = left;
        this.messages[0].fontSize = 24;
        this.advancedTexture.addControl(this.messages[0]);
        top += 50
        console.log(this.messages[0])

        this.messages[1].text = `Cheval: ${player.horse.color}`
        this.messages[1].color = "white";
        this.messages[1].top = top;
        this.messages[1].left = left;
        this.messages[1].fontSize = 24;
        this.advancedTexture.addControl(this.messages[1]);
        top += 50
    }

    pmuEnd(michelDruker) {
        let message = new TextBlock()
        message.text = michelDruker + " a perdu !"
        message.color = "white"
        message.fontSize = 72;
        this.advancedTexture.addControl(message);
    }
    // infos.forEach(info => {
    //     let message = new TextBlock()
    //     message.text = info;
    //     message.color = "white";
    //     message.fontSize = 24;
    //     advancedTexture.addControl(message);
    //  })
}
