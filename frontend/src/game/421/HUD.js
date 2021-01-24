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
            nextTurn: Button.CreateSimpleButton("nextTurn", "Passer le tour"),
            wait: Button.CreateSimpleButton("wait", "En attente des autres joueurs"),
            confirmPick: Button.CreateSimpleButton("confirmPick", "Confirmer"),
        }
        this.initHUD()
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
        this.button.last.isEnabled = false
        this.button.last.isVisible = false
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
            console.log("ououiuiuouiouoi")
            this.button.throw.isEnabled = false
            this.button.throw.isVisible = false
            this.button.nextTurn.isEnabled = false
            this.button.nextTurn.isVisible = false
            this.socket.emit("throwDices", this.lobbyId, this.localPlayer)

        })
        this.button.throw.isEnabled = false
        this.button.throw.isVisible = false
        this.advancedTexture.addControl(this.button.throw)

        this.button.nextTurn.top = "300px";
        this.button.nextTurn.left = "450px";
        this.button.nextTurn.width = "250px";
        this.button.nextTurn.height = "50px";
        this.button.nextTurn.cornerRadius = 20;
        this.button.nextTurn.thickness = 4;
        this.button.nextTurn.children[0].color = "#DFF9FB";
        this.button.nextTurn.children[0].fontSize = 24;
        this.button.nextTurn.color = "#FF7979";
        this.button.nextTurn.background = "#EB4D4B";

        this.button.nextTurn.onPointerClickObservable.add(() => {
            this.button.nextTurn.isEnabled = false
            this.button.nextTurn.isVisible = false
            this.socket.emit("nextTurn", this.lobbyId, this.localPlayer)

        })
        this.button.nextTurn.isEnabled = false
        this.button.nextTurn.isVisible = false
        this.advancedTexture.addControl(this.button.nextTurn)

        this.button.confirmPick.top = "300px";
        this.button.confirmPick.left = "-150px";
        this.button.confirmPick.width = "300px";
        this.button.confirmPick.height = "50px";
        this.button.confirmPick.cornerRadius = 20;
        this.button.confirmPick.thickness = 4;
        this.button.confirmPick.children[0].color = "#DFF9FB";
        this.button.confirmPick.children[0].fontSize = 24;
        this.button.confirmPick.color = "#FF7979";
        this.button.confirmPick.background = "#EB4D4B";
        this.button.confirmPick.isEnabled = false
        this.button.confirmPick.isVisible = false
        this.button.confirmPick.onPointerClickObservable.add(() => {
            this.button.confirmPick.isEnabled = false
            this.button.confirmPick.isVisible = false
            this.socket.emit("confirmPickNow", this.lobbyId, this.localPlayer)

        })
        this.advancedTexture.addControl(this.button.confirmPick)

        this.button.wait.top = "300px";
        this.button.wait.left = "-400px";
        this.button.wait.width = "300px";
        this.button.wait.height = "70px";
        this.button.wait.cornerRadius = 20;
        this.button.wait.thickness = 4;
        this.button.wait.children[0].color = "#DFF9FB";
        this.button.wait.children[0].fontSize = 24;
        this.button.wait.color = "#FF7979";
        this.button.wait.background = "#EB4D4B";
        this.button.wait.isEnabled = false
        this.button.wait.isVisible = false
        this.advancedTexture.addControl(this.button.wait)
    }
    // lastThrowPhaseHUD() {
    //     console.log("last")
    //     // this.button

    // }
    throwPhaseHUD(roll) {
        this.button.confirmPick.isEnabled = false
        this.button.confirmPick.isVisible = false
        this.button.wait.isEnabled = false
        this.button.wait.isVisible = false

        this.button.throw.isEnabled = true
        this.button.throw.isVisible = true
        console.log(roll)
        // console.log("throw HUD")
        if (roll >= 1) {
            this.button.nextTurn.isEnabled = true
            this.button.nextTurn.isVisible = true
        } else {
            this.button.nextTurn.isEnabled = false
            this.button.nextTurn.isVisible = false
        }

    }

    confirmPickPhaseHUD() {
        this.button.throw.isEnabled = false
        this.button.throw.isVisible = false
        this.button.nextTurn.isEnabled = true
        this.button.nextTurn.isVisible = true
        this.button.confirmPick.isEnabled = true
        this.button.confirmPick.isVisible = true

    }

    waitingHUD(localPlayer) {
        this.button.confirmPick.isEnabled = false
        this.button.confirmPick.isVisible = false
        this.button.throw.isEnabled = false
        this.button.throw.isVisible = false
        this.button.nextTurn.isEnabled = false
        this.button.nextTurn.isVisible = false
        console.log(this.button.wait)
        this.button.wait.text = localPlayer
        this.button.wait.isEnabled = true
        this.button.wait.isVisible = true
    }

    currentPlayer(players) {
        return players.find(player => player.name == this.localPlayer)
    }

}

