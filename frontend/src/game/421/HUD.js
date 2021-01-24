import { AdvancedDynamicTexture, Button } from '@babylonjs/gui';

export class HUD {

    constructor(localPlayer, scene, socket, lobbyId) {
        this.localPlayer = localPlayer
        this.scene = scene
        this.socket = socket
        this.lobbyId = lobbyId
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene)
        this.button = {
            last: Button.CreateSimpleButton("last", "Fin du tour"),
            throw: Button.CreateSimpleButton("throw", "Lancer"),
            skip: Button.CreateSimpleButton("skip", "Passer le tour"),
            wait: Button.CreateSimpleButton("wait", ""),
            pick: Button.CreateSimpleButton("pick", "Choisir les dés à garder")
        }
    }
    initHUD() {
        this.button.last.top = "0px";
        this.button.last.left = "0px";
        this.button.last.width = "150px";
        this.button.last.height = "50px";
        this.button.last.cornerRadius = 20;
        this.button.last.thickness = 4;
        this.button.last.children[0].color = "#DFF9FB";
        this.button.last.children[0].fontSize = 24;
        this.button.last.color = "#FF7979";
        this.button.last.background = "#EB4D4B";
        this.advancedTexture.addControl(this.last)

        this.button.throw.top = "300px";
        this.button.throw.left = "200px";
        this.button.throw.width = "250px";
        this.button.throw.height = "50px";
        this.button.throw.cornerRadius = 20;
        this.button.throw.thickness = 4;
        this.button.throw.children[0].color = "#DFF9FB";
        this.button.throw.children[0].fontSize = 24;
        this.button.throw.color = "#FF7979";
        this.button.throw.background = "#EB4D4B";
        this.button.throw.onPointerClickObservable.add(() => {
            this.button.throw.isEnabled = false
            this.button.throw.isVisible = false
            this.socket.emit("throwDices", this.lobbyId, this.localPlayer)

        })
        this.advancedTexture.addControl(this.button.throw)

        this.button.skip.top = "300px";
        this.button.skip.left = "-200px";
        this.button.skip.width = "250px";
        this.button.skip.height = "50px";
        this.button.skip.cornerRadius = 20;
        this.button.skip.thickness = 4;
        this.button.skip.children[0].color = "#DFF9FB";
        this.button.skip.children[0].fontSize = 24;
        this.button.skip.color = "#FF7979";
        this.button.skip.background = "#EB4D4B";
        this.button.skip.onPointerClickObservable.add(() => {
            this.button.skip.isEnabled = false
            this.button.skip.isVisible = false
            this.socket.emit("throwDices", this.lobbyId, this.localPlayer)

        })

        this.button.skip.onPointerClickObservable.add(() => {
            this.button.skip.isEnabled = false
            this.button.skip.isVisible = false
            this.socket.emit("skip", this.lobbyId, this.localPlayer)

        })
        this.advancedTexture.addControl(this.button.skip)
        this.button.throw.isVisible = false
        this.button.throw.isEnabled = false
        // this.advancedTexture.clear("throw")

        this.button.pick.top = "0px";
        this.button.pick.left = "0px";
        this.button.pick.width = "150px";
        this.button.pick.height = "50px";
        this.button.pick.cornerRadius = 20;
        this.button.pick.thickness = 4;
        this.button.pick.children[0].color = "#DFF9FB";
        this.button.pick.children[0].fontSize = 24;
        this.button.pick.color = "#FF7979";
        this.button.pick.background = "#EB4D4B";

        this.advancedTexture.addControl(this.button.pick)
    }
    lastThrowPhaseHUD() {
        console.log("last")


    }
    throwPhaseHUD(roll) {
        this.button.wait.isEnabled = false
        this.button.wait.isVisible = false
        console.log("throw HUD")
        // this.advancedTexture.clear("pick")


        if (roll !== 0) {

        }

    }

    pickPhaseHUD() {
        console.log("pick hud")

    }

    waitingHUD(playingPlayer) {
        this.button.wait.text = playingPlayer
        this.button.wait.top = "0px";
        this.button.wait.left = "0px";
        this.button.wait.width = "150px";
        this.button.wait.height = "50px";
        this.button.wait.cornerRadius = 20;
        this.button.wait.thickness = 4;
        this.button.wait.children[0].color = "#DFF9FB";
        this.button.wait.children[0].fontSize = 24;
        this.button.wait.color = "#FF7979";
        this.button.wait.background = "#EB4D4B";

        this.advancedTexture.addControl(this.button.wait)
    }

    currentPlayer(players) {
        return players.find(player => player.name == this.localPlayer)
    }

}

