import {AdvancedDynamicTexture, TextBlock} from '@babylonjs/gui';


export class UserInformations {

    constructor(localPlayer, scene) {
        
        this.localPlayer = localPlayer
        this.scene = scene

        this.init()

    }

    init() {
        console.log(this.localPlayer)
        
        let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene);
        let pseudo = new TextBlock();
        pseudo.text = this.localPlayer.name;
        pseudo.color = "white";
        pseudo.fontSize = 24;
        advancedTexture.addControl(pseudo);    
        console.log("is foreground : ", advancedTexture.isForeground)
    }

}

