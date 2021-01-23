import { AdvancedDynamicTexture, Button } from '@babylonjs/gui';

export class HUD {

    constructor(localPlayer, scene, socket, lobbyId) {
        this.localPlayer = localPlayer
        this.scene = scene
        this.socket = socket
        this.lobbyId = lobbyId
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene)
        this.button = {}
    } 

    throwPhaseHUD () {
        
        console.log("throw HUD")
        // this.advancedTexture.clear("pick")
        var button = Button.CreateSimpleButton("throw", this.localPlayer);
        button.top = "0px";
        button.left = "0px";
        button.width = "150px";
        button.height = "50px";
        button.cornerRadius = 20;
        button.thickness = 4;
        button.children[0].color = "#DFF9FB";
        button.children[0].fontSize = 24;
        button.color = "#FF7979";
        button.background = "#EB4D4B";
        button.onPointerClickObservable.add(() => {
            button.isEnabled = false
            button.isVisible = false
            this.socket.emit("throwDices", this.lobbyId, this.localPlayer)
            
        })
        this.advancedTexture.addControl(button)
    }

    pickPhaseHUD () {
        
        console.log("pick hud")
        // this.advancedTexture.clear("throw")
        var button = Button.CreateSimpleButton("pick", "Choisir les dés à garder");
        button.top = "0px";
        button.left = "0px";
        button.width = "150px";
        button.height = "50px";
        button.cornerRadius = 20;
        button.thickness = 4;
        button.children[0].color = "#DFF9FB";
        button.children[0].fontSize = 24;
        button.color = "#FF7979";
        button.background = "#EB4D4B";

        this.advancedTexture.addControl(button)
    }

    waitingHUD(playingPlayer) {
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene);
        
        var button = Button.CreateSimpleButton("wait", "En attente de " + playingPlayer);
        button.top = "0px";
        button.left = "0px";
        button.width = "150px";
        button.height = "50px";
        button.cornerRadius = 20;
        button.thickness = 4;
        button.children[0].color = "#DFF9FB";
        button.children[0].fontSize = 24;
        button.color = "#FF7979";
        button.background = "#EB4D4B";

        this.advancedTexture.addControl(button)
    }
    
    currentPlayer(players) {
        return players.find(player => player.name == this.localPlayer)
    }

}

