import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import { Chasse } from "./chasse"
import { Purple } from "./purple.js"

export class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.engine = new BABYLON.Engine(this.canvas, true)
        
        // this.chasse = new Chasse(this.canvas, this.engine)
        // this.purple = new Purple(this.canvas, this.engine)
        this._currentSceneIndex = 0
        this.scenes = new Array()
        this.scenes.push(new Chasse(this.canvas, this.engine))
        this.scenes.push(new Purple(this.canvas, this.engine))


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
        window.addEventListener("keydown", () => {
            console.log("chgment state into purple")
            this._currentSceneIndex++
        })
        // this.testElement()

        this.main()
    }

    main() {
        this.engine.runRenderLoop(() => {
            this.currentScene.scene.render()
        })
    }

    get currentScene () {
        return this.scenes[this._currentSceneIndex]
    }

    // testElement() {
    //     BABYLON.MeshBuilder.CreateCylinder("bébé", {}, this.scene);
    //     const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    //     camera.attachControl(this.canvas, true);
    //     new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this.scene);
    // }



}