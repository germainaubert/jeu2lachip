import * as BABYLON from "@babylonjs/core/Legacy/legacy"
//import { Chasse } from "./chasse"
import { Purple } from "./purple/purple.js"
// import { Pmu } from "./pmu/pmu.js"
// import { QuatreVingt } from "./421/quatreVingt"

export class Game {
    constructor(canvas, socket, playerList, lobbyId, localPlayer, gameLeader) {
        this.canvas = canvas
        this.skins = [""]
        this.engine = new BABYLON.Engine(this.canvas, true, {stencil: true})
        this.socket = socket
        this.gameLeader = gameLeader
        this._currentSceneIndex = 0
        this.scenes = new Array()
        //this.scenes.push(new Chasse(this.canvas, this.socket, this.engine, localPlayer, lobbyId, this.gameLeader))
        //this.scenes.push(new Pmu(this.canvas, this.engine, this.socket, localPlayer, lobbyId, this.gameLeader))
        //this.scenes.push(new QuatreVingt(this.canvas, this.socket, this.engine, localPlayer, lobbyId, this.gameLeader))
        this.scenes.push(new Purple(this.canvas, this.engine, this.socket, localPlayer, lobbyId, this.gameLeader))

        
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