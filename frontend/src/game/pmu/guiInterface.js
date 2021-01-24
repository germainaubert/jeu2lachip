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
        displayInfos(advancedTexture,  this.localPlayer)
        // let pseudo = new TextBlock();
        // pseudo.text = this.localPlayer.name;
        // pseudo.color = "white";
        // pseudo.fontSize = 24;
        // advancedTexture.addControl(pseudo);    
        // console.log("is foreground : ", advancedTexture.isForeground)
    }

}

function displayInfos(advancedTexture, infos) {
    let top = -350
    let left = 650
    for (const info in infos) {
        console.log(info)
        let message = new TextBlock()
        switch(info) {
            case('name'):
            message.text = `Nom: ${infos[info]}`
            break
            case('horse'):
            message.text = `Cheval: as de ${infos[info].color}`; 
            break
        }
          
        message.color = "white";
        message.top = top ;
        message.left = left;
        message.fontSize = 24;
        advancedTexture.addControl(message);
        top += 50
        
}
    // infos.forEach(info => {
    //     let message = new TextBlock()
    //     message.text = info;
    //     message.color = "white";
    //     message.fontSize = 24;
    //     advancedTexture.addControl(message);
    //  })
    
}