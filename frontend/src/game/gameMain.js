import * as BABYLON from "@babylonjs/core/Legacy/legacy"
//import { Chasse } from "./chasse"
// import { Purple } from "./purple.js"
 import { Pmu } from "./pmu/pmu.js"

export class Game {
    constructor(canvas, socket, playerList, lobbyId, localPlayer, gameLeader) {
        this.canvas = canvas
        this.engine = new BABYLON.Engine(this.canvas, true)
        this.socket = socket
        this.gameLeader = gameLeader
        // this.chasse = new Chasse(this.canvas, this.engine)
        // this.purple = new Purple(this.canvas, this.engine)
        this._currentSceneIndex = 0
        this.scenes = new Array()
        //this.scenes.push(new Chasse(this.canvas, this.socket, this.engine, localPlayer, lobbyId, this.gameLeader))
        //this.scenes.push(new Pmu(this.canvas, this.engine, this.socket, localPlayer, lobbyId, this.gameLeader))
        this.scenes.push(new Purple(this.canvas, this.socket, this.engine, localPlayer, lobbyId))

        
        this.lobbyId = lobbyId

        this.playersList = playerList
        

        // débogueur babylon
        window.addEventListener("keydown", (ev) => {
            //Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (this.scene.debugLayer.isVisible()) {
                    this.scene.debugLayer.hide();
                } else {
                    this.scene.debugLayer.show();
                }
            }
        });
        
        // this.testElement()

        this.main()
    }

    main() {
        this.engine.runRenderLoop(() => {
            this.getCurrentScene().scene.render()
        })
    }

    getCurrentScene () {
        return this.scenes[this._currentSceneIndex]
    }


}