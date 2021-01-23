import { AdvancedDynamicTexture, Button } from '@babylonjs/gui';

export class HUD {

    constructor(localPlayer, scene, socket, lobbyId) {
        this.localPlayer = localPlayer
        this.scene = scene
        this.socket = socket
        this.lobbyId = lobbyId
    } 

    playPhaseHUD () {
        let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene);
        
        var button = Button.CreateSimpleButton("button", this.localPlayer);
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
            this.socket.emit("throwDices", this.lobbyId, this.localPlayer)
            button.isEnabled = false
            button.isVisible = false
        })
        advancedTexture.addControl(button)
    }

    waitingHUD(playingPlayer) {
        let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene);
        
        var button = Button.CreateSimpleButton("button", "En attente de " + playingPlayer);
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

        advancedTexture.addControl(button)
    }
    
    currentPlayer(players) {
        return players.find(player => player.name == this.localPlayer)
    }

}

