import * as BABYLON from "@babylonjs/core/Legacy/legacy"

// let state = {
//     start: true,
//     pmu: false,
//     purple: false,
//     des: false
// }

export class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.engine = new BABYLON.Engine(this.canvas, true)
        this.scene = new BABYLON.Scene(this.engine)

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

        this.testElement()

        this.main()
    }

    main() {
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    testElement() {
        BABYLON.MeshBuilder.CreateCylinder("bébé", {}, this.scene);
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(this.canvas, true);
        new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this.scene);
    }


}